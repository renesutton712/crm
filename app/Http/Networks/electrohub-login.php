<?php

use GuzzleHttp\Client;

require __DIR__ . '../../../vendor/autoload.php';

function login() {
    $client = new Client();
    $res = $client->request('POST', "https://api.electra-hub.com/api/affiliates/register/user/login", [
        'json' => json_decode(
            `{
                    "email": "cherrypop_live@gmai.com",
                    "password": "SLh8KCMA9q"
                }`
        ),
        'headers' => [
            'Content-Type' => 'application/x-www-form-urlencoded',
        ],
    ]);
    $content = $res->getBody();
    $this_directory = dirname(__FILE__);
    $fp = fopen($this_directory . "/electra-token.txt", "w");
    fwrite($fp, $content);
    fclose($fp);
    return true;
}
login();