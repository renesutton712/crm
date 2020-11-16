<?php

namespace App\Http\Networks;

use App\Lead;
use GuzzleHttp\Client;

abstract class NetworkFactory {

    private $register_lead_url = null;
    private $login_url = null;
    private $pull_leads_url = null;
    private $login_token = null;

    public function __construct() {

    }

    /**
     * @param array $params
     * @param $url
     * @param $unique_id
     * @param null $token
     * @return false|string
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    protected function registerLead(array $params, $url, $unique_id, $token = null) {
        $client = new Client();
        $token = is_null($token) ? '' : $token;
        $res = $client->request('POST', $url, [
            'headers' => [
                'Token' => $token
            ],
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
     * @param $unique_id
     * @param $msg
     * @return bool
     */
    protected function storeNetworkResponse($unique_id, $msg) {
        if (empty($unique_id)) {
            return false;
        }
        $model = Lead::where('unique_id', '=', $unique_id)->first();
        $model->network_response = $msg;
        if (!$model->save()) {
            return false;
        }
        return true;
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