import type React from 'react'

import {
    BellOutlined,
    BookOutlined,
    DollarCircleOutlined,
    InfoCircleOutlined,
} from '@ant-design/icons'

import { PATHS } from '@/routers/path'
import NotificationService from '@/services/notification'
import { getCurrentNotificationAction } from '@/stores/notification/notificationAction'

export const getPageInfo = (pathname: string) => {
    const routes: Record<
        string,
        { title: string; breadcrumb: Array<{ title: string; href?: string }> }
    > = {
        [PATHS.HOME]: {
            title: 'Trang chủ',
            breadcrumb: [{ title: 'Trang chủ' }],
        },
        [PATHS.ABOUT]: {
            title: 'Giới thiệu',
            breadcrumb: [
                { title: 'Trang chủ', href: PATHS.HOME },
                { title: 'Giới thiệu' },
            ],
        },
        [PATHS.COURSES]: {
            title: 'Khóa học',
            breadcrumb: [
                { title: 'Trang chủ', href: PATHS.HOME },
                { title: 'Khóa học' },
            ],
        },
        [PATHS.EVENT]: {
            title: 'Hoạt động',
            breadcrumb: [
                { title: 'Trang chủ', href: PATHS.HOME },
                { title: 'Hoạt động' },
            ],
        },
        [PATHS.CONTACT]: {
            title: 'Liên hệ',
            breadcrumb: [
                { title: 'Trang chủ', href: PATHS.HOME },
                { title: 'Liên hệ' },
            ],
        },
        [PATHS.AUTH]: {
            title: 'Tài khoản',
            breadcrumb: [
                { title: 'Trang chủ', href: PATHS.HOME },
                { title: 'Tài khoản' },
            ],
        },
        [PATHS.RECOMMENDATION]: {
            title: 'Gợi ý',
            breadcrumb: [
                { title: 'Trang chủ', href: PATHS.HOME },
                { title: 'Gợi ý' },
            ],
        },
    }

    if (pathname.startsWith('/courses/') && pathname !== '/courses') {
        // Extract course ID from pathname
        const courseId = pathname.split('/courses/')[1]

        // Mock course data - in real app, you would fetch this from API or context
        const mockCourses: Record<string, string> = {
            '1': 'Complete Web Development Bootcamp 2024',
            '2': 'Digital Marketing Mastery Course',
            '3': 'UI/UX Design Fundamentals',
            '4': 'Python for Data Science',
            '5': 'Mobile App Development with React Native',
            '6': 'Introduction to Programming',
            '7': 'Advanced JavaScript & ES6+',
            '8': 'Graphic Design Masterclass',
            '9': 'Cloud Computing with AWS',
            '10': 'Cybersecurity Fundamentals',
            '11': 'Business Analytics with Excel',
            '12': 'Machine Learning A-Z',
        }

        const courseTitle = mockCourses[courseId] || 'Course Detail'

        return {
            title: courseTitle,
            breadcrumb: [
                { title: 'Home', href: PATHS.HOME },
                { title: 'Courses', href: PATHS.COURSES },
                { title: courseTitle },
            ],
        }
    }

    return (
        routes[pathname] || {
            title: 'Not Found',
            breadcrumb: [{ title: 'Home', href: PATHS.HOME }, { title: '404' }],
        }
    )
}

export const getRoleName = (role: string) => {
    if (role === 'admin') {
        return 'Quản trị viên'
    } else if (role === 'instructor') {
        return 'Giảng viên'
    } else if (role === 'student') {
        return 'Người học'
    } else {
        return 'Unknown'
    }
}

export const getStatusNameAndColor = (status: string) => {
    if (status === 'active') {
        return {
            name: 'Hoạt động',
            color: 'green',
        }
    } else if (status === 'inactive') {
        return {
            name: 'Ngừng hoạt động',
            color: 'default',
        }
    } else if (status === 'banned') {
        return {
            name: 'Bị khóa',
            color: 'red',
        }
    } else {
        return {
            name: 'Unknown',
            color: 'default',
        }
    }
}

export const getPaymentStatusName = (status: any) => {
    if (status === 'pending') {
        return 'Đang xử lý'
    } else if (status === 'completed') {
        return 'Thành công'
    } else if (status === 'failed') {
        return 'Thất bại'
    } else {
        return ''
    }
}

export const getPaymentMethodName = (method: any) => {
    if (method === 'wallet') {
        return 'Ví điện tử'
    } else if (method === 'paypal') {
        return 'PayPal'
    } else if (method === 'stripe') {
        return 'Stripe'
    } else {
        return ''
    }
}

export const getTypeTransaction = (type: any) => {
    if (type === 'topup') {
        return 'Nạp tiền'
    } else if (type === 'withdraw') {
        return 'Rút tiền'
    } else {
        return ''
    }
}
