<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

	protected $fillable = ['title', 'created_by', 'status'];

	public function createdBy()
	{
		return $this->belongsTo(User::class, 'created_by');
	}

	public function members()
	{
		return $this->belongsToMany(User::class, 'room_users', 'user_id', 'id');
	}
}
