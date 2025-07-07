'use client'

import type React from 'react'

import { Button, Col, Row, Space, Typography } from 'antd'

import {
    EnvironmentOutlined,
    FacebookOutlined,
    InstagramOutlined,
    LinkedinOutlined,
    MailOutlined,
    PhoneOutlined,
    XOutlined,
    YoutubeOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

import { COMMON_INFORMATION } from '@/constants/information'

const { Title, Text } = Typography

const FooterComponent: React.FC = () => {
    return (
        <div style={{ backgroundColor: '#001529', color: 'white' }}>
            <div
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '40px 20px 20px',
                }}
            >
                <Row gutter={[32, 32]} justify="space-between">
                    {/* Company Info */}
                    <Col xs={24} sm={12} md={6}>
                        <div style={{ marginBottom: '20px' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '16px',
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
                                    <Title
                                        level={4}
                                        style={{ color: 'white', margin: 0 }}
                                    >
                                        MONA EDUCATION
                                    </Title>
                                </div>
                            </div>
                            <Text style={{ color: '#ccc' }}>
                                Leading online education platform with
                                high-quality courses and modern learning
                                methods.
                            </Text>
                        </div>
                    </Col>

                    {/* Quick Links */}
                    <Col xs={24} sm={12} md={6}>
                        <Title
                            level={5}
                            style={{ color: 'white', marginBottom: '16px' }}
                        >
                            Quick Links
                        </Title>
                        <Space direction="vertical" size="small">
                            <Link to="/" style={{ color: '#ccc' }}>
                                Home
                            </Link>
                            <Link to="/about" style={{ color: '#ccc' }}>
                                About Us
                            </Link>
                            <Link to="/courses" style={{ color: '#ccc' }}>
                                Courses
                            </Link>
                            <Link to="/activities" style={{ color: '#ccc' }}>
                                Activities
                            </Link>
                            <Link to="/contact" style={{ color: '#ccc' }}>
                                Contact
                            </Link>
                        </Space>
                    </Col>

                    {/* Contact Info */}
                    <Col xs={24} sm={12} md={6}>
                        <Title
                            level={5}
                            style={{ color: 'white', marginBottom: '16px' }}
                        >
                            Contact Information
                        </Title>
                        <Space direction="vertical" size="small">
                            <Text style={{ color: '#ccc' }}>
                                <PhoneOutlined style={{ marginRight: '8px' }} />
                                {COMMON_INFORMATION.PHONE_NUMBER}
                            </Text>
                            <Text style={{ color: '#ccc' }}>
                                <MailOutlined style={{ marginRight: '8px' }} />
                                {COMMON_INFORMATION.EMAIL}
                            </Text>
                            <Text style={{ color: '#ccc' }}>
                                <EnvironmentOutlined
                                    style={{ marginRight: '8px' }}
                                />
                                Mon - Fri: 9:00 AM - 6:00 PM
                            </Text>
                        </Space>
                    </Col>

                    {/* Social Media */}
                    <Col xs={24} sm={12} md={6}>
                        <Title
                            level={5}
                            style={{ color: 'white', marginBottom: '16px' }}
                        >
                            Follow Us
                        </Title>
                        <Space size="large">
                            <Button
                                type="text"
                                style={{ color: 'white', padding: 0 }}
                                href={COMMON_INFORMATION.FACEBOOK_LINK}
                                target="_blank"
                            >
                                <FacebookOutlined />
                            </Button>

                            <Button
                                type="text"
                                style={{ color: 'white', padding: 0 }}
                                href={COMMON_INFORMATION.X_LINK}
                                target="_blank"
                            >
                                <XOutlined />
                            </Button>

                            <Button
                                type="text"
                                style={{ color: 'white', padding: 0 }}
                                href={COMMON_INFORMATION.INSTAGRAM_LINK}
                                target="_blank"
                            >
                                <InstagramOutlined />
                            </Button>

                            <Button
                                type="text"
                                style={{ color: 'white', padding: 0 }}
                                href={COMMON_INFORMATION.YOUTUBE_LINK}
                                target="_blank"
                            >
                                <YoutubeOutlined />
                            </Button>

                            <Button
                                type="text"
                                style={{ color: 'white', padding: 0 }}
                                href={COMMON_INFORMATION.LINKEDIN_LINK}
                                target="_blank"
                            >
                                <LinkedinOutlined />
                            </Button>
                        </Space>
                    </Col>
                </Row>

                {/* Copyright */}
                <div
                    style={{
                        borderTop: '1px solid #333',
                        marginTop: '30px',
                        paddingTop: '20px',
                        textAlign: 'center',
                    }}
                >
                    <Text style={{ color: '#ccc' }}>
                        © 2024 Education Platform by Mona Media. All rights
                        reserved.
                    </Text>
                </div>
            </div>
        </div>
    )
}

export default FooterComponent
