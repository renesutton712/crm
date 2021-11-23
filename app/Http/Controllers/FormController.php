<?php

namespace App\Http\Controllers;

use App\Campaign;
use App\CampaignSetting;
use App\Country;
use App\FormLang;
use App\Http\Networks;
use App\Lead;
use App\NetworkToken;
use App\Offer;
use App\RotatorGroup;
use DateTime;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FormController extends Controller {

    /**
     * @param Request $request
     * @return string
     */
    public function click(Request $request) {
        $ci = filter_var(strip_tags($request->input('ci')), FILTER_SANITIZE_STRING);
        $ri = filter_var(strip_tags($request->input('ri')), FILTER_SANITIZE_STRING);
        $oi = filter_var(strip_tags($request->input('oi')), FILTER_SANITIZE_STRING);
        $country = filter_var(strip_tags($request->input('client_country')), FILTER_SANITIZE_STRING);
        $client_ip = filter_var(strip_tags($request->input('client_ip')), FILTER_SANITIZE_STRING);
        if (!isset($ci) || empty($ci)) {
//            return base64_encode(json_encode(['status' => false, 'msg' => 'Campaign not found!']));
//            $this->setDefaultCampaign();
            /**
             * Debug
             */
//            $ci = 39;
//            $oi = 'XafmZBhL';

            /**
             *  Production:
             */

            $ci = 13;
            $oi = 'Qt1deCvL';
        }
        $campaign_settings = $this->getCampaignSettings($ci);
        $lang = $this->getCampaignLang($ci);
        try {
            $referrer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
            $host = $_SERVER['REMOTE_ADDR'];
            $unique_id = $this->v4();
            $ua = $request->input('ua');
            $url_params = json_encode($request->input('url_params'));
            $ip = $client_ip;
            $model = new Lead();
            $model->unique_id = $unique_id;
            $model->campaign_id = $ci;
            $model->rotator_id = $ri;
            $model->offer_id = $oi;
            $model->country = $country;
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
                'settings' => $campaign_settings->attributesToArray(),
                'lang' => $lang
            ]));
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * @param Request $request
     */
    public function log(Request $request) {
        $logMessage = $request->input('message');
        if(!empty($logMessage)) {
            Log::info('frontEnd (_formobf.js) '. (new DateTime())->format('Y-m-d H:i:s'));
            Log::info($logMessage);
            return new JsonResponse(true);
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
        if(!$unique_id) {
            $unique_id = filter_var(strip_tags($request->input('unique_id')), FILTER_SANITIZE_STRING);
        }
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
            /**
             * DEBUG!!!
             */
//            $ci = 39;
            /**
             * Production
             */
            $ci = 13;

//            $this->storeErrorMsg($unique_id, 'Missing campaign ID');
//            return json_encode(['status' => false, 'msg' => 'Missing Campaign']);
        }

        if (empty($fn) || empty($ln) || empty($email) || empty($country) || empty($prefix) || empty($phone) || empty($pwd)) {
            $this->storeErrorMsg($unique_id, 'Empty form field error');
            return json_encode(['status' => false, 'msg' => 'Please fill all required fields']);
        }

        $network = $this->setRotator($ci, $ri, $unique_id);
        if (empty($network)) {
            return json_encode(['status' => false, 'msg' => 'No network found']);
        }
        $model = Lead::updateOrCreate(
            ['unique_id' => $unique_id],
            [
                'country' => $country, 'network_id' => $network->network_id, 'email' => $email, 'first_name' => $fn,
                'last_name' => $ln,
                'prefix' => $prefix, 'phone' => $phone,
                'password' => $pwd, 'status' => 1
            ]
        );
        if (!isset($network->network_id) || !is_int($network->network_id)) {
            $this->storeErrorMsg($unique_id, 'Unable to connect network');
            return json_encode(['status' => false, 'msg' => 'An error has occurred, please try again later']);
        }
        $lead_data = $model::where('unique_id', '=', $unique_id)->first()->toArray();
//        $lead_data = $model::latest()->first();
        return $this->getNetwork($network, $lead_data);
    }

    /**
     * @param Request $request
     * @return false|string
     */
    public function getLang(Request $request) {
        /**
         * Error here can happen only if someone altered the value of the lang cookie
         */
        $lang = filter_var(strip_tags($request->input('lang')), FILTER_SANITIZE_STRING);
        if (empty($lang)) {
            return json_encode(['status' => false, 'msg' => 'Nope!']);
        }
        try {
            $lang = FormLang::select('lang', 'first_name', 'last_name', 'country', 'phone', 'email', 'password', 'submit_btn')->where('lang', '=', "{$lang}")->first();
            if (empty($lang)) {
                throw new \Exception('en');
            }
            return $lang->toArray();
        } catch (\Exception $e) {
            return json_encode(['status' => false, 'msg' => 'language unable']);
        }
    }

    /**
     * @param null $ci
     * @param null $ri
     * @param null $unique_id
     * @return bool|mixed|string
     */
    protected function setRotator($ci = null, $ri = null, $unique_id = null) {
        if (is_null($ci) || is_null($ri)) {
            return false;
        }
        $rotator_offers = '';
        if ($ri === 'null' || $ri == 0) {
            Log::info($unique_id. (new DateTime())->format('Y-m-d H:i:s'));
            $byOffer = Lead::where('unique_id', '=', $unique_id)->first();
            $networkByOffer = Offer::where('offer_id', '=', "{$byOffer->offer_id}")->first();
            $tokens = NetworkToken::where('network_id', '=', "{$networkByOffer->network_id}")->first()->toArray();
            $networkByOffer['TN'] = $tokens['token_name'];
            $networkByOffer['T'] = $tokens['token'];
            $this->updatedLeadWithSelectedNetwork($unique_id, $networkByOffer->network_id);
            return $networkByOffer;
        }
        $offers = RotatorGroup::rotatorWithNetworkToken($ri);
        $leads_sum = Lead::where('campaign_id', '=', $ci)->where('status', '=', '2')->count();
        foreach ($offers as $offer) {
            $offer_leads_amount = Lead::where('campaign_id', '=', $ci)->where('offer_id', '=', $offer->offer_id)->where('status', '=', '2')->count();
            if ($offer_leads_amount <= ceil(($offer->weight / 100) * $leads_sum)) {
                $this->updatedLeadWithSelectedNetwork($unique_id, $offer->network_id);
                $rotator_offers = $offer;
                break;
            }
        }

        return $rotator_offers;
    }

    /**
     * @param $unique_id
     * @param $network_id
     * @return bool
     */
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
//        $params_arr = $lead_params->attributesToArray();
        $country_name = $this->getFullCountryName($lead_params['country']);
        if (empty($country_name)) {
            return json_encode(['status' => false, 'msg' => 'country is missing!']);
        }
        $lead_params['country_full'] = $country_name->country_name;
        $network_map = new Networks();

        return $network_map->networksMap($network, $lead_params);
    }

    /**
     * @param $ci
     * @return mixed
     */
    protected function getCampaignSettings($ci) {
        return CampaignSetting::select('first_name', 'last_name', 'country', 'phone', 'email', 'password')->where('campaign_id', '=', $ci)->first();
    }

    /**
     * @param $ci
     * @return string
     */
    protected function getCampaignLang($ci)
    {
        $camp_lang = Campaign::select('lang_id')->where('id', '=', "{$ci}")->first();
        if (!empty($camp_lang)) {
            if (is_null($camp_lang->lang_id)) {
                return "";
            }
        } else {
            return "";
        }

        return FormLang::select('lang', 'first_name', 'last_name', 'country', 'phone', 'email', 'password', 'submit_btn')->where('id', '=', "{$camp_lang->lang_id}")->first()->toArray();
    }

    /**
     * @return string
     */
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

    /**
     * @param $country_iso
     * @return mixed
     */
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

}
