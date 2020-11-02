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
        return $this->hasManyThrough('App\RotatorGroup', 'App\Rotator');
    }

}
