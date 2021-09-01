<?php

namespace App\Http\Networks;

use DateTime;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class COD extends NetworkFactory {

    private $create_lead_url = 'https://api.adcombo.com/api/v2/order/create/';
    private $api_key = "3d439aa6f8da838348b303f5f6f02d28";

    public function registerLeadGet(array $params) {
        $client = new Client();
        $args = [
            'api_key' => $this->api_key,
            'name' => $params['first_name'] . ' ' . $params['last_name'],
            'phone' => $params['prefix'] . ' ' . $params['phone'],
            'offer_id' => 'Offer id sent order from',
            'country_code' => $params['country'],
            'base_url' => 'URL, where order has been placed',
            'price' => 'price on landing page??',
            'referrer' => $params['referrer'],
            'ip' => $params['ip'],
            'ext_in_id' => $params['unique_id'],
        ];
        $res = $client->request('GET', $this->create_lead_url . '?' . http_build_query($args));
        try {
            Log::info('registerLead (COD) '. (new DateTime())->format('Y-m-d H:i:s'));
            Log::info($args);
            Log::info('response status (COD): ' . $res->getStatusCode());
        } catch (\Exception $exception) {}
        if ($res->getStatusCode() === 200) {
            return $res->getBody()->getContents();
        }
        return response()->json(['message' => 'Not found!'], 404);
    }

}