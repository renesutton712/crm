<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePixelGroupsTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('pixel_groups', function (Blueprint $table) {
            $table->id();
            $table->integer('pixel_id');
            $table->string('url');
            $table->enum('type', ['Lead', 'FTD']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('pixel_groups');
    }
}
