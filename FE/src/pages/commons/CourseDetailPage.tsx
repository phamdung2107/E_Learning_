'use client'

import type React from 'react'
import { useEffect, useState } from 'react'

import {
    Breadcrumb,
    Button,
    Card,
    Col,
    Collapse,
    Divider,
    Rate,
    Row,
    Space,
    Tag,
    Typography,
} from 'antd'

import {
    BookOutlined,
    CheckOutlined,
    ClockCircleOutlined,
    FileTextOutlined,
    GlobalOutlined,
    HeartOutlined,
    HomeOutlined,
    PlayCircleOutlined,
    RightOutlined,
    ShareAltOutlined,
    StarOutlined,
    TrophyOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons'
import { useParams } from 'react-router-dom'

import CourseCard from '@/components/core/card/CourseCard'
import { formatPrice } from '@/utils/format'

import '../styles/CourseDetail.css'

const { Title, Paragraph, Text } = Typography
const { Panel } = Collapse

const CourseDetailPage: React.FC = () => {
    const params = useParams()
    const courseId = params.id as string
    const [course, setCourse] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('overview')

    // Mock course data - in real app, this would come from API
    const mockCourse = {
        id: Number.parseInt(courseId),
        title: 'Complete Web Development Bootcamp 2024',
        description:
            'Master modern web development with this comprehensive course covering HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and become a full-stack developer ready for the job market.',
        longDescription:
            "This comprehensive web development bootcamp is designed to take you from beginner to professional developer. You'll learn the latest technologies and best practices used by top companies worldwide. The course includes hands-on projects, real-world applications, and career guidance to help you land your dream job in tech.",
        instructor: {
            name: 'John Smith',
            title: 'Senior Full Stack Developer',
            bio: 'John is a senior full-stack developer with over 10 years of experience working at top tech companies including Google and Facebook. He has taught over 100,000 students and is passionate about helping others break into the tech industry.',
            avatar: '/placeholder.svg?height=120&width=120',
            rating: 4.9,
            students: 50000,
            courses: 12,
            experience: '10+ years',
        },
        category: 'Web Development',
        level: 'beginner',
        duration: '40 hours',
        lessons: 156,
        rating: 4.8,
        students: 15420,
        price: 1990000,
        originalPrice: 2990000,
        image: '/placeholder.svg?height=400&width=600',
        language: 'English',
        lastUpdated: 'December 2023',
        certificate: true,
        lifetime: true,
        curriculum: [
            {
                id: 1,
                title: 'Introduction to Web Development',
                lessons: 8,
                duration: '2h 30m',
                items: [
                    {
                        title: 'What is Web Development?',
                        duration: '15m',
                        type: 'video',
                    },
                    {
                        title: 'Setting up Development Environment',
                        duration: '20m',
                        type: 'video',
                    },
                    {
                        title: 'Understanding the Web',
                        duration: '18m',
                        type: 'video',
                    },
                    { title: 'HTML Basics', duration: '25m', type: 'video' },
                    {
                        title: 'CSS Fundamentals',
                        duration: '30m',
                        type: 'video',
                    },
                    {
                        title: 'JavaScript Introduction',
                        duration: '22m',
                        type: 'video',
                    },
                    {
                        title: 'First Project Setup',
                        duration: '15m',
                        type: 'video',
                    },
                    { title: 'Module Quiz', duration: '5m', type: 'quiz' },
                ],
            },
            {
                id: 2,
                title: 'HTML & CSS Mastery',
                lessons: 12,
                duration: '4h 15m',
                items: [
                    {
                        title: 'Advanced HTML Elements',
                        duration: '25m',
                        type: 'video',
                    },
                    { title: 'Semantic HTML', duration: '20m', type: 'video' },
                    {
                        title: 'CSS Grid System',
                        duration: '35m',
                        type: 'video',
                    },
                    { title: 'Flexbox Layout', duration: '30m', type: 'video' },
                    {
                        title: 'Responsive Design',
                        duration: '40m',
                        type: 'video',
                    },
                    { title: 'CSS Animations', duration: '25m', type: 'video' },
                    { title: 'SASS/SCSS', duration: '30m', type: 'video' },
                    { title: 'CSS Frameworks', duration: '20m', type: 'video' },
                    {
                        title: 'Project: Portfolio Website',
                        duration: '45m',
                        type: 'project',
                    },
                    { title: 'Code Review', duration: '15m', type: 'video' },
                    {
                        title: 'Best Practices',
                        duration: '10m',
                        type: 'reading',
                    },
                    {
                        title: 'Module Assessment',
                        duration: '10m',
                        type: 'quiz',
                    },
                ],
            },
            {
                id: 3,
                title: 'JavaScript Programming',
                lessons: 15,
                duration: '6h 45m',
                items: [
                    {
                        title: 'JavaScript Fundamentals',
                        duration: '30m',
                        type: 'video',
                    },
                    {
                        title: 'Variables and Data Types',
                        duration: '25m',
                        type: 'video',
                    },
                    {
                        title: 'Functions and Scope',
                        duration: '35m',
                        type: 'video',
                    },
                    {
                        title: 'Objects and Arrays',
                        duration: '40m',
                        type: 'video',
                    },
                    {
                        title: 'DOM Manipulation',
                        duration: '45m',
                        type: 'video',
                    },
                    { title: 'Event Handling', duration: '30m', type: 'video' },
                    {
                        title: 'Async JavaScript',
                        duration: '40m',
                        type: 'video',
                    },
                    {
                        title: 'Promises and Async/Await',
                        duration: '35m',
                        type: 'video',
                    },
                    { title: 'Fetch API', duration: '25m', type: 'video' },
                    { title: 'Error Handling', duration: '20m', type: 'video' },
                    { title: 'ES6+ Features', duration: '30m', type: 'video' },
                    {
                        title: 'Project: Interactive Web App',
                        duration: '60m',
                        type: 'project',
                    },
                    {
                        title: 'Code Challenge',
                        duration: '30m',
                        type: 'exercise',
                    },
                    {
                        title: 'Debugging Techniques',
                        duration: '20m',
                        type: 'video',
                    },
                    {
                        title: 'Final Assessment',
                        duration: '15m',
                        type: 'quiz',
                    },
                ],
            },
            {
                id: 4,
                title: 'React Development',
                lessons: 18,
                duration: '8h 20m',
                items: [
                    {
                        title: 'Introduction to React',
                        duration: '25m',
                        type: 'video',
                    },
                    {
                        title: 'Components and JSX',
                        duration: '30m',
                        type: 'video',
                    },
                    {
                        title: 'Props and State',
                        duration: '35m',
                        type: 'video',
                    },
                    {
                        title: 'Event Handling in React',
                        duration: '25m',
                        type: 'video',
                    },
                    { title: 'React Hooks', duration: '45m', type: 'video' },
                    {
                        title: 'State Management',
                        duration: '40m',
                        type: 'video',
                    },
                    { title: 'React Router', duration: '35m', type: 'video' },
                    { title: 'Forms in React', duration: '30m', type: 'video' },
                    {
                        title: 'API Integration',
                        duration: '40m',
                        type: 'video',
                    },
                    { title: 'Context API', duration: '25m', type: 'video' },
                    {
                        title: 'Performance Optimization',
                        duration: '30m',
                        type: 'video',
                    },
                    {
                        title: 'Testing React Apps',
                        duration: '35m',
                        type: 'video',
                    },
                    { title: 'Deployment', duration: '20m', type: 'video' },
                    {
                        title: 'Project: E-commerce App',
                        duration: '90m',
                        type: 'project',
                    },
                    {
                        title: 'Code Review Session',
                        duration: '30m',
                        type: 'video',
                    },
                    {
                        title: 'Best Practices',
                        duration: '15m',
                        type: 'reading',
                    },
                    {
                        title: 'Advanced Patterns',
                        duration: '25m',
                        type: 'video',
                    },
                    {
                        title: 'Final Project',
                        duration: '60m',
                        type: 'project',
                    },
                ],
            },
        ],
        reviews: [
            {
                id: 1,
                name: 'Sarah Johnson',
                avatar: '/placeholder.svg?height=50&width=50',
                rating: 5,
                date: '2 weeks ago',
                comment:
                    'Absolutely fantastic course! John explains everything clearly and the projects are really practical. I landed my first developer job after completing this course.',
            },
            {
                id: 2,
                name: 'Mike Chen',
                avatar: '/placeholder.svg?height=50&width=50',
                rating: 5,
                date: '1 month ago',
                comment:
                    "Best investment I've made in my career. The curriculum is comprehensive and up-to-date. The instructor is very knowledgeable and responsive to questions.",
            },
            {
                id: 3,
                name: 'Emily Rodriguez',
                avatar: '/placeholder.svg?height=50&width=50',
                rating: 4,
                date: '3 weeks ago',
                comment:
                    'Great course with lots of hands-on practice. The projects helped me build a strong portfolio. Would definitely recommend to anyone starting in web development.',
            },
            {
                id: 4,
                name: 'David Kim',
                avatar: '/placeholder.svg?height=50&width=50',
                rating: 5,
                date: '1 week ago',
                comment:
                    'Excellent content and presentation. The course covers everything you need to know to become a full-stack developer. The support from the instructor is amazing.',
            },
        ],
        features: [
            '40 hours of on-demand video',
            '156 downloadable resources',
            'Full lifetime access',
            'Access on mobile and TV',
            'Certificate of completion',
            '30-day money-back guarantee',
        ],
        requirements: [
            'No programming experience needed',
            'A computer with internet connection',
            'Willingness to learn and practice',
        ],
        whatYouWillLearn: [
            'Build responsive websites with HTML, CSS, and JavaScript',
            'Create dynamic web applications with React',
            'Understand backend development with Node.js',
            'Work with databases and APIs',
            'Deploy applications to the cloud',
            'Build a professional portfolio',
        ],
    }

    const relatedCourses: any[] = [
        {
            id: 2,
            title: 'Advanced React Development',
            description:
                'Take your React skills to the next level with advanced patterns and techniques.',
            instructor: 'Jane Doe',
            category: 'Web Development',
            level: 'advanced',
            duration: '25h',
            rating: 4.9,
            students: 8500,
            price: 2490000,
            originalPrice: 3490000,
            image: '/placeholder.svg?height=200&width=300',
        },
        {
            id: 3,
            title: 'Node.js Backend Development',
            description:
                'Master backend development with Node.js, Express, and MongoDB.',
            instructor: 'Alex Wilson',
            category: 'Backend Development',
            level: 'intermediate',
            duration: '35h',
            rating: 4.7,
            students: 6200,
            price: 2190000,
            image: '/placeholder.svg?height=200&width=300',
        },
        {
            id: 4,
            title: 'JavaScript Algorithms & Data Structures',
            description:
                'Strengthen your programming fundamentals with algorithms and data structures.',
            instructor: 'Maria Garcia',
            category: 'Programming',
            level: 'intermediate',
            duration: '30h',
            rating: 4.8,
            students: 9800,
            price: 1890000,
            originalPrice: 2690000,
            image: '/placeholder.svg?height=200&width=300',
        },
    ]

    useEffect(() => {
        // Simulate API call
        const loadCourse = async () => {
            setLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setCourse(mockCourse)
            setLoading(false)
        }

        loadCourse()
    }, [courseId])

    const handleEnroll = () => {
        console.log('Enrolling in course:', courseId)
        // Handle enrollment logic here
    }

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'video':
                return <VideoCameraOutlined />
            case 'quiz':
                return <FileTextOutlined />
            case 'project':
                return <TrophyOutlined />
            case 'reading':
                return <BookOutlined />
            default:
                return <PlayCircleOutlined />
        }
    }

    if (loading || !course) {
        return (
            <div style={{ padding: '100px 20px', textAlign: 'center' }}>
                <Title level={3}>Loading course details...</Title>
            </div>
        )
    }
    return (
        <div>
            {/* Hero Section */}
            <section className="course-detail-hero-section">
                <div className="course-detail-hero-floating-1" />
                <div className="course-detail-hero-floating-2" />

                <div className="course-detail-hero-content">
                    <Row gutter={[48, 48]} align="middle">
                        <Col xs={24} lg={14}>
                            <Title
                                level={1}
                                className="course-detail-hero-title"
                            >
                                {course.title}
                            </Title>

                            <div className="course-detail-hero-meta">
                                <div className="course-detail-hero-meta-item">
                                    <StarOutlined />
                                    <span>
                                        {course.rating} (
                                        {course.students.toLocaleString()}{' '}
                                        students)
                                    </span>
                                </div>
                                <div className="course-detail-hero-meta-item">
                                    <UserOutlined />
                                    <span>
                                        Created by {course.instructor.name}
                                    </span>
                                </div>
                                <div className="course-detail-hero-meta-item">
                                    <ClockCircleOutlined />
                                    <span>
                                        Last updated {course.lastUpdated}
                                    </span>
                                </div>
                                <div className="course-detail-hero-meta-item">
                                    <GlobalOutlined />
                                    <span>{course.language}</span>
                                </div>
                            </div>

                            <Paragraph className="course-detail-hero-description">
                                {course.longDescription}
                            </Paragraph>

                            <div className="course-detail-hero-actions">
                                <div className="course-detail-hero-price">
                                    {formatPrice(course.price)}
                                    <Space style={{ marginLeft: '20px' }}>
                                        <Button
                                            type="primary"
                                            size="large"
                                            className="course-detail-hero-btn"
                                            onClick={handleEnroll}
                                        >
                                            Enroll Now
                                        </Button>
                                    </Space>
                                </div>
                            </div>
                        </Col>

                        <Col xs={24} lg={10}>
                            <div
                                style={{
                                    background: 'rgba(255,255,255,0.1)',
                                    borderRadius: '16px',
                                    padding: '20px',
                                    textAlign: 'center',
                                }}
                            >
                                <img
                                    src={course.image || '/placeholder.svg'}
                                    alt={course.title}
                                    style={{
                                        width: '100%',
                                        height: '300px',
                                        objectFit: 'cover',
                                        borderRadius: '12px',
                                        marginBottom: '20px',
                                    }}
                                />
                                <Button
                                    type="primary"
                                    size="large"
                                    icon={<PlayCircleOutlined />}
                                    style={{
                                        background: 'rgba(255,255,255,0.2)',
                                        border: '2px solid white',
                                        color: 'white',
                                    }}
                                >
                                    Preview Course
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>

            {/* Main Content */}
            <section className="course-detail-main-section">
                <div className="course-detail-main-content">
                    <Row gutter={[48, 48]}>
                        <Col xs={24} lg={16}>
                            {/* Course Overview */}
                            <Card className="course-detail-info-card">
                                <div className="course-detail-info-header">
                                    <Title
                                        level={2}
                                        style={{ color: 'white', margin: 0 }}
                                    >
                                        Course Overview
                                    </Title>
                                </div>
                                <div className="course-detail-info-body">
                                    <div className="course-detail-stats">
                                        <div className="course-detail-stat-item">
                                            <BookOutlined className="course-detail-stat-icon" />
                                            <div className="course-detail-stat-number">
                                                {course.lessons}
                                            </div>
                                            <div className="course-detail-stat-label">
                                                Lessons
                                            </div>
                                        </div>
                                        <div className="course-detail-stat-item">
                                            <ClockCircleOutlined className="course-detail-stat-icon" />
                                            <div className="course-detail-stat-number">
                                                {course.duration}
                                            </div>
                                            <div className="course-detail-stat-label">
                                                Total Duration
                                            </div>
                                        </div>
                                        <div className="course-detail-stat-item">
                                            <UserOutlined className="course-detail-stat-icon" />
                                            <div className="course-detail-stat-number">
                                                {course.students.toLocaleString()}
                                            </div>
                                            <div className="course-detail-stat-label">
                                                Students
                                            </div>
                                        </div>
                                        <div className="course-detail-stat-item">
                                            <TrophyOutlined className="course-detail-stat-icon" />
                                            <div className="course-detail-stat-number">
                                                {course.level}
                                            </div>
                                            <div className="course-detail-stat-label">
                                                Level
                                            </div>
                                        </div>
                                    </div>

                                    <Title
                                        level={3}
                                        style={{ marginBottom: '20px' }}
                                    >
                                        What you'll learn
                                    </Title>
                                    <Row gutter={[16, 16]}>
                                        {course.whatYouWillLearn.map(
                                            (item: string, index: number) => (
                                                <Col
                                                    xs={24}
                                                    md={12}
                                                    key={index}
                                                >
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'flex-start',
                                                            gap: '12px',
                                                        }}
                                                    >
                                                        <CheckOutlined
                                                            style={{
                                                                color: '#20b2aa',
                                                                marginTop:
                                                                    '4px',
                                                                fontSize:
                                                                    '16px',
                                                            }}
                                                        />
                                                        <Text>{item}</Text>
                                                    </div>
                                                </Col>
                                            )
                                        )}
                                    </Row>

                                    <Divider />

                                    <Title
                                        level={3}
                                        style={{ marginBottom: '20px' }}
                                    >
                                        Requirements
                                    </Title>
                                    <ul style={{ paddingLeft: '20px' }}>
                                        {course.requirements.map(
                                            (req: string, index: number) => (
                                                <li
                                                    key={index}
                                                    style={{
                                                        marginBottom: '8px',
                                                        color: '#666',
                                                    }}
                                                >
                                                    {req}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </Card>
                        </Col>

                        <Col xs={24} lg={8}>
                            {/* Enrollment Sidebar */}
                            <div className="course-detail-enrollment-sidebar">
                                <Card className="course-detail-enrollment-card">
                                    <div className="course-detail-enrollment-header">
                                        <div className="course-detail-enrollment-price">
                                            {formatPrice(course.price)}
                                            <div className="course-detail-enrollment-original-price">
                                                {formatPrice(
                                                    course.originalPrice
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="course-detail-enrollment-body">
                                        <Button
                                            type="primary"
                                            size="large"
                                            block
                                            className="course-detail-enrollment-btn"
                                            onClick={handleEnroll}
                                        >
                                            Enroll Now
                                        </Button>
                                        <Button
                                            size="large"
                                            block
                                            style={{ marginBottom: '20px' }}
                                        >
                                            <ShareAltOutlined /> Share Course
                                        </Button>

                                        <Title
                                            level={4}
                                            style={{ marginBottom: '16px' }}
                                        >
                                            This course includes:
                                        </Title>
                                        <ul className="course-detail-enrollment-features">
                                            {course.features.map(
                                                (
                                                    feature: string,
                                                    index: number
                                                ) => (
                                                    <li
                                                        key={index}
                                                        className="course-detail-enrollment-feature"
                                                    >
                                                        <CheckOutlined className="course-detail-enrollment-feature-icon" />
                                                        <span>{feature}</span>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>

            {/* Curriculum Section */}
            <section className="course-detail-curriculum-section">
                <div className="course-detail-curriculum-background" />
                <div className="course-detail-curriculum-content">
                    <Card className="course-detail-curriculum-card">
                        <div className="course-detail-curriculum-header">
                            <Title
                                level={2}
                                style={{ color: 'white', margin: 0 }}
                            >
                                Course Curriculum
                            </Title>
                            <Paragraph
                                style={{
                                    color: 'rgba(255,255,255,0.9)',
                                    margin: '10px 0 0 0',
                                }}
                            >
                                {course.curriculum.length} modules •{' '}
                                {course.lessons} lessons • {course.duration}{' '}
                                total length
                            </Paragraph>
                        </div>
                        <div className="course-detail-curriculum-body">
                            <Collapse
                                defaultActiveKey={['1']}
                                expandIcon={({ isActive }) => (
                                    <RightOutlined rotate={isActive ? 90 : 0} />
                                )}
                            >
                                {course.curriculum.map((module: any) => (
                                    <Panel
                                        header={
                                            <div className="course-detail-module-header">
                                                <div>
                                                    <div className="course-detail-module-title">
                                                        {module.title}
                                                    </div>
                                                    <div className="course-detail-module-meta">
                                                        {module.lessons} lessons
                                                        • {module.duration}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        key={module.id}
                                    >
                                        {module.items.map(
                                            (lesson: any, index: number) => (
                                                <div
                                                    key={index}
                                                    className="course-detail-lesson"
                                                >
                                                    <div className="course-detail-lesson-info">
                                                        <span className="course-detail-lesson-icon">
                                                            {getTypeIcon(
                                                                lesson.type
                                                            )}
                                                        </span>
                                                        <span className="course-detail-lesson-title">
                                                            {lesson.title}
                                                        </span>
                                                    </div>
                                                    <span className="course-detail-lesson-duration">
                                                        {lesson.duration}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </Panel>
                                ))}
                            </Collapse>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Instructor Section */}
            <section className="course-detail-instructor-section">
                <div className="course-detail-instructor-content">
                    <Card className="course-detail-instructor-card">
                        <Row gutter={[32, 32]} align="middle">
                            <Col xs={24} md={8} style={{ textAlign: 'center' }}>
                                <div className="course-detail-instructor-avatar">
                                    <UserOutlined />
                                </div>
                                <Title
                                    level={3}
                                    style={{ marginBottom: '8px' }}
                                >
                                    {course.instructor.name}
                                </Title>
                                <Text
                                    style={{
                                        color: '#20b2aa',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                    }}
                                >
                                    {course.instructor.title}
                                </Text>
                                <div className="course-detail-instructor-stats">
                                    <div className="course-detail-instructor-stat">
                                        <div className="course-detail-instructor-stat-number">
                                            {course.instructor.rating}
                                        </div>
                                        <div className="course-detail-instructor-stat-label">
                                            Rating
                                        </div>
                                    </div>
                                    <div className="course-detail-instructor-stat">
                                        <div className="course-detail-instructor-stat-number">
                                            {course.instructor.students.toLocaleString()}
                                        </div>
                                        <div className="course-detail-instructor-stat-label">
                                            Students
                                        </div>
                                    </div>
                                    <div className="course-detail-instructor-stat">
                                        <div className="course-detail-instructor-stat-number">
                                            {course.instructor.courses}
                                        </div>
                                        <div className="course-detail-instructor-stat-label">
                                            Courses
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} md={16}>
                                <Title
                                    level={3}
                                    style={{ marginBottom: '20px' }}
                                >
                                    About the Instructor
                                </Title>
                                <Paragraph
                                    style={{
                                        fontSize: '16px',
                                        color: '#666',
                                        lineHeight: '1.6',
                                    }}
                                >
                                    {course.instructor.bio}
                                </Paragraph>
                                <Space wrap>
                                    <Tag color="blue">
                                        Experience:{' '}
                                        {course.instructor.experience}
                                    </Tag>
                                    <Tag color="green">
                                        Rating: {course.instructor.rating}/5
                                    </Tag>
                                    <Tag color="orange">
                                        Students:{' '}
                                        {course.instructor.students.toLocaleString()}
                                    </Tag>
                                </Space>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="course-detail-reviews-section">
                <div className="course-detail-reviews-background" />
                <div className="course-detail-reviews-content">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={2} style={{ marginBottom: '16px' }}>
                            Student Reviews
                        </Title>
                        <Paragraph style={{ fontSize: '18px', color: '#666' }}>
                            See what our students are saying about this course
                        </Paragraph>
                    </div>

                    <div className="course-detail-reviews-summary">
                        <div className="course-detail-reviews-rating">
                            {course.rating}
                        </div>
                        <div className="course-detail-reviews-stars">
                            <Rate disabled allowHalf value={course.rating} />
                        </div>
                        <div className="course-detail-reviews-count">
                            Based on {course.students.toLocaleString()} student
                            reviews
                        </div>
                    </div>

                    <Row gutter={[24, 24]}>
                        {course.reviews.map((review: any) => (
                            <Col xs={24} md={12} key={review.id}>
                                <div className="course-detail-review-card">
                                    <div className="course-detail-review-header">
                                        <div className="course-detail-review-avatar">
                                            <UserOutlined />
                                        </div>
                                        <div className="course-detail-review-info">
                                            <div className="course-detail-review-name">
                                                {review.name}
                                            </div>
                                            <div className="course-detail-review-date">
                                                {review.date}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="course-detail-review-rating">
                                        <Rate disabled value={review.rating} />
                                    </div>
                                    <div className="course-detail-review-text">
                                        {review.comment}
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            {/* Related Courses */}
            <section className="course-detail-related-section">
                <div className="course-detail-related-content">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={2} style={{ marginBottom: '16px' }}>
                            Related Courses
                        </Title>
                        <Paragraph style={{ fontSize: '18px', color: '#666' }}>
                            Students who viewed this course also viewed
                        </Paragraph>
                    </div>

                    <Row gutter={[24, 24]}>
                        {relatedCourses.map((relatedCourse) => (
                            <Col xs={24} md={8} key={relatedCourse.id}>
                                <CourseCard course={relatedCourse} />
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>
        </div>
    )
}

export default CourseDetailPage
