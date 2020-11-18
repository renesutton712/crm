<?php

namespace App\Http\Controllers;

use App\PixelIframe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PixelIframeController extends Controller {

    public function get() {
        return PixelIframe::orderBy('id', 'desc')->where('status', '!=', 0)->get();
    }

    /**
     * @param Request $request
     * @return false|string
     */
    public function store(Request $request) {
        $pixel_id = filter_var(strip_tags($request->input('pixel_id')), FILTER_SANITIZE_STRING);
        $pixel_name = filter_var(strip_tags($request->input('pixel_name')), FILTER_SANITIZE_STRING);
        $pixel_content = $request->input('pixel_content');
        if (empty($pixel_name) || empty($pixel_content)) {
            return json_encode(['status' => false, 'msg' => 'All fields are required!']);
        }
        DB::beginTransaction();
        try {
            $model = PixelIframe::updateOrCreate(
                ['id' => $pixel_id],
                ['user_id' => Auth::id(), 'iframe_name' => $pixel_name, 'iframe_content' => $pixel_content, 'status' => 1]
            );
            $newOrEdit = $newOrEdit = $model->wasRecentlyCreated || $model->wasChanged();
            if (!$newOrEdit) {
                throw new \Exception('Unable to save iframe pixel');
            }
            DB::commit();
            return json_encode(['status' => true]);
        } catch (\Exception $e) {
            DB::rollBack();
            return json_encode(['status' => false, 'msg' => $e->getMessage()]);
        }
    }

    public function getIframePixel($id) {
        $p_id = filter_var(strip_tags($id), FILTER_SANITIZE_STRING);

        return PixelIframe::where('id', '=', "{$p_id}")->first();
    }

    public function deleteIframePixel($id) {
        $p_id = filter_var(strip_tags($id), FILTER_SANITIZE_STRING);
        if (empty($p_id)) {
            return json_encode(['status' => false, 'msg' => 'Pixel not found']);
        }
        DB::beginTransaction();
        try {
            $model = PixelIframe::where('id', '=', "{$p_id}")->first();
            $model->status = 0;
            if (!$model->save()) {
                return json_encode(['status' => false, 'msg' => 'Unable to delete pixel']);
            };
            DB::commit();
            return json_encode(['status' => true]);
        } catch (\Exception $e) {
            DB::rollBack();
            return json_encode(['status' => false, 'msg' => $e->getMessage()]);
        }
    }

}
