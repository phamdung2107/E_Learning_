import { PATHS } from '@/routers/path'
import CourseService from '@/services/course'

export const getPageInfo = async (pathname: string) => {
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
        const courseId = pathname.split('/courses/')[1]
        try {
            const res = await CourseService.getDetail(courseId)
            return {
                title: res.data?.title || 'Chi tiết khóa học',
                breadcrumb: [
                    { title: 'Trang chủ', href: PATHS.HOME },
                    { title: 'Khóa học', href: PATHS.COURSES },
                    { title: res.data?.title || 'Chi tiết khóa học' },
                ],
            }
        } catch (err) {
            return {
                title: 'Chi tiết khóa học',
                breadcrumb: [
                    { title: 'Trang chủ', href: PATHS.HOME },
                    { title: 'Khóa học', href: PATHS.COURSES },
                    { title: 'Chi tiết khóa học' },
                ],
            }
        }
    }

    return (
        routes[pathname] || {
            title: 'Not Found',
            breadcrumb: [
                { title: 'Trang chủ', href: PATHS.HOME },
                { title: '404' },
            ],
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

export const getEventStatusName = (type: any) => {
    if (type === 1) {
        return {
            name: 'Đang hoạt động',
            color: 'green',
        }
    } else if (type === 0) {
        return {
            name: 'Ngừng hoạt động',
            color: 'default',
        }
    } else {
        return {
            name: '',
            color: 'default',
        }
    }
}
