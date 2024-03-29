<?php

namespace App\Http;

use App\Campaign;
use App\Http\Networks\AffClub;
use App\Http\Networks\Affiliate360;
use App\Http\Networks\COD;
use App\Http\Networks\Convertick;
use App\Http\Networks\ConvertingTeam;
use App\Http\Networks\DefaultNetwork;
use App\Http\Networks\ElectraHub;
use App\Http\Networks\HugeOffers2;
use App\Http\Networks\SupremeMedia;
use App\Http\Networks\Trackbox;
use App\Http\Networks\TrackboxGladioNet;
use App\Http\Networks\TrafficIsland;
use App\Http\Networks\Trafficon;
use App\Http\Networks\HugeOffers;
use App\Lead;
use App\Pixel;
use App\PixelGroup;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Facades\Log;

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
                $data = $convertick->prepareData($params, $network, "g");
                return $data;
                break;
            case 13:
            case 15:
                $affClub = new AffClub();
                return $affClub->prepareData($params, $network);
                break;
            case 17:
            case 19:
                $affiliate360 = new Affiliate360();
                return $affiliate360->prepareData($params, $network);
                break;
            case 20:
                $convertick = new Convertick();
                $data = $convertick->prepareData($params, $network, "f");
                return $data;
                break;
            case 21:
                $hugeOffers = new HugeOffers();
                $data = $hugeOffers->prepareData($params, $network);
                return $data;
                break;
            case 23:
                $trackbox = new Trackbox();
                $data = $trackbox->prepareData($params, $network);
                return $data;
                break;
            case 24:
                $hugeOffers2 = new HugeOffers2();
                $data = $hugeOffers2->prepareData($params, $network);
                return $data;
                break;
            case 25:
                $electraHub = new ElectraHub();
                $data = $electraHub->prepareData($params, $network);
                return $data;
                break;
            case 26:
                $convertingTeam = new ConvertingTeam();
                $data = $convertingTeam->prepareData($params, $network);
                return $data;
                break;
            case 27:
                $trafficIsland = new TrafficIsland();
                $data = $trafficIsland->prepareData($params, $network);
                return $data;
                break;
            case 28:
                $trackboxGladioNet = new TrackboxGladioNet();
                $data = $trackboxGladioNet->prepareData($params, $network);
                return $data;
                break;
            default:
                $default = new DefaultNetwork();
                return $default->saveLead($params['unique_id'], $params['campaign_id']);
                break;
        }
    }
}