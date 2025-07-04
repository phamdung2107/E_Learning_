<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Resources\UserResource;
use App\Helper\Response;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = User::query()
            ->when($request->role, function ($q) use ($request) {
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
            });

        $users = $query->paginate(10); 

        return Response::data(UserResource::collection($users),$users->total());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateUserRequest $request)
    {
        $user = User::create($request->all());

        return Response::data();
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = User::findOrFail($id); 

        return Response::data(new UserResource($user));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, $id)
    {
        $user = User::findOrFail($id);

        $data = $request->validated();

        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $path = $file->store('avatars', 'public');

            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }

            $data['avatar'] = $path;
        }

        if ($request->filled('role')) {
           $data['role'] = $request->role ;
        }

        $user->update($data);


        return Response::data(new UserResource($user));
    }

    public function updateRole(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->status = $request->status;
        $user->save();

        return Response::data(new UserResource($user));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete(); 

        return Response::data();
    }

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

    public function resetUserPassword($id): array
    {
        $defaultPassword  = config('app.password_default');

        $user = User::withoutGlobalScope('deleted')->findOrFail($id);
        $user->password = Hash::make($defaultPassword);
        $user->save();

        return Response::data();
    }

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
