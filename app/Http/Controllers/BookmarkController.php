<?php

namespace App\Http\Controllers;

use App\Models\Bookmark;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Class BookmarkController
 * @package App\Http\Controllers
 */
class BookmarkController extends Controller
{
    /**
     * @return Response
     */
    public function index(): Response
    {
        $bookmarks = Bookmark::query()
            ->where('user_id', Auth::id())
            ->get();
    	return Inertia::render('bookmark/list/index', compact('bookmarks'));
    }
}
