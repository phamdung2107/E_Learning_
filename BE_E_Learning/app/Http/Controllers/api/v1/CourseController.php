<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Http\Resources\CourseResource;
use App\Http\Requests\CreateCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Helper\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Course::query()
            ->when($request->search, function ($q) use ($request) {
                $q->where(function ($sub) use ($request) {
                    $sub->where('title', 'like', '%' . $request->search . '%');
                });
            })
            ->when($request->category_id, function ($q) use ($request) {
                $q->where('category_id', $request->category_id);
            })
            ->when($request->instructor_id, function ($q) use ($request) {
                $q->where('instructor_id', $request->instructor_id);
            });

        $courses = $query->get();

        return Response::data(CourseResource::collection($courses), $courses->count());
    }


    /**
     * Store a newly created resource in storage.
     */
     public function store(CreateCourseRequest $request)
    {
        $course = Course::create($request->validated());
        return Response::data(new CourseResource($course));
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $course = Course::findOrFail($id);
        return Response::data(new CourseResource($course));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseRequest $request, $id)
    {
        $course = Course::findOrFail($id);
        $course->update($request->validated());
        return Response::data(new CourseResource($course));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $course = Course::findOrFail($id);
        $course->delete();
    
        return Response::data();
    }

    // [9] Danh sách khoá học đã đăng ký
    public function getMyCourses(Request $request)
    {
        $user = $request->user();
        $courses = $user->enrollments()->with('course')->get()->pluck('course');
        return Response::data($courses, $courses->count());
    }

    // [13] Publish khoá học
    public function publish($id)
    {
        $course = Course::findOrFail($id);
        $course->status = 'published';
        $course->save();
        return Response::data(['message' => 'Published']);
    }

     // [14] Archive khoá học
    public function archive($id)
    {
        $course = Course::findOrFail($id);
        $course->status = 'archived';
        $course->save();
        return Response::data(['message' => 'Archived']);
    }
}
