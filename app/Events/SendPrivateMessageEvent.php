<?php

namespace App\Events;

use App\Models\Message;
use App\Models\PrivateMessage;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SendPrivateMessageEvent implements ShouldBroadcast
{
	use Dispatchable, InteractsWithSockets, SerializesModels;

	/**
	 * Create a new event instance.
	 *
	 * @return void
	 */
	public PrivateMessage $message;
	public User $user;

	public function __construct(PrivateMessage $message, User $user)
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
		return new PrivateChannel('message.' . $this->user->id);
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
