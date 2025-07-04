<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Voucher;
use App\Http\Requests\CreateVoucherRequest;
use App\Http\Requests\UpdateVoucherRequest;
use App\Http\Resources\VoucherResource;
use App\Helper\Response;
use Illuminate\Http\Request;

class VoucherController extends Controller
{
    // [1] Danh sách tất cả voucher
   public function index(Request $request)
    {
        $query = Voucher::where('deleted', false);

        if ($request->has('keyword')) {
            $keyword = $request->input('keyword');
            $query->where('code', 'like', "%$keyword%");
        }

        $vouchers = $query->get();
        return Response::data(VoucherResource::collection($vouchers), $vouchers->count());
    }

    // [2] Tạo voucher mới
    public function store(CreateVoucherRequest $request)
    {
        $voucher = Voucher::create($request->validated());
        return Response::data(new VoucherResource($voucher));
    }

    // [3] Xem chi tiết voucher
    public function show($id)
    {
        $voucher = Voucher::findOrFail($id);
        return Response::data(new VoucherResource($voucher));
    }

    // [4] Cập nhật voucher
    public function update(UpdateVoucherRequest $request, $id)
    {
        $voucher = Voucher::findOrFail($id);
        $voucher->update($request->validated());
        return Response::data(new VoucherResource($voucher));
    }

    // [5] Xoá mềm voucher
    public function destroy($id)
    {
        $voucher = Voucher::findOrFail($id);
        $voucher->delete();
        return Response::data(['message' => 'Voucher đã được xoá']);
    }

    // [6] Kiểm tra mã voucher hợp lệ
    public function checkValid($code)
    {
        $voucher = Voucher::where('code', $code)
            ->whereDate('valid_from', '<=', now())
            ->whereDate('valid_until', '>=', now())
            ->whereColumn('usage_count', '<', 'usage_limit')
            ->first();

        if (!$voucher) {
            return response()->json(['message' => 'Voucher không hợp lệ hoặc đã hết hạn'], 400);
        }

        return Response::data(new VoucherResource($voucher));
    }
}
