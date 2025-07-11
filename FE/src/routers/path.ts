export const PUBLIC_PATHS = {
    HOME: '/',
    ABOUT: '/about',
    COURSES: '/courses',
    EVENT: '/event',
    CONTACT: '/contact',
    COURSE_DETAIL: '/courses/:id',
    LESSON_DETAIL: '/courses/:courseId/lessons/:lessonId',
}

export const AUTH_PATHS = {
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    AUTH: '/auth',
}

export const STUDENT_PATHS = {
    STUDENT_DASHBOARD: '/student',
    STUDENT_MY_COURSES: '/student/courses',
    STUDENT_QUIZ: '/student/quiz',
    STUDENT_CERTIFICATE: '/student/certificate',
    STUDENT_PROFILE: '/student/profile',
    STUDENT_PAYMENT: '/student/payment',
}

export const PRIVATE_PATHS = {}

export const PATHS = {
    ...PUBLIC_PATHS,
    ...AUTH_PATHS,
    ...PRIVATE_PATHS,
}
