<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RotatorGroup extends Model {

    protected $guarded = [];

    public function rotator() {
        return $this->hasOne('App\Rotator');
    }

    public function networks() {
        return $this->hasOne('App\Network');
    }

}
