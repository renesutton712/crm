<?php

namespace App\Http\Networks;

use App\Offer;
use App\Utilities;
use DateTime;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Support\Facades\Log;

class Trafficon extends NetworkFactory {

    private $register_url = "https://trafficon-api.com/secured-registration";
    private $login_url = "http://affreport.trafficon.co/api/affiliate/login";
    private $pull_leads_url = "http://affreport.trafficon.co/api/lead/get/";
    private $username = "cactusmedia";
    private $password = "Ag5322fa2a";

    private $login_token = null;

    /**
     * @return null
     */
    public function getLoginToken() {
        return $this->login_token;
    }

    /**
     * @param null $login_token
     */
    public function setLoginToken($login_token): void {
        $this->login_token = $login_token;
    }

    /**
     * @var null
     */
    protected $aff_id = null;
    /**
     * @var null
     */
    protected $offer_id = null;

    /**
     * @return null
     */
    public function getOfferId() {
        return $this->offer_id;
    }

    /**
     * @param null $offer_id
     */
    public function setOfferId($offer_id): void {
        $this->offer_id = $offer_id;
    }

    /**
     * @return null
     */
    public function getAffId() {
        return $this->aff_id;
    }

    /**
     * @param null $aff_id
     */
    public function setAffId($aff_id): void {
        $this->aff_id = $aff_id;
    }

    protected function login() {
        $client = new Client();

        $res = $client->request('POST', $this->login_url, [
            'json' => [
                "username" => $this->username, "password" => $this->password
            ]
        ]);
        if ($res->getStatusCode() !== 200) {
            return json_encode(['status' => false, 'msg' => 'Not found']);
        }
        $data = json_decode($res->getBody()->getContents(), true);
        if (!$data['status']) {
            return $data['message'];
        }
        $this->setLoginToken($data['token']);
    }

    public function sendLead(array $params, $network) {
        $urlParams = Utilities::parseURLParamsToArr($params['unique_id']);
        $tokens_name = explode(',', $network->TN);
        $tokens = explode(',', $network->T);
        if (!isset($params['offer_id'])) {
            return ['status' => false, 'msg' => 'No offer id supplied'];
        }
        $offer = $this->getOffer($params['offer_id']);
        $data = [
            $offer->offer_token => $offer->offer_token_value, $tokens_name[0] => $tokens[0],
            'first_name' => "{$params['first_name']}",
            'last_name' => "{$params['last_name']}", 'email' => "{$params['email']}",
            'password' => "{$params['password']}", 'area_code' => "{$params['prefix']}", 'phone' => "{$params['phone']}",
            'ip' => "{$params['ip']}",
            'country' => "{$params['country_full']}", 'iso' => "{$params['country']}",
            'aff_sub1' => "{$params['unique_id']}",
            'offer_url' => $offer->offer_url,
            'offer_name' => $offer->offer_name,
            'aff_sub2' => isset($urlParams['aff_sub2']) ? $urlParams['aff_sub2'] : '',
            'aff_sub3' => isset($urlParams['aff_sub3']) ? $urlParams['aff_sub3'] : '',
            'aff_sub4' => isset($urlParams['aff_sub4']) ? $urlParams['aff_sub4'] : '',
            'aff_sub5' => isset($urlParams['aff_sub5']) ? $urlParams['aff_sub5'] : ''
        ];
        return $this->TrafficonLead($data, $params['unique_id'], $params['campaign_id']);
    }

    /**
     * @param array $params
     * @param $unique_id
     * @param null $camp_id
     * @return array|false|string
     * @throws \GuzzleHttp\Exception\GuzzleException
     * @throws \Exception
     */
    protected function TrafficonLead(array $params, $unique_id, $camp_id = null) {
        $client = new Client();
        try {
            $res = $client->request('POST', $this->register_url, [
                'form_params' => $params
            ]);
            try {
                Log::info('registerLead (Trafficon) '. (new DateTime())->format('Y-m-d H:i:s'));
                Log::info([
                    'form_params' => $params
                ]);
                Log::info('response status (Trafficon): ' . $res->getStatusCode());
            } catch (\Exception $exception) {}

            $data = json_decode($res->getBody()->getContents(), true);
            if ($res->getStatusCode() !== 200) {
                throw  new \Exception('Not found');
            }
            if ($data['status'] !== 'success') {
                throw new \Exception($data['message']);
            }
            $pixel_res = $this->sendPixel($unique_id);
            if (isset($pixel_res['status']) && !$pixel_res['status']) {
                throw new \Exception($pixel_res['msg']);
            }
            $response = ['status' => true, 'msg' => $data['ref_link'] . $data['token']];
            $iframe = $this->getIframePixel($camp_id);
            if (!empty($iframe)) {
                $response['pixel'] = $iframe->iframe_content;
            }
            $this->updateToLead($unique_id);
            return $response;
        } catch (\Exception $e) {
            $this->storeNetworkResponse($unique_id, $e->getMessage());
            return json_encode(['status' => false, 'msg' => $e->getMessage()]);
        }
    }

}