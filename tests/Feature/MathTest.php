<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Math;
use Mockery as m;

class MathTest extends TestCase
{
	public $calculate;
	public $math;

	public function setUp() : void
	{
		$this->calculate = m::mock('App\Calculate');
		$this->math = new Math($this->calculate);
	}

	public function test_getArea_WhenCalledWithLength2_Return4()
	{
		$this->calculate
			->shouldReceive('areaOfSquare')
			->andReturn(2)
			->once();

		$length = 2;
		$response = $this->math->getArea($length);

		dump($response);

		$this->assertTrue(is_int($response));
		$this->assertEquals(4, $response);
	}
}
