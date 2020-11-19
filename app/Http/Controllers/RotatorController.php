<?php

namespace App\Http\Controllers;

use App\Rotator;
use App\RotatorGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RotatorController extends Controller {

    public function get() {
//        return Rotator::all()->sortByDesc;
        return Rotator::orderBy('id', 'desc')->where('status', '!=', 0)->get();
    }

    public function store(Request $request) {
        $name = filter_var(strip_tags($request->input('rotator_name')), FILTER_SANITIZE_STRING);
        $status = filter_var(strip_tags($request->input('status')), FILTER_SANITIZE_NUMBER_INT);
        $id = $request->input('rotator_id');
        $id = filter_var(strip_tags($id), FILTER_SANITIZE_NUMBER_INT);
        if (empty($name)) {
            return json_encode(['status' => false, 'msg' => 'Rotator name cant be empty!']);
        }
        $offers = $request->input('offers');
        if (empty($offers)) {
            return json_encode(['status' => false, 'msg' => 'Networks cant be empty!']);
        }
        DB::beginTransaction();
        try {
            $model = Rotator::updateOrCreate(
                ['id' => $id],
                ['rotator_name' => $name, 'status' => $status]
            );
            $newOrEdit = $model->wasRecentlyCreated || $model->wasChanged();
            if (!$newOrEdit) {
                throw new \Exception('Please set different rotator name');
            }
            $id = (int)$id === 0 ? $model->id : (int)$id;
            foreach ($offers as $offer) {
                $offer_id = filter_var(strip_tags($offer['offer_id']), FILTER_SANITIZE_STRING);
                $weight = filter_var(strip_tags($offer['weight']), FILTER_SANITIZE_STRING);
                $priority = filter_var(strip_tags($offer['priority']), FILTER_SANITIZE_STRING);
                if (!isset($offer['id'])) {
                    $offer['id'] = 0;
                }
                $group = RotatorGroup::updateOrCreate(
                    ['id' => $offer['id']],
                    [
                        'rule_id' => 0, 'offer_id' => $offer_id, 'weight' => $weight,
                        'priority' => $priority, 'rotator_id' => $id
                    ]
                );
            }
            DB::commit();
            return json_encode(['status' => true]);
        } catch (\Exception $e) {
            DB::rollBack();
            return json_encode(['status' => false, 'msg' => $e->getMessage()]);
        }
    }

    public function getRotator($id) {
        if (empty($id)) {
            return json_encode(['status' => false, 'msg' => 'Rotator not found!']);
        }
        return $model = Rotator::where('id', '=', "{$id}")->with(['rotatorGroup'])->get();
    }

    public function delete($id) {
        if (empty($id)) {
            return json_encode(['status' => false, 'msg' => 'Rotator not found!']);
        }
        DB::beginTransaction();
        try {
            $model = Rotator::where('id', '=', "{$id}")->first();
            $model->status = 0;
            $model->save();
            if (!$model->wasChanged()) {
                throw new \Exception('Error while deleting rotator');
            }
            DB::commit();
            return json_encode(['status' => true]);
        } catch (\Exception $e) {
            DB::rollBack();
            return json_encode(['status' => false, 'msg' => $e->getMessage()]);
        }
    }

}
