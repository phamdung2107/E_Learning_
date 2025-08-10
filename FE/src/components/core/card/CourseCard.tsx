'use client'

import React, { useEffect, useState } from 'react'

import { Button, Card, ConfigProvider, Rate, Typography } from 'antd'

import { UserOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { BASE_IMAGE_URL } from '@/constants/image'
import EnrollmentService from '@/services/enrollment'
import ReviewService from '@/services/review'
import { formatPrice } from '@/utils/format'

import './styles/CourseCard.css'

const { Title, Text, Paragraph } = Typography

const CourseCard = ({ course, onEnroll }: any) => {
    const user = useSelector((store: any) => store.auth.user)
    const [averageRating, setAverageRating] = useState(0)
    const [isEnrolled, setIsEnrolled] = useState<any>('')

    const fetchAverageRating = async () => {
        try {
            const response = await ReviewService.getAverageByCourse(course.id)
            setAverageRating(response.data?.average_rating)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAverageRating()
        EnrollmentService.checkEnrollment(user.id, course.id)
            .then((res) => {
                setIsEnrolled(res.data)
            })
            .catch(() => setIsEnrolled('cancelled'))
    }, [course])

    const handleEnroll = () => {
        onEnroll(course.id)
    }

    return (
        <Card
            styles={{ body: { padding: 0 } }}
            actions={[
                <div style={{ padding: '0 24px' }}>
                    <div className="course-card-meta">
                        <div className="course-card-rating">
                            <Title level={5} style={{ margin: 0 }}>
                                {averageRating}
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
                                    value={averageRating}
                                />
                            </ConfigProvider>
                            <Text type="secondary">
                                ({course?.enrollments_count})
                            </Text>
                        </div>
                    </div>
                    <div className="course-card-footer">
                        <span className="course-card-price">
                            {formatPrice(course?.price)}
                        </span>
                        {isEnrolled === 'active' ||
                        isEnrolled === 'completed' ? (
                            <Button
                                type="primary"
                                className="course-card-btn"
                                onClick={handleEnroll}
                            >
                                Tiếp tục học
                            </Button>
                        ) : (
                            <Button
                                type="primary"
                                className="course-card-btn"
                                onClick={handleEnroll}
                            >
                                Đăng ký
                            </Button>
                        )}
                    </div>
                </div>,
            ]}
            className="course-card"
            hoverable
        >
            <div className="course-card-cover">
                <img
                    src={`${BASE_IMAGE_URL}${course?.thumbnail}`}
                    alt={course?.title}
                    className="course-card-image"
                />
            </div>

            <div className="course-card-body">
                <div className="course-card-category">
                    {course?.category?.name}
                </div>

                <Link
                    to={`/courses/${course?.id}`}
                    style={{ textDecoration: 'none' }}
                >
                    <Title level={4} className="course-card-title">
                        {course?.title}
                    </Title>
                </Link>

                <div className="course-card-instructor">
                    <UserOutlined />
                    <Text>bởi {course?.instructor?.user?.full_name}</Text>
                </div>
                <Paragraph className="course-card-description">
                    <span
                        dangerouslySetInnerHTML={{
                            __html: course?.description,
                        }}
                    />
                </Paragraph>
            </div>
        </Card>
    )
}

export default CourseCard
