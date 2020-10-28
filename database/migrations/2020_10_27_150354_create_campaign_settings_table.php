<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCampaignSettingsTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('campaign_settings', function (Blueprint $table) {
            $table->id();
            $table->integer('campaign_id')->unique();
            $table->enum('first_name', ['on', 'off']);
            $table->enum('last_name', ['on', 'off']);
            $table->enum('country', ['on', 'off']);
            $table->enum('phone', ['on', 'off']);
            $table->enum('email', ['on', 'off']);
            $table->enum('password', ['on', 'off']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('campaign_settings');
    }
}
