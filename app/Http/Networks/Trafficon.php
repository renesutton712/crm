<?php

namespace App\Http\Networks;

use App\Lead;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

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
            'aff_sub1' => "{$params['unique_id']}"
        ];
        return $this->TrafficonLead($data, $params['unique_id'], $params['campaign_id']);
    }

    /**
     * @param array $params
     * @param $url
     * @param $unique_id
     * @param null $camp_id
     * @param null $token
     * @return array|false|string
     * @throws GuzzleException
     */
    protected function TrafficonLead(array $params, $unique_id, $camp_id = null) {
        $client = new Client();
        $res = $client->request('POST', $this->register_url, [
            'form_params' => $params
        ]);
        $data = json_decode($res->getBody()->getContents(), true);
        if ($res->getStatusCode() !== 200) {
            return json_encode(['status' => false, 'msg' => 'Not found']);
        }
        if ($data['status'] !== 'success') {

            $this->storeNetworkResponse($unique_id, $data['message']);
            return json_encode(['status' => false, 'msg' => $data['message']]);
        }
        $pixel_res = $this->sendPixel($unique_id);
        if (isset($pixel_res['status']) && !$pixel_res['status']) {
            return json_encode(['status' => false, 'msg' => $pixel_res['msg']]);
        }
        $response = ['status' => true, 'msg' => $data['ref_link'] . $data['token']];
        $iframe = $this->getIframePixel($camp_id);
        if (!empty($iframe)) {
            $response['pixel'] = $iframe->iframe_content;
        }
        return $response;
    }

}