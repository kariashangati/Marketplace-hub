<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUsers()
    {
        try {
            $users = User::paginate(8);
            return response()->json([
                'users' => $users,
            ]);
        } catch (Exception $ex) {
            return response()->json([
                'message' => $ex->getMessage(),
            ], 500);
        }
    }

    public function deletUser($id)
    {
        try {
            $user = User::find($id);
            if ($user) {
                $user->delete();
                return response()->json([
                    'message' => 'User deleted successfully'
                ]);
            } else {
                return response()->json([
                    'message' => 'User not found'
                ]);
            }
        } catch (Exception $ex) {
            return response()->json([
                'message' => $ex->getMessage(),
            ], 500);
        }
    }
    public function viewUser($id)
    {
        try {
            $user = User::find($id);
            if ($user) {
                return response()->json([
                    "user" => $user,
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

    public function addAdmin(Request $request)
    {
        try {
            $fullName = $request->input('fullName');
            $username = $request->input('username');
            $birthday = $request->input('birthday');
            $role = $request->input('role');
            $email = $request->input('email');
            $password = $request->input('password');
            $bio = $request->input('bio');
            // $profile_picture = $request->input('profile_picture');
            User::create([
                'fullName' => $fullName,
                'username' => $username,
                'birthday' => $birthday,
                'role' => $role,
                'email' => $email,
                'password' => $password,
                'bio' => $bio,
                // 'profile_picture'=>$profile_picture,
            ]);
            return response()->json([
                "message" => "Admin created"
            ]);
        } catch (Exception $ex) {
            return response()->json([
                'messsage' => $ex->getMessage(),
            ], 500);
        }
    }

    public function getAdmin($id)
    {
        try {
            $admin = User::find($id);
            if ($admin) {
                return response()->json([
                    'admin' => $admin
                ]);
            } else {
                return response()->json([
                    "message" => "Admin not found"
                ]);
            }
        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ]);
        }
    }
}
