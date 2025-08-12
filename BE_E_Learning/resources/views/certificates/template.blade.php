<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<title>Certificate</title>
<style>
    @page {
        size: A4 landscape;
        margin: 0;
    }
    body {
        margin: 0;
        padding: 0;
        background: #fdfcf7;
    }

    .certificate {
        border: 10px solid transparent;
        border-image: linear-gradient(90deg, #caa246, #f2e2a0, #f6d15b, #f2e2a0, #caa246) 1;
        border-radius: 14px;
        padding: 50px 60px;
        width: 90%;
        margin: auto;
        background: white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        box-sizing: border-box;
    }

    /* Tiêu đề chính */
    .title {
        text-align: center;
        margin-bottom: 30px;
    }
    .title .cert {
        font-size: 56px;
        font-weight: 800;
        letter-spacing: 4px;
        margin: 0;
        color: #1f2a44;
    }
    .title .brand {
        font-size: 22px;
        font-weight: bold;
        margin: 6px 0;
        color: #2c3b64;
        letter-spacing: 3px;
    }
    .title .sub {
        font-size: 16px;
        color: #6b768e;
        letter-spacing: 1px;
        font-weight: 600;
    }

    /* Phần tên học viên */
    .recipient {
        margin-top: 20px;
        text-align: center;
    }
    .recipient .label {
        font-size: 14px;
        text-transform: uppercase;
        color: #7d88a8;
        font-weight: 600;
    }
    .recipient .name {
        font-size: 48px;
        font-weight: bold;
        margin-top: 5px;
        color: #1f2a44;
    }

    /* Khóa học */
    .course {
        text-align: center;
        font-size: 18px;
        font-weight: 700;
        text-transform: uppercase;
        margin-top: 10px;
        color: #1f2a44;
    }

    /* Đường ký */
    .sig-line {
        border-top: 2px solid #c8a243;
        width: 70%;
        margin: 25px auto 20px;
    }

    /* Thông tin đơn vị */
    .meta {
        display: flex;
        justify-content: space-between;
        margin-top: 25px;
        padding: 0 10%;
    }
    .meta .org {
        text-align: center;
    }
    .meta .label {
        font-size: 12px;
        text-transform: uppercase;
        color: #7d88a8;
    }
    .meta .name {
        font-size: 16px;
        font-weight: 600;
        color: #4b5674;
    }

    /* Ngày cấp */
    .issue {
        margin-top: 25px;
        font-size: 13px;
        color: #4b5674;
        display: flex;
        justify-content: space-between;
        padding: 0 10%;
    }
    .small {
        font-size: 12px;
        color: #6e7897;
    }
</style>
</head>
<body>
    <div class="certificate">
        <div class="title">
            <p class="cert">CERTIFICATE</p>
            <p class="brand">MONA EDU</p>
            <p class="sub">HÂN HẠNH TRAO TẶNG</p>
        </div>

        <div class="recipient">
            <div class="label">Học viên</div>
            <div class="name">{{ $user_name }}</div>
        </div>

        <p class="course">Hoàn thành khóa học {{ $course_title }}</p>
        <div class="sig-line"></div>

        <div class="meta">
            <div class="org">
                <div class="label">Đơn vị</div>
                <div class="name">MONA Games</div>
            </div>
            <div class="org">
                <div class="label">Đơn vị</div>
                <div class="name">MONA Education</div>
            </div>
        </div>

        <div class="issue">
            <div class="small">Ngày cấp</div>
            <div><strong>{{ $issue_date }}</strong></div>
        </div>
    </div>
</body>
</html>
