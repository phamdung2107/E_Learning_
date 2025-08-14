import React, { useEffect, useState } from 'react'

import { Button, Card, Progress, Tag, Typography } from 'antd'

import {
    CheckCircleOutlined,
    EyeFilled,
    PlayCircleOutlined,
} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { DATE_FORMAT } from '@/constants/date'
import { BASE_IMAGE_URL } from '@/constants/image'
import { STUDENT_PATHS } from '@/routers/path'
import CertificateService from '@/services/certificate'
import LessonService from '@/services/lesson'
import ProgressService from '@/services/progress'
import { formatDateTime } from '@/utils/format'

const { Text, Title } = Typography

const EnrollCourseCard = ({ course }: any) => {
    const user = useSelector((state: any) => state.auth.user)
    const userId = user.user ? user.user.id : user.id
    const [completedLessons, setCompletedLessons] = useState<any>(0)
    const [certificate, setCertificate] = useState<any>(null)

    const fetchCertificate = async () => {
        try {
            const response = await CertificateService.check(userId, course.id)
            setCertificate(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    const fetchCompletedLessons = async () => {
        try {
            const response = await ProgressService.getByUserCourse(
                userId,
                course.id
            )
            setCompletedLessons(response.total)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchCompletedLessons()
        fetchCertificate()
    }, [course])

    return (
        <Card
            hoverable
            cover={
                <img
                    alt={course.title}
                    src={`${BASE_IMAGE_URL}${course?.thumbnail}`}
                    style={{ height: '200px', objectFit: 'cover' }}
                />
            }
            actions={[
                completedLessons === course.lessons.length &&
                completedLessons > 0 ? (
                    certificate && certificate.has_certificate ? (
                        <Link
                            to={certificate.certificate.certificate_url}
                            target="_blank"
                        >
                            <Button type="link" icon={<EyeFilled />}>
                                Xem chứng chỉ
                            </Button>
                        </Link>
                    ) : (
                        <Link to={`/courses/${course.id}`} target="_blank">
                            <Button type="link" icon={<CheckCircleOutlined />}>
                                Lấy chứng chỉ
                            </Button>
                        </Link>
                    )
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
                            Tiếp tục học
                        </Button>
                    </Link>
                ),
            ]}
        >
            <div style={{ marginBottom: '12px' }}>
                <Tag>{course.category.name}</Tag>
            </div>

            <Title
                ellipsis={{ rows: 1 }}
                level={5}
                style={{ marginBottom: '8px' }}
            >
                <Link
                    to={`/courses/${course.id}`}
                    style={{ textDecoration: 'none' }}
                >
                    {course.title}
                </Link>
            </Title>

            <Text
                type="secondary"
                style={{ display: 'block', marginBottom: '12px' }}
            >
                bởi {course.instructor.user.full_name}
            </Text>

            <div style={{ marginBottom: '12px' }}>
                <Progress
                    percent={
                        Math.round(
                            (completedLessons / course.lessons.length) * 100
                        ) || 0
                    }
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
                        {completedLessons}/{course.lessons.length} bài học
                    </Text>
                </div>
            </div>

            <Text type="secondary" style={{ fontSize: '12px' }}>
                Ngày đăng ký: {formatDateTime(course.created_at, DATE_FORMAT)}
            </Text>
        </Card>
    )
}

export default EnrollCourseCard
