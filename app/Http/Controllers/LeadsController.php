<?php

namespace App\Http\Controllers;

use App\Http\Networks;
use App\Lead;
use App\Network;
use App\User;
use App\Utilities;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class LeadsController extends Controller {

    public function get(Request $request) {
        $network_id = filter_var(strip_tags($request->input('network_id')), FILTER_SANITIZE_STRING);
        $campaign_id = filter_var(strip_tags($request->input('campaign_id')), FILTER_SANITIZE_STRING);
        $rotator_id = filter_var(strip_tags($request->input('rotator_id')), FILTER_SANITIZE_STRING);
        $country_id = filter_var(strip_tags($request->input('country_id')), FILTER_SANITIZE_STRING);
        $type = filter_var(strip_tags($request->input('type')), FILTER_SANITIZE_STRING);
        $start_date = filter_var(strip_tags($request->input('start_date')), FILTER_SANITIZE_STRING);
        $end_date = filter_var(strip_tags($request->input('end_date')), FILTER_SANITIZE_STRING);
        $filters = [
            'network_id' => $network_id,
            'campaign_id' => $campaign_id,
            'rotator_id' => $rotator_id,
            'country_id' => $country_id,
            'start_date' => $start_date,
            'end_date' => $end_date,
            'type' => $type,
        ];
        return Lead::leadsWithAllRelations($filters);
    }

    /**
     * @param array $data
     * @param array $filters
     * @return array
     */
    protected function filterData(array $data, array $filters) {
        $output = [];
        foreach ($data as $item) {
            if ($item->country !== $filters['country_id'] && !empty($filters['country_id'])) {
                continue;
            }
            if ($item->network_id !== (int)$filters['network_id'] && !empty($filters['network_id'])) {
                continue;
            }
            if ($item->campaign_id !== (int)$filters['campaign_id'] && !empty($filters['campaign_id'])) {
                continue;
            }
            if ($item->rotator_id !== (int)$filters['rotator_id'] && !empty($filters['rotator_id'])) {
                continue;
            }
            if ($item->status !== (int)$filters['type'] && !empty($filters['type'])) {
                continue;
            }
            if (!empty($filters['datetime']) && $item->updated_at < $filters['datetime']) {
                continue;
            }
            $output[] = $item;
        }
        return $output;
    }

    public function resend(Request $request) {
//        $network = filter_var(strip_tags($request->input('network')), FILTER_SANITIZE_STRING);
//        $campaign = filter_var(strip_tags($request->input('campaign')), FILTER_SANITIZE_STRING);
        $uniqueId = filter_var(strip_tags($request->input('uniqueId')), FILTER_SANITIZE_STRING);
        $network = $request->input('network');
        $network = Network::where('id', '=', "{$network[0]["id"]}")->first();
        Log::info(json_encode($network));
        if (empty($uniqueId)) {
            return json_encode(['status' => false, 'msg' => 'All fields required']);
        }
        $click = Lead::where('unique_id', '=', $uniqueId)->first();
        if (empty($click)) {
            return json_encode(['status' => false, 'msg' => 'No leads found']);
        }


//        $country_name = Utilities::getFullCountryName($click['country']);
        $networks = new Networks();
        $res = $networks->networksMap($network, $click);
        LOG::info("Resend Lead Response");
        LOG::info($res);
        $res = json_decode($res);
        if (!$res->status) {
            return json_encode(['status' => false, 'msg' => isset($res['msg']) ?? "Lead was not accepted"]);
        } else {
            $click->status = 2;
            $click->save();
            return json_encode(['status' => true, 'msg' => "Lead accepted successfully!"]);
        }
    }

}
