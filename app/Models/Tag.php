<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $guarded = [];

//	public function commentable()
//	{
//		return $this->morphTo();
//	}

    public function bookmarks()
    {
    	return $this->morphedByMany(Bookmark::class, 'taggable');
    }
}
