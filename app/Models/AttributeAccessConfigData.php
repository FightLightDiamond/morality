<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class AttributeAccessConfigData
 * @package App\Models
 */
class AttributeAccessConfigData extends Model
{
	use HasFactory;

	const ENABLE = 1;
	const DISABLE = 0;
	const ATTRIBUTE_PARENT = 'enabled';

	protected $fillable = ['action', 'path', 'value', 'is_active'];

	/**
	 * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
	 */
	public static function getByAction()
	{
		return static::query()->where('action')->get();
	}

	/**
	 * @param $action
	 * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
	 */
	public static function getByActionActive($action)
	{
		return static::query()
			->where('action', $action)
			->where('is_active', 1)
			->get();
	}

	/**
	 * @param $path
	 * @param $value
	 * @return int
	 */
	public static function updatePatch($path, $value)
	{
		return static::query()
			->where('path', $path)
			->update(compact('value'));
	}

	/**
	 * @param $path
	 * @return int
	 */
	public static function enableByPath($path)
	{
		return static::query()
			->where('path', $path)
			->update(['is_active' => static::ENABLE]);
	}

	/**
	 * @param $path
	 * @return int
	 */
	public static function disableByPath($path)
	{
		return static::query()
			->where('path', $path)
			->update(['is_active' => static::DISABLE]);
	}

	/**
	 * @param $action
	 * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
	 */
	public static function getParentPathAction($action)
	{
		return static::query()
			->where('action', $action)
			->where('path', $action . '/' . static::ATTRIBUTE_PARENT)
			->get();
	}
}
