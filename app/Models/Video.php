<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Video extends Model
{
    use HasFactory;

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
    	return $query->where('is_published', 1);
    }
}
