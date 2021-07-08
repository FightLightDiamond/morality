<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrivateMessage extends Model
{
	use HasFactory;

	/**
	 * @var string[]
	 */
	protected $fillable = ['message', 'sender', 'receiver'];

	public function sender()
	{
		return $this->belongsTo(User::class);
	}

	public function receiver()
	{
		return $this->belongsTo(User::class);
	}
}
