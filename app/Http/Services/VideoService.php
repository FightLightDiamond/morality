<?php


namespace App\Http\Services;


use App\Models\Video;
use Illuminate\Support\Facades\Auth;

class VideoService
{
	/**
	 * @param string $url
	 * @return false|int
	 */
	public function validateYoutubeUrl(string $url)
	{
		$youtubeRegexp = "/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/";
		return preg_match($youtubeRegexp, $url);
	}

	/**
	 * @param $data
	 * @param $userId
	 * @return mixed
	 */
	public function createSubmission($data, $userId)
	{
		$des = $data['description'] ?? '';
		return Video::create([
			'url' => $data['url'],
			'description' => $des,
			'user_id' => $userId,
		]);
	}
}