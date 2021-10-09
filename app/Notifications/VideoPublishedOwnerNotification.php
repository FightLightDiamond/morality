<?php

namespace App\Notifications;

use App\Mail\VideoPublishedOwnerEmail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Str;

class VideoPublishedOwnerNotification extends Notification implements ShouldQueue
{
    use Queueable;

	public $video;

	/**
	 * Create a new notification instance.
	 *
	 * @param $video
	 */
    public function __construct($video)
    {
        $this->video = $video;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }


    public function toMail($notifiable)
    {
        return (new MailMessage)
	        ->from('fsfs@example.com', Str::random(9))
	        ->subject($this->video->description)
	        ->markdown('emails.videos.publish-to-owner');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
