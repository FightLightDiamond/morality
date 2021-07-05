<?php

use App\Http\Controllers\BookmarkController;
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

Route::get('/', function () {
    return view('welcome');
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

    Route::post('/bookmarks/preview', [BookmarkController::class, 'getPreviewData'])->name('bookmark.preview');
});

Route::middleware('web')->get('/test', [App\Http\Controllers\TestController::class, 'index'])->name('test');