<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class RotatorGroup extends Model {

    protected $guarded = [];

    public function rotator() {
        return $this->hasOne('App\Rotator');
    }

    public function networks() {
        return $this->hasOne('App\Network');
    }

    public static function rotatorWithNetworkToken($rotator_id) {
        return DB::table('rotator_groups AS rg')
            ->select('o.offer_id', 'o.network_id', 'o.offer_token', 'o.offer_token_value', 'nt.id', 'rg.weight', DB::raw('group_concat(nt.token_name) as TN'), DB::raw('group_concat(nt.token) as T'))
            ->where('rg.rotator_id', '=', "{$rotator_id}")
            ->leftJoin('offers as o', 'rg.offer_id', '=', 'o.offer_id')
            ->leftJoin("network_tokens AS nt", "o.network_id", "=", "nt.network_id")
            ->groupBy(['nt.network_id'])
            ->get()
            ->toArray();
    }

}
