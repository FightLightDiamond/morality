<?php

namespace App\Rules;

use App\Http\Services\VideoService;
use Illuminate\Contracts\Validation\Rule;

class YoutubeUrlRule implements Rule
{
	/**
	 * @var VideoService
	 */
	private VideoService $videoService;

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return app(VideoService::class)->validateYoutubeUrl($value) === 1;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The youtube url incorrect.';
    }
}
