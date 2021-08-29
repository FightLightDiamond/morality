<?php

use App\Http\Controllers\BookmarkController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inerita\Inerita;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('welcome');
/**
 * Stripe
 */
Route::get('/billing-portal', function (Request $request) {
	return $request->user()->redirectToBillingPortal();
});

Route::get('/payment-method', function (Request $request) {
	$user = \App\Models\User::query()->find(1);
	return view('stripe.payment.update-payment-method', [
		'intent' => $user->createSetupIntent()
	]);
});

Route::get('/app', function () {
	return view('app');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::group(['middleware' => ['web', 'auth']], function () {
	Route::get('/bookmarks', [BookmarkController::class, 'index'])->name('bookmark.index');
	Route::get('/bookmarks/add', [BookmarkController::class, 'add'])->name('bookmark.add');
	Route::get('/bookmarks/view/{bookmark}', [BookmarkController::class, 'view'])->name('bookmark.view');

	Route::post('/bookmarks/update', [BookmarkController::class, 'handleUpdate'])->name('bookmark.update');
	Route::post('/bookmarks/preview', [BookmarkController::class, 'getPreviewData'])->name('bookmark.preview');
	Route::post('/bookmarks/make-active', [BookmarkController::class, 'makeActive'])->name('bookmark.active');
	Route::get('/bookmarks/redirect/{bookmark}', [BookmarkController::class, 'redirect'])->name('bookmark.redirect');

	Route::get('/notes', [\App\Http\Controllers\NoteController::class, 'index'])->name('notes.index');

});

Route::inertia('/auth', 'login/index')->name('auth');
Route::inertia('/chats', 'chat/index')->name('chat');
Route::inertia('/shops', 'shop/index')->name('shop');
Route::inertia('/videos', 'video/index')->name('video');
Route::inertia('/dnd', 'dnd/index')->name('dnd');
Route::inertia('/roles', 'authorization/role/create')->name('role');

//Route::middleware('web')->get('/test', [App\Http\Controllers\TestController::class, 'index'])->name('test');

Route::group(['middleware' => ['enforcer:articles,read']], function () {
	Route::inertia('/enforcer', function () {
		return 'enforcer';
	})->name('enforcer');
});

// Authen
//Route::group(['middleware' => ['http_request']], function () {
//	Route::resource('photo', 'PhotoController');
//});

Route::get('attribute-test', function () {
	return \App\Models\User::query()
		->ofAttribute('user_view')
		->get();
});


Route::get('t', function () {
	$role = \Spatie\Permission\Models\Role::query()->create(['name' => 'writer']);
	$permission = \Spatie\Permission\Models\Permission::query()->create(['name' => 'write post']);
	$role->givePermission($permission);
//	$permission->assignRole($role);

	$user = \Illuminate\Support\Facades\Auth::user();
	$user->assigRole('writer');
	$user->givePermission('write post');

	$permissions = $user->getDirectPermissions();
	$permissions = $user->getPermissionsViaRoles();
	$permissions = $user->getAllPermissions();

	$user->hasPermissionTo('edit articles');
	$user->hasPermissionTo('<permissionId>');
	$user->hasAnyPermission(['edit articles', 'publish articles', 'unpublish articles']);

	$user->can('edit articles');

	$user->hasRole('writer');

// or at least one role from an array of roles:
	$user->hasRole(['editor', 'moderator']);

	$user->hasAnyRole(['writer', 'reader']);
// or
	$user->hasAnyRole('writer', 'reader');

	// Check if the user has Direct permission
	$user->hasDirectPermission('edit articles');

// Check if the user has All direct permissions
	$user->hasAllDirectPermissions(['edit articles', 'delete articles']);

// Check if the user has Any permission directly
	$user->hasAnyDirectPermission(['create articles', 'delete articles']);

	/**
	 * php artisan permission:create-role writer
	 * php artisan permission:create-permission "edit articles"
	 * php artisan permission:create-role writer web
	 * php artisan permission:create-role writer web "create articles|edit articles"
	 * php artisan permission:show
	 *
	 * php artisan permission:cache-reset
	 *
	 * public function __construct()
	{
	$this->middleware(['role:super-admin','permission:publish articles|edit articles']);
	}
	 */
});

Route::group(['middleware' => ['can:publish articles']], function () {
	//
});

Route::group(['middleware' => ['role:super-admin']], function () {
	//
});

Route::group(['middleware' => ['permission:publish articles']], function () {
	//
});

Route::group(['middleware' => ['role:super-admin','permission:publish articles']], function () {
	//
});

Route::group(['middleware' => ['role_or_permission:super-admin|edit articles']], function () {
	//
});

Route::group(['middleware' => ['role_or_permission:publish articles']], function () {
	//
});

Route::group(['middleware' => ['role:super-admin|writer']], function () {
	//
});

Route::group(['middleware' => ['permission:publish articles|edit articles']], function () {
	//
});

Route::group(['middleware' => ['role_or_permission:super-admin|edit articles']], function () {
	//
});

Route::get('mail', function () {
	\Illuminate\Support\Facades\Mail::to(\App\Models\User::query()->first())
		->send(new \App\Mail\VideoPublishedOwnerEmail(\App\Models\Video::query()->first()));
});