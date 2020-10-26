<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Campaign extends Model {

//    protected $fillable = [
//        'campaign_name'
//    ];
    protected $guarded = [];

    public function lead() {
        return $this->hasMany('App\Lead');
    }

    public function network() {
        return $this->hasOne('App\Network');
    }

    public function offer() {
        return $this->hasOne('App\Offer');
    }

    public static function getCampaignWithNetworksAndOffers() {
        return DB::table('campaigns AS c')
            ->select('c.id', 'c.campaign_name', 'c.platform', 'c.status', 'o.offer_name', 'o.offer_id', 'ro.rotator_name', 'ro.id AS rotator_id')
            ->join("rotators AS ro", "c.rotator_id", "=", "ro.id")
            ->join("offers AS o", "c.offer_id", "=", "o.offer_id")
            ->where('c.status', '!=', 0)
            ->orderBy('c.id', 'DESC')
            ->get();
    }

}
