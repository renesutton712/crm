<?php

namespace App\Http\Controllers;

use App\Lead;
use App\Postback;
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
        return json_encode(['status' => true, 'msg' => 'Saved!']);
        //Pixel URL: https://postbackspixel.info/api/postback/event/{unique_id}/{payout}
        /**
         *  Pixel is get request set with our unique_id as mandatory pretty url parameter
         *  for example: https://leadscrm/api/postback/event/{unique_id}
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
}
