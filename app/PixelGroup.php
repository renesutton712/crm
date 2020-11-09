<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PixelGroup extends Model {

    protected $guarded = [];

    public function pixel() {
        return $this->belongsTo('App\Pixel');
    }

}
