<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Video extends Model
{
    use HasFactory;

    const PUBLISHED = 1;
    const UNPUBLISHED = 0;

	/**
	 * @var array
	 */
    protected $guarded = [];

    public function user(): BelongsTo
    {
    	return  $this->belongsTo(User::class);
    }

    public function scopePublished($query)
    {
    	return $query->where('is_published', static::PUBLISHED);
    }

    public function scopeUnPublished($query)
    {
    	return $query->where('is_published', static::UNPUBLISHED);
    }
}
