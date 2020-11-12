<?php

namespace App\Http;

use App\Campaign;
use App\Lead;
use App\Pixel;
use App\PixelGroup;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class Networks {

    private $url;

    /**
     * @return mixed
     */
    public function getUrl() {
        return $this->url;
    }

    /**
     * @param mixed $url
     */
    public function setUrl($url): void {
        $this->url = $url;
    }

    public function networksMap($network_id, $params) {
        switch ($network_id) {
            case 1:
//            case 3:
                return $this->COD($params);
                break;
            case 2:
                return $this->SuperMedia($params);
                break;
            case 3:
                return $this->SuperMedia($params);
                break;
            case 4:
                return $this->SuperMedia($params);
                break;
            case 5:
                return $this->SuperMedia($params);
                break;
            case 6:
                return $this->Trafficon($params);
                break;
            default:
                return json_encode(['status' => true, 'msg' => 'https://www.google.com']);
                break;
        }
    }

    /**
     * @param array $params
     * @return \Illuminate\Http\JsonResponse|string
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    private function Trafficon(array $params) {
//        Example response:
//        ref_link: "https://yuan-pay-newapp.com/api/v1/secured-auto-login/"
//        status: "success"
//        tid: "1026f80704573cc14277fa86a39243"
//        token: "YXR4U3h3L2diVDZpZHBWZU5HUzVrdWhnQ0RKZzFFSXFoekZwTGpOTGdMYlVTR0FQR1JOdnRBejJHVGF6WlVVSjJhbnVMV2pvUmRRdVdEZURSQkVrc2IxWWYvdXgyVkNpbHhnVEdielR0d3M9"
//        ref_link: "https://yuan-pay-newapp.com/api/v1/secured-auto-login/"
//        status: "success"
//        tid: "1023bd82d2205aa9e917f70964c4d9"
//        token: "NlhKYjVkUmp5K3h1a2JIdHBvdnJ4L2dndklualVwOW1HMXN1WUxCK0xHMEVSeWEyQjlESWl5Szh5eXhLV3FUbHd0NnRRKzVvdUZSZE1tWTBtVFFLamFIVERkZFk1dXNRcFFyT0dHRkVTSFU9"
        $client = new Client();
        self::setUrl('https://trafficon-api.com/secured-registration');
        $res = $client->request('POST', self::getUrl(), [
            'json' => [
                'offer_id' => 310, 'aff_id' => 2123, 'first_name' => "{$params['first_name']}",
                'last_name' => "{$params['last_name']}", 'email' => "{$params['email']}",
                'password' => "{$params['password']}", 'area_code' => "{$params['prefix']}", 'phone' => "{$params['phone']}",
                'ip' => "{$params['ip']}",
                'country' => "{$params['country_full']}", 'iso' => "{$params['country']}",
                'aff_sub1' => "{$params['unique_id']}"
            ]
        ]);
        if ($res->getStatusCode() !== 200) {
            return json_encode(['status' => false, 'msg' => 'Not found']);
        }
        $data = json_decode($res->getBody()->getContents(), true);
        if ($data['status'] !== 'success') {
            $this->storeNetworkResponse($params['unique_id'], $data['message']);
//            return json_encode(['status' => false, 'msg' => 'Error from host']);
            return json_encode(['status' => false, 'msg' => "{$data['message']}"]);
        }
        return json_encode(['status' => true, 'msg' => $data['ref_link'] . $data['token']]);
    }

    /**
     * @param array $params
     * @return \Illuminate\Http\JsonResponse|string
     * @throws GuzzleException
     */
    private function SuperMedia(array $params) {
        $client = new Client();
        self::setUrl('https://api.rhkoco.com/v2/affiliates/lead/create');

        $res = $client->request('POST', self::getUrl(), [
            [
                'headers' => [
                    'Token' => $params['token']
                ]
            ],
            'form_params' => [
                'firstname' => $params['first_name'], 'lastname' => $params['last_name'], 'email' => $params['email'],
                'password' => $params['password'], 'phone' => $params['prefix'] . $params['phone'], 'ip' => $params['ip'],
                'country_code' => $params['country'],
                'aff_sub' => $params['unique_id']
            ]
        ]);
        if ($res->getStatusCode() === 200) {
            return $res->getBody()->getContents();
        }
        return response()->json(['message' => 'Not found!'], 404);
    }

    private function COD(array $params) {
        $client = new Client();
        self::setUrl('https://api.adcombo.com/api/v2/order/create/');
        $api_key = "3d439aa6f8da838348b303f5f6f02d28";
        $args = [
            'api_key' => $api_key,
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
        $res = $client->request('GET', self::getUrl() . '?' . http_build_query($args));
        if ($res->getStatusCode() === 200) {
            return $res->getBody()->getContents();
        }
        return response()->json(['message' => 'Not found!'], 404);
    }

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
}