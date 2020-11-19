<?php

namespace App\Http\Networks;

use App\Offer;
use GuzzleHttp\Client;

class SupremeMedia extends NetworkFactory {

    private $create_lead_url = "https://api.rhkoco.com/v2/affiliates/lead/create";

    /**
     * @param array $params
     * @param $network
     * @return array|false|string
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function prepareData(array $params, $network) {
        if (!isset($params['offer_id'])) {
            return ['status' => false, 'msg' => 'No offer id supplied'];
        }
        $offer = $this->getOffer($params['offer_id']);
        $data = [
            'firstname' => $params['first_name'], 'lastname' => $params['last_name'], 'email' => $params['email'],
            'password' => $params['password'], 'phone' => $params['prefix'] . $params['phone'], 'ip' => $params['ip'],
            'country_code' => $params['country'], $offer->offer_token => $offer->offer_token_value,
            'aff_sub' => $params['unique_id']
        ];
        return $this->registerLead($data, $this->create_lead_url, $params['unique_id'], $params['campaign_id'], $network->T);
    }

}