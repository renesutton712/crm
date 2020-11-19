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

}
