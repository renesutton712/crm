<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AuthenticateController extends Controller {
    public function login(Request $request) {

        $request->request->add([
            'grant_type' => 'password',
            'client_id' => config('services.passport.client_id'),
            'client_secret' => config('services.passport.client_secret'),
        ]);
        $response = Http::post(config('services.passport.login_endpoint'), $request->all());
        if ($response->failed()) {
            return response()->json(['status' => false, 'msg' => 'Please enter the right credentials']);
        }
        if ($response->serverError()) {
            return response()->json('Something went wrong!');
        }
        if ($response->successful()) {
            return $response->json();
        };
    }

    public function logout() {
        auth()->user()->tokens->each(function ($token, $key) {
            $token->delete();
        });
        return \response()->json(['status' => true]);
    }
}
