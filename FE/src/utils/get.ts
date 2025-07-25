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
        [PATHS.EVENT]: {
            title: 'Event',
            breadcrumb: [
                { title: 'Home', href: PATHS.HOME },
                { title: 'Event' },
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
