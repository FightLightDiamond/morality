<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Testing\Fluent\AssertableJson;
use Symfony\Component\HttpKernel\Profiler\Profile;
use Tests\TestCase;

class UserTest extends TestCase
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

	/**
	 * A basic test example.
	 *
	 * @return void
	 */
	public function test_a_basic_request()
	{
		$response = $this->get('/');

		$response->assertStatus(200);
	}

	/**
	 * Customizing Request Headers
	 *
	 * @return void
	 */
	public function test_interacting_with_headers()
	{
		$response = $this->withHeaders([
			'X-Header' => 'Value',
		])->post('/user', ['name' => 'Sally']);

		$response->assertStatus(201);
	}

	/**
	 * Cookies
	 */
	public function test_interacting_with_cookies()
	{
		$response = $this->withCookie('color', 'blue')->get('/');

		$response = $this->withCookies([
			'color' => 'blue',
			'name' => 'Taylor',
		])->get('/');
	}

	/**
	 * Session / Authentication
	 */
	public function test_interacting_with_the_session()
	{
		$response = $this->withSession(['banned' => false])->get('/');
	}

	/**
	 * Authentication
	 */
	public function test_an_action_that_requires_authentication()
	{
		$user = User::factory()->create();

		$response = $this->actingAs($user)
			->withSession(['banned' => false])
			->get('/');
	}

	/**
	 * Debugging Responses
	 */
	public function test_basic_test()
	{
		$response = $this->get('/');

		$response->dumpHeaders();

		$response->dumpSession();

		$response->dump();
	}

	/**
	 * Testing JSON APIs
	 *
	 * @return void
	 */
	public function test_making_an_api_request()
	{
		$response = $this->postJson('/api/user', ['name' => 'Sally']);

		$response
			->assertStatus(201)
			->assertJson([
				'created' => true,
			]);
	}

	/**
	 * Asserting Exact JSON Matches
	 *
	 * @return void
	 */
	public function test_asserting_an_exact_json_match()
	{
		$response = $this->json('POST', '/user', ['name' => 'Sally']);

		$response
			->assertStatus(201)
			->assertExactJson([
				'created' => true,
			]);
	}

	/**
	 * Asserting On JSON Paths
	 * If you would like to verify that the JSON response contains the given data at a specified path, you should use the assertJsonPath method:
	 *
	 * @return void
	 */
	public function test_asserting_a_json_paths_value()
	{
		$response = $this->json('POST', '/user', ['name' => 'Sally']);

		$response
			->assertStatus(201)
			->assertJsonPath('team.owner.name', 'Darian');
	}

	/**
	 * Fluent JSON Testing
	 * Laravel also offers a beautiful way to fluently test your application's JSON responses.
	 * To get started, pass a closure to the assertJson method.
	 * This closure will be invoked with an instance of Illuminate\Testing\Fluent\AssertableJson
	 * which can be used to make assertions against the JSON that was returned by your application.
	 * The where method may be used to make assertions against a particular attribute of the JSON,
	 * while the missing method may be used to assert that a particular attribute is missing from the JSON:
	 *
	 * @return void
	 */
	public function test_fluent_json()
	{
		$response = $this->json('GET', '/users/1');

		$response
			->assertJson(fn (AssertableJson $json) =>
			$json->where('id', 1)
				->where('name', 'Victoria Faith')
				->missing('password')
				->etc()
			);
	}

	/**
	 * Asserting Against JSON Collections
	 */
	public function test_against_json_collections()
	{
		$response = $this->json('GET', '/users');

		$response
			->assertJson(fn (AssertableJson $json) =>
			$json->where('id', 1)
				->where('name', 'Victoria Faith')
				->missing('password')
				->etc()
			);
	}

	/**
	 * Scoping JSON Collection Assertions
	 */
	public function test_scope_json_collections()
	{
		$response = $this->json('GET', '/users');

		$response
			->assertJson(fn (AssertableJson $json) =>
			$json->has('meta')
				->has('users', 3)
				->has('users.0', fn ($json) =>
				$json->where('id', 1)
					->where('name', 'Victoria Faith')
					->missing('password')
					->etc()
				)
			);
	}

	/**
	 * Asserting JSON Types
	 */
	public function test_json_types()
	{
		$response = $this->json('GET', '/users');

		$response->assertJson(fn (AssertableJson $json) =>
		$json->whereType('id', 'integer')
			->whereAllType([
				'users.0.name' => 'string',
				'meta' => 'array'
			])
		);

		$response->assertJson(fn (AssertableJson $json) =>
		$json->whereType('name', 'string|null')
			->whereType('id', ['string', 'integer'])
		);
	}

	/**
	 * Testing File Uploads
	 */
	public function test_avatars_can_be_uploaded()
	{
		Storage::fake('avatars');

		$file = UploadedFile::fake()->image('avatar.jpg');

		$response = $this->post('/avatar', [
			'avatar' => $file,
		]);

		Storage::disk('avatars')->assertExists($file->hashName());
		Storage::disk('avatars')->assertMissing('missing.jpg');
	}

	/**
	 * Fake File Customization
	 */
	public function test_fake_file()
	{
		UploadedFile::fake()->image('avatar.jpg', 100, 100)->size(100);
		UploadedFile::fake()->create('document.pdf', 100);
		UploadedFile::fake()->create(
			'document.pdf', 100, 'application/pdf'
		);
	}

	/**
	 *  Test view
	 */
	public function test_a_welcome_view_can_be_rendered()
	{
		$view = $this->view('welcome', ['name' => 'Taylor']);

		$view->assertSee('Taylor');
	}

	/**
	 * Sharing error
	 */
	public function test_sharing_error()
	{
		$view = $this->withViewErrors([
			'name' => ['Please provide a valid name.']
		])->view('form');

		$view->assertSee('Please provide a valid name.');
	}

	/**
	 * Rendering
	 */
	public function test_rendering()
	{
		$view = $this->blade(
			'<x-component :name="$name" />',
			['name' => 'Taylor']
		);

		$view->assertSee('Taylor');

		$view = $this->component(Profile::class, ['name' => 'Taylor']);

		$view->assertSee('Taylor');
	}

}
