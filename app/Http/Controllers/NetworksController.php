<?php

namespace App\Http\Controllers;

use App\Network;
use Illuminate\Http\Request;

class NetworksController extends Controller {

    public function get() {
        return Network::all();
    }

    public function store(Request $request) {
        $api_key = filter_var(strip_tags($request->input('api_key')), FILTER_SANITIZE_STRING);
        $network_name = filter_var(strip_tags($request->input('network_name')), FILTER_SANITIZE_STRING);
        if (empty($api_key) || empty($network_name)) {
            return json_encode(['status' => false, 'msg' => 'Please enter the correct details!']);
        }
        $model = new Network();
        $model->network_name = $network_name;
        $model->api_key = $api_key;
        $model->status = 1;
        if (!$model->save()) {
            return json_encode(['status' => false, 'msg' => 'Unable to save!']);
        }
        return json_encode(['status' => true]);
    }
}
