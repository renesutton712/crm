<?php

namespace App\Http\Networks;

use App\Lead;
use GuzzleHttp\Client;

class Trafficon extends NetworkFactory {

    private $register_url = "https://trafficon-api.com/secured-registration";
    private $login_url = "http://affreport.trafficon.co/api/affiliate/login";
    private $pull_leads_url = "http://affreport.trafficon.co/api/lead/get/";
    private $username = "cactusmedia";
    private $password = "Ag5322fa2a";

    private $login_token = null;

    /**
     * @return null
     */
    public function getLoginToken() {
        return $this->login_token;
    }

    /**
     * @param null $login_token
     */
    public function setLoginToken($login_token): void {
        $this->login_token = $login_token;
    }

    /**
     * @var null
     */
    protected $aff_id = null;
    /**
     * @var null
     */
    protected $offer_id = null;

    /**
     * @return null
     */
    public function getOfferId() {
        return $this->offer_id;
    }

    /**
     * @param null $offer_id
     */
    public function setOfferId($offer_id): void {
        $this->offer_id = $offer_id;
    }

    /**
     * @return null
     */
    public function getAffId() {
        return $this->aff_id;
    }

    /**
     * @param null $aff_id
     */
    public function setAffId($aff_id): void {
        $this->aff_id = $aff_id;
    }

//    public function __construct($params) {
//        $this->setAffId($params['aff_id']);
//        $this->setOfferId($params['offer_id']);
//        if (is_null($this->getAffId()) || is_null($this->getOfferId())) {
//            return json_encode(['status' => false, 'msg' => 'Missing required network params!']);
//        }
//    }

//    /**
//     * @param array $params
//     * @return \Illuminate\Http\JsonResponse|string
//     * @throws \GuzzleHttp\Exception\GuzzleException
//     */
//    protected function registerLead(array $params) {
////        Example response:
////        ref_link: "https://yuan-pay-newapp.com/api/v1/secured-auto-login/"
////        status: "success"
////        tid: "1026f80704573cc14277fa86a39243"
////        token: "YXR4U3h3L2diVDZpZHBWZU5HUzVrdWhnQ0RKZzFFSXFoekZwTGpOTGdMYlVTR0FQR1JOdnRBejJHVGF6WlVVSjJhbnVMV2pvUmRRdVdEZURSQkVrc2IxWWYvdXgyVkNpbHhnVEdielR0d3M9"
////        ref_link: "https://yuan-pay-newapp.com/api/v1/secured-auto-login/"
////        status: "success"
////        tid: "1023bd82d2205aa9e917f70964c4d9"
////        token: "NlhKYjVkUmp5K3h1a2JIdHBvdnJ4L2dndklualVwOW1HMXN1WUxCK0xHMEVSeWEyQjlESWl5Szh5eXhLV3FUbHd0NnRRKzVvdUZSZE1tWTBtVFFLamFIVERkZFk1dXNRcFFyT0dHRkVTSFU9"
//        $client = new Client();
//
//        $res = $client->request('POST', $this->register_url, [
//            'json' => [
//                'offer_id' => 310, 'aff_id' => 2123, 'first_name' => "{$params['first_name']}",
//                'last_name' => "{$params['last_name']}", 'email' => "{$params['email']}",
//                'password' => "{$params['password']}", 'area_code' => "{$params['prefix']}", 'phone' => "{$params['phone']}",
//                'ip' => "{$params['ip']}",
//                'country' => "{$params['country_full']}", 'iso' => "{$params['country']}",
//                'aff_sub1' => "{$params['unique_id']}"
//            ]
//        ]);
//        if ($res->getStatusCode() !== 200) {
//            return json_encode(['status' => false, 'msg' => 'Not found']);
//        }
//        $data = json_decode($res->getBody()->getContents(), true);
//        if ($data['status'] !== 'success') {
//
//            $this->storeNetworkResponse($params['unique_id'], $data['message']);
//            return json_encode(['status' => false, 'msg' => 'Error from host']);
//        }
//        return json_encode(['status' => true, 'msg' => $data['ref_link'] . $data['token']]);
//    }

    /**
     * @param $unique_id
     * @param $msg
     * @return bool
     */
    protected function storeNetworkResponse($unique_id, $msg) {
        if (empty($unique_id)) {
            return false;
        }
        $model = Lead::where('unique_id', '=', $unique_id)->first();
        $model->network_response = $msg;
        if (!$model->save()) {
            return false;
        }
        return true;
    }

    protected function login() {
        $client = new Client();

        $res = $client->request('POST', $this->login_url, [
            'json' => [
                "username" => $this->username, "password" => $this->password
            ]
        ]);
        if ($res->getStatusCode() !== 200) {
            return json_encode(['status' => false, 'msg' => 'Not found']);
        }
        $data = json_decode($res->getBody()->getContents(), true);
        if (!$data['status']) {
            return $data['message'];
        }
        $this->setLoginToken($data['token']);
    }

    public function sendLead(array $params, $network) {
        $tokens_name = explode(',', $network->TN);
        $tokens = explode(',', $network->T);
        if (!isset($params['offer_id'])) {
            return ['status' => false, 'msg' => 'No offer id supplied'];
        }
        $offer = $this->getOffer($params['offer_id']);
        $data = [
            $offer->offer_token => $offer->offer_token_value, $tokens_name[0] => $tokens[0],
            'first_name' => "{$params['first_name']}",
            'last_name' => "{$params['last_name']}", 'email' => "{$params['email']}",
            'password' => "{$params['password']}", 'area_code' => "{$params['prefix']}", 'phone' => "{$params['phone']}",
            'ip' => "{$params['ip']}",
            'country' => "{$params['country_full']}", 'iso' => "{$params['country']}",
            'aff_sub1' => "{$params['unique_id']}"
        ];
        return $this->registerLead($data, $this->register_url, $params['unique_id'], $params['campaign_id']);
    }

}