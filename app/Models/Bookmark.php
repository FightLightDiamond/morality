<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\ModelCleanup\CleanupConfig;
use Spatie\ModelCleanup\GetsCleanedUp;

class Bookmark extends Model implements GetsCleanedUp
{
	use HasFactory;

	protected $guarded = [];

	public function cleanUp(CleanupConfig $config): void
	{
		$config
			->olderThanDays(1)
			->scope(fn(Builder $query) => $query->where('is_active', 0))
			->chunk(1000, fn() => Bookmark::count() > 5000);
	}

	public function tags()
	{
		return $this->morphedByMany(Tag::class, 'taggable');
	}
}
