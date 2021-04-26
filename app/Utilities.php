<?php

namespace App;

class Utilities {

    /**
     * @param $country_iso
     * @return mixed
     */
    public static function getFullCountryName($country_iso) {
        return Country::where('country_iso_code', '=', $country_iso)->first();
    }

    public static function parseURLParamsToArr($unique_id) {
        $lead_data = Lead::where('unique_id', '=', "{$unique_id}")->first();
        return json_decode($lead_data->url_params, true);
    }

}