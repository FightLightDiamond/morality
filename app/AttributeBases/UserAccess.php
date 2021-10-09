<?php


namespace App\AttributeBases;


use App\AttributeBases\User\ViewLimitUserAttribute;
use App\Models\AttributeAccessConfigData;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

/**
 * Class UserReducer
 * @package App\AttributeBases
 */
class UserAccess
{
	/**
	 * @param $query
	 * @param $action
	 * @return mixed
	 */
	public static function execute($query, $action)
	{
		$enable = Cache::get($action . '/enabled', function ($action) {
			return AttributeAccessConfigData::getByActionActive($action);
		});

		// check config enable
		if ($enable) {
			switch ($action) {
				case 'user_view':
					return ViewLimitUserAttribute::execute($query, $action);
			}
		}

		return $query;
	}
}