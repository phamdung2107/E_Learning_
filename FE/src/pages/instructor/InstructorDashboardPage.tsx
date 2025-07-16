import { Button, Card, Col, Row, Space, Statistic, Typography } from 'antd'
import { BookOutlined, DollarOutlined, StarOutlined, TrophyOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { INSTRUCTOR_PATHS } from '@/routers/path'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MonthlyRevenueChart } from '@/components/charts/MonthlyRevenueChart'
import StudentActivityChart from '@/components/charts/StudentActivityChart'

import '../styles/InstructorDashboard.css'
import InstructorService from '@/services/instructor'

const { Title, Text } = Typography

const InstructorDashboardPage = () => {
    const user = useSelector((store: any) => store.auth.user)
    const [courseCount, setCourseCount] = useState(0)
    const [studentCount, setStudentCount] = useState(0)
    const [revenue, setRevenue] = useState(0)
    const averageRating = 4.7

    const fetchData = async () => {
        try {
            const [
                resStudent,
                resCourse,
                resRevenue,
            ] = await Promise.all([
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

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="student-dashboard">
            {/* Header */}
            <Card style={{ marginBottom: '24px' }}>
                <Title level={2}>Welcome back, {user?.user?.full_name}! 👋</Title>
                <Text type="secondary">Manage your courses and track your teaching progress</Text>
            </Card>

            {/* Stats Cards */}
            <Row gutter={[16, 16]} className="student-stats-row">
                <Col xs={12} sm={6}>
                    <Card className="student-stats-card">
                        <Statistic
                            title="Courses"
                            value={courseCount}
                            prefix={<BookOutlined />}
                            valueStyle={{ color: '#20B2AA' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card className="student-stats-card">
                        <Statistic
                            title="Students"
                            value={studentCount}
                            prefix={<UserOutlined />}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card className="student-stats-card">
                        <Statistic
                            title="Revenue"
                            value={revenue}
                            prefix={<DollarOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card className="student-stats-card">
                        <Statistic
                            title="Average Rating"
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
                                <span>Monthly Revenue</span>
                            </div>
                        }
                    >
                        <MonthlyRevenueChart instructorId={user.id} />
                    </Card>
                </Col>

                {/* Sidebar */}
                <Col xs={24} lg={10}>
                    <div className="student-sidebar">
                        <Card
                            className="student-activity-card"
                            title="Analytics"
                        >
                            <StudentActivityChart instructorId={user.id} />
                        </Card>

                        {/* Quick Actions */}
                        <Card
                            className="student-actions-card"
                            title="Quick Actions"
                        >
                            <Space
                                direction="vertical"
                                className="student-actions-list"
                                size="small"
                            >
                                <Link to={INSTRUCTOR_PATHS.INSTRUCTOR_MY_COURSES}>
                                    <Button block icon={<BookOutlined />}>
                                        Create New Course
                                    </Button>
                                </Link>
                                <Link to={INSTRUCTOR_PATHS.INSTRUCTOR_MY_COURSES}>
                                    <Button block icon={<BookOutlined />}>
                                        Manage Courses
                                    </Button>
                                </Link>
                                <Link to={INSTRUCTOR_PATHS.INSTRUCTOR_MY_STUDENTS}>
                                    <Button block icon={<UserOutlined />}>
                                        Manage Students
                                    </Button>
                                </Link>
                                <Link to={INSTRUCTOR_PATHS.INSTRUCTOR_DASHBOARD}>
                                    <Button block icon={<TrophyOutlined />}>
                                        View Analytics
                                    </Button>
                                </Link>
                            </Space>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default InstructorDashboardPage