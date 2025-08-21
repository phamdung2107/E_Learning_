'use client'

import React, { useState } from 'react'

import {
    Badge,
    Button,
    Col,
    Drawer,
    Dropdown,
    Layout,
    Menu,
    Row,
    Typography,
} from 'antd'

import {
    ClockCircleOutlined,
    CloseOutlined,
    FacebookOutlined,
    InstagramOutlined,
    LinkedinOutlined,
    LogoutOutlined,
    MailOutlined,
    MenuOutlined,
    PhoneOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    XOutlined,
    YoutubeOutlined,
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import { COMMON_INFORMATION } from '@/constants/information'
import { AUTH_PATHS, PUBLIC_PATHS, VIETNAMESE_LABELS } from '@/routers/path'
import { logout } from '@/stores/auth/authSlice'
import { setCart } from '@/stores/cart/cartSlice'
import { setNotification } from '@/stores/notification/notificationSlice'

const { Header } = Layout
const { Text } = Typography

const HeaderMobileComponent: React.FC = () => {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(
        (store: any) => store.auth.isAuthenticated
    )
    const user = useSelector((store: any) => store.auth.user)
    const [drawerVisible, setDrawerVisible] = useState(false)
    const { pathname } = useLocation()

    return (
        <div>
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
                        margin: '0 auto',
                        padding: '0 20px',
                    }}
                >
                    <Row align="middle">
                        <Col>
                            <Row
                                gutter={24}
                                align="middle"
                                justify="space-between"
                            >
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
                            </Row>
                        </Col>
                        <Col>
                            <Row gutter={0} align="middle" justify="center">
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
            <Header
                style={{
                    padding: '0 16px',
                    background: '#fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
            >
                <Row align="middle" justify="space-between">
                    <Col style={{ display: 'flex', alignItems: 'center' }}>
                        <div
                            style={{
                                width: '35px',
                                height: '35px',
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
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                }}
                            >
                                M
                            </Text>
                        </div>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 15,
                                color: '#1976d2',
                            }}
                        >
                            MONA EDUCATION
                        </Text>
                    </Col>

                    <Col>
                        <Row align="middle" gutter={12}>
                            <Col>
                                <Button
                                    type="text"
                                    size={'large'}
                                    icon={<MenuOutlined />}
                                    onClick={() => setDrawerVisible(true)}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>

                {/* Drawer menu */}
                <Drawer
                    title=""
                    placement="left"
                    destroyOnHidden
                    onClose={() => setDrawerVisible(false)}
                    open={drawerVisible}
                >
                    <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                        <Button
                            type="primary"
                            style={{ flex: 1 }}
                            icon={<PhoneOutlined />}
                            href={PUBLIC_PATHS.CONTACT}
                        >
                            Liên hệ
                        </Button>
                        {isAuthenticated ? (
                            <Button
                                href={`/${user?.role ? user?.role : user?.user?.role}`}
                                type="default"
                                icon={<UserOutlined />}
                                style={{ flex: 1 }}
                            >
                                Quản lý
                            </Button>
                        ) : (
                            <Link
                                to={AUTH_PATHS.AUTH}
                                style={{ flex: 1 }}
                                onClick={() => setDrawerVisible(false)}
                            >
                                <Button
                                    type="default"
                                    style={{ width: '100%' }}
                                >
                                    Đăng nhập
                                </Button>
                            </Link>
                        )}
                    </div>

                    <Menu
                        style={{ border: 'none' }}
                        mode="inline"
                        selectedKeys={[pathname]}
                    >
                        {Object.entries(PUBLIC_PATHS).map(([key, value]) => {
                            if (
                                !value.startsWith('/courses/') &&
                                VIETNAMESE_LABELS[key]
                            ) {
                                return (
                                    <Menu.Item
                                        key={key}
                                        onClick={() => setDrawerVisible(false)}
                                    >
                                        <Link to={value}>
                                            {VIETNAMESE_LABELS[key]}
                                        </Link>
                                    </Menu.Item>
                                )
                            }
                        })}
                        {isAuthenticated && (
                            <Menu.Item
                                key="logout"
                                onClick={() => setDrawerVisible(false)}
                            >
                                <div
                                    onClick={() => {
                                        dispatch(logout())
                                        dispatch(setCart())
                                        dispatch(setNotification())
                                    }}
                                >
                                    Đăng xuất
                                </div>
                            </Menu.Item>
                        )}
                    </Menu>
                </Drawer>
            </Header>
        </div>
    )
}

export default HeaderMobileComponent
