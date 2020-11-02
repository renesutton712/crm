<?php

namespace App\Http;

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
        $res = '';
        switch ($network_id) {
            case 1:
                break;
            case 2:
                break;
            case 3:
                return $this->Trafficon($params);
                break;
            case 4:
                break;
            case 5:
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
    protected function Trafficon(array $params) {
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
        if ($res->getStatusCode() === 200) {
            return $res->getBody()->getContents();
        }
        return response()->json(['message' => 'Not found!'], 404);
    }

    /**
     * @param array $params
     * @return \Illuminate\Http\JsonResponse|string
     * @throws GuzzleException
     */
    protected function SuperMedia(array $params) {
        $client = new Client();
        self::setUrl('https://api.rhkoco.com/v2/affiliates/lead/create');

        $res = $client->request('POST', self::getUrl(), [
            [
                'headers' => [
                    'Token' => $params['token']
                ]
            ],
            'json' => [
                'first_name' => '', 'last_name' => '', 'email' => '',
                'password' => '', 'phone' => '', 'ip' => '', 'country_code' => '',
                'aff_sub' => 'our_unique_id', 'source' => 'Optional'
            ]
        ]);
        if ($res->getStatusCode() === 200) {
            return $res->getBody()->getContents();
        }
        return response()->json(['message' => 'Not found!'], 404);
    }

}