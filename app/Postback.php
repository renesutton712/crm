<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Postback extends Model {

    public function network() {
        return $this->hasOne('App\Network');
    }

    public static function postbackWithNetworkAndLeads() {
        return DB::table('postbacks AS p')
            ->select('p.id', 'p.unique_id', 'p.event', 'p.created_at', 'n.network_name')
            ->join('networks AS n', 'p.network_id', '=', 'n.id')
            ->orderBy('p.id', 'DESC')
            ->get();
    }

}
