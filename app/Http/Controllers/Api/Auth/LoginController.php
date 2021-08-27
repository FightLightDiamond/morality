<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * Class LoginController
 * @package App\Http\Controllers\Api\Auth
 */
class LoginController extends Controller
{
	/**
	 * Handle an authentication attempt.
	 *
	 */
	public function authenticate(Request $request): JsonResponse
	{
		$postData = $request->validate([
			'email' => ['required', 'email'],
			'password' => ['required'],
			'token_name' => ['required'],
		]);

		$credentials = [
			'email' => $postData['email'],
			'password' => $postData['password'],
		];

		if (Auth::attempt($credentials)) {
			$user = User::query()
				->where('email', $postData['email'])
				->first();

			$token = $user->createToken($postData['token_name']);

			return response()->json([
				'user' => $user,
				'token' => $token->plainTextToken,
			]);
		}

		return response()->json(['error' => __('auth.failed')], 401);
	}
}
