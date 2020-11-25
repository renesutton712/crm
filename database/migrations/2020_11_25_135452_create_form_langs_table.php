<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFormLangsTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('form_langs', function (Blueprint $table) {
            $table->id();
            $table->string('lang');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('country');
            $table->string('phone');
            $table->string('email');
            $table->string('password');
            $table->string('submit_btn');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('form_langs');
    }
}
