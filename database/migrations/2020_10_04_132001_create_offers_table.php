<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOffersTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('offers', function (Blueprint $table) {
            $table->id();
            $table->string('offer_id', 128)->unique();
            $table->string('offer_name');
            $table->integer('network_id')->nullable();
            $table->integer('user_id');
            $table->string('offer_url');
            $table->smallInteger('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('offers');
    }
}
