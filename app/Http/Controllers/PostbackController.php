<?php

namespace App\Http\Controllers;

use App\Campaign;
use App\Lead;
use App\Pixel;
use App\PixelGroup;
use App\Postback;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class PostbackController extends Controller {

    public function get() {
//        return Postback::with(['network'])->get();
        return Postback::postbackWithNetworkAndLeads();
    }

    /**
     * @param null $unique_id
     * @param null $payout
     * @return false|string
     */
    public function store($unique_id = null, $payout = null) {
        if (is_null($unique_id) || empty($unique_id)) {
            return json_encode(['status' => false, 'msg' => 'Missing user id']);
        }
        $unique_id = filter_var(strip_tags($unique_id), FILTER_SANITIZE_STRING);
        if (is_null($payout) || empty($payout)) {
            return json_encode(['status' => false, 'msg' => 'Payout is missing']);
        }
        $payout = filter_var(strip_tags($payout), FILTER_SANITIZE_STRING);
        $unique_id = filter_var(strip_tags($unique_id), FILTER_SANITIZE_STRING);
        $existing_unique = $this->findUniqueId($unique_id);
        if (!$existing_unique) {
            return json_encode(['status' => false, 'msg' => 'No user found!']);
        }
        if (!isset($existing_unique->network_id)) {
            return json_encode(['status' => false, 'msg' => 'unique_id not registered as lead']);
        }
        if (!isset($existing_unique->unique_id)) {
            return json_encode(['status' => false, 'msg' => 'User not found!']);
        }
        $model = new Postback();
        $model->unique_id = $existing_unique->unique_id;
        $model->network_id = $existing_unique->network_id;
        $model->payout = $payout;
        $model->event = 'FTD';
        if (!$model->save()) {
            return json_encode(['status' => false, 'msg' => 'Error while saving!']);
        }
        $lead = Lead::where('unique_id', '=', $existing_unique->unique_id)->firstOrFail();
        $lead->status = 3;
        $lead->save();
        $this->sendFTD($lead, $payout);
        return json_encode(['status' => true, 'msg' => 'Saved!']);
        //Pixel URL: https://postbackspixel.info/api/postback/event/{unique_id}/{payout}
        /**
         *  Pixel is get request set with our unique_id as mandatory pretty url parameter
         *  and the payout of the FTD mandatory as well.
         *  for example: https://postbackspixel.info/api/postback/event/{unique_id}/{payout}
         */
    }

    /**
     * @param null $unique_id
     * @return bool
     */
    protected function findUniqueId($unique_id = null) {
        if (is_null($unique_id)) {
            return false;
        }
        $lead = Lead::where('unique_id', '=', $unique_id)->first();
        if (empty($lead)) {
            return false;
        }
        return $lead;
    }

    /**
     * @param $lead_data
     * @param $payout
     * @return array|\Illuminate\Http\JsonResponse|string
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    private function sendFTD($lead_data, $payout) {
        $lead_url_params = json_decode($lead_data->url_params, true);
        $camp = Pixel::where('campaign_id', '=', $lead_data->campaign_id)->first();
        $pixel = PixelGroup::where('pixel_id', '=', "{$camp->id}")->where('type', '=', 'FTD')->first();
        $pixel = $pixel->url;
        $fire = str_replace('{cid}', $lead_url_params['cid'], $pixel);
        $fire = str_replace('{payout}', $payout, $fire);
        $client = new Client();
        $res = $client->request('GET', $fire);
        if ($res->getStatusCode() === 200) {
            return $res->getBody()->getContents();
        }
        return response()->json(['message' => 'Not found!'], 404);
    }

}
