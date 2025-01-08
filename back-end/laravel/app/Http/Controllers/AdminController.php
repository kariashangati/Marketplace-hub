<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AdminController extends Controller
{
    public function addAdmin(Request $request)
    {
        try {
            $request->validate([
                'fullName' => 'required',
                'username' => 'required|unique:users',
                'email' => 'required|email|unique:users',
                'password' => 'required'
            ]);
            $fullName = $request->input('fullName');
            $username = $request->input('username');
            $email = $request->input('email');
            $password = $request->input('password');

            User::create([
                'fullName' => $fullName,
                'username' => $username,
                'role' => 'admin',
                'email' => $email,
                'password' => Hash::make($password),
            ]);
            return response()->json([
                "message" => "New admin created successfully!"
            ]);
        } catch (Exception $ex) {
            return response()->json([
                'message' => $ex->getMessage(),
            ], 500);
        }
    }

    public function getAdmins()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $admins = User::whereIn('role', ['admin', 'super admin'])
                            ->where('id', '!=', $user->id)
                            ->get();

            if ($admins) {
                return response()->json([
                    'admins' => $admins
                ]);
            } else {
                return response()->json([
                    "message" => "Admin not found"
                ], 401);
            }
        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ]);
        }
    }

    public function deleteAdmin($id){
        try {
            $user = User::find($id);
            if ($user) {
                $user->delete();
                return response()->json([
                    'message' => 'Admin deleted successfully'
                ]);
            } else {
                return response()->json([
                    'message' => 'User not found'
                ], 401);
            }
        } catch (Exception $ex) {
            return response()->json([
                'message' => $ex->getMessage(),
            ], 500);
        }
    }
}
