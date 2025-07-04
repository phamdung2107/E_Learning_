<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Course;
use App\Http\Resources\CategoryResource;
use App\Helper\Response;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $keyword = $request->input('keyword');

        $query = Category::query();

        if ($keyword) {
            $query->where('name', 'like', "%$keyword%");
        }

        $categories = $query->get();

        return Response::data(CategoryResource::collection($categories), $categories->count());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:categories,id'
        ]);

        $category = Category::create($data);
        return Response::data(new CategoryResource($category));
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $category = Category::findOrFail($id);
        return Response::data(new CategoryResource($category));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'parent_id' => 'nullable|exists:categories,id'
        ]);

        $category = Category::findOrFail($id);
        $category->update($data);

        return Response::data();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return Response::data();
    }

    // [6] Lấy danh mục dạng cây
    public function getTree()
    {
        $categories = Category::get();

        $tree = $categories->whereNull('parent_id')->map(function ($parent) use ($categories) {
            $parent->children = $categories->where('parent_id', $parent->id)->values();
            return $parent;
        });

        return Response::data($tree, $tree->count());
    }

    // [7] Lấy danh mục con của danh mục cha
    public function getChildren($id)
    {
        $children = Category::where('parent_id', $id)->get();
        return Response::data(CategoryResource::collection($children), $children->count());
    }

    // [8] Lấy tất cả danh mục cấp cha
    public function getParentCategories()
    {
        $parents = Category::whereNull('parent_id')->get();
        return Response::data(CategoryResource::collection($parents), $parents->count());
    }

    // [9] Lấy danh sách khoá học thuộc 1 danh mục
    public function getCoursesByCategory($id)
    {
        $courses = Course::where('category_id', $id)->get();
        return Response::data($courses, $courses->count());
    }
}
