<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Symfony\Component\HttpFoundation\Response;

class CheckIsSuperAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role): Response
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

            if ($user->role !== $role) {
                return response()->json([
                    "message" => "Unauthorized"
                ], 401);
            }
        } catch (Exception) {
            return response()->json([
                "message" => "Unauthorized"
            ], 401);
        }

        return $next($request);
    }
}
