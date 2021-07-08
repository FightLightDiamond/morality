<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomMessage extends Model
{
    use HasFactory;

	protected $fillable = ['message', 'sender', 'room_id'];

	public function sender()
	{
		return $this->belongsTo(User::class);
	}

	public function room()
	{
		return $this->belongsTo(Room::class);
	}
}
