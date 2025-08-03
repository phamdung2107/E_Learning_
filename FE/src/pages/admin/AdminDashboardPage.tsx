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
    PicRightOutlined,
    ReloadOutlined,
    StarOutlined,
    TrophyOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { MonthlyRevenueChart } from '@/components/charts/MonthlyRevenueChart'
import StudentActivityChart from '@/components/charts/StudentActivityChart'
import { ADMIN_PATHS, INSTRUCTOR_PATHS } from '@/routers/path'
import EnrollmentService from '@/services/enrollment'
import InstructorService from '@/services/instructor'
import NotificationService from '@/services/notification'
import UserService from '@/services/user'
import { getCurrentUserAction } from '@/stores/auth/authAction'
import { getCurrentNotificationAction } from '@/stores/notification/notificationAction'

const { Title, Text } = Typography

const AdminDashboardPage = () => {
    const user = useSelector((store: any) => store.auth.user)
    const dispatch = useDispatch()
    const [courseCount, setCourseCount] = useState(0)
    const [studentCount, setStudentCount] = useState(0)
    const [revenue, setRevenue] = useState(0)
    const [totalEnrollments, setTotalEnrollments] = useState<any>(0)
    const [countUsers, setCountUsers] = useState<any>(0)
    const averageRating = 4.7
    const [notifications, setNotifications] = useState<any[]>([])

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
            const response = await NotificationService.getAll()
            setNotifications(response.data)
        } catch (e) {
            console.error('Failed to fetch notifications:', e)
        }
    }

    const fetchData = async () => {
        try {
            const [resCountUsers, resEnroll] = await Promise.all([
                UserService.countUsers(),
                EnrollmentService.getAll(),
                // InstructorService.getRevenue(user?.id),
            ])

            setTotalEnrollments(resEnroll.total)
            setCountUsers(resCountUsers.data)
            // setRevenue(resRevenue.data.revenue)
        } catch (e) {
            console.error(e)
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
                    Chào mừng trở lại, {user?.full_name}! 👋
                </Title>
                <Text type="secondary">
                    Quản lý các khóa học và theo dõi tiến trình giảng dạy của
                    bạn
                </Text>
            </Card>

            {/* Stats Cards */}
            <Row
                gutter={[16, 16]}
                justify="space-between"
                className="student-stats-row"
            >
                <Col xs={12} sm={4}>
                    <Card className="student-stats-card">
                        <Statistic
                            title="Tổng số người dùng"
                            value={countUsers?.total}
                            prefix={<UserOutlined />}
                            valueStyle={{ color: '#20B2AA' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={4}>
                    <Card className="student-stats-card">
                        <Statistic
                            title="Người dùng đang hoạt động"
                            value={countUsers?.active}
                            prefix={<UserOutlined />}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={4}>
                    <Card className="student-stats-card">
                        <Statistic
                            title="Tổng số giảng viên"
                            value={countUsers?.instructors}
                            prefix={<UserOutlined />}
                            valueStyle={{ color: 'blue' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={4}>
                    <Card className="student-stats-card">
                        <Statistic
                            title="Người dùng bị khóa"
                            value={countUsers?.banned}
                            prefix={<UserOutlined />}
                            valueStyle={{ color: 'red' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={4}>
                    <Card className="student-stats-card">
                        <Statistic
                            title="Doanh thu"
                            value={revenue}
                            prefix={<DollarOutlined />}
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
                                            href="/admin/notifications"
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
                                            href="/admin/notifications"
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
                            title="Chức năng nhanh"
                        >
                            <Space
                                direction="vertical"
                                className="student-actions-list"
                                size="small"
                            >
                                <Link to={ADMIN_PATHS.ADMIN_MANAGE_USERS}>
                                    <Button block icon={<UserOutlined />}>
                                        Quản lý người dùng
                                    </Button>
                                </Link>
                                <Link to={ADMIN_PATHS.ADMIN_MANAGE_COURSES}>
                                    <Button block icon={<BookOutlined />}>
                                        Quản lý khóa học
                                    </Button>
                                </Link>
                                <Link
                                    to={ADMIN_PATHS.ADMIN_MANAGE_TRANSACTIONS}
                                >
                                    <Button block icon={<DollarOutlined />}>
                                        Quản lý giao dịch
                                    </Button>
                                </Link>
                                <Link to={ADMIN_PATHS.ADMIN_MANAGE_EVENTS}>
                                    <Button block icon={<PicRightOutlined />}>
                                        Quản lý hoạt động
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

export default AdminDashboardPage
