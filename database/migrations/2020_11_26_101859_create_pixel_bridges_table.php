<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePixelBridgesTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('pixel_bridges', function (Blueprint $table) {
            $table->id();
            $table->integer('campaign_id')->unique();
            $table->integer('pixel_id')->nullable();
            $table->integer('iframe_pixel_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('pixel_bridges');
    }
}
