'use client'

import type React from 'react'

import { Layout } from 'antd'

import { Outlet } from 'react-router-dom'

const { Content } = Layout

const LessonQuizDetailLayout: React.FC = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* Main Content with proper top margin */}
            <Content
                style={{
                    backgroundColor: '#f0f2f5',
                    padding: 0,
                    overflow: 'auto',
                }}
            >
                <div
                    style={{
                        margin: '0 auto',
                        width: '100%',
                    }}
                >
                    <Outlet />
                </div>
            </Content>
        </Layout>
    )
}

export default LessonQuizDetailLayout
