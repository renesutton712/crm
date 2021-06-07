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

    public function duplicateIframePixel(Request $request) {
        $id = filter_var(strip_tags($request->input('iframe_id')), FILTER_SANITIZE_NUMBER_INT);
        if (empty($id)) {
            return json_encode(['status' => false, 'msg' => 'No ID found']);
        }
        $iframe = DB::table('pixel_iframes')->select('campaign_id',
            'iframe_name',
            'iframe_content')->where('id', '=', $id)->get()->toArray();
        $model = new PixelIframe();
        $model->user_id = Auth::user()->id;
        $model->iframe_name = $iframe[0]->iframe_name;
        $model->iframe_content = $iframe[0]->iframe_content;
        $model->status = 1;
        if (!$model->save()) {
            return json_encode(['status' => false, 'msg' => 'Unable to duplicate pixel ' . $id]);
        }
        return json_encode(['status' => true, 'msg' => 'Success!']);
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
