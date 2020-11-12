<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', 'AuthenticateController@login')->name('login');
Route::middleware('auth:api')->post('/logout', 'AuthenticateController@logout');

Route::middleware('auth:api')->group(function () {
    //Campaign
    Route::get('campaigns/get', 'CampaignsController@get');
    Route::get('campaigns/get/{id}', 'CampaignsController@getCampaign');
    Route::post('campaigns/store', 'CampaignsController@store');
    Route::post('campaigns/alter', 'CampaignsController@alterCampaign');
    //Networks
    Route::get('networks/get', 'NetworksController@get');
    Route::post('networks/store', 'NetworksController@store');

    //Offers
    Route::get('offers/get', 'OffersController@get');
    Route::post('offers/store', 'OffersController@store');

    //Leads
    Route::get('leads/get', 'LeadsController@get');

    //Postbacks
    Route::get('postbacks/get', 'PostbackController@get');

    //Rotators
    Route::get('rotators/get', 'RotatorController@get');
    Route::post('rotators/store', 'RotatorController@store');

    //Pixels
    Route::get('pixels/all', 'PixelController@all');
    Route::get('pixels/get', 'PixelController@get');
    Route::post('pixels/store', 'PixelController@store');
});
//Form
Route::post('form/click', 'FormController@click');
Route::post('form/lead', 'FormController@lead');

//Postback reciever
Route::get('postback/event/{unique_id}/{payout}', 'PostbackController@store');