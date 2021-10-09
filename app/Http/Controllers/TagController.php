<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
	public function search(Request $request)
	{
		$postData = $this->validate($request, [
			'tag' => ['min:1']
		]);

		return Tag::query()
			->when($postData, function ($q) use ($postData) {
				$q->where('name', 'like', "{$postData['tag']}%");
			})
			->limit(20)
			->get();
	}
}
