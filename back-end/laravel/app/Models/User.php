<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'fullName',
        'username',
        'birthday',
        'role',
        'email',
        'password',
        'bio',
        'profile_picture',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    protected static function booted()
    {
        static::deleting(function ($user) {
            try {
                Http::withHeaders([
                    "Authorization" => "Bearer " . env("API_KEY")
                ])->delete("http://localhost:3000/api/deleteUserData",[
                    "userDeleted" => $user->id,
                ]);

            } catch (Exception $ex) {
                return response()->json([
                    "message" => $ex->getMessage(),
                ]);
            }
        });
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
                'username'=>$this->username,
                'role'=>$this->role
            ];
    }

    public function products(){
        return $this->hasMany(Product::class);
    }

    public function stores(){
        return $this->hasMany(Store::class);
    }

    public function searches(){
        return $this->hasMany(Search::class);
    }

    public function saves(){
        return $this->hasMany(Save::class);
    }


    public function getProfilePictureAttribute($value){
        return $value ?
                    asset('storage/users/'.$value)
                    : asset('storage/users/userDefaultImage.jpg');
    }

    public function getBioAttribute($value){
        return $value ?
                    $value
                    : "hi👋, I am using marketplace hub App!";
    }
}
