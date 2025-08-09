'use client'

import type React from 'react'
import { useState } from 'react'

import { Avatar, Badge, Button, Dropdown, Layout, Menu, Typography } from 'antd'

import {
    BellOutlined,
    BookOutlined,
    DashboardOutlined,
    DollarCircleOutlined,
    LogoutOutlined,
    MenuOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

import { BASE_IMAGE_URL } from '@/constants/image'
import { INSTRUCTOR_PATHS, PATHS } from '@/routers/path'
import { logout } from '@/stores/auth/authSlice'
import { setCart } from '@/stores/cart/cartSlice'
import { setNotification } from '@/stores/notification/notificationSlice'

const { Header, Sider, Content } = Layout
const { Title } = Typography

const InstructorLayout: React.FC = () => {
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
            key: INSTRUCTOR_PATHS.INSTRUCTOR_DASHBOARD,
            icon: <DashboardOutlined />,
            label: (
                <Link to={INSTRUCTOR_PATHS.INSTRUCTOR_DASHBOARD}>
                    Bảng điều khiển
                </Link>
            ),
        },
        {
            key: INSTRUCTOR_PATHS.INSTRUCTOR_MY_COURSES,
            icon: <BookOutlined />,
            label: (
                <Link to={INSTRUCTOR_PATHS.INSTRUCTOR_MY_COURSES}>
                    Khóa học của tôi
                </Link>
            ),
        },
        {
            key: INSTRUCTOR_PATHS.INSTRUCTOR_MY_STUDENTS,
            icon: <UserOutlined />,
            label: (
                <Link to={INSTRUCTOR_PATHS.INSTRUCTOR_MY_STUDENTS}>
                    Học sinh của tôi
                </Link>
            ),
        },
        {
            key: INSTRUCTOR_PATHS.INSTRUCTOR_TRANSACTIONS,
            icon: <DollarCircleOutlined />,
            label: (
                <Link to={INSTRUCTOR_PATHS.INSTRUCTOR_TRANSACTIONS}>
                    Quản lý giao dịch
                </Link>
            ),
        },
    ]
    const userMenuItems = [
        {
            key: INSTRUCTOR_PATHS.INSTRUCTOR_PROFILE,
            icon: <UserOutlined />,
            label: (
                <Link to={INSTRUCTOR_PATHS.INSTRUCTOR_PROFILE}>
                    Thông tin cá nhân
                </Link>
            ),
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
                    Đăng xuất
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
                        {collapsed ? 'I' : 'Giảng viên'}
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
                                href={INSTRUCTOR_PATHS.INSTRUCTOR_NOTIFICATIONS}
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
                                    src={`${BASE_IMAGE_URL}${user?.user?.avatar}`}
                                    style={{ marginRight: '8px' }}
                                />
                                <span style={{ fontWeight: '500' }}>
                                    {user?.user?.full_name}
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

export default InstructorLayout
