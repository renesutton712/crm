<?php

namespace App\Http\Networks;

use App\Lead;
use App\PixelIframe;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

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
     * @param null $camp_id
     * @param null $token
     * @return array|false|string
     * @throws GuzzleException
     */
    protected function registerLead(array $params, $url, $unique_id, $camp_id = null, $token = null) {
        $client = new Client();
        $token = is_null($token) ? '' : $token;
        $res = $client->request('POST', $url, [
            'headers' => [
                'Token' => $token
            ],
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
        $response = ['status' => true, 'msg' => $data['ref_link'] . $data['token']];
        $iframe = $this->getIframePixel($camp_id);
        if (!empty($iframe)) {
            $response['pixel'] = $iframe->iframe_content;
        }
        return $response;
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
     * @param $camp_id
     * @return mixed
     */
    protected function getIframePixel($camp_id) {
        return PixelIframe::select('iframe_content')->where('campaign_id', '=', "{$camp_id}")->first();
    }

    /**
     * @return null
     */
    public function getLoginToken() {
        return $this->login_token;
    }

}