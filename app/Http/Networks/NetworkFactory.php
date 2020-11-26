<?php

namespace App\Http\Networks;

use App\Campaign;
use App\Lead;
use App\Offer;
use App\Pixel;
use App\PixelBridge;
use App\PixelGroup;
use App\PixelIframe;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

abstract class NetworkFactory {

    private $login_token = null;

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

    protected function getOffer($offer_id) {
        if (empty($offer_id)) {
            return ['status' => false, 'msg' => 'No offer found'];
        }
        return Offer::where('offer_id', '=', "{$offer_id}")->first();
    }

    /**
     * @param $unique_id
     * @return array|\Illuminate\Http\JsonResponse|string
     * @throws GuzzleException
     */
    protected function sendPixel($unique_id) {
        $lead_data = Lead::where('unique_id', '=', "{$unique_id}")->first();
        $lead_url_params = json_decode($lead_data->url_params, true);
        if (!isset($lead_url_params['cid'])) {
            return "";
        }
        $camp = PixelBridge::where('campaign_id', '=', "{$lead_data->campaign_id}")->first();
        if (empty($camp)) {
            return ['status' => false, 'msg' => 'No campaign found'];
        }
        $pixel = PixelGroup::where('pixel_id', '=', "{$camp->pixel_id}")->where('type', '=', 'Lead')->first();
        if (empty($pixel)) {
            return ['status' => false, 'msg' => 'No postback found'];
        }
        $pixel = $pixel->url;
//        if (!isset($lead_url_params['cid'])) {
//            return "";
//        }
        $fire = str_replace('{cid}', $lead_url_params['cid'], $pixel);
        $client = new Client();
        $res = $client->request('GET', $fire);
        if ($res->getStatusCode() === 200) {
            return $res->getBody()->getContents();
        }
        return response()->json(['message' => 'Not found!'], 404);
    }

    protected function updateToLead($unique_id) {
        if (empty($unique_id)) {
            return false;
        }
        $model = Lead::where('unique_id', '=', $unique_id)->first();
        $model->network_response = "";
        $model->status = 2;
        if (!$model->save()) {
            return false;
        }
        return true;
    }

}