<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Exception;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function addCategory(Request $request)
    {
        try {
            $request->validate([
                'categoryName' => 'required',
            ]);
            $categoryName = $request->input('categoryName');
            Category::create([
                "categoryName" => $categoryName,
            ]);
            return response()->json([
                'message' => 'Category created',
            ]);
        } catch (Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage(),
            ], 500);
        }
    }

    public function viewCategories()
    {
        try {
            $categories = Category::all();
            if ($categories) {
                return response()->json([
                    "categories" => $categories
                ], 200);
            } else {
                return response()->json([
                    'message' => 'Catregory not found',
                ], 401);
            }
        } catch (Exception $ex) {
            return response()->json([
                'message' => $ex->getMessage(),
            ], 500);
        }
    }
    public function deleteCategory($id) {
        try{
            $category = Category::find($id);
            if($category){
                $category->delete();
                return response()->json([
                    'message' => 'Category deleted successfully'
                ]);
            }else {
                return response()->json([
                    'message' => 'Cannot delete category'
                ],400);
            }
        }catch (Exception $ex) {
            return response()->json([
                'message' => $ex->getMessage(),
            ], 500);
        }
    }
}
