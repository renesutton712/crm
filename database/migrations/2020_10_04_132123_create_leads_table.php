<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLeadsTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('unique_id', 128)->unique();
            $table->integer('campaign_id');
            $table->integer('network_id')->nullable();
            $table->integer('rotator_id')->nullable();
            $table->string('offer_id')->nullable();
            $table->string('country')->nullable();
            $table->string('host')->nullable();
            $table->string('referrer')->nullable();
            $table->string('ua', 128);
            $table->ipAddress('ip')->nullable();
            $table->json('url_params')->nullable();
            $table->string('email')->nullable();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('password')->nullable();
            $table->string('prefix')->nullable();
            $table->string('phone')->nullable();
            $table->smallInteger('status');
            $table->integer('event')->nullable();
            $table->text('network_response')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('leads');
    }
}
