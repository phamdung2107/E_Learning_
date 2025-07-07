import React, { useState } from 'react'

import { Button, Layout } from 'antd'

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Outlet } from 'react-router-dom'

import HeaderComponent from '@/components/commons/HeaderComponent'
import NavBar from '@/components/commons/NavBar'

const { Header, Sider, Content } = Layout

const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <Layout style={{ minHeight: '100vh', overflow: 'auto' }}>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: '#121111',
                    height: 64,
                    backgroundColor: '#ffffff',
                    padding: '0 20px',
                    position: 'fixed',
                    width: '100%',
                    zIndex: 6,
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="logo">
                        <img src="/logo.png" alt="Logo" />
                    </div>
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            color: 'black',
                            fontSize: '18px',
                            background: 'rgba(0, 0, 0, 0.1)',
                            borderRadius: '6px',
                            padding: '4px 8px',
                            marginRight: 8,
                            transition: 'background 0.3s ease',
                        }}
                    />
                    <HeaderComponent />
                </div>
            </Header>

            <Layout style={{ marginTop: 64 }}>
                {' '}
                <Sider
                    collapsible
                    collapsed={collapsed}
                    trigger={null}
                    width={220}
                    style={{
                        background: '#fff',
                        boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
                        transition: 'width 0.3s ease-in-out',
                        position: 'fixed',
                        height: 'calc(100vh - 64px)',
                        overflowY: 'auto',
                        top: 64,
                        zIndex: 1,
                    }}
                >
                    <NavBar collapsed={collapsed} />
                </Sider>
                <Content
                    style={{
                        marginLeft: collapsed ? 80 : 220,
                        padding: '24px',
                        minHeight: 'calc(100vh - 64px)',
                        backgroundColor: '#f0f2f5',
                        transition: 'margin-left 0.3s ease-in-out',
                        overflowY: 'auto',
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default MainLayout
