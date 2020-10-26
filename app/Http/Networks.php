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
                $res = $this->Trafficon($params);
                break;
            case 4:
                break;
            case 5:
                break;
            default:
                break;
        }
        return $res;
    }

    /**
     * @param array $params
     * @return \Illuminate\Http\JsonResponse|string
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    protected function Trafficon(array $params) {
        $client = new Client();
        self::setUrl('http://trafficon-api.com/secured-registration');

        $res = $client->request('POST', self::getUrl(), [
            'json' => [
                'offer_id' => '', 'aff_id' => '', 'first_name' => '', 'last_name' => '', 'email' => '',
                'password' => '', 'area_code' => '', 'phone' => '', 'ip' => '', 'country' => '', 'iso' => '',
                'aff_sub1' => 'our_unique_id'
            ]
        ]);
        if ($res->getStatusCode() === 200) {
            return $res->getBody()->getContents();
        }
        return response()->json(['message' => 'Not found!'], 404);
    }

}