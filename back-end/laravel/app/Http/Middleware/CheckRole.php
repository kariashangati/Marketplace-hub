<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string $role
     * @return \Symfony\Component\HttpFoundation\Response
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
