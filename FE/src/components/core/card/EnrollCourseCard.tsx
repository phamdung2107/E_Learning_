import React, { useEffect, useState } from 'react'

import { Button, Card, Progress, Tag, Typography } from 'antd'

import { CheckCircleOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { DATE_FORMAT } from '@/constants/date'
import LessonService from '@/services/lesson'
import ProgressService from '@/services/progress'
import { formatDateTime } from '@/utils/format'

const { Text, Title } = Typography

const EnrollCourseCard = ({ course }: any) => {
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
            hoverable
            cover={
                <img
                    alt={course.title}
                    src={course.thumbnail || '/placeholder.svg'}
                    style={{ height: '200px', objectFit: 'cover' }}
                />
            }
            actions={[
                completedLessons === lessons ? (
                    <Link
                        to={`/student/certificates/${course.id}`}
                        key={`certificate-${course.id}`}
                    >
                        <Button type="link" icon={<CheckCircleOutlined />}>
                            Certificate
                        </Button>
                    </Link>
                ) : (
                    <Link
                        to={`/courses/${course.id}`}
                        key={`learn-${course.id}`}
                    >
                        <Button
                            type="link"
                            icon={<PlayCircleOutlined />}
                            style={{ color: '#20B2AA' }}
                        >
                            {course.status === 'not_started'
                                ? 'Start'
                                : 'Continue'}
                        </Button>
                    </Link>
                ),
            ]}
        >
            <div style={{ marginBottom: '12px' }}>
                <Tag>{course.category.name}</Tag>
            </div>

            <Title level={5} style={{ marginBottom: '8px' }}>
                {course.title}
            </Title>

            <Text
                type="secondary"
                style={{ display: 'block', marginBottom: '12px' }}
            >
                by {course.instructor.user.full_name}
            </Text>

            <div style={{ marginBottom: '12px' }}>
                <Progress
                    percent={(completedLessons / lessons) * 100 || 0}
                    size="small"
                    status={
                        course.status === 'completed' ? 'success' : 'active'
                    }
                />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '4px',
                    }}
                >
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                        {completedLessons}/{lessons} lessons
                    </Text>
                </div>
            </div>

            <Text type="secondary" style={{ fontSize: '12px' }}>
                Enrolled: {formatDateTime(course.created_at, DATE_FORMAT)}
            </Text>
        </Card>
    )
}

export default EnrollCourseCard
