import type React from 'react'

import { Layout } from 'antd'

import { Content } from 'antd/es/layout/layout'
import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Content
                style={{
                    marginTop: '144px',
                    paddingBottom: '60px',
                    minHeight: 'calc(100vh - 144px - 80px)',
                    backgroundColor: '#f0f2f5',
                    padding: 0,
                    overflow: 'auto',
                }}
            >
                <div
                    style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        padding: '0 20px 50px 20px',
                        width: '100%',
                    }}
                >
                    <Outlet />
                </div>
            </Content>
        </Layout>
    )
}

export default DefaultLayout
