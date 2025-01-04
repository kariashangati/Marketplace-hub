<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\Rule;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

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

    public function deleteUser($id)
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
                ], 401);
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

    public function editProfile(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

            $request->validate([
                'fullName' => 'required',
                'username' => [
                    'required',
                    Rule::unique('users', 'username')->ignore($user->id),
                ],
                'birthday' => 'date',
                'bio' => 'max:300',
            ]);

            if ($request->hasFile('image')) {
                $request->validate([
                    "image" => "mimes:jpeg,jpg,png|max:2048",
                ]);

                $image_path = $user->profile_picture;
                $relativePath = parse_url($image_path, PHP_URL_PATH);
                $filePath = public_path($relativePath);

                if (File::exists($filePath) && $image_path !== 'http://localhost:8000/storage/profile_pictures/default.png') {
                    File::delete($filePath);
                }

                $file = $request->file("image");
                $fileName = time() . "_" . $file->getClientOriginalName();
                $file->move('storage/users', $fileName);
                $user->profile_picture = $fileName;
            }

            $user->fullName = $request->fullName;
            $user->username = $request->username;
            $user->birthday = $request->birthday;
            $user->bio = $request->bio;
            $user->save();

            return response()->json([
                "message" => "Profile updated successfully",
            ]);
        } catch (Exception $ex) {
            return response()->json([
                'message' => $ex->getMessage(),
            ], 500);
        }
    }

    public function searchUsersByUserName(Request $request)
    {
        try {
            $userName = $request->input("username");
            $users = User::where('username', 'LIKE', '%' . $userName . '%')
                ->paginate(5);
            if ($users) {
                return response()->json([
                    "user" => $users
                ]);
            } else {
                return response()->json([
                    "message" => "User not found"
                ], 401);
            }
        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage()
            ]);
        }
    }
}
