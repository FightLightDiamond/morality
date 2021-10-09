<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVarcharValuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('varchar_values', function (Blueprint $table) {
	        $table->id();
	        /**
	         * Id product or
	         */
	        $table->unsignedBigInteger('entity_id');
	        $table->unsignedBigInteger('attribute_id');
	        $table->unsignedBigInteger('entity_type_id');
	        $table->unsignedBigInteger('value');
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
        Schema::dropIfExists('varchar_values');
    }
}
