<?php

namespace App\Http\Controllers;

use App\Pixel;
use App\PixelGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PixelController extends Controller {

    public function all() {
        return Pixel::all();
    }

    public function get() {
        return Pixel::with('pixelGroup')->get();
    }

    public function store(Request $request) {

        $pixel_name = filter_var(strip_tags($request->input('pixel_name')), FILTER_SANITIZE_STRING);
        if (empty($pixel_name)) {
            return json_encode(['status' => false, 'msg' => 'Pixel name is required']);
        }
        DB::beginTransaction();
        try {
            $pixel_model = new Pixel();
            $pixel_model->pixel_name = $pixel_name;
            if (!$pixel_model->save()) {
                throw new \Exception('Unable to save pixel');
            }

            $pixel = Pixel::latest()->first();
            $url_arr = $request->input('pixel_url');
            if (!isset($url_arr)) {
                throw new \Exception('No pixel urls detected');
            }
            foreach ($url_arr as $url) {

                $pixel_url = filter_var(strip_tags($url['url']), FILTER_SANITIZE_STRING);
                $pixel_type = filter_var(strip_tags($url['type']), FILTER_SANITIZE_STRING);

                $pixelGroups_model = new PixelGroup();
                $pixelGroups_model->pixel_id = $pixel->id;
                $pixelGroups_model->url = $pixel_url;
                $pixelGroups_model->type = $pixel_type;
                if (!$pixelGroups_model->save()) {
                    throw new \Exception('Unable to save pixel\'s urls');
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
