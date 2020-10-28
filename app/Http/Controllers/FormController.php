<?php

namespace App\Http\Controllers;

use App\Http\Networks;
use App\Lead;
use App\Network;
use App\RotatorGroup;
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
            $host = $_SERVER['HTTP_HOST'];
            $unique_id = $this->v4();
            $ua = $request->input('ua');
            $url_params = json_encode($request->input('url_params'));
            $ip = empty($client_ip) ? $_SERVER['REMOTE_ADDR'] : $client_ip;
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
        $unique_id = filter_var(strip_tags($request->input('user')), FILTER_SANITIZE_STRING);
        $fn = filter_var(strip_tags($request->input('fn')), FILTER_SANITIZE_STRING);
        $ln = filter_var(strip_tags($request->input('ln')), FILTER_SANITIZE_STRING);
        $email = filter_var(strip_tags($request->input('email')), FILTER_SANITIZE_URL);
        $country = filter_var(strip_tags($request->input('country')), FILTER_SANITIZE_STRING);
        $phone = filter_var(strip_tags($request->input('phone')), FILTER_SANITIZE_NUMBER_INT);
        $pwd = filter_var(strip_tags($request->input('pwd')), FILTER_SANITIZE_STRING);
        $ci = filter_var(strip_tags($request->input('ci')), FILTER_SANITIZE_STRING);
        $ri = filter_var(strip_tags($request->input('ri')), FILTER_SANITIZE_STRING);

        $network_id = $this->setRotator($ci, $ri, $unique_id);

        $model = Lead::updateOrCreate(
            ['unique_id' => $unique_id],
            [
                'country' => $country, 'network_id' => $network_id, 'email' => $email, 'first_name' => $fn, 'last_name' => $ln,
                'phone' => $phone,
                'password' => $pwd, 'status' => 2
            ]
        );

        if (!$network_id || !is_int($network_id)) {
            return json_encode(['status' => false, 'msg' => 'An error has occurred, please try again later']);
        }

        $network = $this->getNetwork($network_id, $model::latest()->first());
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
        $networks = RotatorGroup::where('rotator_id', '=', $ri)->get()->all();
        $leads_sum = Lead::where('campaign_id', '=', $ci)->where('status', '=', '2')->count();
        foreach ($networks as $network) {
            $network_leads_amount = Lead::where('network_id', '=', $network->network_id)->where('status', '=', '2')->count();
            if ($network_leads_amount < ceil(($network->weight / 100) * $leads_sum)) {
                $this->updatedLeadWithSelectedNetwork($unique_id, $network->id);
                $rotator_network = $network;
                break;
            }
        }

        return $rotator_network->network_id;
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
     * @param null $network_id
     * @param $lead_params
     * @return bool
     */
    protected function getNetwork($network_id, $lead_params) {
        if (is_null($network_id) || empty($network_id)) {
            return false;
        }
        $network = new Networks();
        return $network->networksMap($network_id, $lead_params);
    }

    protected function getCampaignSettings($ci) {
        
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

}
