import { ConfigProvider, theme } from 'antd'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import PageTransitionLoader from '@/components/core/page-loader/PageTransitionLoader'
import AppRouter from '@/routers/router'

import NotFound from './pages/commons/NotFound'

const { defaultAlgorithm } = theme

function App() {
    return (
        <ConfigProvider
            theme={{
                algorithm: defaultAlgorithm,
                token: {
                    colorPrimary: '#1976d2',
                    fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                },
            }}
        >
            <div>
                <>
                    <Router>
                        <PageTransitionLoader />
                        <Routes>
                            {AppRouter}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Router>
                </>
            </div>
        </ConfigProvider>
    )
}

export default App
