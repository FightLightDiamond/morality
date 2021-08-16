<?php

namespace App\Models;

use App\AttributeBases\UserAccess;
use App\Scopes\UserScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Laravel\Cashier\Billable;
use Laravel\Sanctum\HasApiTokens;
use function Illuminate\Events\queueable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
	use HasApiTokens, HasFactory, Notifiable;
	use Billable;
	use HasRoles;

//    use Queueable;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'name',
		'email',
		'password',
	];

	/**
	 * The attributes that should be hidden for arrays.
	 *
	 * @var array
	 */
	protected $hidden = [
		'password',
		'remember_token',
	];

	/**
	 * The attributes that should be cast to native types.
	 *
	 * @var array
	 */
	protected $casts = [
		'email_verified_at' => 'datetime',
	];

	public function canJoinRoom($roomId)
	{
		return true;
	}

	public function rooms()
	{
		return $this->belongsToMany(Room::class, 'room_users', 'room_id', 'id');
	}

	/**
	 * The "booted" method of the model.
	 *
	 * @return void
	 */
	protected static function booted()
	{
		static::updated(queueable(function ($customer) {
			$customer->syncStripeCustomerDetails();
		}));

		static::addGlobalScope(new UserScope);
	}

	/**
	 * Get the customer name that should be synced to Stripe.
	 *
	 * @return string|null
	 */
	public function stripeName(): ?string
	{
		return $this->company_name;
	}

	/**
	 * Scope a query to only include users of a given type.
	 *
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param mixed $type
	 * @return \Illuminate\Database\Eloquent\Builder
	 */
	public function scopeOfType($query, $type)
	{
		return $query->where('type', $type);
	}

	/**
	 * Scope a query to only include users of a given type.
	 *
	 * @param $query
	 * @param $action
	 * @return mixed
	 */
	public function scopeOfAttribute($query, $action)
	{
		// execute access
		return UserAccess::execute($query, $action);
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
	 */
	public function attributesAccess()
	{
		return AttributeAccessConfigData::query()
			->where('entity_id', Auth::id())
			->where('type', 'user')
			->get();
	}
}
