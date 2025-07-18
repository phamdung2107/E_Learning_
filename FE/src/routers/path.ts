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
    STUDENT_CART: '/student/cart',
}

export const INSTRUCTOR_PATHS = {
    INSTRUCTOR_DASHBOARD: '/instructor',
    INSTRUCTOR_MY_COURSES: '/instructor/courses',
    INSTRUCTOR_DETAIL_COURSE: '/instructor/courses/:courseId',
    INSTRUCTOR_PROFILE: '/instructor/profile',
    INSTRUCTOR_MY_STUDENTS: '/instructor/students',
}

export const PRIVATE_PATHS = {}

export const PATHS = {
    ...PUBLIC_PATHS,
    ...AUTH_PATHS,
    ...PRIVATE_PATHS,
}
