<?php

namespace App\Http\Controllers;

use App\Lead;
use Illuminate\Http\Request;

class LeadsController extends Controller {

    public function get() {
        return Lead::with(['network', 'campaign', 'rotator'])->get();
    }
}
