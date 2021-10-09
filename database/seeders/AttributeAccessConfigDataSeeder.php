<?php

namespace Database\Seeders;

use App\Models\AttributeAccessConfigData;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AttributeAccessConfigDataSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		$roles = [

		];

		$permission = [

		];


		if(AttributeAccessConfigData::count() === 0) {
			$role = Role::create(['name' => 'writer']);

			$permission = Permission::create(['name' => 'edit articles']);
			$permission->assignRole($role);

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
