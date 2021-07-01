<?php

namespace App\Console\Commands;

use App\Events\PrivateMessageSent;
use App\Models\User;
use Illuminate\Console\Command;

class SendPrivateMessage extends Command
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
     * @return int
     */
    public function handle()
    {
        $user = User::find($this->argument('id'));
        event(new PrivateMessageSent($user));
    }
}
