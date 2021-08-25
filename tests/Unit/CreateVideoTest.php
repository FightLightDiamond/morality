<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use PHPUnit\Framework\TestCase;

class CreateVideoTest extends TestCase
{

	use RefreshDatabase, WithFaker;

    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_example()
    {
        $this->assertTrue(true);
    }

    public function testCreatesANewVideo(): void
    {
		$url = $this->faker->url;

//		$this->json
    }

    public function testReturnsVideoInRes(): void
    {

    }

    public function testReturnsAnUnPublishedVideo(): void
    {

    }

    public function testAddsDesIfSent(): void
    {

    }

    public function testValidatesRequiredFields(): void
    {

    }
}
