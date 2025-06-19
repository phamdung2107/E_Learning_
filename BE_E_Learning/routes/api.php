<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\CheckRole;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('register', [App\Http\Controllers\api\v1\AuthController::class, 'register']);
Route::post('login', [App\Http\Controllers\api\v1\AuthController::class, 'login']);
