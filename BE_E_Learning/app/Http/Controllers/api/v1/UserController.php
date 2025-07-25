<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Instructor;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Resources\UserResource;
use App\Helper\Response;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/users",
     *     summary="Danh sách người dùng",
     *     tags={"User"},
     *     @OA\Parameter(name="role", in="query", @OA\Schema(type="string")),
     *     @OA\Parameter(name="position_id", in="query", @OA\Schema(type="integer")),
     *     @OA\Parameter(name="search", in="query", @OA\Schema(type="string")),
     *     @OA\Parameter(name="status", in="query", @OA\Schema(type="string")),
     *     @OA\Response(response=200, description="Danh sách người dùng")
     * )
     */
    public function index(Request $request)
    {
        $users = User::when($request->role, function ($q) use ($request) {
                $q->where('role', $request->role);
            })
            ->when($request->position_id, function ($q) use ($request) {
                $q->where('position_id', $request->position_id);
            })
            ->when($request->search, function ($q) use ($request) {
                $q->where(function ($q) use ($request) {
                    $q->where('full_name', 'like', "%{$request->search}%")
                    ->orWhere('email', 'like', "%{$request->search}%");
                });
            })
            ->when($request->status, function ($q) use ($request) {
                $q->where('status', $request->status);
            })
            ->get();
        
        return Response::data(UserResource::collection($users), $users->count());
    }

    /**
     * @OA\Post(
     *     path="/api/users",
     *     summary="Tạo mới người dùng",
     *     tags={"User"},
     *      @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"full_name", "email", "password", "role"},
 *             @OA\Property(property="full_name", type="string", example="Nguyễn Văn A"),
 *             @OA\Property(property="email", type="string", example="nguyenvana@example.com"),
 *             @OA\Property(property="password", type="string", example="12345678"),
 *             @OA\Property(property="role", type="string", example="student")
 *         )
 *     ),
     *     @OA\Response(response=200, description="Đã tạo người dùng")
     * )
     */
    public function store(CreateUserRequest $request)
    {
        $user = User::create($request->all());

        return Response::data();
    }

    /**
     * @OA\Get(
     *     path="/api/users/{id}",
     *     summary="Chi tiết người dùng",
     *     tags={"User"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Thông tin người dùng")
     * )
     */
    public function show($id)
    {
        $user = User::findOrFail($id);

        return Response::data(new UserResource($user));
    }

    /**
     * @OA\Put(
     *     path="/api/users/{id}",
     *     summary="Cập nhật thông tin người dùng",
     *     tags={"User"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *    @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="full_name", type="string", example="Nguyễn Văn B"),
 *             @OA\Property(property="email", type="string", example="nguyenvanb@example.com"),
 *             @OA\Property(property="avatar", type="string", format="binary"),
 *             @OA\Property(property="gender", type="string", example="male"),
 *             @OA\Property(property="date_of_birth", type="string", format="date", example="2000-01-01")
 *         )
 *     ),
     *     @OA\Response(response=200, description="Người dùng đã được cập nhật")
     * )
     */
    public function update(UpdateUserRequest $request, $id)
    {
        $user = User::findOrFail($id);
        $data = $request->validated();

        // Xử lý avatar
        if ($request->hasFile('avatar')) {
            // Xóa avatar cũ nếu có
            if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
                Storage::disk('public')->delete($user->avatar);
            }

            // Lưu avatar mới
            $data['avatar'] = $request->file('avatar')->store('avatars', 'public');
        }

        // Cập nhật role nếu được truyền vào
        if ($request->filled('role')) {
            $data['role'] = $request->role;
        }

        $user->update($data);

        return Response::data();
    }

    /**
     * @OA\Patch(
     *     path="/api/admin/change-role/{user}",
     *     summary="Cập nhật trạng thái người dùng",
     *     tags={"User"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody(@OA\JsonContent(
     *         @OA\Property(property="role", type="string")
     *     )),
     *     @OA\Response(response=200, description="Trạng thái đã được cập nhật")
     * )
     */
    public function updateRole(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->role = $request->role;
        $user->save();
        if ($request->role === 'instructor') {
        $exists = Instructor::where('user_id', $user->id)->exists();

        if (!$exists) {
            Instructor::create([
                'user_id' => $user->id,
            ]);
        }
    }

        return Response::data();
    }

    /**
     * @OA\Patch(
     *     path="/api/admin/change-role/{user}",
     *     summary="Cập nhật trạng thái người dùng",
     *     tags={"User"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody(@OA\JsonContent(
     *         @OA\Property(property="status", type="string")
     *     )),
     *     @OA\Response(response=200, description="Trạng thái đã được cập nhật")
     * )
     */
    public function updateStatus (Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->status = $request->status;
        $user->save();

        return Response::data();
    }

    /**
     * @OA\Delete(
     *     path="/api/users/{id}",
     *     summary="Xoá người dùng",
     *     tags={"User"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Đã xoá người dùng")
     * )
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return Response::data();
    }

    /**
     * @OA\Post(
     *     path="/api/users/change-password",
     *     summary="Đổi mật khẩu người dùng đang đăng nhập",
     *     tags={"User"},
     *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"oldPassword", "newPassword"},
 *             @OA\Property(property="oldPassword", type="string", example="12345678"),
 *             @OA\Property(property="newPassword", type="string", example="87654321")
 *         )
 *     ),
     *     @OA\Response(response=200, description="Đã đổi mật khẩu")
     * )
     */
    public function changePassword(ChangePasswordRequest $request): array
    {
        $user = Auth::user();
        if (!Hash::check($request->get('oldPassword'), $user->password)) {
            return Response::dataError('Mật khẩu không đúng');
        }

        $user->password = Hash::make($request->get('newPassword', config('app.password_default')));
        $user->save();

        return Response::data();
    }

    /**
     * @OA\Post(
     *     path="/api/users/reset-users/{user}",
     *     summary="Admin đặt lại mật khẩu người dùng",
     *     tags={"User"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Mật khẩu đã được đặt lại")
     * )
     */
    public function resetUserPassword($id): array
    {
        $defaultPassword  = config('app.password_default');

        $user = User::withoutGlobalScope('deleted')->findOrFail($id);
        $user->password = Hash::make($defaultPassword);
        $user->save();

        return Response::data();
    }

    /**
     * @OA\Get(
     *     path="/api/admin/countusers",
     *     summary="Thống kê số lượng người dùng",
     *     tags={"User"},
     *     @OA\Response(response=200, description="Dữ liệu thống kê")
     * )
     */
    public function countUsers()
    {
        return Response::data([
            'total' => User::count(),
            'active' => User::where('status', 'active')->count(),
            'banned' => User::where('status', 'banned')->count(),
            'instructors' => User::where('role', 'instructor')->count()
        ]);
    }
}
