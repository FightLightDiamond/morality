<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class LoginTest extends TestCase
{
	use RefreshDatabase;

	public function testSendOnCorrectCredentials()
	{
		$user = User::factory()->create();

		$res = $this->json("POST", route('api.login'), [
			'email' => $user->email,
			'password' => 'password',
			'token_name' => 'user'
		]);

		$res->assertStatus(200)
			->assertJson(function (AssertableJson $assertableJson) use ($user) {
				$assertableJson->has('token')
					->where('user.email', $user->email)
					->etc();
			});
	}

	public function testLoginFail()
	{
		$user = User::factory()->create();

		$res = $this->json("POST", route('api.login'), [
			'email' => $user->email,
			'password' => 'passwords',
			'token_name' => 'user'
		]);

		$res->dump();

		$res->assertStatus(401)
			->assertJson(function (AssertableJson $assertableJson) use ($user) {
				$assertableJson->has('error')
					->where('error', __('auth.failed'))
					->etc();
			});
	}

	public function testValidateFail()
	{
		$user = User::factory()->create();

		$res = $this->json("POST", route('api.login'), [
			'email' => $user->email,
			'password' => 'passwords',
		]);

		$res->dump();

		$res->assertStatus(422)
			->assertJson(function (AssertableJson $assertableJson) use ($user) {
				$assertableJson->has('errors')
					->where('errors.token_name.0', __('validation.required', ['attribute' => 'token name']))
					->etc();
			});
	}
}
