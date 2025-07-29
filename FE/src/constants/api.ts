export const AUTH_API = {
    LOGIN: '/login',
    LOGOUT: '/logout',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    UPDATE_PASSWORD: '/forgot-password/update-password',
    ME: '/me',
    REFRESH: '/refresh',
}

export const USER_API = {
    GET_ALL: '/users',
    GET_BY_ID: (id: number | string) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id: number | string) => `/users/${id}`,
    DELETE: (id: number | string) => `/users/${id}`,
    CHANGE_PASSWORD: '/users/change-password',
    RESET_USER: (userId: number | string) => `/users/reset-users/${userId}`,
    UPDATE_ROLE: (userId: number | string) => `/admin/change-role/${userId}`,
    UPDATE_STATUS: (userId: number | string) =>
        `/admin/change-status/${userId}`,
    COUNT_USERS: '/admin/countusers',
}

export const COURSE_API = {
    LIST: (params: any) => {
        const query = Object.keys(params)
            .filter(
                (key) =>
                    params[key] !== undefined &&
                    params[key] !== null &&
                    params[key] !== 0 &&
                    params[key] !== ''
            )
            .map((key) => `${key}=${params[key]}`)
            .join('&')
        return `/courses${query ? '?' + query : ''}`
    },
    CREATE: '/courses',
    MY_ENROLLED: (params: any) => {
        const query = Object.keys(params)
            .filter(
                (key) =>
                    params[key] !== undefined &&
                    params[key] !== null &&
                    params[key] !== 0 &&
                    params[key] !== ''
            )
            .map((key) => `${key}=${params[key]}`)
            .join('&')
        return `/courses/my/enrolled${query ? '?' + query : ''}`
    },
    DETAIL: (id: any) => `/courses/${id}`,
    UPDATE: (id: any) => `/courses/${id}`,
    DELETE: (id: any) => `/courses/${id}`,
    ARCHIVE: (id: any) => `/courses/${id}/archive`,
    PUBLISH: (id: any) => `/courses/${id}/publish`,
}

export const CATEGORY_API = {
    LIST: (params: any) => {
        const query = Object.keys(params)
            .filter(
                (key) =>
                    params[key] !== undefined &&
                    params[key] !== null &&
                    params[key] !== 0 &&
                    params[key] !== ''
            )
            .map((key) => `${key}=${params[key]}`)
            .join('&')
        return `/categories${query ? '?' + query : ''}`
    },
    CREATE: '/categories',
    DETAIL: (id: any) => `/categories/${id}`,
    UPDATE: (id: any) => `/categories/${id}`,
    DELETE: (id: any) => `/categories/${id}`,
    PARENT_ALL: '/categories/parent/all',
    TREE_ALL: '/categories/tree/all',
    CHILDREN: (id: any) => `/categories/${id}/children`,
    COURSES: (id: any) => `/categories/${id}/courses`,
}

export const INSTRUCTOR_API = {
    LIST: (params: any) => {
        const query = Object.keys(params)
            .filter(
                (key) =>
                    params[key] !== undefined &&
                    params[key] !== null &&
                    params[key] !== 0 &&
                    params[key] !== ''
            )
            .map((key) => `${key}=${params[key]}`)
            .join('&')
        return `/instructors${query ? '?' + query : ''}`
    },
    CREATE: '/instructors',

    DETAIL: (id: any) => `/instructors/${id}`,
    UPDATE: (id: any) => `/instructors/${id}`,
    DELETE: (id: any) => `/instructors/${id}`,

    APPROVE: (userId: any) => `/instructors/approve/${userId}`,
    REJECT: (userId: any) => `/instructors/reject/${userId}`,
    REQUEST: '/instructors/request',

    GET_BY_USER: (userId: any) => `/instructors/by-user/${userId}`,
    TOP_REVENUE: '/instructors/top/revenue',

    COURSES: (id: any) => `/instructors/${id}/courses`,
    REVENUE: (id: any) => `/instructors/${id}/revenue`,
    MONTHLY_REVENUE: (id: any) => `/instructors/${id}/monthly-revenue`,
    STUDENTS: (id: any) => `/instructors/${id}/students`,
}

export const REVIEW_API = {
    LIST: (params: any) => {
        const query = Object.keys(params)
            .filter(
                (key) =>
                    params[key] !== undefined &&
                    params[key] !== null &&
                    params[key] !== 0 &&
                    params[key] !== ''
            )
            .map((key) => `${key}=${params[key]}`)
            .join('&')
        return `/reviews${query ? '?' + query : ''}`
    },
    CREATE: '/reviews',

    DETAIL: (id: any) => `/reviews/${id}`,
    UPDATE: (id: any) => `/reviews/${id}`,
    DELETE: (id: any) => `/reviews/${id}`,

    AVERAGE_BY_COURSE: (courseId: any) => `/reviews/average/${courseId}`,
    BY_COURSE: (courseId: any) => `/reviews/course/${courseId}`,
    BY_USER: (userId: any) => `/reviews/user/${userId}`,
}

export const EVENT_API = {
    LIST: (params: any) => {
        const query = Object.keys(params || {})
            .filter(
                (key) =>
                    params[key] !== undefined &&
                    params[key] !== null &&
                    params[key] !== 0 &&
                    params[key] !== ''
            )
            .map(
                (key) =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
            )
            .join('&')
        return `/events${query ? '?' + query : ''}`
    },

    CREATE: '/events',

    DETAIL: (id: any) => `/events/${id}`,
    UPDATE: (id: any) => `/events/${id}`,
    DELETE: (id: any) => `/events/${id}`,
    TOGGLE: (id: any) => `/events/${id}/toggle`,
}

export const ENROLLMENT_API = {
    LIST: `/enrollments`,
    DETAIL: (id: number | string) => `/enrollments/${id}`,
    COUNT_BY_COURSE: (courseId: number | string) =>
        `/enrollments/count/${courseId}`,
    USERS_BY_COURSE: (courseId: number | string) =>
        `/enrollments/course/${courseId}`,
    COURSES_BY_USER: (userId: number | string) => `/enrollments/user/${userId}`,
    TOP_COURSES: `/enrollments/top/courses`,
    CHECK_ENROLLMENT: (userId: any, courseId: any) =>
        `/enrollments/check/${userId}/${courseId}`,
}

export const LESSON_API = {
    LIST: (params: any) => {
        const query = Object.keys(params)
            .filter(
                (key) =>
                    params[key] !== undefined &&
                    params[key] !== null &&
                    params[key] !== 0 &&
                    params[key] !== ''
            )
            .map(
                (key) =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
            )
            .join('&')
        return `/lessons${query ? '?' + query : ''}`
    },
    CREATE: `/lessons`,
    DETAIL: (id: number | string) => `/lessons/${id}`,
    UPDATE: (id: number | string) => `/lessons/${id}`,
    DELETE: (id: number | string) => `/lessons/${id}`,
    BY_COURSE: (courseId: number | string) => `/lessons/course/${courseId}`,
}

export const PROGRESS_API = {
    LIST: (params: any) => {
        const query = Object.keys(params)
            .filter(
                (key) =>
                    params[key] !== undefined &&
                    params[key] !== null &&
                    params[key] !== 0 &&
                    params[key] !== ''
            )
            .map(
                (key) =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
            )
            .join('&')
        return `/progress${query ? '?' + query : ''}`
    },
    CREATE: `/progress`,
    DETAIL: (id: number | string) => `/progress/${id}`,
    UPDATE: (id: number | string) => `/progress/${id}`,
    DELETE: (id: number | string) => `/progress/${id}`,
    SUMMARY: `/progress/summary`,
    COMPLETE_LESSON: `/progress/complete`,
    BY_USER_COURSE: (userId: number | string, courseId: number | string) =>
        `/progress/user/${userId}/course/${courseId}`,
}

export const CERTIFICATE_API = {
    LIST: (params: any) => {
        const query = Object.keys(params)
            .filter(
                (key) =>
                    params[key] !== undefined &&
                    params[key] !== null &&
                    params[key] !== 0 &&
                    params[key] !== ''
            )
            .map(
                (key) =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
            )
            .join('&')
        return `/certificates${query ? '?' + query : ''}`
    },
    CREATE: `/certificates`,
    DETAIL: (id: number | string) => `/certificates/${id}`,
    DELETE: (id: number | string) => `/certificates/${id}`,
}

export const QUIZ_API = {
    LIST: (params: any) => {
        const query = Object.keys(params)
            .filter(
                (key) =>
                    params[key] !== undefined &&
                    params[key] !== null &&
                    params[key] !== 0 &&
                    params[key] !== ''
            )
            .map(
                (key) =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
            )
            .join('&')
        return `/quizzes${query ? '?' + query : ''}`
    },
    CREATE: `/quizzes`,
    DETAIL: (id: number | string) => `/quizzes/${id}`,
    UPDATE: (id: number | string) => `/quizzes/${id}`,
    DELETE: (id: number | string) => `/quizzes/${id}`,
    BY_LESSON: (lessonId: number | string) => `/quizzes/lesson/${lessonId}`,
}

export const QUESTION_API = {
    LIST: (params: any) => {
        const query = Object.keys(params)
            .filter(
                (key) =>
                    params[key] !== undefined &&
                    params[key] !== null &&
                    params[key] !== 0 &&
                    params[key] !== ''
            )
            .map(
                (key) =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
            )
            .join('&')
        return `/questions${query ? '?' + query : ''}`
    },
    CREATE: `/questions`,
    DETAIL: (id: number | string) => `/questions/${id}`,
    UPDATE: (id: number | string) => `/questions/${id}`,
    DELETE: (id: number | string) => `/questions/${id}`,
    BY_QUIZ: (quizId: number | string) => `/questions/quiz/${quizId}`,
}

export const ANSWER_API = {
    LIST: (params: any) => {
        const query = Object.keys(params)
            .filter(
                (key) =>
                    params[key] !== undefined &&
                    params[key] !== null &&
                    params[key] !== 0 &&
                    params[key] !== ''
            )
            .map(
                (key) =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
            )
            .join('&')
        return `/answers${query ? '?' + query : ''}`
    },
    CREATE: `/answers`,
    DETAIL: (id: number | string) => `/answers/${id}`,
    UPDATE: (id: number | string) => `/answers/${id}`,
    DELETE: (id: number | string) => `/answers/${id}`,
    BY_QUESTION: (questionId: number | string) =>
        `/answers/question/${questionId}`,
}

export const RESULT_QUIZ_API = {
    LIST: (quizId: any) => {
        return `/result-quizzes/quiz/${quizId}`
    },
    CREATE: `/result-quizzes/submit`,
    MY_RESULT_QUIZ: (quizId: any) => `/result-quizzes/my/${quizId}`,
}

export const ORDER_API = {
    MY_ORDERS: '/orders',
    CREATE: '/orders',
    CONFIRM_ORDER: (orderId: any) => `/orders/${orderId}/confirm`,
    CANCEL_ORDER: (orderId: any) => `/orders/${orderId}/cancel`,
    DETAIL: (orderId: any) => `/orders/${orderId}`,
    DELETE: (orderId: any) => `/orders/${orderId}`,
}

export const PAYMENT_API = {
    LIST: '/wallet',
    APPROVE: (id: any) => `/wallet/withdraw/${id}/approve`,
    REJECT: (id: any) => `/wallet/withdraw/${id}/reject`,
    WITHDRAW: `/wallet/withdraw`,
    MY_PAYMENT: '/wallet/my',
    PROCESS_PAYMENT: (params: any) => {
        const query = Object.keys(params)
            .filter(
                (key) =>
                    params[key] !== undefined &&
                    params[key] !== null &&
                    params[key] !== 0 &&
                    params[key] !== ''
            )
            .map(
                (key) =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
            )
            .join('&')
        return `/wallet/return${query ? '?' + query : ''}`
    },
    CREATE_PAYMENT: '/wallet/create-topup',
}

export const NOTIFICATION_API = {
    LIST: '/notifications',
    DETAIL: (id: any) => `/notifications/${id}`,
    DELETE: (id: any) => `/notifications/${id}`,
    MARK_AS_READ: (id: any) => `/notifications/${id}/read`,
    LIST_UNREAD: `/notifications/unread`,
}
