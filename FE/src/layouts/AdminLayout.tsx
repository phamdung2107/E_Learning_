import React, { useState } from 'react'

import { Avatar, Badge, Button, Dropdown, Layout, Menu, Typography } from 'antd'

import {
    BellOutlined,
    BookOutlined,
    DashboardOutlined,
    LogoutOutlined,
    MenuOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

import { ADMIN_PATHS, PATHS } from '@/routers/path'
import { logout } from '@/stores/auth/authSlice'
import { setCart } from '@/stores/cart/cartSlice'
import { setNotification } from '@/stores/notification/notificationSlice'

const { Header, Sider, Content } = Layout
const { Title } = Typography

const AdminLayout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const countNotification = useSelector(
        (store: any) => store.notification.count
    )
    const user = useSelector((store: any) => store.auth.user)
    const [collapsed, setCollapsed] = useState(false)
    const { pathname } = useLocation()

    const menuItems = [
        {
            key: ADMIN_PATHS.ADMIN_DASHBOARD,
            icon: <DashboardOutlined />,
            label: <Link to={ADMIN_PATHS.ADMIN_DASHBOARD}>Dashboard</Link>,
        },
        {
            key: ADMIN_PATHS.ADMIN_MANAGE_USERS,
            icon: <UserOutlined />,
            label: (
                <Link to={ADMIN_PATHS.ADMIN_MANAGE_USERS}>Manage Users</Link>
            ),
        },
        {
            key: ADMIN_PATHS.ADMIN_MANAGE_INSTRUCTORS,
            icon: <UserOutlined />,
            label: (
                <Link to={ADMIN_PATHS.ADMIN_MANAGE_INSTRUCTORS}>
                    Manage Instructors
                </Link>
            ),
        },
        {
            key: ADMIN_PATHS.ADMIN_MANAGE_COURSES,
            icon: <BookOutlined />,
            label: (
                <Link to={ADMIN_PATHS.ADMIN_MANAGE_COURSES}>
                    Manage Courses
                </Link>
            ),
        },
    ]
    const userMenuItems = [
        {
            key: ADMIN_PATHS.ADMIN_PROFILE,
            icon: <UserOutlined />,
            label: <Link to={ADMIN_PATHS.ADMIN_PROFILE}>My Profile</Link>,
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: (
                <div
                    onClick={() => {
                        dispatch(logout())
                        dispatch(setCart())
                        dispatch(setNotification())
                        navigate(PATHS.AUTH)
                    }}
                >
                    Logout
                </div>
            ),
        },
    ]

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{
                    background: '#fff',
                    boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
                }}
            >
                <div
                    style={{
                        padding: '18px',
                        textAlign: 'center',
                        borderBottom: '1px solid #f0f0f0',
                    }}
                >
                    <Title
                        level={4}
                        style={{
                            margin: 0,
                            color: '#20B2AA',
                            fontSize: '20px',
                        }}
                    >
                        {collapsed ? 'A' : 'Admin'}
                    </Title>
                </div>
                <Menu
                    mode="inline"
                    selectedKeys={[pathname]}
                    items={menuItems}
                    style={{ border: 'none', marginTop: '16px' }}
                />
            </Sider>

            <Layout>
                <Header
                    style={{
                        padding: '0 24px',
                        background: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                >
                    <Button
                        type="text"
                        icon={<MenuOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{ fontSize: '16px' }}
                    />

                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                        }}
                    >
                        <Badge count={Number(countNotification)}>
                            <Button
                                size="middle"
                                shape="circle"
                                icon={
                                    <BellOutlined
                                        style={{
                                            color: '#1976d2',
                                            cursor: 'pointer',
                                        }}
                                    />
                                }
                            ></Button>
                        </Badge>

                        <Dropdown
                            menu={{ items: userMenuItems }}
                            placement="bottomRight"
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    padding: '4px 8px',
                                    borderRadius: '8px',
                                    transition: 'background 0.3s',
                                }}
                            >
                                <Avatar
                                    size="default"
                                    icon={<UserOutlined />}
                                    style={{ marginRight: '8px' }}
                                />
                                <span style={{ fontWeight: '500' }}>
                                    {user?.full_name}
                                </span>
                            </div>
                        </Dropdown>
                    </div>
                </Header>

                <Content
                    style={{
                        margin: '24px',
                        padding: '24px',
                        background: '#f5f5f5',
                        minHeight: 'calc(100vh - 112px)',
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default AdminLayout
