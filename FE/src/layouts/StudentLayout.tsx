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
    ShoppingCartOutlined,
    TrophyOutlined,
    UserAddOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

import { BASE_IMAGE_URL } from '@/constants/image'
import { PATHS, STUDENT_PATHS } from '@/routers/path'
import { logout } from '@/stores/auth/authSlice'
import { setCart } from '@/stores/cart/cartSlice'
import { setNotification } from '@/stores/notification/notificationSlice'

const { Header, Sider, Content } = Layout
const { Title } = Typography

const StudentLayout: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const countCart = useSelector((store: any) => store.cart.count)
    const countNotification = useSelector(
        (store: any) => store.notification.count
    )
    const user = useSelector((store: any) => store.auth.user)
    const [collapsed, setCollapsed] = useState(false)
    const { pathname } = useLocation()

    const menuItems = [
        {
            key: STUDENT_PATHS.STUDENT_DASHBOARD,
            icon: <DashboardOutlined />,
            label: (
                <Link to={STUDENT_PATHS.STUDENT_DASHBOARD}>
                    Bảng điều khiển
                </Link>
            ),
        },
        {
            key: STUDENT_PATHS.STUDENT_MY_COURSES,
            icon: <BookOutlined />,
            label: (
                <Link to={STUDENT_PATHS.STUDENT_MY_COURSES}>
                    Khóa học của tôi
                </Link>
            ),
        },
        {
            key: STUDENT_PATHS.STUDENT_CERTIFICATE,
            icon: <TrophyOutlined />,
            label: (
                <Link to={STUDENT_PATHS.STUDENT_CERTIFICATE}>Chứng chỉ</Link>
            ),
        },
        {
            key: STUDENT_PATHS.STUDENT_CART,
            icon: <ShoppingCartOutlined />,
            label: <Link to={STUDENT_PATHS.STUDENT_CART}>Giỏ hàng</Link>,
        },
        {
            key: STUDENT_PATHS.STUDENT_TRANSACTIONS,
            icon: <DollarCircleOutlined />,
            label: (
                <Link to={STUDENT_PATHS.STUDENT_TRANSACTIONS}>
                    Quản lý giao dịch
                </Link>
            ),
        },
        {
            key: STUDENT_PATHS.STUDENT_REQUEST_INSTRUCTOR,
            icon: <UserAddOutlined />,
            label: (
                <Link to={STUDENT_PATHS.STUDENT_REQUEST_INSTRUCTOR}>
                    Gửi yêu cầu
                </Link>
            ),
        },
    ]
    const userMenuItems = [
        {
            key: STUDENT_PATHS.STUDENT_PROFILE,
            icon: <UserOutlined />,
            label: (
                <Link to={STUDENT_PATHS.STUDENT_PROFILE}>
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
                        {collapsed ? 'S' : 'Học viên'}
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
                                href={STUDENT_PATHS.STUDENT_NOTIFICATIONS}
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
                        <Badge count={Number(countCart)}>
                            <Button
                                size="middle"
                                shape="circle"
                                href={STUDENT_PATHS.STUDENT_CART}
                                icon={
                                    <ShoppingCartOutlined
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
                                    src={
                                        user.user
                                            ? `${BASE_IMAGE_URL}${user.user?.avatar}`
                                            : `${BASE_IMAGE_URL}${user?.avatar}`
                                    }
                                    style={{ marginRight: '8px' }}
                                />
                                <span style={{ fontWeight: '500' }}>
                                    {user?.user?.full_name || user?.full_name}
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

export default StudentLayout
