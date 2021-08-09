<?php

namespace App\Http\Networks;

use App\Offer;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\GuzzleException;

class Affiliate360 extends NetworkFactory {

    private $create_lead_url = "https://api.wickedtrack.com/leads";
    private $token = null;
    private $res = null;

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
            'first_name' => $params['first_name'],
            'last_name' => $params['last_name'],
            'email' => $params['email'],
            'phone' => $params['prefix'] . $params['phone'],
            '_ip' => $params['ip'],
            'area_code' => $params['prefix'],
            $offer->offer_token => $offer->offer_token_value
        ];
        return $this->affiliate360Lead($data, $params['unique_id'], $params['campaign_id']);
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
    protected function affiliate360Lead(array $params, $unique_id, $camp_id = null) {
        $client = new Client();
        try {
            $this->res = $client->request('POST', $this->create_lead_url, [
                'headers' => [
                    'affid' => $this->getToken()
                ],
                'form_params' => $params
            ]);

            $data = json_decode($this->res->getBody()->getContents(), true);
            if ($this->res->getStatusCode() !== 200) {
                throw new \Exception('Url not found');
            }
            $pixel_res = $this->sendPixel($unique_id);
            if (isset($pixel_res['status']) && !$pixel_res['status']) {
                throw new \Exception($pixel_res['msg']);
            }
            if (!$data['result']['success']) {
                throw new \Exception('Duplicate found');
            }
            $response = ['status' => true, 'msg' => $data['extras']['redirect']['url']];
            $this->storeNetworkResponse($unique_id, 'lead_id ' . $data['lead']['id']);
            $iframe = $this->getIframePixel($camp_id);
            if (!empty($iframe)) {
                $response['pixel'] = $iframe->iframe_content;
            }
            $this->updateToLead($unique_id);
            return $response;
        } catch (ClientException $e) {
            $response = $e->getResponse()->getBody();
            $response = json_decode($response->getContents());
            $data = json_decode($this->res->getBody()->getContents(), true);
            if ($response === null) {
                return json_encode(['status' => false, 'msg' => $e->getMessage()]);
            }
            $this->storeNetworkResponse($unique_id, $data['extras']['redirect']['url']);
            return json_encode(['status' => false, 'msg' => $response->result]);
        } catch (\Exception $e) {
            $data = json_decode($this->res->getBody()->getContents(), true);
            $this->storeNetworkResponse($unique_id, $data['extras']['redirect']['url']());
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