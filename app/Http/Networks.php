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
        switch ($network_id) {
            case 4:
                return $this->Trafficon($params);
                break;
            case 5:
                return $this->SuperMedia($params);
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
//        Example response:
//        ref_link: "https://yuan-pay-newapp.com/api/v1/secured-auto-login/"
//        status: "success"
//        tid: "1026f80704573cc14277fa86a39243"
//        token: "YXR4U3h3L2diVDZpZHBWZU5HUzVrdWhnQ0RKZzFFSXFoekZwTGpOTGdMYlVTR0FQR1JOdnRBejJHVGF6WlVVSjJhbnVMV2pvUmRRdVdEZURSQkVrc2IxWWYvdXgyVkNpbHhnVEdielR0d3M9"
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
                'first_name' => $params['first_name'], 'last_name' => $params['last_name'], 'email' => $params['email'],
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

}