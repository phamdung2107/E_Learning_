import { Navigate, Route } from 'react-router-dom'

import MainLayout from '@/layouts/MainLayout'
import NotAuthenticatedLayout from '@/layouts/NotAuthenticatedLayout'
import LoginPage from '@/pages/commons/LoginPage'
import RegisterPage from '@/pages/commons/RegisterPage'

import { PATHS } from './path'

const AppRouter = [
    <Route element={<NotAuthenticatedLayout />} key="not-auth">
        <Route path={PATHS.LOGIN} element={<LoginPage />} />
        <Route path={PATHS.REGISTER} element={<RegisterPage />} />
    </Route>,
    <Route element={<MainLayout />} key="main">
        <Route path="/" element={<Navigate to={PATHS.HOME} replace />} />
    </Route>,
]

export default AppRouter
