<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Services\VideoService;
use App\Models\Video;
use Illuminate\Http\Request;

class VideoAdminController extends Controller
{
	/**
	 * @var VideoService
	 */
	private VideoService $videoService;

	public function __construct(VideoService $videoService)
	{
		$this->videoService = $videoService;
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$videos = Video::query()
			->unPublished()
			->orderByDesc('created_at')
			->paginate(10);

		return response($videos, 200);
	}

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function unPublished(Request $request)
    {
		$postData = $this->validate($request, [
			'id' => ['required', 'exists:videos,id']
		]);

		$video = $this->videoService->unPublished($postData['id']);

		return response($video, 201);
    }

    public function published(Request $request)
    {
	    $postData = $this->validate($request, [
		    'id' => ['required', 'exists:videos,id']
	    ]);

	    $video = $this->videoService->published($postData['id']);
	    return response($video, 201);
    }
}
