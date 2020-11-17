<?php

namespace App\Http;

use App\Campaign;
use App\Http\Networks\COD;
use App\Http\Networks\SupremeMedia;
use App\Http\Networks\Trafficon;
use App\Lead;
use App\Pixel;
use App\PixelGroup;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class Networks {

    public function networksMap($network, $params) {
        switch ($network->network_id) {
            case 1:
                $cod = new COD();
                return $cod->registerLeadGet($params);
                break;
            case 2:
            case 3:
            case 4:
            case 5:
                $supreme = new SupremeMedia();
                return $supreme->prepareData($params, $network);
                break;
            case 6:
                $trafficon = new Trafficon();
                return $trafficon->sendLead($params, $network);
                break;
            default:
                return json_encode(['status' => true, 'msg' => 'https://www.google.com']);
                break;
        }
    }

//    private function COD(array $params) {
//        $client = new Client();
//        self::setUrl('https://api.adcombo.com/api/v2/order/create/');
//        $api_key = "3d439aa6f8da838348b303f5f6f02d28";
//        $args = [
//            'api_key' => $api_key,
//            'name' => $params['first_name'] . ' ' . $params['last_name'],
//            'phone' => $params['prefix'] . ' ' . $params['phone'],
//            'offer_id' => 'Offer id sent order from',
//            'country_code' => $params['country'],
//            'base_url' => 'URL, where order has been placed',
//            'price' => 'price on landing page??',
//            'referrer' => $params['referrer'],
//            'ip' => $params['ip'],
//            'ext_in_id' => $params['unique_id'],
//        ];
//        $res = $client->request('GET', self::getUrl() . '?' . http_build_query($args));
//        if ($res->getStatusCode() === 200) {
//            return $res->getBody()->getContents();
//        }
//        return response()->json(['message' => 'Not found!'], 404);
//    }
}