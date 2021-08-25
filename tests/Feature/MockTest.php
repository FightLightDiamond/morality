<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Storage;
use Mockery;
use Mockery\MockInterface;
use Tests\TestCase;

class MockTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

	public function test_something_can_be_mocked()
	{
		$this->instance(
			User::class,
			Mockery::mock(User::class, function (MockInterface $mock) {
				$mock->shouldReceive('process')->once();
			})
		);

		/**
		 * You may use the partialMock method when you only need to mock a few methods of an object.
		 * The methods that are not mocked will be executed normally when called:
		 */
		$mock = $this->partialMock(User::class, function (MockInterface $mock) {
			$mock->shouldReceive('process')->once();
		});

		$spy = $this->spy(User::class);
		$spy->shouldHaveReceived('process');
	}

	public function testGetIndex()
	{
		Cache::shouldReceive('get')
			->once()
			->with('key')
			->andReturn('value');

		$response = $this->get('/users');
	}

	public function test_values_are_be_stored_in_cache()
	{
		Cache::spy();

		$response = $this->get('/');

		$response->assertStatus(200);

		Cache::shouldHaveReceived('put')->once()->with('name', 'Taylor', 10);
	}

	public function test_orders_can_be_shipped()
	{
		Bus::fake();

		// Perform order shipping...

		// Assert that a job was dispatched...
//		Bus::assertDispatched(ShipOrder::class);

		// Assert a job was not dispatched...
//		Bus::assertNotDispatched(AnotherJob::class);

//		Bus::assertDispatched(function (ShipOrder $job) use ($order) {
//			return $job->order->id === $order->id;
//		});

//		Bus::assertChained([
//			ShipOrder::class,
//			RecordShipment::class,
//			UpdateInventory::class
//		]);

//		Bus::assertBatched(function (PendingBatch $batch) {
//			return $batch->name == 'import-csv' &&
//				$batch->jobs->count() === 10;
//		});
	}

	/**
	 * Test order shipping.
	 */
	public function test_event_orders_can_be_shipped()
	{
		Event::fake();

		// Perform order shipping...

//		// Assert that an event was dispatched...
//		Event::assertDispatched(OrderShipped::class);
//
//		// Assert an event was dispatched twice...
//		Event::assertDispatched(OrderShipped::class, 2);
//
//		// Assert an event was not dispatched...
//		Event::assertNotDispatched(OrderFailedToShip::class);

		// Assert that no events were dispatched...
		Event::assertNothingDispatched();

//		Event::assertDispatched(function (OrderShipped $event) use ($order) {
//			return $event->order->id === $order->id;
//		});

//		Event::assertListening(
//			OrderShipped::class,
//			SendShipmentNotification::class
//		);


//		$order = Event::fakeFor(function () {
//			$order = Order::factory()->create();
//
//			Event::assertDispatched(OrderCreated::class);
//
//			return $order;
//		});
//
//		// Events are dispatched as normal and observers will run ...
//		$order->update([...]);
	}

	public function test_mail()
	{
		Mail::fake();

		// Perform order shipping...

		// Assert that no mailables were sent...
		Mail::assertNothingSent();

		// Assert that a mailable was sent...
//		Mail::assertSent(OrderShipped::class);
//
//		// Assert a mailable was sent twice...
//		Mail::assertSent(OrderShipped::class, 2);
//
//		// Assert a mailable was not sent...
//		Mail::assertNotSent(AnotherMailable::class);

//		Mail::assertQueued(OrderShipped::class);
//
//		Mail::assertNotQueued(OrderShipped::class);
//
//		Mail::assertNothingQueued();
	}

	public function test_notification()
	{
		Notification::fake();

		// Perform order shipping...

		// Assert that no notifications were sent...
		Notification::assertNothingSent();

		// Assert a notification was sent to the given users...
//		Notification::assertSentTo(
//			[$user], OrderShipped::class
//		);
//
//		// Assert a notification was not sent...
//		Notification::assertNotSentTo(
//			[$user], AnotherNotification::class
//		);

//		Notification::assertSentTo(
//			$user,
//			function (OrderShipped $notification, $channels) use ($order) {
//				return $notification->order->id === $order->id;
//			}
//		);
	}

	public function test_queue()
	{
		Queue::fake();

		// Perform order shipping...

		// Assert that no jobs were pushed...
		Queue::assertNothingPushed();

//		// Assert a job was pushed to a given queue...
//		Queue::assertPushedOn('queue-name', ShipOrder::class);
//
//		// Assert a job was pushed twice...
//		Queue::assertPushed(ShipOrder::class, 2);
//
//		// Assert a job was not pushed...
//		Queue::assertNotPushed(AnotherJob::class);
	}

	public function test_storage()
	{
		Storage::fake('photos');

		$response = $this->json('POST', '/photos', [
			UploadedFile::fake()->image('photo1.jpg'),
			UploadedFile::fake()->image('photo2.jpg')
		]);

		// Assert one or more files were stored...
		Storage::disk('photos')->assertExists('photo1.jpg');
		Storage::disk('photos')->assertExists(['photo1.jpg', 'photo2.jpg']);

		// Assert one or more files were not stored...
		Storage::disk('photos')->assertMissing('missing.jpg');
		Storage::disk('photos')->assertMissing(['missing.jpg', 'non-existing.jpg']);
	}

	public function testTimeCanBeManipulated()
	{
		// Travel into the future...
		$this->travel(5)->milliseconds();
		$this->travel(5)->seconds();
		$this->travel(5)->minutes();
		$this->travel(5)->hours();
		$this->travel(5)->days();
		$this->travel(5)->weeks();
		$this->travel(5)->years();

		// Travel into the past...
		$this->travel(-5)->hours();

		// Travel to an explicit time...
		$this->travelTo(now()->subHours(6));

		// Return back to the present time...
		$this->travelBack();
	}

}
