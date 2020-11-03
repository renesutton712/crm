<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Lead extends Model {

    protected $guarded = [];

    public function network() {
        return $this->belongsTo('App\Network');
    }

    public function offer() {
        return $this->belongsTo('App\Offer');
    }

    public function campaign() {
        return $this->belongsTo('App\Campaign');
    }

    public function rotator() {
//        return $this->hasManyThrough('App\RotatorGroup', 'App\Rotator');
        return $this->hasOne('App\Rotator');
    }

    public static function leadsWithAllRelations() {
        return DB::table('leads AS l')
            ->select('l.unique_id', 'l.country', 'l.first_name', 'l.last_name', 'l.email', 'l.prefix', 'l.phone', 'l.ip', 'l.ua', 'l.status', 'l.url_params', 'c.campaign_name', 'ro.rotator_name', 'n.network_name')
            ->join('rotators AS ro', 'l.rotator_id', '=', 'ro.id')
            ->join('campaigns AS c', 'l.campaign_id', '=', 'c.id')
            ->leftJoin('networks AS n', 'l.network_id', '=', 'n.id')
            ->orderBy('l.id', 'DESC')
            ->get();
    }

}
