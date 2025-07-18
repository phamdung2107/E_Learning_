import { Route } from 'react-router-dom'

import InstructorLayout from '@/layouts/InstructorLayout'
import LessonQuizDetailLayout from '@/layouts/LessonQuizDetailLayout'
import PublicLayout from '@/layouts/PublicLayout'
import RequiredAuth from '@/layouts/RequiredAuth'
import StudentLayout from '@/layouts/StudentLayout'
import AboutPage from '@/pages/commons/AboutPage'
import AuthPage from '@/pages/commons/AuthPage'
import ContactPage from '@/pages/commons/ContactPage'
import CourseDetailPage from '@/pages/commons/CourseDetailPage'
import CoursePage from '@/pages/commons/CoursePage'
import EventPage from '@/pages/commons/EventPage'
import HomePage from '@/pages/commons/HomePage'
import LessonDetailPage from '@/pages/commons/LessonDetailPage'
import QuizDetailPage from '@/pages/commons/QuizDetailPage'
import ResultQuizPage from '@/pages/commons/ResultQuizPage'
import InstructorDashboardPage from '@/pages/instructor/InstructorDashboardPage'
import InstructorCoursePage from '@/pages/instructor/InstructorManageCoursesPage'
import InstructorManageDetailCoursePage from '@/pages/instructor/InstructorManageDetailCoursePage'
import { InstructorProfilePage } from '@/pages/instructor/InstructorProfilePage'
import InstructorStudentPage from '@/pages/instructor/InstructorStudentPage'
import StudentOrderCoursePage from '@/pages/student/StudentCartPage'
import StudentCertificatePage from '@/pages/student/StudentCertificatePage'
import StudentCoursesPage from '@/pages/student/StudentCoursesPage'
import StudentDashboardPage from '@/pages/student/StudentDashboardPage'
import { StudentProfilePage } from '@/pages/student/StudentProfilePage'

import { INSTRUCTOR_PATHS, PATHS, STUDENT_PATHS } from './path'

const AppRouter = [
    <Route
        element={
            <RequiredAuth>
                <LessonQuizDetailLayout />
            </RequiredAuth>
        }
        key="lesson-quiz-detail-layout"
    >
        <Route path={PATHS.LESSON_DETAIL} element={<LessonDetailPage />} />
        <Route path={PATHS.QUIZ_DETAIL} element={<QuizDetailPage />} />
        <Route path={PATHS.RESULT_QUIZ_DETAIL} element={<ResultQuizPage />} />
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
    <Route
        element={
            <RequiredAuth>
                <StudentLayout />
            </RequiredAuth>
        }
        key="student"
    >
        <Route
            path={STUDENT_PATHS.STUDENT_DASHBOARD}
            element={<StudentDashboardPage />}
        />
        <Route
            path={STUDENT_PATHS.STUDENT_MY_COURSES}
            element={<StudentCoursesPage />}
        />
        <Route
            path={STUDENT_PATHS.STUDENT_PROFILE}
            element={<StudentProfilePage />}
        />
        <Route
            path={STUDENT_PATHS.STUDENT_CERTIFICATE}
            element={<StudentCertificatePage />}
        />
        <Route
            path={STUDENT_PATHS.STUDENT_CART}
            element={<StudentOrderCoursePage />}
        />
    </Route>,
    <Route
        element={
            <RequiredAuth>
                <InstructorLayout />
            </RequiredAuth>
        }
        key="student"
    >
        <Route
            path={INSTRUCTOR_PATHS.INSTRUCTOR_DASHBOARD}
            element={<InstructorDashboardPage />}
        />
        <Route
            path={INSTRUCTOR_PATHS.INSTRUCTOR_MY_COURSES}
            element={<InstructorCoursePage />}
        />
        <Route
            path={INSTRUCTOR_PATHS.INSTRUCTOR_PROFILE}
            element={<InstructorProfilePage />}
        />
        <Route
            path={INSTRUCTOR_PATHS.INSTRUCTOR_MY_STUDENTS}
            element={<InstructorStudentPage />}
        />
        <Route
            path={INSTRUCTOR_PATHS.INSTRUCTOR_DETAIL_COURSE}
            element={<InstructorManageDetailCoursePage />}
        />
    </Route>,
]

export default AppRouter
