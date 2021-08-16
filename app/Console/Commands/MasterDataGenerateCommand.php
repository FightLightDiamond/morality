<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

/**
 * Class MasterDataGenerateCommand
 * @package App\Console\Commands
 */
class MasterDataGenerateCommand extends Command
{
	/**
	 * The name and signature of the console command.
	 *
	 * @var string
	 */
	protected $signature = 'masterdata:generate';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Command description';

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * Execute the console command.
	 *
	 * @return void
	 */
	public function handle()
	{
		$this->gAdmin();
		$this->gAuthorization();
		$this->info('Master data generate success');
	}

	public function gAdmin()
	{
		$emails = [
			'admin@gmail.com',
			'sadmin@gmail.com',
			'u@gmail.com',
			'm@gmail.com',
		];

		foreach ($emails as $email) {
			$id = User::query()
				->where('email', $email)
				->value('id');

			if (!$id) {
				$password = Hash::make('123123');
				User::query()->create([
					'name' => 'Admin',
					'email' => $email,
					'password' => $password
				]);
			}
		}

		$this->info('Admin generate success');
	}

	public function gAuthorization()
	{
		$roleNames = [
			'Super Admin',
			'Admin',
			'User Manager',
		];

		foreach ($roleNames as $roleName) {
			try {
				Role::query()->create(['name' => $roleName]);
			} catch (\Exception $e) {
			}
		}

		$permissionNames = [
			'add user',
			'delete user',
			'update profile user',
			'inactive user',
			'active user'
		];

		foreach ($permissionNames as $permissionName) {
			try {
				Permission::query()->create(['name' => $permissionName]);
			} catch (\Exception $exception) {}
		}

		$this->info('Authorization generate success');
	}
}
