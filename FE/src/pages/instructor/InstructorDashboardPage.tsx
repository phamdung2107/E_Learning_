import React, { useEffect, useState } from 'react'

import {
    Button,
    Card,
    Col,
    Empty,
    List,
    Row,
    Space,
    Statistic,
    Typography,
} from 'antd'

import {
    BellOutlined,
    BookOutlined,
    DollarCircleOutlined,
    DollarOutlined,
    InfoCircleOutlined,
    StarOutlined,
    TrophyOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { MonthlyRevenueChart } from '@/components/charts/MonthlyRevenueChart'
import { INSTRUCTOR_PATHS } from '@/routers/path'
import InstructorService from '@/services/instructor'
import NotificationService from '@/services/notification'
import { getCurrentNotificationAction } from '@/stores/notification/notificationAction'

import '../styles/InstructorDashboard.css'

const { Title, Text } = Typography

const InstructorDashboardPage = () => {
    const dispatch = useDispatch()
    const user = useSelector((store: any) => store.auth.user)
    const [courseCount, setCourseCount] = useState(0)
    const [studentCount, setStudentCount] = useState(0)
    const [revenue, setRevenue] = useState(0)
    const averageRating = 4.7
    const [notifications, setNotifications] = useState<any[]>([])

    const fetchData = async () => {
        try {
            const [resStudent, resCourse, resRevenue] = await Promise.all([
                InstructorService.getStudents(user?.id),
                InstructorService.getCourses(user?.id),
                InstructorService.getRevenue(user?.id),
            ])

            setCourseCount(resCourse.total)
            setStudentCount(resStudent.total)
            setRevenue(resRevenue.data.revenue)
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

    const fetchNotifications = async () => {
        try {
            const response = await NotificationService.getAllUnread()
            setNotifications(response.data)
        } catch (e) {
            console.error('Failed to fetch notifications:', e)
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
        fetchData()
        fetchNotifications()
    }, [])

    return (
        <div className="student-dashboard">
            {/* Header */}
            <Card style={{ marginBottom: '24px' }}>
                <Title level={2}>
                    Chào mừng trở lại, {user?.user?.full_name}! 👋
                </Title>
                <Text type="secondary">
                    Quản lý khóa học và theo dõi tiến trình giảng dạy của bạn
                </Text>
            </Card>

            {/* Stats Cards */}
            <Row gutter={[16, 16]} className="student-stats-row">
                <Col xs={12} sm={6}>
                    <Card className="student-stats-card">
                        <Statistic
                            title="Khóa học"
                            value={courseCount}
                            prefix={<BookOutlined />}
                            valueStyle={{ color: '#20B2AA' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card className="student-stats-card">
                        <Statistic
                            title="Học viên"
                            value={studentCount}
                            prefix={<UserOutlined />}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card className="student-stats-card">
                        <Statistic
                            title="Doanh thu"
                            value={revenue}
                            prefix={<DollarOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card className="student-stats-card">
                        <Statistic
                            title="Đánh giá trung bình"
                            value={averageRating}
                            prefix={<StarOutlined />}
                            valueStyle={{ color: '#faad14' }}
                            suffix="/ 5"
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
                                <span>Doanh thu theo tháng</span>
                            </div>
                        }
                    >
                        <MonthlyRevenueChart instructorId={user.id} />
                    </Card>
                </Col>

                {/* Sidebar */}
                <Col xs={24} lg={10}>
                    <div className="student-sidebar">
                        {notifications.length === 0 ? (
                            <Card
                                className="student-activity-card"
                                title={
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <span>Thông báo</span>
                                        <Button
                                            size="small"
                                            href={
                                                INSTRUCTOR_PATHS.INSTRUCTOR_NOTIFICATIONS
                                            }
                                            onClick={fetchNotifications}
                                            type="link"
                                        >
                                            Xem tất cả
                                        </Button>
                                    </div>
                                }
                            >
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    description="Không có thông báo nào"
                                    style={{ padding: '40px' }}
                                />
                            </Card>
                        ) : (
                            <Card
                                className="student-activity-card"
                                title={
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <span>Thông báo</span>
                                        <Button
                                            size="small"
                                            href={
                                                INSTRUCTOR_PATHS.INSTRUCTOR_NOTIFICATIONS
                                            }
                                            onClick={fetchNotifications}
                                            type="link"
                                        >
                                            Xem tất cả
                                        </Button>
                                    </div>
                                }
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
                                                title={
                                                    <Text>{item.title}</Text>
                                                }
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
                        )}

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
                                <Link
                                    to={INSTRUCTOR_PATHS.INSTRUCTOR_MY_COURSES}
                                >
                                    <Button block icon={<BookOutlined />}>
                                        Tạo khóa học mới
                                    </Button>
                                </Link>
                                <Link
                                    to={INSTRUCTOR_PATHS.INSTRUCTOR_MY_COURSES}
                                >
                                    <Button block icon={<BookOutlined />}>
                                        Quản lý khóa học
                                    </Button>
                                </Link>
                                <Link
                                    to={INSTRUCTOR_PATHS.INSTRUCTOR_MY_STUDENTS}
                                >
                                    <Button block icon={<UserOutlined />}>
                                        Quản lý học viên
                                    </Button>
                                </Link>
                                <Link
                                    to={INSTRUCTOR_PATHS.INSTRUCTOR_DASHBOARD}
                                >
                                    <Button block icon={<TrophyOutlined />}>
                                        Xem phân tích
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

export default InstructorDashboardPage
