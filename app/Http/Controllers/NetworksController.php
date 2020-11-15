<?php

namespace App\Http\Controllers;

use App\Network;
use App\NetworkToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NetworksController extends Controller {

    public function get() {
        return Network::orderBy('id', 'desc')->with(['networkTokens'])->where('status', '!=', 0)->get();
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
                throw new \Exception('Please set different network name');
            }
            $network_id = (int)$network_id === 0 ? $model->id : (int)$network_id;
//            $network_id = !$model->wasRecentlyCreated ? (integer)$network_id : Network::latest()->first();
            foreach ($tokens as $token) {
                $token_name = filter_var(strip_tags($token['token_name']), FILTER_SANITIZE_STRING);
                $token_val = filter_var(strip_tags($token['token']), FILTER_SANITIZE_STRING);
                if (!isset($token['id'])) {
                    $token['id'] = 0;
                }
                $tokensModel = NetworkToken::updateOrCreate(
                    ['id' => $token['id']],
                    ['network_id' => $network_id, 'token_name' => $token_name, 'token' => $token_val]
                );
            }
            DB::commit();
            return json_encode(['status' => true]);
        } catch (\Exception $e) {
            DB::rollBack();
            return json_encode(['status' => false, 'msg' => $e->getMessage()]);
        }
    }

    public function getNetwork($id) {
        if (empty($id)) {
            return json_encode(['status' => false, 'msg' => 'No network found']);
        }
        return Network::where('id', '=', "{$id}")->with(['networkTokens'])->first();
    }

    public function delete($id) {
        if (empty($id)) {
            return json_encode(['status' => false, 'msg' => 'Network not found']);
        }
        DB::beginTransaction();
        try {
            $model = Network::where('id', '=', "{$id}")->first();
            $model->status = 0;
            if (!$model->save()) {
                return json_encode(['status' => false, 'msg' => 'Unable to delete network']);
            };
            DB::commit();
            return json_encode(['status' => true]);
        } catch (\Exception $e) {
            DB::rollBack();
            return json_encode(['status' => false, 'msg' => $e->getMessage()]);
        }
    }

}
