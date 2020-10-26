<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Rotator extends Model {

    protected $guarded = [];

    public function rotatorGroup() {
        return $this->hasMany('App\RotatorGroup');
    }

    public function networks() {
        return $this->hasManyThrough('App\Network', 'App\RotatorGroup');
    }
//
//    public static function RotatorsWithNetworks() {
//        return DB::table('rotators as ro')
//            ->select('ro.id', 'ro.rotator_name', 'ro.status', 'ro.updated_at', 'n.network_name')
//            ->join("rotator_groups AS rg", "ro.id", "=", "rg.rotator_id")
//            ->join("networks as n", "rg.network_id", "=", "n.id")
//            ->orderBy('ro.id', 'DESC')
//            ->get();
//    }

}
