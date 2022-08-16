<?php

namespace App\Http\Networks;

use App\Offer;
use DateTime;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Facades\Log;

class LeadsClub extends NetworkFactory {

    private $create_lead_url = "https://api.leads.club/spotapi/spotapi (Customer-Add)";
    private $token = null;

    /**
     * @param array $params
     * @param $network
     * @return array|false|string
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function prepareData(array $params, $network) {
        if (!isset($params['offer_id'])) {
            return ['status' => false, 'msg' => 'No offer id supplied'];
        }
        $this->setToken($network->T);
        $offer = $this->getOffer($params['offer_id']);
        $data = [
            'api_username' => "ho_3460",
            'api_password' => "pEEJunHcIpLK",
            'email' => $params['email'],
            'MODULE' => "Customer",
            'COMMAND' => "add",
            'FirstName' => $params['first_name'],
            'LastName' => $params['last_name'],
            'ip' => $params['ip'],
            'Phone' =>  $params['prefix'] . $params['phone'],
            $offer->offer_token => $offer->offer_token_value,
            'Country' => $params['country'],
            'password' => $params['password'],
            'campaignId' => 18,
        ];
        return $this->sendLead($data, $params['unique_id'], $params['campaign_id']);
    }

    /**
     * @param array $params
     * @param $url
     * @param $unique_id
     * @param null $camp_id
     * @param null $token
     * @return array|false|string
     * @throws GuzzleException
     * @throws \Exception
     */
    protected function sendLead(array $params, $unique_id, $camp_id = null) {
        $client = new Client();
        try {
            $res = $client->request('POST', $this->create_lead_url, [
                'headers' => [
                    'Content-Type' => 'application/x-www-form-urlencoded',
                ],
                'form_params' => $params
            ]);
            try {
                Log::info('registerLead (LeadsClub) '. (new DateTime())->format('Y-m-d H:i:s'));
                Log::info([
                    'headers' => [
                        'Token' => $this->getToken()
                    ],
                    'form_params' => $params
                ]);
                Log::info('response status (LeadsClub): ' . $res->getStatusCode());
            } catch (\Exception $exception) {}
            $data = json_decode($res->getBody()->getContents(), true);
            if ($res->getStatusCode() !== 200) {
                throw new \Exception('Url not found');
            }
            if (!$data['status']) {
                throw new \Exception($data['result']);
            }
            $pixel_res = $this->sendPixel($unique_id);
            if (isset($pixel_res['status']) && !$pixel_res['status']) {
                throw new \Exception($pixel_res['msg']);
            }
            if (!$data['result']['success']) {
                throw new \Exception('Duplicate found');
            }
            $response = ['status' => true, 'msg' => $data['result']['url']];
            $this->storeNetworkResponse($unique_id, 'lead_id ' . $data['result']['lead_id']);
            $iframe = $this->getIframePixel($camp_id);
            if (!empty($iframe)) {
                $response['pixel'] = $iframe->iframe_content;
            }
            $this->updateToLead($unique_id);
            return $response;
        } catch (ClientException $e) {
            $response = $e->getResponse()->getBody();
            $response = json_decode($response->getContents());
            if ($response === null) {
                return json_encode(['status' => false, 'msg' => $e->getMessage()]);
            }
            $this->storeNetworkResponse($unique_id, $response->result);
            return json_encode(['status' => false, 'msg' => $response->result]);
        } catch (\Exception $e) {
            $this->storeNetworkResponse($unique_id, $e->getMessage());
            return json_encode(['status' => false, 'msg' => $e->getMessage()]);
        }
    }

    /**
     * @return null
     */
    public function getToken() {
        return $this->token;
    }

    /**
     * @param null $token
     */
    public function setToken($token): void {
        $this->token = $token;
    }

}