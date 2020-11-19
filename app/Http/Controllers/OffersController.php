<?php

namespace App\Http\Controllers;

use App\Offer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class OffersController extends Controller {

    public function get() {
        return Offer::offersWithNetworks();
    }

    /**
     * @param Request $request
     * @return false|string
     */
    public function store(Request $request) {
        $offer_name = filter_var(strip_tags($request->input('offer_name')), FILTER_SANITIZE_STRING);
        $offer_url = filter_var($request->input('offer_url'), FILTER_SANITIZE_URL);
        $offer_token = filter_var(strip_tags($request->input('offer_token')), FILTER_SANITIZE_STRING);
        $offer_token_val = filter_var(strip_tags($request->input('offer_token_val')), FILTER_SANITIZE_STRING);
        $network_id = filter_var(strip_tags($request->input('network_id')), FILTER_SANITIZE_STRING);
        $offer_id = filter_var(strip_tags($request->input('offer_id')), FILTER_SANITIZE_STRING);
        $offer_rand_id = filter_var(strip_tags($request->input('offer_rand_id')), FILTER_SANITIZE_STRING);
        if (empty($offer_name)) {
            return json_encode(['status' => false, 'msg' => 'Offer name is required']);
        }
        DB::beginTransaction();
        try {
            $offer_rand_id = empty($offer_rand_id) ? Str::random(8) : $offer_rand_id;
            $model = Offer::updateOrCreate(
                ['id' => $offer_id],
                [
                    'offer_id' => $offer_rand_id, 'offer_name' => $offer_name, 'network_id' => $network_id,
                    'user_id' => Auth::id(), 'offer_token' => $offer_token, 'offer_token_value' => $offer_token_val,
                    'offer_url' => $offer_url, 'status' => 1
                ]
            );
            $newOrEdit = $model->wasRecentlyCreated || $model->wasChanged();
            if (!$newOrEdit) {
                throw new \Exception('Please set different network name');
            }
            DB::commit();
            return json_encode(['status' => true]);
        } catch (\Exception $e) {
            DB::rollBack();
            return json_encode(['status' => false, 'msg' => $e->getMessage()]);
        }
    }

    /**
     * @param $id
     * @return false|string
     */
    public function getOffer($id) {
        if (empty($id)) {
            return json_encode(['status' => false, 'msg' => 'No offer found!']);
        }
        return Offer::where('id', '=', "{$id}")->first();
    }

    /**
     * @param $id
     * @return false|string
     */
    public function delete($id) {
        if (empty($id)) {
            return json_encode(['status' => false, 'No offer found']);
        }

        $model = Offer::where('id', '=', "{$id}")->first();
        $model->status = 0;
        if (!$model->save()) {
            return json_encode(['status' => false, 'msg' => 'Unable to delete offer']);
        }
        return json_encode(['status' => true]);
    }

}
