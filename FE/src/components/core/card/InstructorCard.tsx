'use client'

import type React from 'react'

import { Button, Card, Typography } from 'antd'

import {
    LinkedinOutlined,
    MailOutlined,
    PhoneOutlined,
    UserOutlined,
} from '@ant-design/icons'

import './styles/InstructorCard.css'

const { Title, Text, Paragraph } = Typography

const InstructorCard = ({ instructor }: any) => {
    const handleLinkedInClick = () => {
        if (instructor.linkedin_url) {
            window.open(instructor.linkedin_url, '_blank')
        }
    }

    const handlePhoneClick = () => {
        if (instructor.user.phone) {
            window.open(`tel:${instructor.user.phone}`, '_self')
        }
    }

    const handleEmailClick = () => {
        if (instructor.user.email) {
            window.open(`mailto:${instructor.user.email}`, '_self')
        }
    }

    return (
        <Card
            styles={{ body: { padding: 0 } }}
            hoverable
            className="instructor-card"
        >
            <div className="instructor-card-header">
                <div className="instructor-experience-badge">
                    {instructor.experience_years}+ năm kinh nghiệm
                </div>

                <div className="instructor-avatar">
                    {instructor.user.avatar ? (
                        <img
                            src={instructor.user.avatar || '/placeholder.svg'}
                            alt={instructor.user.full_name}
                        />
                    ) : (
                        <UserOutlined
                            style={{ fontSize: '40px', color: 'white' }}
                        />
                    )}
                </div>

                <Title level={4} className="instructor-name">
                    {instructor.user.full_name}
                </Title>

                <Text className="instructor-role">
                    {instructor.user.role === 'instructor'
                        ? 'Giảng viên'
                        : 'Chuyên gia'}
                </Text>
            </div>

            <div className="instructor-card-body">
                <Paragraph className="instructor-bio">
                    {instructor.bio}
                </Paragraph>

                {/*<div className="instructor-stats">*/}
                {/*    <div className="instructor-stat-item">*/}
                {/*        <span className="instructor-stat-number experience">{instructor.experience_years}</span>*/}
                {/*        <span className="instructor-stat-label">Năm kinh nghiệm</span>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className="instructor-contact">
                    <Button
                        className="instructor-contact-btn primary"
                        onClick={handleEmailClick}
                        icon={<MailOutlined />}
                        title={instructor.user.email}
                    >
                        Email
                    </Button>

                    {instructor.user.phone && (
                        <Button
                            className="instructor-contact-btn secondary"
                            onClick={handlePhoneClick}
                            icon={<PhoneOutlined />}
                            title={instructor.user.phone}
                        >
                            Gọi điện
                        </Button>
                    )}

                    {instructor.linkedin_url && (
                        <Button
                            className="instructor-contact-btn secondary"
                            onClick={handleLinkedInClick}
                            icon={<LinkedinOutlined />}
                            title="Hồ sơ LinkedIn"
                        >
                            LinkedIn
                        </Button>
                    )}
                </div>
            </div>
        </Card>
    )
}

export default InstructorCard
