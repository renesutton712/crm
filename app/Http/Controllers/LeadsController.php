<?php

namespace App\Http\Controllers;

use App\Lead;
use Illuminate\Http\Request;

class LeadsController extends Controller {

    public function get(Request $request) {
        $network_id = filter_var(strip_tags($request->input('network_id')), FILTER_SANITIZE_STRING);
        $campaign_id = filter_var(strip_tags($request->input('campaign_id')), FILTER_SANITIZE_STRING);
        $rotator_id = filter_var(strip_tags($request->input('rotator_id')), FILTER_SANITIZE_STRING);
        $country_id = filter_var(strip_tags($request->input('country_id')), FILTER_SANITIZE_STRING);
        $type = filter_var(strip_tags($request->input('type')), FILTER_SANITIZE_STRING);
        $data = Lead::leadsWithAllRelations();
        $filters = [
            'network_id' => $network_id,
            'campaign_id' => $campaign_id,
            'rotator_id' => $rotator_id,
            'country_id' => $country_id,
            'type' => $type,
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
            $output[] = $item;
        }
        return $output;
    }

}
