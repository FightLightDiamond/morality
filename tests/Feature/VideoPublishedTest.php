<?php

namespace Tests\Feature;

use App\Events\VideoPublished;
use App\Mail\VideoPublishedOwnerEmail;
use App\Models\User;
use App\Models\Video;
use App\Notifications\VideoPublishedOwnerNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class VideoPublishedTest extends TestCase
{
//	use RefreshDatabase;

	public function testPublish()
	{
		$video = Video::factory()->create();

		$this->json('PUT', route('videos.published'), ['id' => $video->id])
			->assertStatus(201)
			->assertJson(function (AssertableJson $assertableJson) use ($video) {
				$assertableJson->where('is_published', 1)->etc();
			});
	}

	public function testSendMailPublish()
	{
		Mail::fake();

		$user = User::factory()->create();
		$video = Video::factory()->unPublished()->create([
			'user_id' => $user->id
		]);

		$this->json('PUT', route('videos.published'), ['id' => $video->id]);

		// Assert a notification was sent to the given users...
		Mail::assertQueued(VideoPublishedOwnerEmail::class, function ($mail) use ($user) {
			return $mail->hasTo($user);
		});
	}

	public function testNotificationPublish()
	{
		Notification::fake();

		$user = User::factory()->create();
		$video = Video::factory()->unPublished()->create([
			'user_id' => $user->id
		]);

		$this->json('PUT', route('videos.published'), ['id' => $video->id]);

//		Notification::hasSent(
//			[$user], VideoPublishedOwnerNotification::class
//		);

		Notification::assertSentTo(
			[$user], VideoPublishedOwnerNotification::class
		);
	}

	public function testEventPublish()
	{
		Event::fake();

		$user = User::factory()->create();
		$video = Video::factory()->unPublished()->create([
			'user_id' => $user->id
		]);

		$this->json('PUT', route('videos.published'), ['id' => $video->id]);

		Event::assertDispatched(
			VideoPublished::class
		);
	}
}
