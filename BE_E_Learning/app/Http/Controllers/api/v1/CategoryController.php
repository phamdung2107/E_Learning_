<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Course;
use App\Http\Resources\CategoryResource;
use App\Helper\Response;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Category",
 *     description="Quản lý danh mục khóa học"
 * )
 */
class CategoryController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/categories",
     *     summary="Lấy danh sách tất cả danh mục",
     *     tags={"Category"},
     *     @OA\Parameter(
     *         name="keyword",
     *         in="query",
     *         description="Tìm kiếm theo tên",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Danh sách danh mục"
     *     )
     * )
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
     * @OA\Post(
     *     path="/api/categories",
     *     summary="Tạo danh mục mới",
     *     tags={"Category"},
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             required={"name"},
     *             @OA\Property(property="name", type="string", example="Lập trình"),
     *             @OA\Property(property="parent_id", type="integer", nullable=true, example=1)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Danh mục đã được tạo"
     *     )
     * )
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
     * @OA\Get(
     *     path="/api/categories/{id}",
     *     summary="Lấy chi tiết một danh mục",
     *     tags={"Category"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID danh mục",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Chi tiết danh mục"
     *     )
     * )
     */
    public function show($id)
    {
        $category = Category::findOrFail($id);
        return Response::data(new CategoryResource($category));
    }

    /**
     * @OA\Put(
     *     path="/api/categories/{id}",
     *     summary="Cập nhật danh mục",
     *     tags={"Category"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID danh mục",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", example="Thiết kế"),
     *             @OA\Property(property="parent_id", type="integer", nullable=true)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Danh mục đã được cập nhật"
     *     )
     * )
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
     * @OA\Delete(
     *     path="/api/categories/{id}",
     *     summary="Xóa danh mục",
     *     tags={"Category"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID danh mục",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Xóa thành công"
     *     )
     * )
     */
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return Response::data();
    }

    // [6] Lấy danh mục dạng cây
    /**
     * @OA\Get(
     *     path="/api/categories/tree/all",
     *     summary="Lấy danh mục dạng cây",
     *     tags={"Category"},
     *     @OA\Response(
     *         response=200,
     *         description="Danh mục dạng cây"
     *     )
     * )
     */
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
    /**
     * @OA\Get(
     *     path="/api/categories/{id}/children",
     *     summary="Lấy danh mục con",
     *     tags={"Category"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID danh mục cha",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Danh sách danh mục con"
     *     )
     * )
     */
    public function getChildren($id)
    {
        $children = Category::where('parent_id', $id)->get();
        return Response::data(CategoryResource::collection($children), $children->count());
    }

    // [8] Lấy tất cả danh mục cấp cha
    /**
     * @OA\Get(
     *     path="/api/v1/categories/parents",
     *     summary="Lấy tất cả danh mục cấp cha",
     *     tags={"Category"},
     *     @OA\Response(
     *         response=200,
     *         description="Danh sách danh mục cha"
     *     )
     * )
     */
    public function getParentCategories()
    {
        $parents = Category::whereNull('parent_id')->get();
        return Response::data(CategoryResource::collection($parents), $parents->count());
    }

    // [9] Lấy danh sách khoá học thuộc 1 danh mục
    /**
     * @OA\Get(
     *     path="/api/categories/{id}/courses",
     *     summary="Lấy danh sách khóa học theo danh mục",
     *     tags={"Category"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID danh mục",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Danh sách khóa học thuộc danh mục"
     *     )
     * )
     */
    public function getCoursesByCategory($id)
    {
        $courses = Course::where('category_id', $id)->get();
        return Response::data($courses, $courses->count());
    }
}
