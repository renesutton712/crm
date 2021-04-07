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
}