import React, { useEffect, useState } from 'react'

import { Button, Card, Rate, Space, Typography } from 'antd'

import { UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

import { BASE_IMAGE_URL } from '@/constants/image'
import ReviewService from '@/services/review'
import { formatPrice } from '@/utils/format'

import './styles/CourseSummaryCard.css'

const { Title, Text } = Typography

const CourseSummaryCard = ({ course }: any) => {
    const [averageRating, setAverageRating] = useState(0)

    const fetchAverageRating = async () => {
        try {
            const response = await ReviewService.getAverageByCourse(
                course.course_id
            )
            setAverageRating(response.data?.average_rating)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAverageRating()
    }, [course])

    return (
        <Card
            hoverable
            className="course-card"
            cover={
                <div className="course-cover">
                    <img
                        src={`${BASE_IMAGE_URL}${course?.thumbnail}`}
                        alt={course?.course.title}
                        className="course-image"
                    />
                </div>
            }
            actions={[
                <Button
                    href={`/courses/${course.course_id}`}
                    key="enroll"
                    type="primary"
                    block
                    className="course-enroll-btn"
                >
                    Đăng ký ngay - {formatPrice(course.course.price)}
                </Button>,
            ]}
        >
            <div style={{ marginBottom: '8px' }}>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                    {course?.course.category?.name}
                </Text>
            </div>
            <Link
                to={`/courses/${course.course.id}`}
                style={{ textDecoration: 'none' }}
            >
                <Title
                    ellipsis={{ rows: 1 }}
                    level={4}
                    style={{ marginBottom: '8px' }}
                >
                    {course.course.title}
                </Title>
            </Link>
            <Text type="secondary">
                bởi {course?.course.instructor?.user?.full_name}
            </Text>
            <div
                style={{
                    marginTop: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Space>
                    <Title level={5} style={{ margin: 0 }}>
                        {averageRating || 5}
                    </Title>
                    <div>
                        <Rate disabled allowHalf value={averageRating || 5} />
                    </div>
                </Space>
                <Space>
                    <UserOutlined />
                    <Text>{course.total} học viên</Text>
                </Space>
            </div>
        </Card>
    )
}

export default CourseSummaryCard
