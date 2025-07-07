import { Navigate, Route } from 'react-router-dom'

import MainLayout from '@/layouts/MainLayout'
import NotAuthenticatedLayout from '@/layouts/NotAuthenticatedLayout'
import PublicLayout from '@/layouts/PublicLayout'
import AboutPage from '@/pages/commons/AboutPage'
import AuthPage from '@/pages/commons/AuthPage'
import HomePage from '@/pages/commons/HomePage'
import LoginPage from '@/pages/commons/LoginPage'
import RegisterPage from '@/pages/commons/RegisterPage'

import { PATHS } from './path'

const AppRouter = [
    <Route element={<NotAuthenticatedLayout />} key="not-auth">
        <Route path={PATHS.SIGN_IN} element={<LoginPage />} />
        <Route path={PATHS.SIGN_UP} element={<RegisterPage />} />
    </Route>,
    <Route element={<PublicLayout />} key="public">
        <Route path={PATHS.HOME} element={<HomePage />} />
        <Route path={PATHS.AUTH} element={<AuthPage />} />
        <Route path={PATHS.ABOUT} element={<AboutPage />} />
    </Route>,
]

export default AppRouter
