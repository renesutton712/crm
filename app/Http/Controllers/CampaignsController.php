<?php

namespace App\Http\Controllers;

use App\Campaign;
use App\CampaignSetting;
use App\Pixel;
use App\PixelIframe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CampaignsController extends Controller {

    public function get() {
        return Campaign::getCampaignWithRelations();
    }

    public function store(Request $request) {
        $user = Auth::user();
        $user_id = $user->id;
        $updatePixelRes = '';
        $ci = filter_var(strip_tags($request->input('ci')), FILTER_SANITIZE_NUMBER_INT);
        $campaign_name = filter_var(strip_tags($request->input('campaign_name'), FILTER_SANITIZE_STRING));
        $pixel_id = filter_var(strip_tags($request->input('pixel_id'), FILTER_SANITIZE_STRING));
        $iframe_id = filter_var(strip_tags($request->input('iframe_id')), FILTER_SANITIZE_STRING);
        $rotator_id = filter_var(strip_tags($request->input('rotator_id'), FILTER_SANITIZE_STRING));
        $offer_id = filter_var(strip_tags($request->input('offer_id'), FILTER_SANITIZE_STRING));
        $lang = filter_var(strip_tags($request->input('lang'), FILTER_SANITIZE_STRING));
        $platform = filter_var(strip_tags($request->input('platform_id'), FILTER_SANITIZE_STRING));
        DB::beginTransaction();
        try {
            $model = Campaign::updateOrCreate(
                ['id' => $ci],
                [
                    'campaign_name' => $campaign_name, 'user_id' => $user_id, 'pixel_id' => $pixel_id,
                    'iframe_id' => $iframe_id, 'offer_id' => $offer_id, 'rotator_id' => $rotator_id, 'platform' => $platform,
                    'lang_id' => $lang, 'status' => 2
                ]
            );
            $newOrEdit = $model->wasRecentlyCreated || $model->wasChanged();
            if (!$newOrEdit) {
                throw new \Exception('Please update campaign name');
            }
            $ci = !$model->wasRecentlyCreated ? $ci : Campaign::latest()->first();
            if (!empty($pixel_id)) {
                $updatePixelRes = $this->updatePixelModel($ci, Pixel::find($pixel_id));
            }
            if (!empty($updatePixelRes) && !$updatePixelRes) {
                throw new \Exception('Unable to associate campaign to pixel');
            }
            if (!empty($iframe_id)) {
                $updatePixelRes = $this->updatePixelModel($ci, PixelIframe::find($iframe_id));
            }
            if (!empty($updatePixelRes && !$updatePixelRes)) {
                throw new \Exception('Unable to associate campaign to pixel');
            }
            $campaign_settings = $request->input('settings');
            $settings = $this->storeCampaignFormSettings($ci, $campaign_settings);
            if (is_bool($settings) && !$settings) {
                throw new \Exception('Error while saving form settings');
            }
            DB::commit();
            return json_encode(['status' => true]);
        } catch (\Exception $e) {
            DB::rollBack();
            return json_encode(['status' => false, 'msg' => $e->getMessage()]);
        }
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

    /**
     * @param $ci
     * @param $form_settings
     * @return bool
     */
    protected function storeCampaignFormSettings($ci, $form_settings) {
        if (empty($form_settings)) {
            return false;
        }
        if (isset($ci->id)) {
            $ci = $ci->id;
        }
        foreach ($form_settings as $key => $item) {
            $form_settings[$key] = !$item ? 2 : 1;
        }
        $model = CampaignSetting::updateOrCreate(
            ['campaign_id' => $ci],
            [
                'campaign_id' => $ci, 'first_name' => $form_settings['first_name'],
                'last_name' => $form_settings['last_name'],
                'country' => $form_settings['country'], 'phone' => $form_settings['phone'], 'email' => $form_settings['email'],
                'password' => $form_settings['password']
            ]
        );
        return $model->wasRecentlyCreated || $model->wasChanged();
    }

    /**
     * @param $ci
     * @param null $pixel_model
     * @return bool
     */
    protected function updatePixelModel($ci, $pixel_model = null) {
        if (is_null($pixel_model)) {
            return false;
        }
        if (empty($ci)) {
            return false;
        }
        $pixel_model->campaign_id = isset($ci->id) ? $ci->id : $ci;
        if (!$pixel_model->save()) {
            return false;
        }
        return true;
    }

}
