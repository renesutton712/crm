<?php

namespace App\Http\Networks;

use DateTime;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Support\Facades\Log;

class Convertick extends NetworkFactory {

    private $register_lead_url = "https://trkgods.com/api/v1/signups/add.php";
    private $broker_request = "https://trkgods.com/api/v1/brokers/login/details.php?signupID=";
    private $api_key = null;

    /**
     * @param array $params
     * @param $network
     * @param $platform
     * @return array|false|string
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function prepareData(array $params, $network, $platform) {
        if (!isset($params['offer_id'])) {
            return ['status' => false, 'msg' => 'No offer id supplied'];
        }
        $this->setApiKey($network->T);
        $offer = $this->getOffer($params['offer_id']);
//        $params['ip'] = "49.184.32.152";
//        $params['prefix'] = "+61";
//        $params['phone'] = "0242482372";
        $data = [
            'firstName' => $params['first_name'], 'lastName' => $params['last_name'], 'email' => $params['email'],
            'password' => $params['password'], 'phone' => $params['prefix'] . $params['phone'],
            'ip' => $params['ip'], 'custom1' => $params['unique_id'], $offer->offer_token => $offer->offer_token_value,
            'custom2' => $params['unique_id'], 'custom3' => $platform
        ];
        return $this->registerLead($data, $params['unique_id'], $params['campaign_id']);
    }

    /**
     * @param $params
     * @param $unique_id
     * @param null $camp_id
     * @return array|false|string
     * @throws \GuzzleHttp\Exception\GuzzleException
     * @throws \Exception
     */
    private function registerLead($params, $unique_id, $camp_id = null) {
        $client = new Client();
        try {
            $res = $client->request('POST', $this->register_lead_url, [
                'headers' => [
                    'Api-Key' => $this->getApiKey()
                ],
                'form_params' => $params
            ]);
            try {
                Log::info('registerLead (Convertik) '. (new DateTime())->format('Y-m-d H:i:s'));
                Log::info([
                    'headers' => [
                        'Api-Key' => $this->getApiKey()
                    ],
                    'form_params' => $params
                ]);
                Log::info('response status (Convertik): ' . $res->getStatusCode());
                Log::info('getBody status (Convertik): ' . $res->getBody());
            } catch (\Exception $exception) {}
            if ($res->getStatusCode() !== 200) {
                throw new \Exception('Url not found');
            }
            $content = $res->getBody()->getContents();
            $content = $this->cleanJson($content);
            $data = (array)json_decode($content, true);
            if (!isset($data['data'])) {
                throw new \Exception($data['messages']);
            }
            $pixel_res = $this->sendPixel($unique_id);
            if (isset($pixel_res['status']) && !$pixel_res['status']) {
                throw new \Exception($pixel_res['msg']);
            }
            $this->storeNetworkResponse($unique_id, ((array)$data['data'])['signupRequestID']);
            $broker_res = $this->brokerAutoLoginUrl(((array)$data['data'])['signupRequestID']);
            if (!$broker_res['status']) {
                throw new \Exception($broker_res['msg']);
            }
            $response = ['status' => true, 'msg' => $broker_res['msg']];
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
            $this->storeNetworkResponse($unique_id, $response->messages[0]);
            return json_encode(['status' => false, 'msg' => $response->messages[0]]);
        }
    }

    private function cleanJson($data) {
        // This will remove unwanted characters.
        // Check http://www.php.net/chr for details
        for ($i = 0; $i <= 31; ++$i) {
            $data = str_replace(chr($i), "", $data);
        }
        $data = str_replace(chr(127), "", $data);

        // This is the most common part
        // Some file begins with 'efbbbf' to mark the beginning of the file. (binary level)
        // here we detect it and we remove it, basically it's the first 3 characters
        if (0 === strpos(bin2hex($data), 'efbbbf')) {
            $checkLogin = substr($data, 3);
        }

        return stripslashes($data);
    }

    private function brokerAutoLoginUrl($signupId) {
        $client = new Client();
        try {
            $res = $client->request('GET', $this->broker_request . "{$signupId}", [
                'headers' => [
                    'Api-Key' => $this->getApiKey()
                ],
            ]);
            if ($res->getStatusCode() !== 200) {
                throw new \Exception('Url not found');
            }
            $content = $res->getBody()->getContents();
            $data = json_decode($content, true);
            if (!isset($data['data'])) {
                throw new \Exception($data['messages']);
            }
            return [
                'status' => true, 'msg' => "{$data['data']['url']}"
            ];
        } catch (\Exception $e) {
            return json_encode(['status' => false, 'msg' => $e->getMessage()]);
        }
    }

    /**
     * @return null
     */
    public function getApiKey() {
        return $this->api_key;
    }

    /**
     * @param null $api_key
     */
    public function setApiKey($api_key): void {
        $this->api_key = $api_key;
    }

}