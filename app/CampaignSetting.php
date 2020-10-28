<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CampaignSetting extends Model {

    protected $guarded = [];

    public function campaign() {
        return $this->hasMany('App\Campaign');
    }

}
