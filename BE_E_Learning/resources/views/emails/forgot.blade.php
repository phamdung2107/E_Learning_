<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Quên mật khẩu</title>
</head>
<body>
    <h2>Xin chào {{ $name }}!</h2>
    <p>Chúng tôi nhận được yêu cầu khôi phục mật khẩu của bạn.</p>
    <p>Vui lòng nhấn vào đường link dưới đây để đặt lại mật khẩu:</p>
    <a href="{{ $url }}" target="_blank">Đặt lại mật khẩu</a>

    <p>Nếu bạn không yêu cầu, hãy bỏ qua email này.</p>
</body>
</html>
