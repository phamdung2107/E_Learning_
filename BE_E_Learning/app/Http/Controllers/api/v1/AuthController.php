<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;

use App\Models\User;
use App\Helper\Response;
use App\Http\Resources\UserResource;
use App\Mail\ForgotPassword;
use Exception;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenBlacklistedException;

class AuthController extends Controller
{

    private string $guard;

    public function __construct()
    {
        $this->guard = 'api';
    }

    /**
     * @OA\Post(
     *     path="/api/auth/register",
     *     summary="Đăng ký tài khoản mới",
     *     tags={"Auth"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"full_name", "email", "password", "password_confirmation"},
     *             @OA\Property(property="full_name", type="string", example="Nguyễn Văn A"),
     *             @OA\Property(property="email", type="string", format="email", example="user@example.com"),
     *             @OA\Property(property="password", type="string", format="password", example="123456"),
     *             @OA\Property(property="password_confirmation", type="string", format="password", example="123456")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Đăng ký thành công, trả về token"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Dữ liệu không hợp lệ"
     *     )
     * )
     */
    public function register(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'full_name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:6|confirmed',
            ]);

            if ($validator->fails()) {
                return Response::dataError($validator->errors(), 422);
            }

            $validated = $validator->validated();

            $user = User::create([
                'full_name' => $request->full_name,
                'email' => $request->email,
                'password' => bcrypt($request->password)
            ]);

            // Đăng nhập tự động sau khi đăng ký
            $token = Auth::guard($this->guard)->attempt([
                'email' => $validated['email'],
                'password' => $request->password,
            ]);

            return Response::data($token);
        } catch (ValidationException $e) {
            return Response::dataError($e->getMessage(), 422);
        } catch (Exception $e) {
            return Response::dataError($e->getMessage(), 500);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/auth/login",
     *     summary="Đăng nhập",
     *     tags={"Auth"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email", "password"},
     *             @OA\Property(property="email", type="string", format="email", example="user@example.com"),
     *             @OA\Property(property="password", type="string", format="password", example="123456")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Đăng nhập thành công, trả về token"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Sai thông tin đăng nhập"
     *     )
     * )
     */
    public function login(Request $request)
    {
        $credentials = request(['email', 'password']);
        try {
            if (!$token = Auth::guard($this->guard)->attempt($credentials)) {
                return Response::dataError('Sai tên đăng nhập hoặc mật khẩu', 401);
            }
            if (Auth::user()->status === 'INACTIVE'){
                return Response::dataError('Tài khoản đã bị khóa.', 401);
            }

            return Response::data($token);
        } catch (Exception $e) {
            return Response::dataError($e->getMessage(), $e->getCode());
        }
    }

    /**
     * @OA\Get(
     *     path="/api/auth/me",
     *     summary="Lấy thông tin người dùng hiện tại",
     *     tags={"Auth"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Thông tin người dùng"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Không có token hoặc token không hợp lệ"
     *     )
     * )
     */
    public function me(): array
    {
        /** @var User $user */
        $user = Auth::guard($this->guard)->user();

        if (!$user) {
        return Response::dataError('Token không hợp lệ hoặc đã hết hạn.', 401);
    }

        return Response::data(new UserResource($user));
    }

    /**
     * @OA\Post(
     *     path="/api/auth/logout",
     *     summary="Đăng xuất",
     *     tags={"Auth"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Đăng xuất thành công"
     *     )
     * )
     */
    public function logout()
    {
        Auth::guard($this->guard)->logout();

        return Response::data();
    }

    /**
     * @OA\Post(
     *     path="/api/auth/forgot",
     *     summary="Gửi email lấy lại mật khẩu",
     *     tags={"Auth"},
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             required={"email"},
     *             @OA\Property(property="email", type="string", format="email", example="user@example.com")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Đã gửi email reset password"
     *     )
     * )
     */
    public function forgot(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return Response::dataError('Người dùng không tồn tại');
        }
        Mail::to($user->email)->send(new ForgotPassword($user));

        return Response::data();
    }

    /**
     * @OA\Post(
     *     path="/api/auth/verify",
     *     summary="Xác thực mã reset password",
     *     tags={"Auth"},
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             required={"signature"},
     *             @OA\Property(property="signature", type="string", example="uuid-reset-code")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Xác thực thành công"
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Xác thực thất bại"
     *     )
     * )
     */
    public function verify (Request $request): array
    {
        if (!Str::isUuid($request->signature)){
            return Response::dataError('Xác thực thất bại');
        }
        try {
            $email = Cache::get($request->signature);
            if (!$email){
                return Response::dataError('Hết thời gian xác thực');
            }

            return Response::data();
        } catch (Exception $th){
            return Response::dataError($th->getMessage());
        }
    }

    /**
     * @OA\Put(
     *     path="/api/auth/change-password",
     *     summary="Đổi mật khẩu sau khi xác thực",
     *     tags={"Auth"},
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             required={"signature", "password"},
     *             @OA\Property(property="signature", type="string", example="uuid-reset-code"),
     *             @OA\Property(property="password", type="string", format="password", example="newpassword")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Đổi mật khẩu thành công"
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Xác thực thất bại"
     *     )
     * )
     */
    public function changePassword (Request $request): array
    {
        if (!Str::isUuid($request->signature)) {
            return Response::dataError('Xác thực thất bại');
        }
        try {
            $email = Cache::pull($request->signature);
            if (!$email) {
                return Response::dataError('Hết thời gian xác thực');
            }
            $user = User::query()->where('email', $email)
                ->first();
            if (!$user) {
                return Response::dataError('Người dùng không tồn tại');
            }
            $user->password = Hash::make($request->password);
            $user->save();

            return Response::data();
        } catch (Exception $th) {
            return Response::dataError($th->getMessage());
        }
    }

    /**
     * @OA\Post(
     *     path="/api/auth/refresh",
     *     summary="Làm mới token JWT",
     *     tags={"Auth"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Trả về access_token mới"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Token cũ đã bị hủy"
     *     )
     * )
     */
    public function refresh(): array
    {
        try {
            $token = Auth::guard($this->guard)->refresh();
            Auth::guard($this->guard)->setToken($token);
            return Response::data($this->respondWithToken($token));
        } catch (TokenBlacklistedException $e) {
            return Response::dataError('Token đã bị hủy. Vui lòng đăng nhập lại.', 401);
        }
    }

    /**
     * @param string $token
     *
     * @return array
     */
    protected function respondWithToken(string $token): array
    {
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::guard($this->guard)->factory()->getTTL() * 60,
            'user' => new UserResource(Auth::guard($this->guard)->user())
        ];
    }
}
