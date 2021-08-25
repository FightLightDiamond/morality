<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Video;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class VideoListTest extends TestCase
{
	use RefreshDatabase;
	use WithFaker;

	public function testShowListOfVideos(): void
	{
		$user = User::factory()->create();

		Video::factory()->count(5)->create();

		$resp = $this
			->actingAs($user)
			->json('GET', route('videos.index'));

		$resp
			->assertJson(function (AssertableJson $assertableJson) {
			$assertableJson
				->where('total', 5)
				->has('data', 5)
				->etc();
		});
	}

	public function testShowFirstNVideos(): void
	{
		Video::factory()->count(12)->create();

		$resp = $this->json('GET', route('videos.index'));

		$resp->dump();

		$resp->assertJson(function (AssertableJson $assertableJson) {
			$assertableJson->where('total', 12)
				->has('data', 10)
				->has('data.0', function ($video) {
					$video->where('is_publish', 1)
						->etc();
				})->etc();
		});
	}

	public function testShowOnlyPublishedNVideos(): void
	{
		Video::factory()->count(2)->unPublished()->create();
		Video::factory()->count(5)->create();

		$resp = $this->json('GET', route('videos.index'));
		$resp->assertJson(function (AssertableJson $assertableJson) {
			$assertableJson
				->where('total', 5)
				->has('data', 5)
				->has('data.0', function ($video) {
					$video->where('is_published', 1)
						->etc();
				})->etc();
		});
	}

	public function testDoesNotAllowGuest()
	{
		$this
			->json('GET', route('videos.index'))
			->assertStatus(401);
	}
}
