<?php

namespace App\Http\Networks;

use App\Utilities;
use DateTime;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Support\Facades\Log;

class AffClub extends NetworkFactory {

    private $register_url = "https://af34trkapi.com/v3/affiliates/lead/create";
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
        $offer = $this->getOffer($params['offer_id']);
        $data = [
            'firstname' => $params['first_name'],
            'lastname' => $params['last_name'],
            'email' => $params['email'],
            'password' => $params['password'],
            'phone' => $params['phone'],
            'area_code' =>  $params['prefix'],
            'ip' => $params['ip'],
            'country_code' => $params['country'],
            'source' => isset($urlParams['source']) ? $urlParams['source'] : '',
            'aff_sub' => $params['unique_id'],
            'referrer_url' => $offer->offer_url,
            $offer->offer_token => $offer->offer_token_value,
            'aff_sub1' => isset($urlParams['aff_sub1']) ? $urlParams['aff_sub1'] : '',
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
            try {
                Log::info('registerLead (AffClub) '. (new DateTime())->format('Y-m-d H:i:s'));
                Log::info([
                    'form_params' => $params,
                    'headers' => [
                        'token' => $this->getToken()
                    ]
                ]);
                Log::info('response status (AffClub): ' . $res->getStatusCode());
                Log::info('full response (AffClub): ' . $res->getBody());
            } catch (\Exception $exception) {}
            $data = json_decode($res->getBody(), true);
            if ($res->getStatusCode() !== 200) {
                throw  new \Exception('Not found');
            }
            $pixel_res = $this->sendPixel($unique_id);
            if (isset($pixel_res['status']) && !$pixel_res['status']) {
                throw new \Exception($pixel_res['msg']);
            }
            if (!$data['result']['success']) {
                throw new \Exception($data['result']['message']);
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
            $res = isset($getResponse[1]) ? $getResponse[1] : $e->getMessage();
            $parsedResponse = json_decode($res, true);
            $parsedResponse = is_array($parsedResponse) ? $parsedResponse['result'] : $res;
            $this->storeNetworkResponse($unique_id, $parsedResponse);
            return json_encode(['status' => false, 'msg' => $parsedResponse]);
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