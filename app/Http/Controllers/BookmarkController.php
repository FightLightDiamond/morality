<?php

namespace App\Http\Controllers;

use App\Models\Bookmark;
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

	public function getPreviewData(Request $request)
	{
		$postData = $this->validate($request, [
			'link' => ['required']
		]);

//    	$data = Http::get($postData['link']);
		$data = \OpenGraph::fetch($postData['link'], true);

		$bookmark = Bookmark::create([
			'title' => $data['title'] ?? '',
			'description' => $data['description'] ?? '',
			'type' => $data['type'] ?? '',
			'url' => $postData['link'],
			'image_url' => $data['image'] ?? '',
			'user_id' => $request->user()->id,
		]);

//		return Inertia::render('bookmark/add/index', [
//			'data' => $data,
//			'link' => $postData['link']
//		]);

		return redirect()->route('bookmark.view', ['bookmark' => $bookmark->id]);
	}

	public function view(Bookmark $bookmark)
	{
		if(Auth::id() !== $bookmark->user_id) {
			abort(401, 'You are not allowed to view this bookmark');
		}
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
}
