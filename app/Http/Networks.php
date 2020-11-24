<?php

namespace App\Http;

use App\Campaign;
use App\Http\Networks\COD;
use App\Http\Networks\Convertick;
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
            case 11:
                $supreme = new SupremeMedia();
                return $supreme->prepareData($params, $network);
                break;
            case 6:
                $trafficon = new Trafficon();
                return $trafficon->sendLead($params, $network);
                break;
            case 12:
            case 9:
                $convertick = new Convertick();
                return $convertick->prepareData($params, $network);
                break;
            default:
                return json_encode(['status' => true, 'msg' => 'https://www.google.com']);
                break;
        }
    }
}