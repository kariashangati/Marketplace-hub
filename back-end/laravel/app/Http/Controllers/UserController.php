<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUsers(){
        try{
            $users = User::paginate(8);
            return response()->json([
                'users' => $users, 
            ]);

        }catch(Exception $ex){
            return response()->json([
                'message' => $ex->getMessage(),
            ],500);
        }
    }

    public function deletUser($id){
        try{
            $user = User::find($id);
            if($user){
                $user->delete();
                return response()->json([
                    'message' => 'User deleted successfully'
                ]);
            }else{
                return response()->json([
                    'message' => 'User not found'
                ]);
            }
        }catch(Exception $ex){
            return response()->json([
                'message' => $ex->getMessage(),
            ],500);
        }
    }
    public function viewUser($id){
        try{
            $user = User::find($id);
            if($user){
                return response()->json([
                    'message' => 'User found successfully'
                ]);
            }else{
                return response()->json([
                    'message' => 'User not found'
                ]);
            }
        }catch(Exception $ex){
            return response()->json([
                'message' => $ex->getMessage(),
            ],500);
        }
    }
    
}
