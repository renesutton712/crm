<?php

namespace App\Http\Controllers;

use App\Campaign;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CampaignsController extends Controller {

    public function get() {
//        return Campaign::all();
        return Campaign::getCampaignWithNetworksAndOffers();
    }

    public function store(Request $request) {
        $user = Auth::user();
        $user_id = $user->id;
        $ci = filter_var(strip_tags($request->input('ci')), FILTER_SANITIZE_NUMBER_INT);
        $campaign_name = filter_var(strip_tags($request->input('campaign_name'), FILTER_SANITIZE_STRING));
        $offer_id = filter_var(strip_tags($request->input('offer_id'), FILTER_SANITIZE_STRING));
        $rotator_id = filter_var(strip_tags($request->input('rotator_id'), FILTER_SANITIZE_STRING));
        $platform = filter_var(strip_tags($request->input('platform'), FILTER_SANITIZE_STRING));
        $model = Campaign::updateOrCreate(
            ['id' => $ci],
            [
                'campaign_name' => $campaign_name, 'user_id' => $user_id, 'offer_id' => $offer_id, 'rotator_id' => $rotator_id,
                'platform' => $platform, 'status' => 2
            ]
        );
        return $model->wasRecentlyCreated || $model->wasChanged();
    }

    public function getCampaign($id) {
        $ci = filter_var(strip_tags($id), FILTER_SANITIZE_STRING);
        return Campaign::where('id', '=', $ci)->get();
    }

    public function alterCampaign(Request $request) {
        $campaigns = $request->input('campaigns');
        $status = filter_var(strip_tags($request->input('status')), FILTER_SANITIZE_STRING);
        if (!isset($campaigns) || empty($campaigns)) {
            return json_encode(['status' => false, 'msg' => 'No campaigns selected']);
        }
        foreach ($campaigns as $campaign) {
            Campaign::where('id', '=', $campaign['id'])->update(['status' => (int)$status]);
        }
        return json_encode(['status' => true]);
    }

}
