<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\CheckAuthentication;
use App\Http\Middleware\CheckIsSuperAdmin;
use App\Http\Middleware\CheckRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Psy\VersionUpdater\Checker;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/validateToken', [AuthController::class, 'validateToken']); // used to verify within user is authenticated

Route::prefix("auth")->group(function () {
    Route::post("/login", [AuthController::class, "checkUserLogin"]); // checks for user login
    Route::post("/sendVerificationCode", [AuthController::class, "sendVerificationCode"]); // send verification code for registerd user
    Route::post("/checkVerificationCode", [AuthController::class, "checkVerificationCode"]); // checks the verification code if correct
    Route::post("/forgotPassword", [AuthController::class, "sendForgotPasswordLink"]); // send a reset link for user who forgot password
    Route::post("/resetPassword", [AuthController::class, "resetPassword"]); // checks if the token is valid and reset the password
});


Route::prefix("user")->group(function () {
    Route::get("/getUsers", [UserController::class, "getUsers"])->middleware(CheckRole::class . ":admin,super admin"); // get all users only admins can see this
    Route::delete("/deleteUser/{id}", [UserController::class, "deleteUser"])->middleware(CheckRole::class . ":admin,super admin"); // delete a user only admins can do this
    Route::get("/searchUsersByUsername", [UserController::class, "searchUsersByUsername"])->middleware(CheckAuthentication::class); // search users by username
    Route::get("/getUserData", [UserController::class, "getUserData"])->middleware(CheckAuthentication::class);
    Route::get("/viewUser/{id}", [UserController::class, "viewUser"])->middleware(CheckAuthentication::class);  // view user data admin,users can see this
    Route::post("/editProfile", [UserController::class, "editProfile"])->middleware(CheckAuthentication::class); // only user authenticated can edit his profile

});


Route::prefix("category")->group(function () {
    Route::get("/viewCategories", [CategoryController::class, "viewCategories"])->middleware(CheckAuthentication::class); // admins,users can view categories
    Route::post("/addCategory", [CategoryController::class, "addCategory"])->middleware(CheckRole::class . ":admin,super admin"); // only admins can add category
    Route::delete("/deleteCategory/{id}", [CategoryController::class, "deleteCategory"])->middleware(CheckRole::class . ":admin,super admin"); // only admins can delete category
});



Route::prefix("admin")->group(function () {
    Route::get("/getAdminDataDashboard", [DashboardController::class, "getAdminDashboardData"])->middleware(CheckRole::class . ":admin,super admin"); // get the admin dashboard data
    Route::get("/getAdmins", [AdminController::class, "getAdmins"])->middleware(CheckRole::class . ":admin,super admin"); // only admins can see each others
    Route::post("/addAdmin", [AdminController::class, "addAdmin"])->middleware(CheckIsSuperAdmin::class . ":super admin"); // only super admins can add other admins
    Route::delete("/deleteAdmin/{id}", [AdminController::class, "deleteAdmin"])->middleware(CheckIsSuperAdmin::class . ":super admin"); // only super admins can add other admins
});



Route::prefix("product")->group(function () {
    Route::get("/getProducts", [ProductController::class, "getProducts"]); // get all accepted products with stores users and admins can see this
    Route::get("/getPendingProducts", [ProductController::class, "getPendingProducts"])->middleware(CheckRole::class . ":admin,super admin"); // get pending products only admins can see this
    Route::get("/getSavedProducts", [ProductController::class, "getSavedProducts"])->middleware(CheckAuthentication::class); // get the authenticated user saved products
    Route::delete("/deleteProduct/{id}", [ProductController::class, "deleteProduct"]); // delete a product
    Route::post("/addProduct", [ProductController::class, "addProduct"])->middleware(CheckAuthentication::class); // add a product users and admins
    Route::delete("/deleteSavedProduct/{product_id}", [ProductController::class, "deleteSavedProduct"])->middleware(CheckAuthentication::class); // delete a saved product
    Route::put("/acceptPendingProduct/{id}", [ProductController::class, "acceptPendingProduct"])->middleware(CheckRole::class . ":admin,super admin"); // accept a pending product by admins
    Route::get("/reportedProducts", [ProductController::class, "getReportedProducts"])->middleware(CheckRole::class . ":admin,super admin");
    Route::get("/getFilteredProducts", [ProductController::class, "filterProducts"])->middleware(CheckAuthentication::class);//  get filtred products

});

Route::prefix("store")->group(function () {
    Route::get("/getUserStores", [StoreController::class, "getUserStores"])->middleware(CheckAuthentication::class); // get the user stores
    Route::delete("/deleteStore/{id}", [StoreController::class, "deleteStore"])->middleware(CheckAuthentication::class); // delete a store
    Route::get("/searchStoresByName", [StoreController::class, "searchStoresByName"]); // search stores by name admins and users can do this
    Route::get("/getStoresUsers", [StoreController::class, "getStoresUsers"]); // this function is used to get the stores of the users
    Route::get("/getStoresUser/{id}", [StoreController::class, "getStoresUser"]); // get store created for user. only user authenticated can edit his profile
    Route::post("/createStore",[StoreController::class, "createStore"]);
    Route::put("/updateStore", [StoreController::class, "updateStore"])->middleware(CheckAuthentication::class);
});


Route::prefix("search")->middleware(CheckAuthentication::class)->group(function () {
    Route::post("/postSearch", [SearchController::class, "postSearch"]); // save a searched query if user search for somthing
    Route::get("/getSearches", [SearchController::class, "getSearches"]); // get searched query's by users
    Route::delete("/deleteSearch/{id}", [SearchController::class, "deleteSearch"]); // delete a searched query
});
