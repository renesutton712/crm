<?php

namespace App\Http\Controllers;

use App\Campaign;
use App\CampaignSetting;
use App\Country;
use App\Http\Networks;
use App\Lead;
use App\Network;
use App\PixelGroup;
use App\RotatorGroup;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class FormController extends Controller {

    /**
     * @param Request $request
     * @return string
     */
    public function click(Request $request) {
        $ci = filter_var(strip_tags($request->input('ci')), FILTER_SANITIZE_STRING);
        $ri = filter_var(strip_tags($request->input('ri')), FILTER_SANITIZE_STRING);
        $client_ip = filter_var(strip_tags($request->input('client_ip')), FILTER_SANITIZE_STRING);
        if (!isset($ci) || empty($ci)) {
            return base64_encode(json_encode(['status' => false, 'msg' => 'Campaign not found!']));
        }
        $campaign_settings = $this->getCampaignSettings($ci);

        try {
            $referrer = $_SERVER['HTTP_REFERER'];
            $host = $_SERVER['REMOTE_ADDR'];
            $unique_id = $this->v4();
            $ua = $request->input('ua');
            $url_params = json_encode($request->input('url_params'));
//            $ip = empty($client_ip) ? $_SERVER['REMOTE_ADDR'] : $client_ip;
            $ip = $client_ip;
            $model = new Lead();
            $model->unique_id = $unique_id;
            $model->campaign_id = $ci;
            $model->rotator_id = $ri;
            $model->offer_id = (int)$request->input('oi');
            $model->ua = $ua;
            $model->ip = $ip;
            $model->url_params = $url_params;
            $model->host = $host;
            $model->referrer = $referrer;
            $model->status = 1;
            $model->save();
            $click_data = Lead::latest()->first();
            return base64_encode(json_encode([
                'unique_id' => $click_data['unique_id'],
                'ri' => $click_data['rotator_id'],
                'oi' => $click_data['offer_id'],
                'ci' => $click_data['campaign_id'],
                'settings' => $campaign_settings->attributesToArray()
            ]));
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * @param Request $request
     * @return false|string
     */
    public function lead(Request $request) {
        $phone_arr = explode(" ", $request->input('phone'), 2);
        if (is_array($phone_arr) && !isset($phone_arr[1])) {
            return json_encode(['status' => false, 'msg' => 'Phone field is required']);
        }
        $unique_id = filter_var(strip_tags($request->input('user')), FILTER_SANITIZE_STRING);
        $fn = filter_var(strip_tags($request->input('fn')), FILTER_SANITIZE_STRING);
        $ln = filter_var(strip_tags($request->input('ln')), FILTER_SANITIZE_STRING);
        $email = filter_var(strip_tags($request->input('email')), FILTER_SANITIZE_URL);
        $country = filter_var(strip_tags($request->input('country')), FILTER_SANITIZE_STRING);
        $prefix = filter_var(strip_tags($phone_arr[0]), FILTER_SANITIZE_STRING);
        $phone = filter_var(strip_tags(str_replace(' ', '', $phone_arr[1])), FILTER_SANITIZE_STRING);
        $pwd = filter_var(strip_tags($request->input('pwd')), FILTER_SANITIZE_STRING);
        $ci = filter_var(strip_tags($request->input('ci')), FILTER_SANITIZE_STRING);
        $ri = filter_var(strip_tags($request->input('ri')), FILTER_SANITIZE_STRING);

        if (empty($ci)) {
            $this->storeErrorMsg($unique_id, 'Missing campaign ID');
            return json_encode(['status' => false, 'Missing Campaign']);
        }

        if (empty($fn) || empty($ln) || empty($email) || empty($country) || empty($prefix) || empty($phone) || empty($pwd)) {
            $this->storeErrorMsg($unique_id, 'Empty form field error');
            return json_encode(['status' => false, 'Please fill all required fields']);
        }

        $network = $this->setRotator($ci, $ri, $unique_id);

        $model = Lead::updateOrCreate(
            ['unique_id' => $unique_id],
            [
                'country' => $country, 'network_id' => $network->network_id, 'email' => $email, 'first_name' => $fn,
                'last_name' => $ln,
                'prefix' => $prefix, 'phone' => $phone,
                'password' => $pwd, 'status' => 2
            ]
        );
        if (!isset($network->network_id) || !is_int($network->network_id)) {
            $this->storeErrorMsg($unique_id, 'Unable to connect network');
            return json_encode(['status' => false, 'msg' => 'An error has occurred, please try again later']);
        }
        $lead_data = $model::latest()->first();
        $pixel_res = $this->sendPixel($lead_data, $ci);
        if (isset($pixel_res['status']) && !$pixel_res['status']) {
            return json_encode(['status' => false, 'msg' => "{$pixel_res['msg']}"]);
        }
        return $this->getNetwork($network, $lead_data);
    }

    /**
     * @param null $ci
     * @param null $ri
     * @param null $unique_id
     * @return bool | integer
     */
    protected function setRotator($ci = null, $ri = null, $unique_id = null) {
        if (is_null($ci) || is_null($ri)) {
            return false;
        }
        $rotator_network = '';
        $networks = RotatorGroup::rotatorWithNetworkToken($ri);
        $leads_sum = Lead::where('campaign_id', '=', $ci)->where('status', '=', '2')->count();
        foreach ($networks as $network) {
            $network_leads_amount = Lead::where('network_id', '=', $network->network_id)->where('status', '=', '2')->count();
            if ($network_leads_amount <= ceil(($network->weight / 100) * $leads_sum)) {
                $this->updatedLeadWithSelectedNetwork($unique_id, $network->id);
                $rotator_network = $network;
                break;
            }
        }

        return $rotator_network;
    }

    protected function updatedLeadWithSelectedNetwork($unique_id, $network_id) {
        $lead = Lead::where('unique_id', '=', $unique_id)->first();
        $lead->network_id = $network_id;
        if (!$lead->save()) {
            return false;
        };
        return true;
    }

    /**
     * @param $network
     * @param $lead_params
     * @return bool
     */
    protected function getNetwork($network, $lead_params) {
        if (is_null($network->network_id) || empty($network->network_id)) {
            return false;
        }
        $params_arr = $lead_params->attributesToArray();
        $country_name = $this->getFullCountryName($params_arr['country']);
        if (empty($country_name)) {
            return json_encode(['status' => false, 'msg' => 'country is missing!']);
        }
        $params_arr['country_full'] = $country_name->country_name;
        $network_map = new Networks();

        return $network_map->networksMap($network, $params_arr);
    }

    protected function getCampaignSettings($ci) {
        return CampaignSetting::select('first_name', 'last_name', 'country', 'phone', 'email', 'password')->where('campaign_id', '=', $ci)->first();
    }

    protected static function v4() {
        return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',

            // 32 bits for "time_low"
            mt_rand(0, 0xffff), mt_rand(0, 0xffff),

            // 16 bits for "time_mid"
            mt_rand(0, 0xffff),

            // 16 bits for "time_hi_and_version",
            // four most significant bits holds version number 4
            mt_rand(0, 0x0fff) | 0x4000,

            // 16 bits, 8 bits for "clk_seq_hi_res",
            // 8 bits for "clk_seq_low",
            // two most significant bits holds zero and one for variant DCE1.1
            mt_rand(0, 0x3fff) | 0x8000,

            // 48 bits for "node"
            mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
        );
    }

    protected function getFullCountryName($country_iso) {
        return Country::where('country_iso_code', '=', $country_iso)->first();
    }

    /**
     * @param $unique_id
     * @param $msg
     * @return bool
     */
    protected function storeErrorMsg($unique_id, $msg) {

        $model = Lead::where('unique_id', '=', $unique_id)->first();
        $model->network_response = $msg;
        if (!$model->save()) {
            return false;
        }
        return true;
    }

    /**
     * @param $lead_data
     * @param $ci
     * @return array|\Illuminate\Http\JsonResponse|string
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    private function sendPixel($lead_data, $ci) {
        $lead_url_params = json_decode($lead_data->url_params, true);
        if (!isset($lead_url_params['cid'])) {
            $this->storeErrorMsg($lead_data->unique_id, 'No cid in url params');
            return ['status' => false, 'msg' => 'Missing cid'];
        }
        $camp = Campaign::where('id', '=', "{$ci}")->first();
        $pixel = PixelGroup::where('pixel_id', '=', "{$camp->pixel_id}")->where('type', '=', 'Lead')->first();
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
