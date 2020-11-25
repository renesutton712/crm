<?php

namespace App\Http\Controllers;

use App\FormLang;
use Illuminate\Http\Request;

class LanguageController extends Controller {

    public function get() {
        return FormLang::all();
    }

}
