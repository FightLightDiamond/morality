<?php

namespace App\Console\Commands;

use App\Events\MessagePosted;
use App\Models\Message;
use App\Models\User;
use Illuminate\Console\Command;

class SendChatMessage extends Command
{
    protected $signature = 'chat:message {message}';

    protected $description = 'Send chat message.';

    public function handle()
    {
        // Fire off an event, just randomly grabbing the first user for now
        $user = User::firstorCreate([
        	'name' => 'name',
        	'email' => 'i.am.m.cuong@gmail.com',
	        'password' => 123123
        ]);
        $message = Message::create([
            'user_id' => $user->id,
            'message' => $this->argument('message')
        ]);

        event(new MessagePosted($message, $user));
    }
}
