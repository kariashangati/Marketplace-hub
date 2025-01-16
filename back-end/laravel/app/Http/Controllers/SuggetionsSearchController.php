<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class SuggetionsSearchController extends Controller
{

    public function getTopUsers(){
        try {
            $topUsers = Product::select(
                                DB::raw("COUNT(*) AS totalProducts"),
                                'store_id'
                            )
                            ->with('store.user')
                            ->groupBy('store_id')
                            ->orderByDesc('totalProducts')
                            ->limit(5)
                            ->get();

            return response()->json([
                "topUsers" => $topUsers,
            ]);

        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ]);
        }
    }


    public function searchByQuery(Request $request){
        try {
            $request->validate([
                "query" => "required|string",
            ]);

            $usersBasedOnQuery = User::where("username","LIKE","%". $request->query("query") ."%")
                                        ->orWhere("fullName", "LIKE", "%" . $request->query("query") . "%")
                                        ->limit(10)
                                        ->get();

            $productsBasedOnQuery = Product::where("status", "accepted")
                                        ->where(function ($query) use ($request) {
                                            $query->where("productName", "LIKE", "%" . $request->query("query") . "%")
                                                  ->orWhere("description", "LIKE", "%" . $request->query("query") . "%");
                                        })
                                        ->with("store.user")
                                        ->latest()
                                        ->limit(10)
                                        ->get();

            return response()->json([
                "usersBasedOnQuery" => $usersBasedOnQuery,
                "productsBasedOnQuery" => $productsBasedOnQuery,
            ]);

        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ]);
        }
    }
}
