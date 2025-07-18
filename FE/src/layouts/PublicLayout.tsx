'use client'

import type React from 'react'

import { Layout } from 'antd'

import { Outlet, useLocation } from 'react-router-dom'

import BreadcrumbSection from '@/components/commons/BreadcrumbSection'
import FooterComponent from '@/components/commons/FooterComponent'
import HeaderComponent from '@/components/commons/HeaderComponent'
import { PATHS } from '@/routers/path'
import { getPageInfo } from '@/utils/get'

import './styles/PublicLayout.css'

const { Footer, Content } = Layout

const PublicLayout: React.FC = () => {
    const location = useLocation()
    const { title, breadcrumb } = getPageInfo(location.pathname)
    const showBreadcrumb = location.pathname !== PATHS.HOME
    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* Fixed Header */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    padding: 0,
                    height: 'auto',
                    backgroundColor: 'transparent',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
            >
                <HeaderComponent />
            </div>

            {/* Main Content with proper top margin */}
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
                {showBreadcrumb && (
                    <BreadcrumbSection
                        title={title}
                        breadcrumbItems={breadcrumb}
                    />
                )}
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

            {/* Footer */}
            <Footer
                style={{
                    backgroundColor: '#001529',
                    color: 'white',
                    textAlign: 'center',
                    padding: '20px 0',
                    marginTop: 'auto',
                }}
            >
                <FooterComponent />
            </Footer>
        </Layout>
    )
}

export default PublicLayout
