import type React from 'react'

import { Card, Col, Row, Space, Statistic, Typography } from 'antd'

import { StarOutlined, UserOutlined } from '@ant-design/icons'

import './styles/InstructorCard.css'

const { Title, Text } = Typography

const InstructorCard = ({ instructor }: any) => {
    return (
        <Card hoverable className="instructor-card">
            <div className="instructor-avatar">
                <UserOutlined style={{ fontSize: '48px', color: 'white' }} />
            </div>
            <Title level={4} style={{ marginBottom: '8px' }}>
                {instructor.name}
            </Title>
            <Text
                style={{
                    color: '#20B2AA',
                    fontWeight: '600',
                    display: 'block',
                    marginBottom: '12px',
                }}
            >
                {instructor.title}
            </Text>
            <div style={{ marginBottom: '16px' }}>
                <Space wrap>
                    {instructor.specialties.map((specialty: any, idx: any) => (
                        <span key={idx} className="specialty-tag">
                            {specialty}
                        </span>
                    ))}
                </Space>
            </div>
            <Row gutter={16} style={{ marginBottom: '16px' }}>
                <Col span={8}>
                    <Statistic
                        title="Experience"
                        value={instructor.experience}
                        valueStyle={{ fontSize: '14px', color: '#20B2AA' }}
                    />
                </Col>
                <Col span={8}>
                    <Statistic
                        title="Students"
                        value={instructor.students}
                        valueStyle={{ fontSize: '14px', color: '#667eea' }}
                    />
                </Col>
                <Col span={8}>
                    <Statistic
                        title="Rating"
                        value={instructor.rating}
                        prefix={<StarOutlined style={{ color: '#faad14' }} />}
                        valueStyle={{ fontSize: '14px', color: '#faad14' }}
                    />
                </Col>
            </Row>
        </Card>
    )
}

export default InstructorCard
