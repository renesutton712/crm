<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PixelIframe extends Model {
    protected $guarded = [];

    public function campaigns() {
        return $this->hasMany('App\Campaign');
    }

}
