<?php


namespace App\AttributeBases\User;


use App\Models\AttributeAccessConfigData;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

/**
 * Class UserView
 * @package App\AttributeBases\User
 */
class ViewLimitUserAttribute
{
	/**
	 * @param $query
	 * @param $action
	 * @return mixed
	 */
	public static function execute($query, $action)
	{
		$limit = Cache::get($action, function () {
			return AttributeAccessConfigData::query()
				->where('scope', 'user')
				->where('entity_id', Auth::id())
				->where('path', 'user_view/limit')
				->value('value');
		});

		if ($limit) {
			$query->limit($limit);
		}

		return $query;
	}
}