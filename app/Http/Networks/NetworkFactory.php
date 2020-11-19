<?php

namespace App\Http\Networks;

use App\Campaign;
use App\Lead;
use App\Pixel;
use App\PixelGroup;
use App\PixelIframe;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

abstract class NetworkFactory {

    private $login_token = null;

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

    /**
     * @param $unique_id
     * @return array|\Illuminate\Http\JsonResponse|string
     * @throws GuzzleException
     */
    private function sendPixel($unique_id) {
        $lead_data = Lead::where('unique_id', '=', "{$unique_id}")->first();
        $lead_url_params = json_decode($lead_data->url_params, true);
        $camp = Pixel::where('campaign_id', '=', "{$lead_data->campaign_id}")->first();
        if (empty($camp)) {
            return ['status' => false, 'msg' => 'No campaign found'];
        }
        $pixel = PixelGroup::where('pixel_id', '=', "{$camp->id}")->where('type', '=', 'Lead')->first();
        if (empty($pixel)) {
            return ['status' => false, 'msg' => 'No posback found'];
        }
        $pixel = $pixel->url;
        $fire = str_replace('{cid}', $lead_url_params['cid'], $pixel);
        $client = new Client();
        $res = $client->request('GET', $fire);
        if ($res->getStatusCode() === 200) {
            return $res->getBody()->getContents();
        }
        return response()->json(['message' => 'Not found!'], 404);
    }

}