<?php

namespace App\Http\Networks;

use DateTime;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Support\Facades\Log;
use phpDocumentor\Reflection\Project;

class ConvertingTeam extends NetworkFactory {

    private $register_lead_url = "https://api-brokers.com/registration";
    private $api_key = null;

    /**
     * @param array $params
     * @param $network
     * @param $platform
     * @return array|false|string
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function prepareData(array $params, $network) {
        if (!isset($params['offer_id'])) {
            return ['status' => false, 'msg' => 'No offer id supplied'];
        }
        $this->setApiKey($network->T);
        $offer = $this->getOffer($params['offer_id']);
        $data = [
            'firstName' => $params['first_name'], 'lastName' => $params['last_name'], 'email' => $params['email'],
            'password' => $params['password'], 'phonecc' => $params['prefix'], 'phone' => $params['phone'],
            'ip' => $params['ip'], 'offerName' => $offer->offer_name, 'offerUrl' => $offer->offer_url,'lang' => "en", 'project' => "apicrypto",
            'a' => 4013, 'o' => 30383, 'agreementBroker' => true,


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
                    'X-Forwarded-For' => $params['ip'],
                    'Content-type' => "application/json"
                ],
                'json' => $params
            ]);
            try {
                Log::info('registerLead (ConvertingTeam) '. (new DateTime())->format('Y-m-d H:i:s'));
                Log::info([
                    'headers' => [
                        'Api-Key' => $this->getApiKey()
                    ],
                    'form_params' => $params
                ]);
                Log::info('response status (ConvertingTeam): ' . $res->getStatusCode());
                Log::info('getBody status (ConvertingTeam): ' . $res->getBody());
            } catch (\Exception $exception) {}
            $data = json_decode($res->getBody()->getContents(), true);
            $this->data = json_decode($res->getBody()->getContents(), true);
            if (!in_array($res->getStatusCode(), [201, 200])) {
                throw new \Exception('Status code is not what expected, got:' . $res->getStatusCode());
            }
            $pixel_res = $this->sendPixel($unique_id);
            if (isset($pixel_res['statusCode']) && $pixel_res['statusCode'] !== 201) {
                throw new \Exception($pixel_res['msg']);
            }
            $response = ['status' => true, 'msg' => $data['target']['url']];
            $this->storeNetworkResponse($unique_id, 'lead_id ' . $data['regId']);
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
                return json_encode(['route' => "ClientException", 'status' => false, 'msg' => $e]);
            }
            return json_encode(['status' => false, 'msg' => json_encode($response)]);
        } catch (\Exception $e) {
            return json_encode(['route' => "Exception", 'status' => false, 'msg' => $e->getLine() . ' ' . $e->getMessage()]);
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