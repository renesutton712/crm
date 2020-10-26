<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Offer extends Model {

    public function lead() {
        return $this->hasMany('App\Lead');
    }

}
