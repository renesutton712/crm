<?php

namespace App\Http;

use App\Campaign;
use App\Http\Networks\AffClub;
use App\Http\Networks\COD;
use App\Http\Networks\Convertick;
use App\Http\Networks\DefaultNetwork;
use App\Http\Networks\SupremeMedia;
use App\Http\Networks\Trafficon;
use App\Lead;
use App\Pixel;
use App\PixelGroup;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class Networks {

    public function networksMap($network, $params) {
//        $network_id = $network instanceof \stdClass ? (int)$network->network_id : (int)$network;
        switch ($network->network_id) {
            case 7:
                $cod = new COD();
                return $cod->registerLeadGet($params);
                break;
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 14:
                $supreme = new SupremeMedia();
                return $supreme->prepareData($params, $network);
                break;
            case 6:
            case 11:
            case 12:
                $trafficon = new Trafficon();
                return $trafficon->sendLead($params, $network);
                break;
            case 9:
                $convertick = new Convertick();
                return $convertick->prepareData($params, $network);
                break;
            case 13:
                $affClub = new AffClub();
                return $affClub->prepareData($params, $network);
                break;
            default:
                $default = new DefaultNetwork();
                return $default->saveLead($params['unique_id'], $params['campaign_id']);
                break;
        }
    }
}