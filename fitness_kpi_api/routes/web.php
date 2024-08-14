<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/', function () {
    return view('welcome');
});

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UrlController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/user', function (Request $request) {
    try {
        return auth('sanctum')->user();
    } catch (\Exception $e) {
        return response()->json(['error' => 'Error retrieving user'], 500);
    }
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/shorten', [UrlController::class, 'shorten']);
    Route::get('/urls', [UrlController::class, 'index']);
    Route::get('/url/{shortUrl}', [UrlController::class, 'redirect']);
});
