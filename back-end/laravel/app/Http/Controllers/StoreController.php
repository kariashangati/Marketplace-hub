<?php

namespace App\Http\Controllers;

use App\Models\Store;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class StoreController extends Controller
{
    public function getUserStores()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $stores = Store::where("user_id", $user->id)
                ->latest()
                ->paginate(8);

            return response()->json([
                "stores" => $stores,
            ]);

            return response()->json([
                'stores' => $stores,
            ]);
        } catch (Exception $ex) {
            return response()->json([
                'message' => $ex->getMessage(),
            ], 500);
        }
    }

    /*
    public function getStores()
    {
        try {

            $stores = Store::where('user_id')
                ->with('users');
            return response()->json([

                "stores" => $stores
            ]);
        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ], 500);
        }
    }
        */

    public function searchStoresName(Request $request)
    {
        try {
            $name = $request->input("name");
            $storesSearched = Store::where('storeName', 'LIKE', '%' . $name . '%')
                ->paginate(5);
            if ($storesSearched) {
                return response()->json([
                    'storesSearched' => $storesSearched
                ]);
            } else {
                return response()->json([
                    'message' => "Store not found"
                ], 401);
            }
        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage()
            ]);
        }
    }
}
