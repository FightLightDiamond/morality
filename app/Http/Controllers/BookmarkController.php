<?php

namespace App\Http\Controllers;

use App\Http\Services\BookmarkService;
use App\Models\Bookmark;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
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
			->where('is_active', 1)
			->get();
		return Inertia::render('bookmark/list/index', compact('bookmarks'));
	}

	public function add()
	{
		return Inertia::render('bookmark/add/index');
	}

	public function getPreviewData(Request $request, BookmarkService $bookmarkService)
	{
		$postData = $this->validate($request, [
			'link' => ['required']
		]);

		$data = $bookmarkService->getBookmarkData($postData['link']);

		$bookmark = Bookmark::create([
			'title' => $data['title'],
			'description' => $data['description'],
			'type' => $data['type'] ?? '',
			'url' => $postData['link'],
			'image_url' => $data['image'],
			'user_id' => $request->user()->id,
		]);

		return redirect()->route('bookmark.view', ['bookmark' => $bookmark->id]);
	}

	public function view(Bookmark $bookmark)
	{
		if(Auth::id() !== $bookmark->user_id) {
			abort(401, 'You are not allowed to view this bookmark');
		}

		$bookmark->load(['tags']);

		return Inertia::render('bookmark/view/index', compact('bookmark'));
	}

	public function makeActive(Request $request)
    {
        $data = $this->validate($request, [
           'id' => ['required', 'exists:bookmarks,id']
        ]);

        $bookmark = Bookmark::find($data['id']);

        if(Auth::id() !== $bookmark->user_id) {
            abort(401, 'You are not allowed to view this bookmark');
        }

        $bookmark->update(['is_active' => 1]);

        return redirect()->route('bookmark.index');
    }

    public function redirect(Bookmark $bookmark)
    {
	    $bookmark->increment('views');
	    $bookmark->save();
		return $bookmark;
    }

    public function handleUpdate(Request $request, BookmarkService $bookmarkService): RedirectResponse
    {
        $postData = $this->validate($request, [
            'tags' => ['required', 'array'],
            'id' => ['required', 'exists:bookmarks,id']
        ]);


        $bookmark = Bookmark::find($postData['id']);

        if (Auth::id() != $bookmark->user_id) {
            abort(401, 'You are not allowed to make this bookmark active');
        }

        $ids = $bookmarkService->handleBookmarkTags($postData['tags']);

        $bookmark->tags()->sync($ids);

        return redirect()->route('bookmark.view', ['bookmark' => $bookmark->id]);
    }
}
