<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\ReportedProduct;
use App\Models\Save;
use App\Models\Store;
use Exception;
use GuzzleHttp\Psr7\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PHPOpenSourceSaver\JWTAuth\Claims\JwtId;
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
                ->latest("updated_at")
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

    public function addSavedProduct(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $request->validate([
                'product_id' => 'required'
            ]);

            $user_id = $user->id;
            $product_id = $request->input('product_id');

            $save = Save::where('user_id', $user_id)->where('product_id', $product_id)->first();
            if ($save) {
                $save->delete();
                return response()->json([
                    'message' => 'This product is already save. He deleted something in the saves'
                ], 201);
            }

            Save::create([
                'user_id' => $user_id,
                'product_id' => $product_id
            ]);
            return response()->json([
                'message' => 'Product is saved'
            ]);
        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage()
            ]);
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
                'product_image' => $productImage,
                'location' => $location,
                'delivry' => $delivry,
            ]);
            return response()->json([
                'message' => 'Waiting for admin to accept it'
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
                ->latest()
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

    public function addProductReported(Request $request)
    {
        try {

            $user = JWTAuth::parseToken()->authenticate();

            $request->validate([
                'product_id' => 'required'
            ]);

            $user_id = $user->id;
            $product_id = $request->input('product_id');

            $product = ReportedProduct::where('user_id', $user_id)
                ->where('product_id', $product_id)
                ->first();

            if ($product) {
                return response()->json([
                    'message' => 'This product is already reprorted'
                ], 201);
            }

            ReportedProduct::create([
                'user_id' => $user_id,
                'product_id' => $product_id
            ]);
            return response()->json([
                'message' => 'This product is reported'
            ]);
        } catch (Exception $ex) {
            return response()->json([
                'message' => $ex->getMessage(),
            ], 500);
        }
    }

    public function deleteProductReported($product_id)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

            $user_id = $user->id;
            $productReported = ReportedProduct::where('user_id', $user_id)
                ->where('product_id', $product_id)
                ->first();

            if ($productReported) {
                if ($user->role == 'user') {
                    $productReported->delete();
                    return response()->json([
                        'message' => 'Delete product is successfully'
                    ]);
                } else {
                    return response()->json([
                        'message' => 'Unauthorized'
                    ], 401);
                };
            } else {
                return response()->json([
                    'message' => 'Product not found'
                ], 404);
            }
        } catch (Exception $ex) {
            return response()->json([
                'message' => $ex->getMessage(),
            ], 500);
        }
    }

    public function filterProducts(Request $request)
    {
        try {
            $request->validate([
                'category_id' => 'required',
                'price' => 'required|string',
                'delivry' => 'required',
            ]);


            $category_id = $request->query('category_id');
            $prix = $request->query("price");
            $priceRange = explode("-", $prix);
            $minPrice = $priceRange[0];
            $maxPrice = $priceRange[1];
            $delivry = $request->query('delivry');


            $filteredProducts = Product::where("category_id", $category_id)
                ->whereBetween("price", [$minPrice, $maxPrice])
                ->where('delivry', $delivry)
                ->with('store.user')
                ->latest()
                ->paginate(8);
            if ($filteredProducts) {
                return response()->json([
                    'products' => $filteredProducts,
                ]);
            } else {
                return response()->json([
                    'message' => 'Product not found'
                ], 404);
            }
        } catch (Exception $ex) {
            return response()->json([
                'message' => $ex->getMessage(),
            ], 500);
        }
    }

    public function getProductsByStore($id)
    {
        try {
            $products = Product::where("store_id", $id)
                ->with("store.user")
                ->latest()
                ->get();

            return response()->json([
                "products" => $products,
            ]);
        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ]);
        }
    }

    public function getProductDetails(Request $request){
        try{
            $user = JWTAuth::parseToken()->authenticate();
            $productDetailsForAdmin = Product::where("id",$request->query("productId"))
                    ->with("store.user")
                    ->with("category")
                    ->first();

            if($user->role === 'admin' || $user->role === 'super admin'){
                return response()->json([
                    "product" => $productDetailsForAdmin
                ]);
            }
            $product = Product::where("id",$request->query("productId"))
                    ->where("status","accepted")
                    ->with("store.user")
                    ->with("category")
                    ->first();

            return response()->json([
                "product" => $product,
            ]);

        }catch(Exception $ex){
            return response()->json([
                "message" => $ex->getMessage(),
            ]);
        }
    }
}
