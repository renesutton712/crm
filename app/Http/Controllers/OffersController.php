<?php

namespace App\Http\Controllers;

use App\Offer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class OffersController extends Controller {

    public function get() {
        return Offer::orderBy('id', 'DESC')->get();
    }

    public function store(Request $request) {
        $offer_name = filter_var(strip_tags($request->input('offer_name')), FILTER_SANITIZE_STRING);
        $offer_url = filter_var($request->input('offer_url'), FILTER_SANITIZE_URL);
        $network_id = filter_var(strip_tags($request->input('network_id')), FILTER_SANITIZE_STRING);

        if (empty($offer_name)) {
            return json_encode(['status' => false, 'msg' => 'Offer name is required']);
        }
        $user = Auth::user();
        $model = new Offer();
        $model->offer_id = Str::random(8);
        $model->offer_name = $offer_name;
        $model->network_id = $network_id;
        $model->user_id = $user->id;
        $model->offer_url = $offer_url;
        $model->status = 1;

        if (!$model->save()) {
            return json_encode(['status' => false, 'msg' => 'Unable to save']);
        }
        return json_encode(['status' => true]);
    }

}
