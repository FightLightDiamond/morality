<?php

namespace App\Providers;

use App\Models\CashierSubscription;
use App\Models\CashierSubscriptionItem;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\ServiceProvider;
use Laravel\Cashier\Cashier;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        Cashier::ignoreMigrations();
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Cashier::useCustomerModel(User::class);
        Cashier::calculateTaxes();
        Cashier::useSubscriptionModel(CashierSubscription::class);
        Cashier::useSubscriptionItemModel(CashierSubscriptionItem::class);

	    DB::listen(function($query) {
		    Log::info(
			    $query->sql,
			    $query->bindings,
			    $query->time
		    );
	    });
    }
}
