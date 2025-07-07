import { PATHS } from '@/routers/path'

export const getPageInfo = (pathname: string) => {
    const routes: Record<
        string,
        { title: string; breadcrumb: Array<{ title: string; href?: string }> }
    > = {
        [PATHS.HOME]: {
            title: 'Home',
            breadcrumb: [{ title: 'Home' }],
        },
        [PATHS.ABOUT]: {
            title: 'About',
            breadcrumb: [
                { title: 'Home', href: PATHS.HOME },
                { title: 'About' },
            ],
        },
        [PATHS.COURSES]: {
            title: 'Courses',
            breadcrumb: [
                { title: 'Home', href: PATHS.HOME },
                { title: 'Courses' },
            ],
        },
        [PATHS.ACTIVITIES]: {
            title: 'Activities',
            breadcrumb: [
                { title: 'Home', href: PATHS.HOME },
                { title: 'Activities' },
            ],
        },
        [PATHS.CONTACT]: {
            title: 'Contact',
            breadcrumb: [
                { title: 'Home', href: PATHS.HOME },
                { title: 'Contact' },
            ],
        },
        [PATHS.SIGN_IN]: {
            title: 'Sign In',
            breadcrumb: [
                { title: 'Home', href: PATHS.HOME },
                { title: 'Sign In' },
            ],
        },
        [PATHS.SIGN_UP]: {
            title: 'Sign Up',
            breadcrumb: [
                { title: 'Home', href: PATHS.HOME },
                { title: 'Sign Up' },
            ],
        },
        [PATHS.AUTH]: {
            title: 'Auth',
            breadcrumb: [
                { title: 'Home', href: PATHS.HOME },
                { title: 'Auth' },
            ],
        },
    }

    return (
        routes[pathname] || {
            title: 'Not Found',
            breadcrumb: [{ title: 'Home', href: PATHS.HOME }, { title: '404' }],
        }
    )
}
