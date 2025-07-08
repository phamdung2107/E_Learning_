'use client'

import type React from 'react'

import { Button, Card, ConfigProvider, Rate, Typography } from 'antd'

import { UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

import { formatPrice } from '@/utils/format'

import './styles/CourseCard.css'

const { Title, Text, Paragraph } = Typography

const CourseCard = ({ course, onEnroll }: any) => {
    const handleEnroll = () => {
        if (onEnroll) {
            onEnroll(course.id)
        }
    }

    return (
        <Card
            styles={{ body: { padding: 0 } }}
            actions={[
                <div style={{ padding: '0 24px' }}>
                    <div className="course-card-meta">
                        <div className="course-card-rating">
                            <Title level={5} style={{ margin: 0 }}>
                                {course.rating}
                            </Title>
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Rate: {
                                            starSize: 12,
                                        },
                                    },
                                }}
                            >
                                <Rate
                                    disabled
                                    allowHalf
                                    defaultValue={course.rating}
                                />
                            </ConfigProvider>
                            <Text type="secondary">
                                ({course.students.toLocaleString()})
                            </Text>
                        </div>
                    </div>
                    <div className="course-card-footer">
                        <span className="course-card-price">
                            {formatPrice(course.price)}
                        </span>
                        <Button
                            type="primary"
                            className="course-card-btn"
                            onClick={handleEnroll}
                        >
                            Buy
                        </Button>
                    </div>
                </div>,
            ]}
            className="course-card"
            hoverable
        >
            <div className="course-card-cover">
                <img
                    src={course.image || '/placeholder.svg'}
                    alt={course.title}
                    className="course-card-image"
                />
            </div>

            <div className="course-card-body">
                <div className="course-card-category">{course.category}</div>

                <Link
                    to={`/courses/${course.id}`}
                    style={{ textDecoration: 'none' }}
                >
                    <Title level={4} className="course-card-title">
                        {course.title}
                    </Title>
                </Link>

                <div className="course-card-instructor">
                    <UserOutlined />
                    <Text>by {course.instructor}</Text>
                </div>
                <Paragraph className="course-card-description">
                    {course.description}
                </Paragraph>
            </div>
        </Card>
    )
}

export default CourseCard
