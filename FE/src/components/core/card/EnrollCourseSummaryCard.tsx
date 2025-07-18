import { useEffect, useState } from 'react'

import { Button, Card, Col, Progress, Row, Tag, Typography } from 'antd'

import { PlayCircleOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { BASE_IMAGE_URL } from '@/constants/image'
import LessonService from '@/services/lesson'
import ProgressService from '@/services/progress'

const { Text, Title } = Typography

const EnrollCourseSummaryCard = ({ course }: any) => {
    const user = useSelector((state: any) => state.auth.user)
    const [lessons, setLessons] = useState<any>(0)
    const [completedLessons, setCompletedLessons] = useState<any>(0)

    const fetchLessons = async () => {
        try {
            const response = await LessonService.getByCourse(course.id)
            setLessons(response.total)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchCompletedLessons = async () => {
        try {
            const response = await ProgressService.getByUserCourse(
                user.id,
                course.id
            )
            setCompletedLessons(response.total)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchLessons()
        fetchCompletedLessons()
    }, [course])

    return (
        <Card
            size="small"
            style={{
                background: course.status === 'completed' ? '#f6ffed' : '#fff',
            }}
        >
            <Row gutter={16} align="middle">
                <Col xs={24} sm={6}>
                    <img
                        src={`${BASE_IMAGE_URL}${course?.thumbnail}`}
                        alt={course.title}
                        style={{
                            width: '100%',
                            height: '80px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                        }}
                    />
                </Col>
                <Col xs={24} sm={12}>
                    <Title level={5} style={{ margin: '0 0 8px 0' }}>
                        {course.title}
                    </Title>
                    <Text type="secondary">
                        by {course.instructor.user.full_name}
                    </Text>
                    <div style={{ marginTop: '8px' }}>
                        <Progress
                            percent={(completedLessons / lessons) * 100 || 0}
                            size="small"
                            status={
                                course.status === 'completed'
                                    ? 'success'
                                    : 'active'
                            }
                        />
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                            {completedLessons}/{lessons} lessons
                        </Text>
                    </div>
                </Col>
                <Col xs={24} sm={6} style={{ textAlign: 'right' }}>
                    {course.status === 'completed' ? (
                        <Tag color="success">Completed</Tag>
                    ) : (
                        <Link to={`/courses/${course.id}`}>
                            <Button
                                type="primary"
                                icon={<PlayCircleOutlined />}
                                style={{
                                    background: '#20B2AA',
                                    border: 'none',
                                }}
                            >
                                Continue
                            </Button>
                        </Link>
                    )}
                </Col>
            </Row>
        </Card>
    )
}

export default EnrollCourseSummaryCard
