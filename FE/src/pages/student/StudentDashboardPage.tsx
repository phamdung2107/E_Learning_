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
    BookOutlined,
    CheckCircleOutlined,
    QuestionCircleOutlined,
    TrophyOutlined,
} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import EnrollCourseSummaryCard from '@/components/core/card/EnrollCourseSummaryCard'
import CertificateService from '@/services/certificate'
import CourseService from '@/services/course'
import ProgressService from '@/services/progress'

import '../styles/StudentDashboard.css'

const { Title, Text } = Typography

const StudentDashboard: React.FC = () => {
    const user = useSelector((store: any) => store.auth.user)
    const [enrolledCourses, setEnrolledCourses] = useState<any[]>([])
    const [progressSummary, setProgressSummary] = useState<any>({})
    const [totalCertificate, setTotalCertificate] = useState(0)
    const [recentActivity, setRecentActivity] = useState<any[]>([])

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

    useEffect(() => {
        fetchEnrolledCourses()
        fetchProgressSummary()
        fetchTotalCertificate()
        setRecentActivity([
            {
                id: 1,
                type: 'lesson_completed',
                title: 'Completed: React Hooks Deep Dive',
                course: 'React Advanced Concepts',
                time: '2 hours ago',
                icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
            },
            {
                id: 2,
                type: 'quiz_completed',
                title: 'Quiz Score: 85% - Express.js Fundamentals',
                course: 'Node.js Backend Development',
                time: '1 day ago',
                icon: <TrophyOutlined style={{ color: '#faad14' }} />,
            },
            {
                id: 3,
                type: 'certificate_earned',
                title: 'Certificate Earned: Database Design',
                course: 'Database Design Fundamentals',
                time: '3 days ago',
                icon: <TrophyOutlined style={{ color: '#1890ff' }} />,
            },
        ])
    }, [])

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
                            value={enrolledCourses.length}
                            prefix={<BookOutlined />}
                            valueStyle={{ color: '#20B2AA' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card className="student-stats-card">
                        <Statistic
                            title="Lessons"
                            value={progressSummary.completed_lessons || 0}
                            prefix={<CheckCircleOutlined />}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card className="student-stats-card">
                        <Statistic
                            title="Completed"
                            value={progressSummary.completed_courses || 0}
                            prefix={<CheckCircleOutlined />}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card className="student-stats-card">
                        <Statistic
                            title="Certificates"
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
                                <span>My Courses</span>
                                <Link to="/student/courses">
                                    <Button type="link" size="small">
                                        View All
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
                        {/* Recent Activity */}
                        <Card
                            className="student-activity-card"
                            title="Recent Activity"
                        >
                            <List
                                className="student-activity-list"
                                size="small"
                                dataSource={recentActivity}
                                renderItem={(item) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={item.icon}
                                            title={<Text>{item.title}</Text>}
                                            description={
                                                <div>
                                                    <Text type="secondary">
                                                        {item.course}
                                                    </Text>
                                                    <br />
                                                    <Text type="secondary">
                                                        {item.time}
                                                    </Text>
                                                </div>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
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
                                <Link to="/student/courses">
                                    <Button block icon={<BookOutlined />}>
                                        My Courses
                                    </Button>
                                </Link>
                                <Link to="/student/quiz">
                                    <Button
                                        block
                                        icon={<QuestionCircleOutlined />}
                                    >
                                        Take Quiz
                                    </Button>
                                </Link>
                                <Link to="/student/certificates">
                                    <Button block icon={<TrophyOutlined />}>
                                        Certificates
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
