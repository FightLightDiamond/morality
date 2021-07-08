<?php

namespace App\Console\Commands;

use App\Events\SendPublicMessageEvent;
use App\Events\SendRoomMessageEvent;
use App\Models\RoomMessage;
use App\Models\User;
use Illuminate\Console\Command;

class SendRoomMessageCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'chat:room {message}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

	/**
	 * Execute the console command.
	 *
	 * @return void
	 */
    public function handle()
    {
	    $user = User::find(2);
	    $message = RoomMessage::create([
		    'sender' => $user->id,
		    'message' => $this->argument('message'),
		    'room_id' => 1
	    ]);

	    broadcast(new SendRoomMessageEvent($message, $user));
    }
}
