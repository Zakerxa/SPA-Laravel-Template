<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;


// Protected Route
Route::group(['middleware'=>['auth:sanctum']],function(){

});


Route::post('user/login',[AuthController::class,'login']);
Route::post('user/register',[AuthController::class,'register']);
