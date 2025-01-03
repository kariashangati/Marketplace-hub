<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\CheckRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Psy\VersionUpdater\Checker;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/validateToken', [AuthController::class, 'validateToken']);

Route::prefix("auth")->group(function () {
    Route::post("/login", [AuthController::class, "checkUserLogin"]);
    Route::post("/sendVerificationCode", [AuthController::class, "sendVerificationCode"]);
    Route::post("/checkVerificationCode", [AuthController::class, "checkVerificationCode"]);
    Route::post("/forgotPassword", [AuthController::class, "sendForgotPasswordLink"]);
    Route::post("/resetPassword", [AuthController::class, "resetPassword"]);
});

Route::prefix("user")->middleware(CheckRole::class . ":admin")->group(function () {
    Route::get("/users", [UserController::class, "getUsers"]);
    Route::delete("/deleteUser/{id}", [UserController::class, "deletUser"]);
    Route::get("/viewUser/{id}", [UserController::class, "viewUser"]);
});

Route::prefix("category")->middleware(CheckRole::class . ":admin")->group(function () {
    Route::get("/viewcategories", [CategoryController::class, "viewCategories"]);
    Route::post("/addcategory", [CategoryController::class, "addCategory"]);
});


Route::prefix("admin")->middleware(CheckRole::class . ":admin")->group(function () {
    Route::get("/getadmin", [UserController::class, "getAdmins"]);
    Route::post("/addadmin", [UserController::class, "addAdmin"]);
});
