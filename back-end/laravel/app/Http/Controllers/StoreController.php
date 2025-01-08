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
                ->paginate(3);

            return response()->json([
                "stores" => $stores,
            ]);
        } catch (Exception $ex) {
            return response()->json([
                'message' => $ex->getMessage(),
            ], 500);
        }
    }
    public function deleteStore($id)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $store = Store::where("id", $id)
                ->where("user_id", $user->id)->first();

            $adminDeleteStore = Store::where("id", $id)->first();

            if ($user->role === 'admin') {
                if ($adminDeleteStore) {
                    $adminDeleteStore->delete();
                    return response()->json([
                        'message'  => 'Store deleted successfully'
                    ]);
                }
            }
            if ($store) {
                $store->delete();
                return response()->json([
                    'message'  => 'Store deleted successfully'
                ]);
            } else {
                return response()->json([
                    'message' => 'Cannot delete store'
                ], 400);
            }
        } catch (Exception $ex) {
            return response()->json([
                'message' => $ex->getMessage(),
            ], 500);
        }
    }

    public function getStoresUsers()
    {
        try {
            $stores = Store::with('user')
                ->latest()
                ->paginate(10);

            if ($stores) {
                return response()->json([
                    'stores' => $stores,
                ]);
            } else {
                return response()->json([
                    'message' => 'Stores not found',
                ], 401);
            }
        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ], 500);
        }
    }

    public function searchStoresByName(Request $request)
    {
        try {
            $name = $request->input("name");
            $storesSearched = Store::where('storeName', 'LIKE', '%' . $name . '%')
                ->with('user')
                ->limit(5)
                ->get();
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
