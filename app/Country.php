<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Country extends Model {

    protected $guarded = [];

    public function leads() {
        return $this->hasMany('App\Lead');
    }

}
