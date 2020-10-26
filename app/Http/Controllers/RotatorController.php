<?php

namespace App\Http\Controllers;

use App\Rotator;
use App\RotatorGroup;
use Illuminate\Http\Request;

class RotatorController extends Controller {

    public function get() {
        return Rotator::all();
    }

    public function store(Request $request) {
        $name = filter_var(strip_tags($request->input('rotator_name')), FILTER_SANITIZE_STRING);
        $status = filter_var(strip_tags($request->input('status')), FILTER_SANITIZE_NUMBER_INT);
        $id = $request->input('rotator_id');
        $id = filter_var(strip_tags($id), FILTER_SANITIZE_NUMBER_INT);
        if (empty($name)) {
            return json_encode(['status' => false, 'msg' => 'Rotator name cant be empty!']);
        }
        $networks = $request->input('networks');
        if (empty($networks)) {
            return json_encode(['status' => false, 'msg' => 'Networks cant be empty!']);
        }
        $model = new Rotator ();
        $model->rotator_name = $name;
        $model->status = $status;
        if (!$model->save()) {
            return json_encode(['status' => false, 'msg' => 'There was an error while trying to save!']);
        }
        $id = (int)$id === 0 ? $model->id : (int)$id;
        foreach ($networks as $network) {
            $network_id = filter_var(strip_tags($network['network_id']), FILTER_SANITIZE_NUMBER_INT);
            $weight = filter_var(strip_tags($network['weight']), FILTER_SANITIZE_STRING);
            $priority = filter_var(strip_tags($network['priority']), FILTER_SANITIZE_STRING);
            $group = new RotatorGroup();
            $group->rotator_id = $id;
            $group->rule_id = 0;
            $group->network_id = $network_id;
            $group->weight = $weight;
            $group->priority = $priority;
            if (!$group->save()) {
                return json_encode(['status' => false, 'msg' => 'Unable to save networks']);
            }
        }
        return json_encode(['status' => true]);
    }
}
