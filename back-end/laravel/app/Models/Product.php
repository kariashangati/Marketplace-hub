<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Http;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'productName',
        'description',
        'category_id',
        'store_id',
        'product_image',
        'price',
        'status',
        'location',
        'delivry',
    ];

    protected static function booted()
    {
        static::deleting(function ($product) {
            try {
                Http::withHeaders([
                    "Authorization" => env("API_KEY")
                ])->delete("http://localhost:3000/api/deleteProductData",[
                    "productDeleted" => $product->id,
                ]);

            } catch (Exception $ex) {
                return response()->json([
                    "message" => $ex->getMessage(),
                ]);
            }
        });
    }

    public function store(){
        return $this->belongsTo(Store::class);
    }
    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function getDelivryAttribute($value){
        return $value === 1?
            "Possible deleivry"
            :"Impossible deleivry";
    }

    public function getProductImageAttribute($value){
        return $value ?
            asset('storage/products/'.$value)
            : asset("storage/products/productDefaultImage.png");
    }

    public function getStatusAttribute($value){
        return $value === 'pending' ?
            "Not accepted yet" : "Accepted by Admin";
    }
}
