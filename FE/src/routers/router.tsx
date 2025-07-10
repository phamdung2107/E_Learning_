import { Route } from 'react-router-dom'

import NotAuthenticatedLayout from '@/layouts/NotAuthenticatedLayout'
import PublicLayout from '@/layouts/PublicLayout'
import StudentLayout from '@/layouts/StudentLayout'
import AboutPage from '@/pages/commons/AboutPage'
import AuthPage from '@/pages/commons/AuthPage'
import ContactPage from '@/pages/commons/ContactPage'
import CourseDetailPage from '@/pages/commons/CourseDetailPage'
import CoursePage from '@/pages/commons/CoursePage'
import EventPage from '@/pages/commons/EventPage'
import HomePage from '@/pages/commons/HomePage'
import LoginPage from '@/pages/commons/LoginPage'
import RegisterPage from '@/pages/commons/RegisterPage'
import StudentCoursesPage from '@/pages/student/StudentCoursesPage'
import StudentDashboardPage from '@/pages/student/StudentDashboardPage'

import { PATHS, STUDENT_PATHS } from './path'

const AppRouter = [
    <Route element={<NotAuthenticatedLayout />} key="not-auth">
        <Route path={PATHS.SIGN_IN} element={<LoginPage />} />
        <Route path={PATHS.SIGN_UP} element={<RegisterPage />} />
    </Route>,
    <Route element={<PublicLayout />} key="public">
        <Route path={PATHS.HOME} element={<HomePage />} />
        <Route path={PATHS.AUTH} element={<AuthPage />} />
        <Route path={PATHS.ABOUT} element={<AboutPage />} />
        <Route path={PATHS.COURSES} element={<CoursePage />} />
        <Route path={PATHS.EVENT} element={<EventPage />} />
        <Route path={PATHS.CONTACT} element={<ContactPage />} />
        <Route path={PATHS.COURSE_DETAIL} element={<CourseDetailPage />} />
    </Route>,
    <Route element={<StudentLayout />} key="student">
        <Route
            path={STUDENT_PATHS.STUDENT_DASHBOARD}
            element={<StudentDashboardPage />}
        />
        <Route
            path={STUDENT_PATHS.STUDENT_MY_COURSES}
            element={<StudentCoursesPage />}
        />
    </Route>,
]

export default AppRouter
