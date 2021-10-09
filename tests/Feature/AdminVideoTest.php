<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use App\Models\Video;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class AdminVideoTest extends TestCase
{
	use RefreshDatabase;
	use WithFaker;

	public function testShowListOfVideos(): void
	{
		$user = User::factory()->create();
		Role::create(['name' => 'admin']);
		$user->assignRole('admin');
		Video::factory()
			->unPublished()
			->count(5)->create();

		$resp = $this
			->actingAs($user)
			->json('GET', route('admin.videos.index'));

		$resp->dump();
		dump($resp->getStatusCode());

		$resp
			->assertJson(function (AssertableJson $assertableJson) {
				$assertableJson
					->where('total', 5)
					->has('data', 5)
					->etc();
			});
	}


	public function testNotRoleListOfVideos(): void
	{
		$user = User::factory()->create();
		Video::factory()
			->unPublished()
			->count(5)->create();

		$resp = $this
			->actingAs($user)
			->json('GET', route('admin.videos.index'));

		$resp->dump();
		dump($resp->getStatusCode());

		$resp
			->assertStatus(403)
			->assertJson(function (AssertableJson $assertableJson) {
				$assertableJson
					->where('message', "User does not have the right roles.")
					->etc();
			});
	}
}
