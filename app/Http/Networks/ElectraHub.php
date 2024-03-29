<?php

namespace App\Http\Networks;

use App\Offer;
use DateTime;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Facades\Log;

class ElectraHub extends NetworkFactory
{
    private $login = "https://api.electra-hub.com/api/user/login";
    private $create_lead_url = "https://api.electra-hub.com/api/affiliates/register";
    private $token = null;
    private $data = null;

    /**
     * @return bool
     * @throws GuzzleException
     */

    public function login()
    {
        $client = new Client();
        $res = $client->request('POST', "https://api.electra-hub.com/api/user/login", [
            'form_params' => [
                "email" => "cherrypop_live@gmai.com",
                "password" => "SLh8KCMA9q"
            ],
            'headers' => [
                'Content-Type' => 'application/x-www-form-urlencoded',
            ],
        ]);
        if($res->getBody()) {
            $content = json_decode($res->getBody());
            if(isset($content->token) && strlen($content->token)) {
                return $content->token;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }

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
            'fname' => $params['first_name'],
            'lname' => $params['last_name'],
            'email' => $params['email'],
            'phone_dialcode' => $params['prefix'],
            'phone' => $params['phone'],
            'country' => $params['country'],
            'passwrd' => $params['password'],
            'entity' => "rnn",
            'userIP' => $params['ip'],
            'xparam' => $offer->offer_name,
            $offer->offer_token => $offer->offer_token_value,
        ];
        $token = $this->login();
        return $this->ElectraHubLead($data, $params['unique_id'], $token, $params['campaign_id']);
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
    protected function ElectraHubLead(array $params, $unique_id, $token, $camp_id = null)
    {
        $client = new Client();
        try {
            if(!$token) {
                Log::info('token error (ElectraHub)');
                throw new \Exception("token error");
            }
            $res = $client->request('POST', $this->create_lead_url, [
                'form_params' => $params,
                'headers' => [
                    'Content-Type' => 'application/x-www-form-urlencoded',
                    'X-access-token' => $token,
                ],
            ]);
            try {
                Log::info('registerLead (ElectraHub) ' . (new DateTime())->format('Y-m-d H:i:s'));
                Log::info([
                    'form_params' => $params
                ]);
                Log::info('response status (ElectraHub): ' . $res->getBody());
            } catch (\Exception $exception) {
            }
            $data = json_decode($res->getBody(), true);
            $this->data = json_decode($res->getBody(), true);
            if (!in_array($res->getStatusCode(), [201, 200])) {
                throw new \Exception('Status code is not what expected, got:' . $res->getStatusCode());
            }
            $pixel_res = $this->sendPixel($unique_id);
            if (isset($pixel_res['status']) && !$pixel_res['status']) {
                throw new \Exception($pixel_res['msg']);
            }
            if(isset($data['data'])) {
                Log::info('response status (ElectraHub): ' . $data['data']);
            }
            if(!$data['status']) {
                throw new \Exception($data['data']);
            }
            $response = ['status' => true, 'msg' => $data['finaly_url']];

            $this->storeNetworkResponse($unique_id, 'lead_id ' . $unique_id);
            $iframe = $this->getIframePixel($camp_id);
            if (!empty($iframe)) {
                $response['pixel'] = $iframe->iframe_content;
            }
            $this->updateToLead($unique_id);
            return $response;
        } catch (ClientException $e) {
            $response = $e->getResponse()->getBody();
            $response = json_decode($response->getContents());
            Log::info('Error (ElectraHub): ' . json_encode($e));
            if ($response === null) {
                return json_encode(['status' => false, 'msg' => $e->getMessage() . ' ' . $e->getLine()]);
            }
            return json_encode(['status' => false, 'msg' => json_encode($response)]);
        } catch (\Exception $e) {
            return json_encode(['status' => false, 'msg' => "Error while saving the lead ".$e->getMessage() . ' ' . $e->getLine()]);
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