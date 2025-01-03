<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function addAdmin(Request $request)
    {
        try {
            $request->validate([
                'fullName' => 'required',
                'username' => 'required',
                'email' => 'required|email',
                'password' => 'required'
            ]);
            $fullName = $request->input('fullName');
            $username = $request->input('username');
            // $birthday = $request->input('birthday');
            // $role = $request->input('role');
            $email = $request->input('email');
            $password = $request->input('password');
            // $bio = $request->input('bio');
            // $profile_picture = $request->input('profile_picture');
            User::create([
                'fullName' => $fullName,
                'username' => $username,
                // 'birthday' => $birthday,
                // 'role' => $role,
                'email' => $email,
                'password' => $password,
                // 'bio' => $bio,
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

    public function getAdmins()
    {
        try {
            $admins = User::all();
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
}
