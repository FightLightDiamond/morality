<?php

use App\Events\SendPrivateMessageEvent;
use App\Events\SendRoomMessageEvent;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
	return (int)$user->id === (int)$id;
});

Broadcast::channel(SendPrivateMessageEvent::CHANNEL . '{userId}', function ($user, $userId) {
	return $user->id === (int)$userId;
}, ['guards' => ['web']]);

Broadcast::channel(SendRoomMessageEvent::CHANNEL . '{roomId}', function ($user, $roomId) {
	if ($user->canJoinRoom($roomId)) {
		return ['id' => $user->id, 'name' => $user->name];
	}
}, ['guards' => ['web']]);