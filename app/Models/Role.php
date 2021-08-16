<?php


namespace App\Models;


use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Role extends \Spatie\Permission\Models\Role implements Transformable
{
	use TransformableTrait;
}