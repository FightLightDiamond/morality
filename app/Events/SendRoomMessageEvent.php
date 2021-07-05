<?php

namespace App\Events;

use App\Models\Message;
use App\Models\RoomMessage;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SendRoomMessageEvent implements ShouldBroadcast
{
	use Dispatchable, InteractsWithSockets, SerializesModels;

	const CHANNEL = 'room_message.';

	/**
	 * Create a new event instance.
	 *
	 * @return void
	 */
	public RoomMessage $message;
	public User $user;

	public function __construct(RoomMessage $message, User $user)
	{
		$this->message = $message;
		$this->user = $user;
	}

	/**
	 * Get the channels the event should broadcast on.
	 *
	 * @return \Illuminate\Broadcasting\Channel|array
	 */
	public function broadcastOn()
	{
		return new PresenceChannel(self::CHANNEL . $this->message->room_id);
	}

	/**
	 * Get the channels the event should broadcast on.
	 *
	 * @return string
	 */
	public function broadcastAs()
	{
		return 'sent';
	}
}