<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttributeAccessConfigDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attribute_access_config_data', function (Blueprint $table) {
            $table->id();
            $table->string('scope')->default('role');
            $table->string('entity_id');
            $table->string('action')->index();
            $table->string('path')->index();
            $table->string('value');
            $table->string('is_active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('attribute_access_config_data');
    }
}
