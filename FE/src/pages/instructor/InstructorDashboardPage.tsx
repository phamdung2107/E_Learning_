import { Button, Card, Col, List, Row, Space, Statistic, Typography } from 'antd'
import {
    BookOutlined,
    CheckCircleOutlined, DollarOutlined,
    ShoppingCartOutlined,
    TrophyOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { STUDENT_PATHS } from '@/routers/path'
import EnrollCourseSummaryCard from '@/components/core/card/EnrollCourseSummaryCard'
import type React from 'react'
import { useSelector } from 'react-redux'
import { MonthlyRevenueChart } from '@/components/charts/MonthlyRevenueChart'

const { Title, Text } = Typography

const InstructorDashboardPage = () => {
    const user = useSelector((store: any) => store.auth.user)
    console.log('user:', user.id)

    return (
        <div className="student-dashboard">
            {/* Header */}
            <Card style={{ marginBottom: '24px' }}>
                <Title level={2}>Welcome back, {user?.full_name}! 👋</Title>
                <Text type="secondary">Continue your learning journey</Text>
            </Card>

            {/* Stats Cards */}
            <Row gutter={[16, 16]} className="student-stats-row">
                <Col xs={12} sm={6}>
                    <Card className="student-stats-card">
                        <Statistic
                            title="Courses"
                            value={1}
                            prefix={<BookOutlined />}
                            valueStyle={{ color: '#20B2AA' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card className="student-stats-card">
                        <Statistic
                            title="Students"
                            value={2 || 0}
                            prefix={<UserOutlined />}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card className="student-stats-card">
                        <Statistic
                            title="Courses Completed"
                            value={2 || 0}
                            prefix={<CheckCircleOutlined />}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card className="student-stats-card">
                        <Statistic
                            title="Revenue"
                            value={2}
                            prefix={<DollarOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} className="student-main-content">
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
                                <span>Monthly Revenue</span>
                                <Link to={STUDENT_PATHS.STUDENT_MY_COURSES}>
                                    <Button type="link" size="small">
                                        View All
                                    </Button>
                                </Link>
                            </div>
                        }
                    >
                        <MonthlyRevenueChart instructorId={user.id} />
                    </Card>
                </Col>
            </Row>

            {/*    /!* Sidebar *!/*/}
            {/*    <Col xs={24} lg={10}>*/}
            {/*        <div className="student-sidebar">*/}
            {/*            <Card*/}
            {/*                className="student-activity-card"*/}
            {/*                title="Notifications"*/}
            {/*            >*/}
            {/*                <List*/}
            {/*                    className="student-activity-list"*/}
            {/*                    size="small"*/}
            {/*                    dataSource={notifications}*/}
            {/*                    renderItem={(item) => (*/}
            {/*                        <List.Item*/}
            {/*                            style={{*/}
            {/*                                opacity: item.is_read ? 0.5 : 1,*/}
            {/*                                transition: 'opacity 0.3s ease',*/}
            {/*                            }}*/}
            {/*                            actions={*/}
            {/*                                !item.is_read*/}
            {/*                                    ? [*/}
            {/*                                        <Button*/}
            {/*                                            size="small"*/}
            {/*                                            type="link"*/}
            {/*                                            onClick={() =>*/}
            {/*                                                markAsRead(*/}
            {/*                                                    item.id*/}
            {/*                                                )*/}
            {/*                                            }*/}
            {/*                                        >*/}
            {/*                                            Mark as read*/}
            {/*                                        </Button>,*/}
            {/*                                    ]*/}
            {/*                                    : []*/}
            {/*                            }*/}
            {/*                        >*/}
            {/*                            <List.Item.Meta*/}
            {/*                                avatar={getNotificationIcon(*/}
            {/*                                    item.type*/}
            {/*                                )}*/}
            {/*                                title={<Text>{item.title}</Text>}*/}
            {/*                                description={*/}
            {/*                                    <Text type="secondary">*/}
            {/*                                        {new Date(*/}
            {/*                                            item.created_at*/}
            {/*                                        ).toLocaleString()}*/}
            {/*                                    </Text>*/}
            {/*                                }*/}
            {/*                            />*/}
            {/*                        </List.Item>*/}
            {/*                    )}*/}
            {/*                />*/}
            {/*            </Card>*/}

            {/*            /!* Quick Actions *!/*/}
            {/*            <Card*/}
            {/*                className="student-actions-card"*/}
            {/*                title="Quick Actions"*/}
            {/*            >*/}
            {/*                <Space*/}
            {/*                    direction="vertical"*/}
            {/*                    className="student-actions-list"*/}
            {/*                    size="small"*/}
            {/*                >*/}
            {/*                    <Link to={STUDENT_PATHS.STUDENT_MY_COURSES}>*/}
            {/*                        <Button block icon={<BookOutlined />}>*/}
            {/*                            My Courses*/}
            {/*                        </Button>*/}
            {/*                    </Link>*/}
            {/*                    <Link to={STUDENT_PATHS.STUDENT_CERTIFICATE}>*/}
            {/*                        <Button block icon={<TrophyOutlined />}>*/}
            {/*                            Certificates*/}
            {/*                        </Button>*/}
            {/*                    </Link>*/}
            {/*                    <Link to={STUDENT_PATHS.STUDENT_CART}>*/}
            {/*                        <Button*/}
            {/*                            block*/}
            {/*                            icon={<ShoppingCartOutlined />}*/}
            {/*                        >*/}
            {/*                            My Cart*/}
            {/*                        </Button>*/}
            {/*                    </Link>*/}
            {/*                </Space>*/}
            {/*            </Card>*/}
            {/*        </div>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
        </div>
    )
}

export default InstructorDashboardPage