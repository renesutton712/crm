<?php

namespace App\Http\Networks;

use App\Offer;
use DateTime;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Facades\Log;

class Trackbox extends NetworkFactory
{
    private $create_lead_url = "https://platform.traffixworld.com/user/login";
    private $token = null;
    private $data = null;

    /**
     * @param array $params
     * @param $network
     * @return array|false|string
     * @throws \GuzzleHttp\Exception\GuzzleException
     */


    public function prepareData(array $params, $network)
    {
        $offer = $this->getOffer($params['offer_id']);
        if (!isset($params['offer_id'])) {
            return ['status' => false, 'msg' => 'No offer id supplied'];
        }
        $this->setToken($network->T);
        $data = [
            'ai' => "2958143",
            'ci' => 1,
            'gi' => $params['first_name'],
            'firstname' => $params['first_name'],
            'lastname' => $params['last_name'],
            'email' => $params['email'],
            'phone' => $params['prefix'],
            'userip' => $params['ip'],
            'sub' => "en-UK",
            'MPC_3' => $params['unique_id'],
            $offer->offer_token => $offer->offer_token_value,
        ];
        return $this->TrackboxLead($data, $params['unique_id'], $params['campaign_id']);
    }

    protected function getOffer($offer_id) {
        if (empty($offer_id)) {
            return ['status' => false, 'msg' => 'No offer found'];
        }
        return Offer::where('offer_id', '=', "{$offer_id}")->first();
    }

    /**
     * @param array $params
     * @param $url
     * @param $unique_id
     * @param null $camp_id
     * @param null $token
     * @return array|false|string
     * @throws GuzzleException
     * @throws \Exception
     */
    protected function TrackboxLead(array $params, $unique_id, $camp_id = null)
    {
        $client = new Client();
        try {
            $res = $client->request('POST', $this->create_lead_url, [
                'form_params' => $params,
                'headers' => [
                    'Content-Type' => 'application/json',
                    'x-api-key' => '2643889w34df345676ssdas323tgc738',
                    'x-trackbox-username' => 'cherrypop',
                    'x-trackbox-password' => 'Cherrypop1234',
                ],
            ]);
            try {
                Log::info('registerLead (Trackbox) ' . (new DateTime())->format('Y-m-d H:i:s'));
                Log::info([
                    'form_params' => $params
                ]);
                Log::info('response status (Trackbox): ' . $res->getBody());
            } catch (\Exception $exception) {
            }
            $data = json_decode($res->getBody()->getContents(), true);
            $this->data = json_decode($res->getBody()->getContents(), true);
            if (!in_array($res->getStatusCode(), [201, 200])) {
                throw new \Exception('Status code is not what expected, got:' . $res->getStatusCode());
            }
            $pixel_res = $this->sendPixel($unique_id);
            if (isset($pixel_res['status']) && !$pixel_res['status']) {
                throw new \Exception($pixel_res['msg']);
            }
            $response = ['status' => true, 'msg' => $data['redirect_url']];
            $this->storeNetworkResponse($unique_id, 'lead_id ' . $data['click_id']);
            $iframe = $this->getIframePixel($camp_id);
            if (!empty($iframe)) {
                $response['pixel'] = $iframe->iframe_content;
            }
            $this->updateToLead($unique_id);
            return $response;
        } catch (ClientException $e) {
            $response = $e->getResponse()->getBody();
            $response = json_decode($response->getContents());
            if ($response === null) {
                return json_encode(['status' => false, 'msg' => $e->getMessage()]);
            }
            return json_encode(['status' => false, 'msg' => json_encode($response)]);
        } catch (\Exception $e) {
            return json_encode(['status' => false, 'msg' => $e->getMessage()]);
        }
    }

    /**
     * @return null
     */
    public function getToken()
    {
        return $this->token;
    }

    /**
     * @param null $token
     */
    public function setToken($token): void
    {
        $this->token = $token;
    }
}