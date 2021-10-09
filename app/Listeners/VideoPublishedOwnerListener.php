<?php

namespace App\Listeners;

use App\Events\VideoPublished;
use App\Models\User;
use App\Notifications\VideoPublishedOwnerNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Notification;

class VideoPublishedOwnerListener implements ShouldQueue
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  VideoPublished  $event
     * @return void
     */
    public function handle(VideoPublished $event)
    {
    	$video = $event->video;
        $user = User::query()->find($video->user_id);

//	    dump('Video listener: ' . $user->id);

//	    $delay = now()->addMinutes(1);

//        Notification::route('mail', 'taylor@example.com')
//	        ->notify((new VideoPublishedOwnerNotification($video)));

//        Notification::send($user, (new VideoPublishedOwnerNotification($video)));

//	    $user->notify((new VideoPublishedOwnerNotification($video))->delay($delay));

	    \Illuminate\Support\Facades\Mail::to($user)
		    ->send(new \App\Mail\VideoPublishedOwnerEmail($video));
    }
}
