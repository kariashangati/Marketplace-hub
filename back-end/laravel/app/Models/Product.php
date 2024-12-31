<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'productName',
        'description',
        'category_id',
        'store_id',
        'productImage',
        'price',
        'likes',
        'stock',
        'location',
        'delivry',
    ];

    public function store(){
        return $this->hasOne(Store::class);
    }
    public function categories(){
        return $this->hasOne(Category::class);
    }
}
