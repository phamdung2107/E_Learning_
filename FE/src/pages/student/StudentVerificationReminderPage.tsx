import React from 'react'

import { Button } from 'antd'

import { Link, useLocation } from 'react-router-dom'

import { AUTH_PATHS } from '@/routers/path'

import '../styles/StudentVerificationReminder.css'

const StudentVerificationReminderPage = () => {
    const location = useLocation()
    const userEmail = location.state.email

    return (
        <div className="verification-container">
            <div className="verification-card">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="email-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                </svg>
                <h1>Kiểm tra Hộp thư của bạn!</h1>
                <p className="subtitle">
                    Cảm ơn bạn đã đăng ký. Chúng tôi đã gửi một liên kết kích
                    hoạt tài khoản đến địa chỉ email:
                </p>
                <p className="user-email">{userEmail}</p>
                <p className="instruction">
                    Vui lòng kiểm tra hộp thư đến (và cả thư mục{' '}
                    <strong>Spam/Quảng cáo</strong>) để hoàn tất quá trình đăng
                    ký.
                </p>
                <div className="actions">
                    <Button
                        href="https://mail.google.com/mail/u/0/#inbox"
                        target="_blank"
                        type="primary"
                        size="large"
                    >
                        Kiểm tra hộp thư ngay!
                    </Button>
                </div>
                <Link to={AUTH_PATHS.AUTH} className="back-link">
                    Quay lại trang Đăng nhập
                </Link>
            </div>
        </div>
    )
}

export default StudentVerificationReminderPage
