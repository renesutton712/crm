<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Network extends Model {

    protected $guarded = [];

    public function campaign() {
        return $this->hasOne('App\Campaign');
    }

    public function lead() {
        return $this->hasMany('App\Lead');
    }

    public function offer() {
        return $this->hasMany('App\Offer');
    }

    public function postback() {
        return $this->hasMany('App\Postback');
    }

    public function networkTokens() {
        return $this->hasMany('App\NetworkToken');
    }

}
