<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'productName',
        'description',
        'category_id',
        'store_id',
        'productImage',
        'price',
        'likes',
        'status',
        'location',
        'delivry',
    ];

    public function store(){
        return $this->belongsTo(Store::class);
    }
    public function categories(){
        return $this->hasOne(Category::class);
    }
}
