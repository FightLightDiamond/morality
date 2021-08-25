<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class CreateVideoTest extends TestCase
{
	use RefreshDatabase, WithFaker;

	private string $url;

	public function setUp(): void
	{
		parent::setUp();
		$this->url = 'https://www.youtube.com/watch?v=gS9gVMGVDaA&list=PLkZU2rKh1mT-A4iQqTl2tn-SRC--Yeknp&index=5';
	}

	public function testCreatesANewVideo(): void
	{
//		$url = $this->faker->url;
		$user = User::factory()->create();

		$this->actingAs($user)
			->json('POST', route('videos.store'), [
			'url' => $this->url,
			'description' => 'test'
		]);

		$this->assertDatabaseHas('videos', [
			'url' => $this->url,
			'description' => 'test'
		]);
	}

	public function testReturnsVideoInRes(): void
	{
		$url = $this->faker->url;
		$user = User::factory()->create();

		$resp = $this->actingAs($user)
			->json('POST', route('videos.store'), [
			'url' => $url,
			'description' => 'test'
		]);

		$resp->dump();

		$resp->assertJson(function (AssertableJson $json) use ($url) {
			$json
				->where('id', 1)
				->where('user_id', 1)
				->where('url', $url)
//				->where('type', 'youtube')
				->etc();
		});
	}

	public function testReturnsAnUnPublishedVideo(): void
	{
		$url = $this->faker->url;

		$resp = $this->json('POST', route('videos.store'), [
			'url' => $url,
			'description' => 'test'
		]);

		$this->assertDatabaseHas('videos', [
			'url' => $url,
			'is_published' => 0
		]);

		$resp->assertJson(function (AssertableJson $json) use ($url) {
			$json
				->where('id', 1)
				->where('is_published', 0)
				->etc();
		});
	}

	public function testAddsDesIfSent(): void
	{
		$url = $this->faker->url;

		$resp = $this->json('POST', route('videos.store'), [
			'url' => $url,
			'description' => 'test'
		]);

		$resp->assertJson(function (AssertableJson $json) use ($url) {
			$json
				->where('id', 1)
				->where('description', 'test')
				->etc();
		});
	}

	public function testValidatesRequiredFields(): void
	{
		$url = $this->faker->url;
		$user = User::factory()->create();

		$resp = $this
			->actingAs($user)
			->json('POST', route('videos.store'), [
			'url' => $url,
			'description' => 'test'
		]);

		$resp->dump();

		$resp
			->assertStatus(422)
			->assertJson(function (AssertableJson $json) use ($url) {
			$json
				->has('errors.url')
				->etc();
		});
	}

	public function testAddsCurrentUserIdInVideo()
	{
		$url = $this->faker->url;
		$user = User::factory()->create();

		$this->actingAs($user)
			->json('POST', route('videos.store'), [
				'url' => $url,
				'description' => 'test'
			]);

		$this->assertDatabaseHas('videos', [
			'url' => $url,
			'description' => 'test',
			'user_id' => $user->id
		]);
	}
}