<?php

namespace App\Http\Networks;

use App\Utilities;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;

class AffClub extends NetworkFactory {

    private $register_url = "https://af34trkapi.com/v2/affiliates/lead/create";
    private $token;
    private $id = 154;

    /**
     * @param $params
     * @param $network
     * @return array|false|string
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function prepareData($params, $network) {
        //DEV
//        $params['ip'] = '93.213.79.63';
//        $params['prefix'] = '+49';
//        $params['phone'] = '05082500195';
//        $params['country'] = 'DE';
        $urlParams = Utilities::parseURLParamsToArr($params['unique_id']);
//        $tokens_name = explode(',', $network->TN);
        $tokens = explode(',', $network->T);
        $this->setToken($tokens[0]);
        $data = [
            'firstname' => $params['first_name'],
            'lastname' => $params['last_name'],
            'email' => $params['email'],
            'password' => $params['password'],
            'phone' => $params['prefix'] . $params['phone'],
            'ip' => $params['ip'],
            'country_code' => $params['country'],
            'source' => isset($urlParams['source']) ? $urlParams['source'] : '',
            'aff_sub1' => $params['unique_id'],
            'aff_sub2' => isset($urlParams['aff_sub2']) ? $urlParams['aff_sub2'] : '',
            'aff_sub3' => isset($urlParams['aff_sub3']) ? $urlParams['aff_sub3'] : '',
            'aff_sub4' => isset($urlParams['aff_sub4']) ? $urlParams['aff_sub4'] : '',
            'aff_sub5' => isset($urlParams['aff_sub5']) ? $urlParams['aff_sub5'] : ''
        ];
        return $this->sendLead($data, $params['unique_id'], $params['campaign_id']);
    }

    /**
     * @param $params
     * @param $unique_id
     * @param null $camp_id
     * @return array|false|string
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    protected function sendLead($params, $unique_id, $camp_id = null) {
        $client = new Client();
        try {
            $res = $client->request('POST', $this->register_url, [
                'form_params' => $params,
                'headers' => [
                    'token' => $this->getToken()
                ]
            ]);
            $data = json_decode($res->getBody()->getContents(), true);
            if ($res->getStatusCode() !== 200) {
                throw  new \Exception('Not found');
            }
            $pixel_res = $this->sendPixel($unique_id);
            if (isset($pixel_res['status']) && !$pixel_res['status']) {
                throw new \Exception($pixel_res['msg']);
            }
            $response = ['status' => true, 'msg' => $data['result']['url']];
            $iframe = $this->getIframePixel($camp_id);
            if (!empty($iframe)) {
                $response['pixel'] = $iframe->iframe_content;
            }
            $this->updateToLead($unique_id);
            return $response;
        } catch (\Exception $e) {
            $getResponse = explode('response:', $e->getMessage());
            $parsedResponse = json_decode($getResponse[1], true);
            $this->storeNetworkResponse($unique_id, $parsedResponse['result']);
            return json_encode(['status' => false, 'msg' => $parsedResponse['result']]);
        }
    }

    /**
     * @return mixed
     */
    public function getToken() {
        return $this->token;
    }

    /**
     * @param mixed $token
     */
    public function setToken($token): void {
        $this->token = $token;
    }

}