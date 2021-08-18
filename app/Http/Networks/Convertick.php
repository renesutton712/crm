<?php

namespace App\Http\Networks;

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
     * @return array|false|string
     */
    public function prepareData(array $params, $network) {
        Log::debug('(S) Response logs - Starting App');
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
            'custom2' => $params['unique_id']
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
            if ($res->getStatusCode() !== 200) {
                throw new \Exception('Url not found');
            }
            $content = $res->getBody()->getContents();
//            $data = json_decode(preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $res->getBody()->getContents()), true);
            Log::debug('(S) Response logs - Register Lead');
            Log::debug($res->getBody()->getContents());
            Log::debug("clean json");
            Log::debug($this->cleanJson($res->getBody()->getContents()));
            Log::debug("after clean");
            Log::debug($res->getBody()->getContents());
            $data = json_decode(preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $res->getBody()->getContents()), true);
            Log::debug("Data Json");
            Log::debug("New Json Error");
            Log::debug(json_last_error());
            Log::debug(var_dump($data));
            if (!isset($data['data'])) {
                throw new \Exception($data['messages']);
            }
            $pixel_res = $this->sendPixel($unique_id);
            if (isset($pixel_res['status']) && !$pixel_res['status']) {
                throw new \Exception($pixel_res['msg']);
            }
            $this->storeNetworkResponse($unique_id, $data['data']['signupRequestID']);
            $broker_res = $this->brokerAutoLoginUrl($data['data']['signupRequestID']);
            if (!isset($broker_res['status'])) {
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
//        // This will remove unwanted characters.
//        // Check http://www.php.net/chr for details
//        for ($i = 0; $i <= 31; ++$i) {
//            $data = str_replace(chr($i), "", $data);
//        }
//        $data = str_replace(chr(127), "", $data);
//
//        // This is the most common part
//        // Some file begins with 'efbbbf' to mark the beginning of the file. (binary level)
//        // here we detect it and we remove it, basically it's the first 3 characters
//        if (0 === strpos(bin2hex($data), 'efbbbf')) {
//            $checkLogin = substr($data, 3);
//        }

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
            Log::debug('(S) Response logs');
            Log::debug($res->getBody()->getContents());
            $data = json_decode($res->getBody()->getContents(), true);
            if (empty($data['data'])) {
                throw new \Exception($data['messages']);
            }
            return [
                'status' => true, 'msg' => "{$data['url']}/{$data['parameters']['action']}?token={$data['parameters']['token']}"
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