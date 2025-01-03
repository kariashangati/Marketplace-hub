<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{

    public function validateToken(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            return response()->json([
                'user' => $user,
                'role' => $user->role,
            ], 200);
        } catch (Exception $ex) {
            return response()->json(['message' => $ex->getMessage()], 500);
        }
    }


    public function checkUserLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $credentials = $request->only('email', 'password');
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid credentials',
            ], 401);
        }

        if (JWTAuth::user()->role === 'admin') {
            return response()->json([
                'userData' => JWTAuth::user(),
                'role' => 'admin',
                'token' => $token,
            ]);
        }

        if (JWTAuth::user()->role === 'user') {
            return response()->json([
                'userData' => JWTAuth::user(),
                'role' => 'user',
                'token' => $token,
            ]);
        }
    }


    public function sendVerificationCode(Request $request)
    {
        try {
            $request->validate([
                "email" => "required|email",
            ]);

            $email = $request->email;
            $userAlreadyExists = User::where("email", $email)->first();
            if ($userAlreadyExists) {
                return response()->json([
                    "message" => "User with this email already exists",
                ], 401);
            }

            $verificationCode = rand(100000, 999999);
            $firstName = $request->firstName;

            DB::table('verification_codes')->insert([
                'email' => $request->email,
                'verificationCode' => $verificationCode,
                'expires_at' => now()->addMinutes(5),
            ]);

            Mail::send('email.verification_code', ['verificationCode' => $verificationCode, 'firstName' => $firstName], function ($message) use ($email) {
                $message->to($email);
                $message->subject('Verification Code');
            });

            return response()->json([
                "message" => "Verification code sent successfully",
                "sended" => true,
            ], 200);
        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ], 500);
        }
    }


    public function checkVerificationCode(Request $request)
    {
        try {
            $request->validate([
                "email" => "required|email",
                "verificationCode" => "required",
                "firstName" => "required",
                "lastName" => "required",
                "password" => "required",
            ]);

            $validCode = DB::table("verification_codes")
                ->where("email", $request->email)
                ->where("verificationCode", $request->verificationCode)
                ->where("expires_at", ">", now())
                ->first();

            if (!$validCode) {
                return response()->json([
                    "message" => "Invalid verification code or expired!",
                ], 401);
            }
            $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            $defaultUsername = substr(str_shuffle($chars), 0, 8);

            User::create([
                "email" => $request->email,
                "password" => Hash::make($request->password),
                "fullName" => $request->firstName . " " . $request->lastName,
                "username" => $defaultUsername,
                "role" => "user",
            ]);

            return response()->json([
                "message" => "User created successfully",
            ], 200);
        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ], 500);
        }
    }


    public function sendForgotPasswordLink(Request $request)
    {
        try {

            $userExists = User::where("email", $request->email)->first();
            if (!$userExists) {
                return response()->json([
                    "message" => "User with this email does not exist",
                ], 401);
            }

            $status = Password::sendResetLink($request->only('email'));
            if ($status === Password::RESET_LINK_SENT) {
                return response()->json([
                    "message" => __($status),
                ], 200);
            }

            return response()->json([
                "message" => __($status),
            ], 401);
        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ], 500);
        }
    }


    public function resetPassword(Request $request)
    {
        try {
            $status = Password::reset(
                $request->only('email', 'password', 'password_confirmation', 'token'),
                function ($user, $password) {
                    $user->password = Hash::make($password);
                    $user->save();
                }
            );

            if ($status === Password::PASSWORD_RESET) {
                return response()->json([
                    "message" => __($status),
                ], 200);
            }

            return response()->json([
                "message" => __($status),
            ], 401);
        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ], 500);
        }
    }
}
