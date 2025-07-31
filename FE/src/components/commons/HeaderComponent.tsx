'use client'

import React, { useEffect } from 'react'

import { Badge, Button, Col, Dropdown, Layout, Row, Typography } from 'antd'

import {
    ClockCircleOutlined,
    FacebookOutlined,
    InstagramOutlined,
    LinkedinOutlined,
    LogoutOutlined,
    MailOutlined,
    PhoneOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    XOutlined,
    YoutubeOutlined,
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import { COMMON_INFORMATION } from '@/constants/information'
import { PUBLIC_PATHS, VIETNAMESE_LABELS } from '@/routers/path'
import { logout } from '@/stores/auth/authSlice'
import { getCurrentCartAction } from '@/stores/cart/cartAction'
import { setCart } from '@/stores/cart/cartSlice'
import { setNotification } from '@/stores/notification/notificationSlice'

import './styles/Header.css'

const { Header } = Layout
const { Text } = Typography

const HeaderComponent: React.FC = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(
        (store: any) => store.auth.isAuthenticated
    )
    const user = useSelector((store: any) => store.auth.user)
    const countCart = useSelector((store: any) => store.cart.count)
    const userMenuItems = [
        {
            key: 'management',
            label: (
                <Link to={`/${user?.role ? user?.role : user?.user?.role}`}>
                    Quản lý
                </Link>
            ),
            icon: <UserOutlined />,
        },
        {
            key: 'logout',
            label: (
                <div
                    onClick={() => {
                        dispatch(logout())
                        dispatch(setCart())
                        dispatch(setNotification())
                    }}
                >
                    Đăng xuất
                </div>
            ),
            icon: <LogoutOutlined />,
        },
    ]

    useEffect(() => {
        if (countCart) {
            dispatch(getCurrentCartAction())
        }
    }, [countCart])

    return (
        <Layout>
            {/* Top Info Bar */}
            <div
                style={{
                    background:
                        'linear-gradient(135deg, #4285f4 0%, #1976d2 100%)',
                    padding: '8px 0',
                    fontSize: '12px',
                }}
            >
                <div
                    style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        padding: '0 20px',
                    }}
                >
                    <Row justify="space-between" align="middle">
                        <Col>
                            <Row gutter={24} align="middle">
                                <Col>
                                    <Text style={{ color: 'white' }}>
                                        <PhoneOutlined
                                            style={{ marginRight: '8px' }}
                                        />
                                        {COMMON_INFORMATION.PHONE_NUMBER}
                                    </Text>
                                </Col>
                                <Col>
                                    <Text style={{ color: 'white' }}>
                                        <MailOutlined
                                            style={{ marginRight: '8px' }}
                                        />
                                        {COMMON_INFORMATION.EMAIL}
                                    </Text>
                                </Col>
                                <Col>
                                    <Text style={{ color: 'white' }}>
                                        <ClockCircleOutlined
                                            style={{ marginRight: '8px' }}
                                        />
                                        T2 - T6: 9:00 AM - 6:00 PM
                                    </Text>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row gutter={8} align="middle">
                                <Col>
                                    <Text
                                        style={{
                                            color: 'white',
                                            fontSize: '14px',
                                        }}
                                    >
                                        Theo dõi chúng tôi:
                                    </Text>
                                </Col>
                                <Col>
                                    <Row gutter={4}>
                                        <Col>
                                            <Button
                                                type="text"
                                                style={{
                                                    color: 'white',
                                                    padding: 10,
                                                }}
                                                href={
                                                    COMMON_INFORMATION.FACEBOOK_LINK
                                                }
                                                target="_blank"
                                            >
                                                <FacebookOutlined />
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button
                                                type="text"
                                                style={{
                                                    color: 'white',
                                                    padding: 10,
                                                }}
                                                href={COMMON_INFORMATION.X_LINK}
                                                target="_blank"
                                            >
                                                <XOutlined />
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button
                                                type="text"
                                                style={{
                                                    color: 'white',
                                                    padding: 10,
                                                }}
                                                href={
                                                    COMMON_INFORMATION.INSTAGRAM_LINK
                                                }
                                                target="_blank"
                                            >
                                                <InstagramOutlined />
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button
                                                type="text"
                                                style={{
                                                    color: 'white',
                                                    padding: 10,
                                                }}
                                                href={
                                                    COMMON_INFORMATION.YOUTUBE_LINK
                                                }
                                                target="_blank"
                                            >
                                                <YoutubeOutlined />
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button
                                                type="text"
                                                style={{
                                                    color: 'white',
                                                    padding: 10,
                                                }}
                                                href={
                                                    COMMON_INFORMATION.LINKEDIN_LINK
                                                }
                                                target="_blank"
                                            >
                                                <LinkedinOutlined />
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>

            {/* Main Header */}
            <Header
                style={{
                    background: 'white',
                    padding: '0',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    height: 'auto',
                    lineHeight: '80px',
                }}
            >
                <div
                    style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        padding: '0 20px',
                    }}
                >
                    <Row
                        align="middle"
                        justify="space-between"
                        style={{ height: '100%' }}
                    >
                        {/* Logo */}
                        <Col>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <div
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        background:
                                            'linear-gradient(135deg, #ff4757 0%, #ff3742 100%)',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginRight: '12px',
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: 'white',
                                            fontSize: '20px',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        M
                                    </Text>
                                </div>
                                <div>
                                    <Text
                                        style={{
                                            color: '#1976d2',
                                            fontSize: '24px',
                                            fontWeight: 'bold',
                                            lineHeight: '1',
                                        }}
                                    >
                                        MONA EDUCATION
                                    </Text>
                                </div>
                            </div>
                        </Col>

                        {/* Navigation Menu */}
                        <Col
                            flex="auto"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '32px',
                                }}
                            >
                                {Object.entries(PUBLIC_PATHS).map(
                                    ([key, value]) => {
                                        const isActive =
                                            location.pathname === value

                                        if (
                                            !value.startsWith('/courses/') &&
                                            VIETNAMESE_LABELS[key]
                                        ) {
                                            return (
                                                <Link
                                                    key={key}
                                                    to={value}
                                                    style={{
                                                        color: isActive
                                                            ? '#1976d2'
                                                            : '#333',
                                                        textDecoration: 'none',
                                                        fontWeight: '500',
                                                        fontSize: '14px',
                                                        padding: '8px 0',
                                                        borderBottom: isActive
                                                            ? '2px solid #1976d2'
                                                            : '2px solid transparent',
                                                        transition:
                                                            'all 0.3s ease',
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.color =
                                                            '#1976d2'
                                                        e.currentTarget.style.borderBottomColor =
                                                            '#1976d2'
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (!isActive) {
                                                            e.currentTarget.style.color =
                                                                '#333'
                                                            e.currentTarget.style.borderBottomColor =
                                                                'transparent'
                                                        }
                                                    }}
                                                >
                                                    {VIETNAMESE_LABELS[key]}
                                                </Link>
                                            )
                                        }
                                    }
                                )}
                            </div>
                        </Col>

                        {/* Right Actions */}
                        <Col>
                            <Row gutter={20} align="middle">
                                {isAuthenticated &&
                                    user?.role === 'student' && (
                                        <Col>
                                            <Badge count={Number(countCart)}>
                                                <Button
                                                    href={`/${user?.role}/cart`}
                                                    size="middle"
                                                    shape="circle"
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
                                        </Col>
                                    )}
                                {isAuthenticated ? (
                                    <>
                                        <Col>
                                            <Dropdown
                                                menu={{ items: userMenuItems }}
                                                placement="bottomRight"
                                            >
                                                <Button
                                                    type="text"
                                                    icon={<UserOutlined />}
                                                    style={{ color: '#1976d2' }}
                                                >
                                                    Tài khoản
                                                </Button>
                                            </Dropdown>
                                        </Col>
                                    </>
                                ) : (
                                    <Col>
                                        <Link className="auth-btn" to="/auth">
                                            Đăng nhập / Đăng ký
                                        </Link>
                                    </Col>
                                )}
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Header>
        </Layout>
    )
}

export default HeaderComponent
