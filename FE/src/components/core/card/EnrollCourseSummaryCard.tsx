import React, { useEffect, useState } from 'react'

import { Button, Card, Col, Progress, Row, Tag, Typography } from 'antd'

import {
    CheckCircleOutlined,
    EyeFilled,
    PlayCircleOutlined,
} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { BASE_IMAGE_URL } from '@/constants/image'
import CertificateService from '@/services/certificate'
import ProgressService from '@/services/progress'

const { Text, Title } = Typography

const EnrollCourseSummaryCard = ({ course }: any) => {
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
            size="small"
            style={{
                background: course.status === 'completed' ? '#f6ffed' : '#fff',
            }}
        >
            <Row gutter={8} align="middle">
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
                        <Link
                            to={`/courses/${course.id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            {course.title}
                        </Link>
                    </Title>
                    <Text type="secondary">
                        bởi {course.instructor.user.full_name}
                    </Text>
                    <div style={{ marginTop: '8px' }}>
                        <Progress
                            percent={
                                Math.round(
                                    (completedLessons / course.lessons.length) *
                                        100
                                ) || 0
                            }
                            size="small"
                            status={
                                completedLessons === course.lessons.length
                                    ? 'success'
                                    : 'active'
                            }
                        />
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                            {completedLessons}/{course.lessons.length} bài học
                        </Text>
                    </div>
                </Col>
                <Col xs={24} sm={6} style={{ textAlign: 'right' }}>
                    {completedLessons === course.lessons.length &&
                    completedLessons > 0 ? (
                        certificate && certificate.has_certificate ? (
                            <Link
                                to={certificate.certificate.certificate_url}
                                target="_blank"
                            >
                                <Button
                                    variant="solid"
                                    color="green"
                                    icon={<EyeFilled />}
                                >
                                    Xem chứng chỉ
                                </Button>
                            </Link>
                        ) : (
                            <Link to={`/courses/${course.id}`} target="_blank">
                                <Button
                                    variant="solid"
                                    color="orange"
                                    icon={<CheckCircleOutlined />}
                                >
                                    Lấy chứng chỉ
                                </Button>
                            </Link>
                        )
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
                                Tiếp tục học
                            </Button>
                        </Link>
                    )}
                </Col>
            </Row>
        </Card>
    )
}

export default EnrollCourseSummaryCard
