'use client'

import React, { useEffect, useState } from 'react'

import { Layout } from 'antd'

import { Outlet, useLocation } from 'react-router-dom'

import BreadcrumbSection from '@/components/commons/BreadcrumbSection'
import FooterComponent from '@/components/commons/FooterComponent'
import HeaderComponent from '@/components/commons/HeaderComponent'
import HeaderMobileComponent from '@/components/commons/HeaderMobileComponent'
import { useWindowSize } from '@/hooks/useWindowSize'
import { PATHS } from '@/routers/path'
import { getPageInfo } from '@/utils/get'

import './styles/PublicLayout.css'

const { Footer, Content } = Layout

const PublicLayout: React.FC = () => {
    const location = useLocation()
    const { innerWidth, innerHeight } = useWindowSize()
    const [pageInfo, setPageInfo] = useState<{
        title: string
        breadcrumb: any[]
    }>({
        title: '',
        breadcrumb: [],
    })

    useEffect(() => {
        const fetchPageInfo = async () => {
            const result = await getPageInfo(location.pathname)
            setPageInfo(result)
        }
        fetchPageInfo()
    }, [location.pathname])

    const showBreadcrumb = location.pathname !== PATHS.HOME
    return (
        <Layout style={{ minHeight: '100vh' }}>
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
                {innerWidth < 480 ? (
                    <HeaderMobileComponent />
                ) : (
                    <HeaderComponent />
                )}
            </div>

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
                        title={pageInfo?.title}
                        breadcrumbItems={pageInfo?.breadcrumb}
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
