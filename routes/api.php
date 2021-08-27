<?php

use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\TagController;
use App\Models\Permission;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::get('/tags', [TagController::class, 'search'])->middleware('api');

Route::get('/tags-list', function () {
	return Tag::query()->pluck('name');
})->middleware('api');


Route::middleware('auth:sanctum')->group(function () {
	Route::apiResource('/roles', \App\Http\Controllers\RoleController::class);
	Route::apiResource('/videos', \App\Http\Controllers\VideoController::class);
});

Route::get('/permission-list', function () {
	return Permission::query()->get();
})->middleware('api');

Route::post('/login', [LoginController::class, 'authenticate'])->name('api.login');

Route::middleware('auth:sanctum')
    ->get('/user', function (Request $request) {
    return $request->user();
});
