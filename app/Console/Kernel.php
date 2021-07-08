<?php

namespace App\Console;

use App\Console\Commands\RockPaperScissorsCommand;
use App\Console\Commands\SendPrivateMessageCommand;
use App\Console\Commands\SendRoomMessageCommand;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Console\Commands\SendPublicMessageCommand;
use Spatie\ModelCleanup\Commands\CleanUpModelsCommand;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
    	SendPrivateMessageCommand::class,
	    SendPublicMessageCommand::class,
	    SendRoomMessageCommand::class,
	    RockPaperScissorsCommand::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')->hourly();
	    $schedule->command(CleanUpModelsCommand::class)->daily();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
