<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Store;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class DashboardController extends Controller
{
    public function getAdminDashboardData(){
        try{
            $user = JWTAuth::parseToken()->authenticate();
            $totalUsers = User::count();
            $totalPendingProducts = Product::where("status","pending")->count();
            $totalProducts = Product::count();
            $totalStores = Store::count();

            $firstGraphData = DB::table('products')
                            ->select(
                                DB::raw("DATE_FORMAT(created_at, '%Y-%m') as month"),
                                DB::raw('COUNT(*) as total')
                            )
                            ->where('created_at', '>=', Carbon::now()->subMonths(6))
                            ->groupBy(DB::raw("DATE_FORMAT(created_at, '%Y-%m')"))
                            ->orderBy('month', 'asc')
                            ->get();

            $secondGraphData = DB::table('products')
                            ->join('categories', 'products.category_id', '=', 'categories.id')
                            ->select('categories.categoryName as categoryName', DB::raw('COUNT(products.id) as total'))
                            ->groupBy('categories.categoryName')
                            ->orderBy('total','desc')
                            ->get();

            $recentlyRegisteredUsers = User::where("id","!=",$user->id)
                                            ->latest()
                                            ->limit(10)
                                            ->get();

            $recentlyPostedProducts = Product::latest()
                                            ->with("store.user")
                                            ->limit(10)
                                            ->get();

            return response()->json([
                "userFullName" => $user->fullName,
                "totalUsers" => $totalUsers,
                "totalPendingProducts" => $totalPendingProducts,
                "totalProducts" => $totalProducts,
                "totalStores" => $totalStores,
                "firstGraphData" => $firstGraphData,
                "secondGraphData" => $secondGraphData,
                "recentlyRegisteredUsers" => $recentlyRegisteredUsers,
                "recentlyPostedProducts" => $recentlyPostedProducts
            ]);


        }catch(Exception $ex){
            return response()->json([
                "message" => $ex->getMessage(),
            ]);
        }
    }
}
