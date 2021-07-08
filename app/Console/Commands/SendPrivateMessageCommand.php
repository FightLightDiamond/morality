<?php

namespace App\Console\Commands;

use App\Events\SendPrivateMessageEvent;
use App\Models\Message;
use App\Models\PrivateMessage;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class SendPrivateMessageCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'chat:private {id}';

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
        $user = User::find($this->argument('id'));
	    $message = PrivateMessage::create([
		    'sender' => 0,
		    'receiver' => $user->id,
		    'message' => Str::random(12)
	    ]);

        event(new SendPrivateMessageEvent($message, $user));
    }
}
