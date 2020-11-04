<?php

namespace App\Http\Controllers;

use App\Network;
use App\NetworkToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NetworksController extends Controller {

    public function get() {
        return Network::with(['networkTokens'])->get();
    }

    public function store(Request $request) {
        $tokens = $request->input('tokens');
        $network_name = filter_var(strip_tags($request->input('network_name')), FILTER_SANITIZE_STRING);
        $network_id = filter_var(strip_tags($request->input('network_id')), FILTER_SANITIZE_STRING);
        $status = filter_var(strip_tags($request->input('status')), FILTER_SANITIZE_STRING);
        if (empty($network_name)) {
            return json_encode(['status' => false, 'msg' => 'Please enter the correct details!']);
        }
        DB::beginTransaction();
        try {
            $model = Network::updateOrCreate(
                ['id' => $network_id],
                ['network_name' => $network_name, 'status' => $status]
            );
            $newOrEdit = $model->wasRecentlyCreated || $model->wasChanged();
            if (!$newOrEdit) {
                throw new \Exception('Error while saving network');
            }
            $network_id = !$model->wasRecentlyCreated ? (integer)$network_id : Network::latest()->first();
            foreach ($tokens as $token) {
                $token_name = filter_var(strip_tags($token['token_name']), FILTER_SANITIZE_STRING);
                $token = filter_var(strip_tags($token['token']), FILTER_SANITIZE_STRING);
                $tokensModel = new NetworkToken();
                $tokensModel->network_id = $network_id->id;
                $tokensModel->token_name = $token_name;
                $tokensModel->token = $token;
                if (!$tokensModel->save()) {
                    throw new \Exception('Unable to save tokens');
                }
            }

            DB::commit();
            return json_encode(['status' => true]);
        } catch (\Exception $e) {
            DB::rollBack();
            return json_encode(['status' => false, 'msg' => $e->getMessage()]);
        }
    }
}
