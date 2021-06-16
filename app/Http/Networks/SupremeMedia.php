<?php

namespace App\Http\Networks;

use App\Offer;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\GuzzleException;

class SupremeMedia extends NetworkFactory {

//    private $create_lead_url = "https://api.rhkoco.com/v2/affiliates/lead/create";
    private $create_lead_url = "https://api.sdkapilead.com/v2/affiliates/lead/create";
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
//        $params['country'] = "AU";
//        $params['prefix'] = "+61";
//        $params['phone'] = "024917742";
        $data = [
            'firstname' => $params['first_name'], 'lastname' => $params['last_name'], 'email' => $params['email'],
            'password' => $params['password'], 'phone' => $params['prefix'] . $params['phone'], 'ip' => $params['ip'],
            'country_code' => $params['country'], $offer->offer_token => $offer->offer_token_value,
            'aff_sub' => $params['unique_id'],
            'sub1' => isset($urlParams['sub1']) ? $urlParams['sub1'] : '',
            'sub2' => isset($urlParams['sub2']) ? $urlParams['sub2'] : '',
            'sub3' => isset($urlParams['sub3']) ? $urlParams['sub3'] : '',
            'sub4' => isset($urlParams['sub4']) ? $urlParams['sub4'] : '',
            'sub5' => isset($urlParams['sub5']) ? $urlParams['sub5'] : ''
        ];
        return $this->supremeLead($data, $params['unique_id'], $params['campaign_id']);
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
    protected function supremeLead(array $params, $unique_id, $camp_id = null) {
        $client = new Client();
        try {
            $res = $client->request('POST', $this->create_lead_url, [
                'headers' => [
                    'Token' => $this->getToken()
                ],
                'form_params' => $params
            ]);

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