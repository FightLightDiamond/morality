<?php

namespace Database\Factories;

use App\Models\Video;
use Illuminate\Database\Eloquent\Factories\Factory;

class VideoFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Video::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
	        'url' => $this->faker->url,
	        'user_id' => 1,
	        'description' => $this->faker->text,
	        'is_published' => 1
        ];
    }

	/**
	 * @return Factory
	 */
    public function unPublished(): Factory {
		return $this->state(function (array $attribute) {
			return [
				'is_published' => 0
			];
		});
    }
}
