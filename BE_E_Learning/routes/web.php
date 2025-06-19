<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\CheckRole;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', fn() => auth()->user());

    

    Route::get('/instructor/dashboard', fn() => 'Chào Instructor!')
        ->middleware(CheckRole::class.':instructor');

    Route::get('/courses/my', fn() => 'Khóa học của bạn!')
        ->middleware(CheckRole::class.':student,instructor');
});
Route::get('/admin/dashboard', fn() => 'Chào Admin!')
        ->middleware(CheckRole::class.':admin');

Route::get('/', function () {
    return view('welcome');
});
