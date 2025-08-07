export const PUBLIC_PATHS = {
    HOME: '/',
    ABOUT: '/about',
    COURSES: '/courses',
    EVENT: '/event',
    CONTACT: '/contact',
    COURSE_DETAIL: '/courses/:id',
    LESSON_DETAIL: '/courses/:courseId/lessons/:lessonId',
    QUIZ_DETAIL: '/courses/:courseId/quizzes/:quizId',
    RESULT_QUIZ_DETAIL: '/courses/:courseId/quizzes/:quizId/results',
    RECOMMENDATION: '/recommendation',
}

export const VIETNAMESE_LABELS: any = {
    HOME: 'Trang chủ',
    ABOUT: 'Giới thiệu',
    COURSES: 'Khóa học',
    EVENT: 'Sự kiện',
    CONTACT: 'Liên hệ',
    RECOMMENDATION: 'Gợi ý',
}

export const AUTH_PATHS = {
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    AUTH: '/auth',
    VERIFY_EMAIL: '/verify-email',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
}

export const STUDENT_PATHS = {
    STUDENT_DASHBOARD: '/student',
    STUDENT_MY_COURSES: '/student/courses',
    STUDENT_QUIZ: '/student/quiz',
    STUDENT_CERTIFICATE: '/student/certificate',
    STUDENT_PROFILE: '/student/profile',
    STUDENT_CART: '/student/cart',
    STUDENT_WALLET_RETURN: '/student/wallet/return',
    STUDENT_TRANSACTIONS: '/student/transactions',
    STUDENT_NOTIFICATIONS: '/student/notifications',
    STUDENT_REQUEST_INSTRUCTOR: '/student/become-instructor',
}

export const INSTRUCTOR_PATHS = {
    INSTRUCTOR_DASHBOARD: '/instructor',
    INSTRUCTOR_MY_COURSES: '/instructor/courses',
    INSTRUCTOR_DETAIL_COURSE: '/instructor/courses/:courseId',
    INSTRUCTOR_PROFILE: '/instructor/profile',
    INSTRUCTOR_MY_STUDENTS: '/instructor/students',
    INSTRUCTOR_TRANSACTIONS: '/instructor/transactions',
    INSTRUCTOR_NOTIFICATIONS: '/instructor/notifications',
    INSTRUCTOR_REVIEW: '/instructor/courses/:courseId/review',
}

export const ADMIN_PATHS = {
    ADMIN_DASHBOARD: '/admin',
    ADMIN_MANAGE_COURSES: '/admin/courses',
    ADMIN_DETAIL_COURSE: '/admin/courses/:courseId',
    ADMIN_PROFILE: '/admin/profile',
    ADMIN_MANAGE_USERS: '/admin/users',
    ADMIN_MANAGE_TRANSACTIONS: '/admin/transactions',
    ADMIN_MANAGE_EVENTS: '/admin/events',
    ADMIN_NOTIFICATIONS: '/admin/notifications',
    ADMIN_MANAGE_CATEGORIES: '/admin/categories',
    ADMIN_MANAGE_REQUESTS: '/admin/requests',
}

export const PRIVATE_PATHS = {}

export const PATHS = {
    ...PUBLIC_PATHS,
    ...AUTH_PATHS,
    ...PRIVATE_PATHS,
}
