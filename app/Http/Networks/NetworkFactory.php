<?php

namespace App\Http\Networks;

use GuzzleHttp\Client;

abstract class NetworkFactory {

    private $register_lead_url = null;
    private $login_url = null;
    private $pull_leads_url = null;
    private $trafficon_username = "cactusmedia";
    private $trafficon_password = "Ag5322fa2a";
    private $login_token = null;

    public function __construct() {

    }

    /**
     * @param array $params
     * @param $url
     * @param $unique_id
     * @return false|string
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    protected function registerLead(array $params, $url, $unique_id) {
        $client = new Client();

        $res = $client->request('POST', $url, [
            'form_params' => $params
        ]);
        if ($res->getStatusCode() !== 200) {
            return json_encode(['status' => false, 'msg' => 'Not found']);
        }
        $data = json_decode($res->getBody()->getContents(), true);
        if ($data['status'] !== 'success') {

            $this->storeNetworkResponse($unique_id, $data['message']);
            return json_encode(['status' => false, 'msg' => 'Error from host']);
        }
        return json_encode(['status' => true, 'msg' => $data['ref_link'] . $data['token']]);
    }

    /**
     * @return null
     */
    public function getRegisterLeadUrl() {
        return $this->register_lead_url;
    }

    /**
     * @param null $register_lead_url
     */
    public function setRegisterLeadUrl($register_lead_url): void {
        $this->register_lead_url = $register_lead_url;
    }

    /**
     * @return null
     */
    public function getLoginUrl() {
        return $this->login_url;
    }

    /**
     * @param null $login_url
     */
    public function setLoginUrl($login_url): void {
        $this->login_url = $login_url;
    }

    /**
     * @return null
     */
    public function getPullLeadsUrl() {
        return $this->pull_leads_url;
    }

    /**
     * @param null $pull_leads_url
     */
    public function setPullLeadsUrl($pull_leads_url): void {
        $this->pull_leads_url = $pull_leads_url;
    }

    /**
     * @return null
     */
    public function getLoginToken() {
        return $this->login_token;
    }

}