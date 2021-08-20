<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;

class ConsoleTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {
	    Artisan::command('question', function () {
		    $name = $this->ask('What is your name?');

		    $language = $this->choice('Which language do you prefer?', [
			    'PHP',
			    'Ruby',
			    'Python',
		    ]);

		    $this->line('Your name is '.$name.' and you prefer '.$language.'.');
	    });
    }

	/**
	 * Test a console command.
	 *
	 * @return void
	 */
	public function test_console_command()
	{
		$this->artisan('question')
			->expectsQuestion('What is your name?', 'Taylor Otwell')
			->expectsQuestion('Which language do you prefer?', 'PHP')
			->expectsOutput('Your name is Taylor Otwell and you prefer PHP.')
			->doesntExpectOutput('Your name is Taylor Otwell and you prefer Ruby.')
			->assertExitCode(0);

		$this->artisan('module:import')
			->expectsConfirmation('Do you really wish to run this command?', 'no')
			->assertExitCode(1);

		$this->artisan('users:all')
		->expectsTable([
			'ID',
			'Email',
		], [
			[1, 'taylor@example.com'],
			[2, 'abigail@example.com'],
		]);
	}
}
