<?php

namespace App\Http\Controllers;

use App\Http\Networks;
use App\Lead;
use App\User;
use App\Utilities;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LeadsController extends Controller {

    public function get(Request $request) {
        $network_id = filter_var(strip_tags($request->input('network_id')), FILTER_SANITIZE_STRING);
        $campaign_id = filter_var(strip_tags($request->input('campaign_id')), FILTER_SANITIZE_STRING);
        $rotator_id = filter_var(strip_tags($request->input('rotator_id')), FILTER_SANITIZE_STRING);
        $country_id = filter_var(strip_tags($request->input('country_id')), FILTER_SANITIZE_STRING);
        $type = filter_var(strip_tags($request->input('type')), FILTER_SANITIZE_STRING);
        $datetime = filter_var(strip_tags($request->input('datetime')), FILTER_SANITIZE_STRING);
        $data = Lead::leadsWithAllRelations();
        $filters = [
            'network_id' => $network_id,
            'campaign_id' => $campaign_id,
            'rotator_id' => $rotator_id,
            'country_id' => $country_id,
            'type' => $type,
            'datetime' => $datetime
        ];
        return $this->filterData($data->toArray(), $filters);
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
        $network = filter_var(strip_tags($request->input('network')), FILTER_SANITIZE_STRING);
        $campaign = filter_var(strip_tags($request->input('campaign')), FILTER_SANITIZE_STRING);
        if (empty($network) or empty($campaign)) {
            return json_encode(['status' => false, 'msg' => 'All fields required']);
        }
        $clicks = Lead::where('status', '=', 1)->where('first_name', '!=', null)->get()->toArray();
        if (empty($clicks)) {
            return json_encode(['status' => false, 'msg' => 'No leads found']);
        }
        foreach ($clicks as $click) {
            $country_name = Utilities::getFullCountryName($click['country']);
            $click['country_full'] = $country_name->country_name;
            $networks = new Networks();
            $res = $networks->networksMap($network, $click);
            $res = json_decode($res);
            if (!$res->status) {
                return json_encode(['status' => false, 'msg' => $res['msg']]);
            }
        }
        return json_encode(['status' => true, 'msg' => 'All leads sent successfully']);
    }

}
