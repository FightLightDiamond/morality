<?php

namespace App\Mail;

use App\Events\VideoPublished;
use App\Jobs\VideoPublishedOwnerEmailJob;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;

class VideoPublishedOwnerEmail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

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
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
    	dump('Video Mail Build');
    	dump($this->video->description);
//        return $this->view('view.name');
	    return $this->from('fsfs@example.com', Str::random(9))
		    ->subject($this->video->description)
		    ->markdown('emails.videos.publish-to-owner');
//		    ->view('emails.orders.shipped');

    }
}
