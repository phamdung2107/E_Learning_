<!DOCTYPE html>
<html>
<head>
    <title>Certificate</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; text-align: center; margin-top: 100px; }
        h1 { font-size: 32px; }
        p { font-size: 20px; }
    </style>
</head>
<body>
    <h1>CHỨNG CHỈ HOÀN THÀNH KHÓA HỌC</h1>
    <p>Học viên: <strong>{{ $user_name }}</strong></p>
    <p>Khóa học: <strong>{{ $course_title }}</strong></p>
    <p>Ngày cấp: {{ $issue_date }}</p>
</body>
</html>
