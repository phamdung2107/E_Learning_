'use client'

import type React from 'react'
import { useEffect, useState } from 'react'

import {
    Button,
    Card,
    Col,
    List,
    Row,
    Space,
    Statistic,
    Typography,
} from 'antd'

import {
    BellOutlined,
    BookOutlined,
    CheckCircleOutlined,
    DollarCircleOutlined,
    InfoCircleOutlined,
    ShoppingCartOutlined,
    TrophyOutlined,
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import EnrollCourseSummaryCard from '@/components/core/card/EnrollCourseSummaryCard'
import { STUDENT_PATHS } from '@/routers/path'
import CertificateService from '@/services/certificate'
import CourseService from '@/services/course'
import NotificationService from '@/services/notification'
import ProgressService from '@/services/progress'
import { getCurrentNotificationAction } from '@/stores/notification/notificationAction'

import '../styles/StudentDashboard.css'

const { Title, Text } = Typography

const StudentDashboard: React.FC = () => {
    const dispatch = useDispatch()
    const user = useSelector((store: any) => store.auth.user)
    const [enrolledCourses, setEnrolledCourses] = useState<any[]>([])
    const [progressSummary, setProgressSummary] = useState<any>({})
    const [totalCertificate, setTotalCertificate] = useState(0)
    const [notifications, setNotifications] = useState<any[]>([])

    const fetchNotifications = async () => {
        try {
            const response = await NotificationService.getAll()
            setNotifications(response.data)
        } catch (e) {
            console.error('Failed to fetch notifications:', e)
        }
    }

    const fetchEnrolledCourses = async () => {
        try {
            const response = await CourseService.getMyEnrolledCourses({})
            setEnrolledCourses(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    const fetchProgressSummary = async () => {
        try {
            const response = await ProgressService.getSummary()
            setProgressSummary(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    const fetchTotalCertificate = async () => {
        try {
            const response = await CertificateService.getAll({
                user: user.id,
            })
            setTotalCertificate(response.total)
        } catch (e) {
            console.error(e)
        }
    }

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'system':
                return <InfoCircleOutlined style={{ color: '#1890ff' }} />
            case 'course':
                return <BookOutlined style={{ color: '#20B2AA' }} />
            case 'payment':
                return <DollarCircleOutlined style={{ color: '#faad14' }} />
            case 'other':
            default:
                return <BellOutlined style={{ color: '#999' }} />
        }
    }

    const markAsRead = async (id: number) => {
        try {
            await NotificationService.maskAsRead(id)
            await fetchNotifications()
            dispatch(getCurrentNotificationAction())
        } catch (e) {
            console.error('Failed to mark as read:', e)
        }
    }

    useEffect(() => {
        fetchEnrolledCourses()
        fetchProgressSummary()
        fetchTotalCertificate()
        fetchNotifications()
    }, [])

    return (
        <div className="student-dashboard">
            {/* Header */}
            <Card style={{ marginBottom: '24px' }}>
                <Title level={2}>
                    Chào mừng trở lại, {user?.full_name}! 👋
                </Title>
                <Text type="secondary">
                    Tiếp tục hành trình học tập của bạn
                </Text>
            </Card>

            {/* Stats Cards */}
            <Row gutter={[16, 16]} className="student-stats-row">
                <Col xs={12} sm={6}>
                    <Card className="student-stats-card">
                        <Statistic
                            title="Khóa học"
                            value={enrolledCourses.length}
                            prefix={<BookOutlined />}
                            valueStyle={{ color: '#20B2AA' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card className="student-stats-card">
                        <Statistic
                            title="Bài học đã hoàn thành"
                            value={progressSummary.completed_lessons || 0}
                            prefix={<CheckCircleOutlined />}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card className="student-stats-card">
                        <Statistic
                            title="Khóa học đã hoàn thành"
                            value={progressSummary.completed_courses || 0}
                            prefix={<CheckCircleOutlined />}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card className="student-stats-card">
                        <Statistic
                            title="Chứng chỉ"
                            value={totalCertificate}
                            prefix={<TrophyOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} className="student-main-content">
                {/* My Courses */}
                <Col xs={24} lg={14}>
                    <Card
                        className="student-courses-card"
                        title={
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <span>Khóa học của tôi</span>
                                <Link to={STUDENT_PATHS.STUDENT_MY_COURSES}>
                                    <Button type="link" size="small">
                                        Xem tất cả
                                    </Button>
                                </Link>
                            </div>
                        }
                    >
                        <Space
                            direction="vertical"
                            className="student-courses-list"
                            size="small"
                        >
                            {enrolledCourses.map((course) => (
                                <div key={course.id}>
                                    <EnrollCourseSummaryCard course={course} />
                                </div>
                            ))}
                        </Space>
                    </Card>
                </Col>

                {/* Sidebar */}
                <Col xs={24} lg={10}>
                    <div className="student-sidebar">
                        <Card
                            className="student-activity-card"
                            title="Thông báo"
                        >
                            <List
                                className="student-activity-list"
                                size="small"
                                dataSource={notifications}
                                renderItem={(item) => (
                                    <List.Item
                                        style={{
                                            opacity: item.is_read ? 0.5 : 1,
                                            transition: 'opacity 0.3s ease',
                                        }}
                                        actions={
                                            !item.is_read
                                                ? [
                                                      <Button
                                                          size="small"
                                                          type="link"
                                                          onClick={() =>
                                                              markAsRead(
                                                                  item.id
                                                              )
                                                          }
                                                      >
                                                          Đánh dấu đã đọc
                                                      </Button>,
                                                  ]
                                                : []
                                        }
                                    >
                                        <List.Item.Meta
                                            avatar={getNotificationIcon(
                                                item.type
                                            )}
                                            title={<Text>{item.title}</Text>}
                                            description={
                                                <Text type="secondary">
                                                    {new Date(
                                                        item.created_at
                                                    ).toLocaleString()}
                                                </Text>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>

                        {/* Quick Actions */}
                        <Card
                            className="student-actions-card"
                            title="Truy cập nhanh"
                        >
                            <Space
                                direction="vertical"
                                className="student-actions-list"
                                size="small"
                            >
                                <Link to={STUDENT_PATHS.STUDENT_MY_COURSES}>
                                    <Button block icon={<BookOutlined />}>
                                        Khóa học của tôi
                                    </Button>
                                </Link>
                                <Link to={STUDENT_PATHS.STUDENT_CERTIFICATE}>
                                    <Button block icon={<TrophyOutlined />}>
                                        Chứng chỉ
                                    </Button>
                                </Link>
                                <Link to={STUDENT_PATHS.STUDENT_CART}>
                                    <Button
                                        block
                                        icon={<ShoppingCartOutlined />}
                                    >
                                        Giỏ hàng
                                    </Button>
                                </Link>
                            </Space>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default StudentDashboard
