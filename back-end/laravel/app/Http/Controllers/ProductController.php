<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\ReportedProduct;
use App\Models\Save;
use App\Models\Store;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class ProductController extends Controller
{
    public function deleteSavedProduct($product_id)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $productSaved = Save::where('user_id', $user->id)
                ->where("product_id", $product_id)
                ->first();

            if ($productSaved) {
                $productSaved->delete();
                return response()->json([
                    'message' => 'Product saved is Successfully deleted!!',
                ]);
            } else {
                return response()->json([
                    'message' => 'Unauthorized',
                ], 401);
            }
        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage()
            ], 500);
        }
    }

    public function acceptPendingProduct($id)
    {
        try {
            $productPending = Product::find($id);
            if ($productPending) {
                $productPending->status = 'accepted';
                $productPending->save();

                return response()->json([
                    'message' => 'Product accepted successfully!'
                ]);
            } else {
                return response()->json([
                    'message' => 'products not found'
                ], 401);
            }
        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage()
            ], 500);
        }
    }

    public function getProducts()
    {
        try {
            $products = Product::where("status", "accepted")
                ->with("store.user")
                ->with("category")
                ->latest()
                ->paginate(8);


            if ($products) {
                return response()->json([
                    'products' => $products,
                ]);
            } else {
                return response()->json([
                    'message' => 'products not found'
                ], 401);
            };
        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ], 500);
        }
    }
    public function getPendingProducts()
    {
        try {
            $products = Product::where("status", "pending")
                ->with("store.user")
                ->with("category")
                ->latest()
                ->paginate(10);


            if ($products) {
                return response()->json([
                    'products' => $products,
                ]);
            } else {
                return response()->json([
                    'message' => 'products not found'
                ], 401);
            };
        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ], 500);
        }
    }

    public function addProduct(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $request->validate([
                'productName' => 'required',
                'description' => 'required|max:400',
                'category_id' => 'required',
                'store_id' => 'required',
                'image' => 'required|mimes:jpeg,jpg,png,webp|max:2048',
                'price' => 'required|numeric',
                'location' => 'required',
                'delivry' => 'required|in:0,1'
            ]);

            $file = $request->file("image");
            $fileName = time() . "_" . $file->getClientOriginalName();

            $productName = $request->input('productName');
            $description = $request->input('description');
            $category_id = $request->input('category_id');
            $store_id = $request->input('store_id');
            $price = $request->input('price');
            $location = $request->input('location');
            $delivry = $request->input('delivry');
            $productImage = $fileName;

            $checkStoreUser = Store::where("id", $store_id)
                ->where("user_id", $user->id)
                ->first();

            $categoryExists = Category::find($category_id);

            if (!$checkStoreUser || !$categoryExists) {
                return response()->json([
                    "message" => "Unauthorized",
                ], 401);
            }

            $file->move('storage/products', $fileName);

            Product::create([
                'productName' => $productName,
                'description' => $description,
                'category_id' => $category_id,
                'store_id' => $store_id,
                'price' => $price,
                'productImage' => $productImage,
                'location' => $location,
                'delivry' => $delivry,
            ]);
            return response()->json([
                'message' => 'Product create successfully'
            ]);
        } catch (Exception $ex) {
            return response()->json([
                'messsage' => $ex->getMessage(),
            ], 500);
        }
    }
    public function deleteProduct($id)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $product = Product::where("id", $id)->with("store")->first();


            if ($product) {
                if ($user->role === 'admin' || $user->role === 'super admin') {
                    $product->delete();
                    return response()->json([
                        'message' => 'Product deleted successfully'
                    ]);
                }
            }
            if ($product->store->user_id === $user->id) {
                if ($product) {
                    $product->delete();
                    return response()->json([
                        'message' => 'Product deleted successfully'
                    ]);
                } else {
                    return response()->json([
                        'message' => 'Product not found'
                    ], 400);
                }
            } else {
                return response()->json([
                    'message' => 'Unauthorized'
                ], 400);
            }
        } catch (Exception $ex) {
            return response()->json([
                'message' => $ex->getMessage(),
            ], 500);
        }
    }
    public function getSavedProducts()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $savedProducts = Save::where("user_id", $user->id)
                ->with("product.store.user")
                ->paginate(10);

            return response()->json([
                'savedProducts' => $savedProducts,
            ]);
        } catch (Exception $ex) {
            return response()->json([
                'message' => $ex->getMessage(),
            ], 500);
        }
    }

    public function getReportedProducts()
    {
        try {
            $reportedProducts = ReportedProduct::select(
                DB::raw("COUNT(*) as totalReported"),
                "products.productName",
                "reported_products.product_id"
            )
                ->join('products', 'products.id', '=', 'reported_products.product_id')
                ->groupBy("products.productName", "reported_products.product_id")
                ->orderBy("totalReported", "desc")
                ->paginate(8);

            return response()->json([
                'reportedProducts' => $reportedProducts,
            ]);
        } catch (Exception $ex) {
            return response()->json([
                'message' => $ex->getMessage(),
            ], 500);
        }
    }

    public function getProductsByStore($id){
        try{
            $products = Product::where("store_id",$id)
                                ->with("store.user")
                                ->get();

            return response()->json([
                "products" => $products,
            ]);
        }catch(Exception $ex){
            return response()->json([
                "message" => $ex->getMessage(),
            ]);
        }
    }
}
