<?php

namespace App\Http\Controllers;

use App\Models\Store;
use Exception;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class StoreController extends Controller
{
    public function getUserStores(){
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $stores = Store::where("user_id",$user->id)
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
    public function deleteStore($id){
        try{
            $store = Store::find($id);
            if($store){
                $store->delete();
                return response()->json([
                    'message'  => 'deleted store successfully'
                ]);
            }else{
                return response()->json([
                    'message' => 'store not found'
                ],400);
            }
        }catch (Exception $ex){
            return response()->json([
                'message' => $ex->getMessage(),
            ], 500);
        }

    }
}
