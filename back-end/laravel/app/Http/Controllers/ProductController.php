<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Exception;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getProducts(){
        try{
            $products = Product::where("status","accepted")
                            ->with("store")
                            ->latest()
                            ->paginate(15);
                            

            if($products) {
                return response()->json([
                    'products' => $products ,
                ]);
            }else {
                return response()->json([
                    'message' => 'products not found'
                ],401);
            };
        }
        catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ],500);
        }
        
    }
    public function addProduct(Request $request){
        try{
            $request->validate([
                'productName' => 'required',
                'description' => 'required',
                'category_id' => 'required',
                'store_id' => 'required',
                'price' => 'required',
                'location' => 'required',
                'delivry' => 'required'
            ]);
            $productName = $request->input('productName');
            $description = $request->input('description');
            $category_id = $request->input('category_id');
            $store_id = $request->input('store_id');
            $price = $request->input('price');
            $location = $request->input('location');
            $delivry = $request->input('delivry');

            Product::create([
                'productName' => $productName,
                'description' => $description,
                'category_id' => $category_id,
                'store_id' => $store_id,
                'price' => $price,
                'location' => $location,
                'delivry' => $delivry,
            ]);
            return response()->json([
                'message' => 'create product successfully'
            ]);
        }catch (Exception $ex){
            return response()->json([
                'messsage' => $ex->getMessage(),
            ], 500);
        }
    }
    public function deleteProduct($id) {
        try{
            $product = Product::find($id);
            if($product){
                $product->delete();
                return response()->json([
                    'message' => 'product deleted successfully'
                ]);
            }else {
                return response()->json([
                    'message' => 'Product not found'
                ],400);
            }
        }catch (Exception $ex) {
            return response()->json([
                'message' => $ex->getMessage(),
            ], 500);
        }
    }
}
