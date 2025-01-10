<?php

namespace App\Http\Controllers;

use App\Models\Store;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class StoreController extends Controller
{
    public function getStoresUser($id)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $stores = Store::where("user_id", $id)->get();
            if ($stores) {
                return response()->json([
                    'stores' => $stores
                ]);
            } else {
                return response()->json([
                    'message' => 'This user has not created a store'
                ], 401);
            }
        } catch (Exception $ex) {
            return response()->json([
                'message' => $ex->getMessage()
            ], 500);
        }
    }

    public function getUserStores()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $stores = Store::where("user_id", $user->id)
                ->latest()
                ->get();

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


    public function createStore(Request $request){
        try {

            $request->validate([
                "storeName" => "required|max:50",
                "storeBio" => "required|max:200",
            ]);

            $storeName = $request->input("storeName");
            $storeBio = $request->input("storeBio");

            $user = JWTAuth::parseToken()->authenticate();

            Store::create([
                "user_id" => $user->id,
                "storeName" => $storeName,
                "bio" => $storeBio,
            ]);

            return response()->json([
                "message" => "New store created successfully!",
            ]);

        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage()
            ]);
        }
    }

    public function updateStore(Request $request){
        try{
            $user = JWTAuth::parseToken()->authenticate();

            $store = Store::where('user_id',$user->id)
                            ->where('id',$request->id)
                            ->first();

            if($store){
                $store->storeName = $request->storeName;
                $store->storeBio = $request->storeBio;
                return response()->json([
                    "message" => "Updated successfully!",
                ]);
            }else{
                return response()->json([
                    "message" => "Not found"
                ],404);
            }
        }catch (Exception $ex){
            return response()->json([
                "message" => $ex->getMessage()
            ]);
        }
    }
}
