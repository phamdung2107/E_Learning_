import { ConfigProvider, theme } from 'antd'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import PageTransitionLoader from '@/components/core/page-loader'
import AppRouter from '@/routers/router'

import NotFound from './pages/commons/NotFound'

const { defaultAlgorithm } = theme

function App() {
    return (
        <ConfigProvider
            theme={{
                algorithm: defaultAlgorithm,
                token: {
                    borderRadius: 8,
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
