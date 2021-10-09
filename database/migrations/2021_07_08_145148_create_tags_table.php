<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateTagsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tags', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->unsignedTinyInteger('count')->default(0);
            $table->timestamps();

//	        $table->index([DB::raw('count [VISIBLE | INVISIBLE]')]);
	        $table->index([DB::raw('count DESC')], 'tags_count_desc_index');
        });

//	    DB::statement('ALTER TABLE `tags` ADD INDEX `tags_count_index` (`count` DESC)');
//	    DB::statement('ALTER TABLE `tags` ADD INDEX `tags_count_index` [VISIBLE | INVISIBLE]');
//	    DB::statement('ALTER TABLE `tags` ALTER INDEX `tags_count_desc_index` VISIBLE');
	    DB::statement('ALTER TABLE `tags` ADD FULLTEXT `tag_name_index`(name)');

//	    $q = Input::get('query');
//	    ->whereRaw("MATCH(title,description) AGAINST(? IN BOOLEAN MODE)", array($q))
    }

//	public function search(Request $request)
//	{
//		$q = $request->input('query');
//
//		$posts = Post::whereRaw(
//			"MATCH(title) AGAINST(?)",
//			array($q)
//		)->get();
//
//		return view('posts.index', compact('posts'));
//	}

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
	    Schema::table('tags', function($table) {
		    $table->dropIndex('tags_count_desc_index');
		    $table->dropIndex('tag_name_index');
	    });
        Schema::dropIfExists('tags');
    }
}
