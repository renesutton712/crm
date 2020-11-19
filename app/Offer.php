<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Offer extends Model {
    protected $guarded = [];
    public function lead() {
        return $this->hasMany('App\Lead');
    }

    public function networks() {
        return $this->hasOne('App\Network');
    }

    public static function offersWithNetworks() {
        return DB::table('offers as o')
            ->select('o.id', 'o.offer_id', 'o.offer_name', 'o.offer_token', 'o.offer_token_value', 'o.offer_url', 'o.updated_at', 'o.status', 'n.network_name')
            ->leftJoin('networks as n', 'o.network_id', '=', 'n.id')
            ->where('o.status', '!=', 0)
            ->orderBy('o.id', 'DESC')
            ->get();
    }

}
