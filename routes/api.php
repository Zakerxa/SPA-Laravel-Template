<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;


// Protected Route
Route::group(['middleware'=>['auth:sanctum']],function(){
    Route::get('user/logout',[AuthController::class,'logout']);
});


Route::post('user/register',[AuthController::class,'register']);
Route::post('user/login',[AuthController::class,'login']);


