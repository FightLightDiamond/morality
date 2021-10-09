<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Str;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class CreateVideoTest extends TestCase
{
//	use RefreshDatabase;
	use WithFaker;

	/**
	 * @var string
	 */
	private string $url;
	/**
	 * @var string
	 */
	private string $title;
	/**
	 * @var string
	 */
	private string $description;

	public function setUp(): void
	{
		parent::setUp();
		$this->url = 'https://www.youtube.com/watch?v=gS9gVMGVDaA&list=PLkZU2rKh1mT-A4iQqTl2tn-SRC--Yeknp&index=5';
		$this->title = $this->faker->title;
		$this->description = $this->faker->text;
	}

	public function dataVideos()
	{
		$title = Str::random(3);
		return [
			[
				'https://www.youtube.com/watch',
				'$this->faker->title',
				'$this->faker->text',
			],
			[
				'https://www.youtube.com/watch',
				$title,
				$title,
			],
		];
	}

	/**
	 * @dataProvider dataVideos
	 * @param $url
	 * @param $title
	 * @param $description
	 */
	public function testCreateVideo($url, $title, $description): void
	{
		$user = User::factory()->create();

		$this->actingAs($user)
			->json('POST', route('videos.store'), [
				'url' => $url,
				'title' => $title,
				'description' => $description
			]);

		$this->assertDatabaseHas('videos', [
			'url' => $url,
			'title' => $title,
			'description' => $description
		]);
	}

	public function testReturnsVideoInRes(): void
	{
		$url = $this->faker->url;
		$user = User::factory()->create();

		$resp = $this->actingAs($user)
			->json('POST', route('videos.store'), [
				'url' => $url,
				'title' => $this->title,
				'description' => $this->description
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
			'title' => $this->title,
			'description' => $this->description
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
			'title' => $this->title,
			'description' => $this->description
		]);

		$resp->assertJson(function (AssertableJson $json) use ($url) {
			$json
				->where('id', 1)
				->where('description', $this->description)
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
				'title' => $this->title,
				'description' => $this->description
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
				'title' => $this->title,
				'description' => $this->description
			]);

		$this->assertDatabaseHas('videos', [
			'url' => $url,
			'title' => $this->title,
			'description' => $this->description,
			'user_id' => $user->id
		]);
	}
}