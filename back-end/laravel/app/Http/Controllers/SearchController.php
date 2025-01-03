<?php

namespace App\Http\Controllers;

use App\Models\Search;
use Exception;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class SearchController extends Controller
{

    public function getSearches(){
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $searches = Search::where("user_id",$user->id)
                                ->latest()
                                ->paginate(8);

            return response()->json([
                "searches" => $searches
            ]);

        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage()
            ]);
        }
    }
    public function postSearch(Request $request){
        try {
            $request->validate([
                "query" => "required|string",
            ]);

            $user = JWTAuth::parseToken()->authenticate();
            Search::create([
                "user_id" => $user->id,
                "query" => $request->input('query'),
            ]);

            return response()->json([
                'message' => 'Search saved successfully'
            ]);

        } catch (Exception $ex) {
            return response()->json([
                'message' => $ex->getMessage(),
            ], 500);
        }
    }

    public function deleteSearch($id){
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $search = Search::where("user_id",$user->id)
                                ->where("id",$id)
                                ->first();
            if($search){
                $search->delete();
                return response()->json([
                    "message" => "Deleted successfully!",
                ]);
            }else{
                return response()->json([
                    "message" => "Already deleted!",
                ]);
            }

        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage()
            ]);
        }
    }
}
