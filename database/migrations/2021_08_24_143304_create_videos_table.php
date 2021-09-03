<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVideosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('videos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->index();
            $table->string('url');
            $table->string('title');
            $table->text('description');
            $table->enum('type', ['youtube', 'video'])->default('youtube');
            $table->boolean('is_published')->default(0);
            $table->unsignedInteger('like_count')->default(0);
            $table->unsignedInteger('abuse_count')->default(0);
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
        Schema::dropIfExists('videos');
    }
}
