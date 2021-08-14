<?php

namespace Database\Seeders;

use App\Models\AttributeAccessConfigData;
use Illuminate\Database\Seeder;

class AttributeAccessConfigDataSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		if(AttributeAccessConfigData::count() === 0) {
			AttributeAccessConfigData::insert([
				[
					'action' => 'user_view',
					'scope' => 'user',
					'entity_id' => 0,
					'path' => 'user_view/enabled',
					'value' => 1,
					'is_active' => 1
				],
				[
					'action' => 'user_view',
					'scope' => 'user',
					'entity_id' => '1',
					'path' => 'user_view/limit',
					'value' => 7,
					'is_active' => 1
				],
				[
					'action' => 'user_view',
					'scope' => 'user',
					'entity_id' => '3',
					'path' => 'user_view/limit',
					'value' => 5,
					'is_active' => 1
				],
			]);
		}
	}
}
