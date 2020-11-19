<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRotatorGroupsTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('rotator_groups', function (Blueprint $table) {
            $table->id();
            $table->integer('rotator_id');
            $table->integer('rule_id')->nullable();
            $table->integer('offer_id');
            $table->integer('weight');
            $table->integer('priority')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('rotator_groups');
    }
}
