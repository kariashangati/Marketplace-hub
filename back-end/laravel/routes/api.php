<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/validateToken', [AuthController::class, 'validateToken']);

Route::prefix("auth")->group(function(){
    Route::post("/login",[AuthController::class,"checkUserLogin"]);
    Route::post("/sendVerificationCode",[AuthController::class,"sendVerificationCode"]);
    Route::post("/checkVerificationCode",[AuthController::class,"checkVerificationCode"]);
    Route::post("/forgotPassword",[AuthController::class,"sendForgotPasswordLink"]);
    Route::post("/resetPassword",[AuthController::class,"resetPassword"]);
});

Route::prefix("user")->group(function(){
    Route::get("/users",[UserController::class,"getUsers"]);
    Route::delete("/deleteUser/{id}",[UserController::class,"deletUser"]);
    Route::get("/viewUser/{id}",[UserController::class,"viewUser"]);
});