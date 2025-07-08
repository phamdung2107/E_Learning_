export const PUBLIC_PATHS = {
    HOME: '/',
    ABOUT: '/about',
    COURSES: '/courses',
    EVENT: '/event',
    CONTACT: '/contact',
    COURSE_DETAIL: '/courses/:id',
}

export const AUTH_PATHS = {
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    AUTH: '/auth',
}

export const PRIVATE_PATHS = {}

export const PATHS = {
    ...PUBLIC_PATHS,
    ...AUTH_PATHS,
    ...PRIVATE_PATHS,
}
