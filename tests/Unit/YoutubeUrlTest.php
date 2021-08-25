<?php

namespace Tests\Unit;

use App\Http\Services\VideoService;
use PHPUnit\Framework\TestCase;

class YoutubeUrlTest extends TestCase
{
	/**
	 * @var \Illuminate\Contracts\Foundation\Application|mixed
	 */
	private $videoService;

	public function setUp(): void
	{
		parent::setUp(); // TODO: Change the autogenerated stub

		$this->videoService = app(VideoService::class);
	}

	public function testValidateCorrectYoutubeUrl()
	{
		$url = 'https://www.youtube.com/watch?v=gS9gVMGVDaA&list=PLkZU2rKh1mT-A4iQqTl2tn-SRC--Yeknp&index=5';
		$this->assertEquals(1, $this->videoService->validateYoutubeUrl($url));
	}

	public function testValidateInCorrectYoutubeUrl()
	{
		$url = 'https://www.gg.com/watch?v=gS9gVMGVDaA&list=PLkZU2rKh1mT-A4iQqTl2tn-SRC--Yeknp&index=5';
		$this->assertNotEquals(1, $this->videoService->validateYoutubeUrl($url));
	}
}
