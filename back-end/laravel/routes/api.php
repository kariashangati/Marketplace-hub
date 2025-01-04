<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\StoreController;
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


// ->middleware(CheckRole::class . ":admin") this middleware is used to check the role of the user

Route::prefix("user")->group(function () {
    Route::get("/getUsers", [UserController::class, "getUsers"]);
    Route::delete("/deleteUser/{id}", [UserController::class, "deleteUser"]);
    Route::get("/viewUser/{id}", [UserController::class, "viewUser"]);
    Route::post("/editProfile", [UserController::class, "editProfile"]);
});


Route::prefix("category")->group(function () {
    Route::get("/viewcategories", [CategoryController::class, "viewCategories"]);
    Route::post("/addcategory", [CategoryController::class, "addCategory"]);
    Route::delete("/deleteCategory/{id}", [CategoryController::class, "deleteCategory"]);

});


Route::prefix("product")->group(function () {
    Route::get("/getSavedProducts", [ProductController::class, "getSavedProducts"]);
});



Route::prefix("admin")->group(function () {
    Route::get("/getAdmins", [AdminController::class, "getAdmins"]);
    Route::post("/addAdmin", [AdminController::class, "addAdmin"]);
});



Route::prefix("product")->group(function () {
    Route::get("/getProducts", [ProductController::class, "getProducts"]);
    Route::get("/getProductspending", [ProductController::class, "getProductspending"]);
    Route::get("/getSavedProducts", [ProductController::class, "getSavedProducts"]);
    Route::delete("/deleteProduct/{id}", [ProductController::class, "deleteProduct"]);
    Route::post("/addProduct", [ProductController::class, "addProduct"]);
});

Route::prefix("store")->group(function () {
    Route::get("/getUserStores", [StoreController::class, "getUserStores"]);
    Route::delete("/deleteStore/{id}", [StoreController::class, "deleteStore"]);
    Route::get("/searchStoresByName", [StoreController::class, "searchStoresByName"]);
    Route::get("/searchUsersByUsername", [UserController::class, "searchUsersByUsername"]);
    Route::get("/getStoresUsers", [StoreController::class, "getStoresUsers"]); // this function is used to get the stores of the users
});


Route::prefix("search")->group(function () {
    Route::post("/postSearch", [SearchController::class, "postSearch"]);
    Route::get("/getSearches", [SearchController::class, "getSearches"]);
    Route::delete("/deleteSearch/{id}", [SearchController::class, "deleteSearch"]);
});
