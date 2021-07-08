<?php

namespace App\Console\Commands;

use App\Events\SendPublicMessageEvent;
use App\Models\Message;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class SendPublicMessageCommand extends Command
{
    protected $signature = 'chat:message {message}';

    protected $description = 'Send chat message.';

    public function handle()
    {
        $user = User::find(2);
        $message = Message::create([
            'sender' => $user->id,
            'message' => $this->argument('message')
        ]);

        event(new SendPublicMessageEvent($message, $user));
    }
}
