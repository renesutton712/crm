<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Pixel extends Model {

    protected $guarded = [];

    public function pixelGroup() {
        return $this->hasMany('App\PixelGroup');
    }

    public function campaign() {
        return $this->hasMany('App\Campaign');
    }

}
