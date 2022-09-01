<?php

namespace App\Http\Networks;

use App\Offer;
use DateTime;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Facades\Log;

class RoiCollective extends NetworkFactory
{
    private $create_lead_url = "https://clckson-api.com/api/v2/leads";
    private $get_autologin_url = "https://clckson-api.com/api/v2/brokers/login/details";
    private $token = null;
    private $data = null;

    /**
     * @param array $params
     * @param $network
     * @return array|false|string
     * @throws \GuzzleHttp\Exception\GuzzleException
     */


    public function prepareData(array $params, $network)
    {
        $offer = $this->getOffer($params['offer_id']);
        if (!isset($params['offer_id'])) {
            return ['status' => false, 'msg' => 'No offer id supplied'];
        }
        $this->setToken($network->T);
        $data = [
            'firstname' => $params['first_name'],
            'lastname' => $params['last_name'],
            'email' => $params['email'],
            'password' => $params['password'],
            'phone' => $params['phone'],
            'areaCode' => $params['prefix'],
            'ip' => $params['ip'],
            'comment' => "CherryPop",
            'offerName' => $offer->offer_name,
            $offer->offer_token => $offer->offer_token_value,
        ];
        return $this->RoiCollectiveLead($data, $params['unique_id'], $params['campaign_id']);
    }

    protected function getOffer($offer_id) {
        if (empty($offer_id)) {
            return ['status' => false, 'msg' => 'No offer found'];
        }
        return Offer::where('offer_id', '=', "{$offer_id}")->first();
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
    protected function RoiCollectiveLead(array $params, $unique_id, $camp_id = null)
    {
        $client = new Client();
        try {
            $res = $client->request('POST', $this->create_lead_url, [
                'form_params' => $params,
                'headers' => [
                    'Content-Type' => 'application/x-www-form-urlencoded',
                    'Api-Key' => '003E9DDC-963A-CD13-2D23-FD71B41C8F96',
                ],
            ]);
            try {
                Log::info('registerLead (RoiCollective) ' . (new DateTime())->format('Y-m-d H:i:s'));
                Log::info([
                    'form_params' => $params
                ]);
                Log::info('response status (RoiCollective): ' . $res->getBody());
            } catch (\Exception $exception) {
            }
            $data = json_decode($res->getBody(), true);
            $this->data = json_decode($res->getBody(), true);
            if (!in_array($res->getStatusCode(), [201, 200])) {
                throw new \Exception('Status code is not what expected, got:' . $res->getStatusCode());
            }
            $pixel_res = $this->sendPixel($unique_id);
            if (isset($pixel_res['status']) && !$pixel_res['status']) {
                throw new \Exception($pixel_res['msg']);
            }
            Log::info('response status (RoiCollective): ' . $data['details']);

            $response = ['status' => true, 'msg' => $data['details']['redirect']['url']];

            $this->storeNetworkResponse($unique_id, 'lead_id ' . $unique_id);
            $iframe = $this->getIframePixel($camp_id);
            if (!empty($iframe)) {
                $response['pixel'] = $iframe->iframe_content;
            }
            $this->updateToLead($unique_id);
            return $response;
        } catch (ClientException $e) {
            $response = $e->getResponse()->getBody();
            $response = json_decode($response->getContents());
            Log::info('Error (RoiCollective): ' . json_encode($e));
            if ($response === null) {
                return json_encode(['status' => false, 'msg' => $e->getMessage() . ' ' . $e->getLine()]);
            }
            return json_encode(['status' => false, 'msg' => json_encode($response)]);
        } catch (\Exception $e) {
            return json_encode(['status' => false, 'msg' => "Error while saving the lead ".$e->getMessage() . ' ' . $e->getLine()]);
        }
    }

    /**
     * @return null
     */
    public function getToken()
    {
        return $this->token;
    }

    /**
     * @param null $token
     */
    public function setToken($token): void
    {
        $this->token = $token;
    }
}