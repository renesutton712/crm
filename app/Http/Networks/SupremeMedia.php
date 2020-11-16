<?php

namespace App\Http\Networks;

use GuzzleHttp\Client;

class SupremeMedia extends NetworkFactory {

    private $create_lead_url = "https://api.rhkoco.com/v2/affiliates/lead/create";

    /**
     * @param array $params
     * @return \Illuminate\Http\JsonResponse|string
     * @throws \GuzzleHttp\Exception\GuzzleException
     */

    protected function registerLeadByAffToken(array $params) {
        $client = new Client();

        $res = $client->request('POST', $this->create_lead_url, [
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

    /**
     * @param array $params
     * @param $network
     * @return false|string
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function prepareData(array $params, $network) {
        $data = [
            'firstname' => $params['first_name'], 'lastname' => $params['last_name'], 'email' => $params['email'],
            'password' => $params['password'], 'phone' => $params['prefix'] . $params['phone'], 'ip' => $params['ip'],
            'country_code' => $params['country'],
            'aff_sub' => $params['unique_id']
        ];
        return $this->registerLead($data, $this->create_lead_url, $params['unique_id'], $network->T);
    }
}