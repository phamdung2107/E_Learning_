'use client'

import React, { useEffect, useState } from 'react'

import { Button, Col, Input, Row, Space, Statistic, Typography } from 'antd'

import {
    BookOutlined,
    PlayCircleOutlined,
    RocketOutlined,
    SearchOutlined,
    TrophyOutlined,
} from '@ant-design/icons'

import ActivityCard from '@/components/core/card/ActivityCard'
import CategoryCard from '@/components/core/card/CategoryCard'
import CourseSummaryCard from '@/components/core/card/CourseSummaryCard'
import FeedbackCard from '@/components/core/card/FeedbackCard'
import InstructorCard from '@/components/core/card/InstructorCard'
import { PATHS } from '@/routers/path'
import CategoryService from '@/services/category'
import CourseService from '@/services/course'
import EnrollmentService from '@/services/enrollment'
import InstructorService from '@/services/instructor'
import ReviewService from '@/services/review'

import '../styles/Home.css'

const { Title, Paragraph } = Typography
const { Search } = Input

const HomePage: React.FC = () => {
    const [courses, setCourses] = useState<any[]>([])
    const [reviews, setReviews] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])
    const [instructors, setInstructors] = useState<any[]>([])

    const activities = [
        {
            title: 'Weekly Webinars',
            description: 'Join live sessions with industry experts every week',
            icon: <PlayCircleOutlined />,
            color: '#20B2AA',
            participants: '500+ weekly',
        },
        {
            title: 'Coding Bootcamps',
            description: 'Intensive hands-on coding sessions and workshops',
            icon: <BookOutlined />,
            color: '#667eea',
            participants: '200+ monthly',
        },
        {
            title: 'Career Workshops',
            description: 'Resume building, interview prep, and career guidance',
            icon: <TrophyOutlined />,
            color: '#764ba2',
            participants: '300+ monthly',
        },
        {
            title: 'Student Competitions',
            description: 'Showcase your skills in friendly competitions',
            icon: <RocketOutlined />,
            color: '#ff6b6b',
            participants: '150+ participants',
        },
    ]

    const onSearch = (value: string) => {
        console.log('Search:', value)
    }

    const fetchCourses = async () => {
        try {
            const response = await EnrollmentService.getTopCourses()
            setCourses(response.data)
        } catch (e: any) {
            console.error(e)
        }
    }

    const fetchReviews = async () => {
        try {
            const response = await ReviewService.getAll({})
            setReviews(response.data)
        } catch (e: any) {
            console.error(e)
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await CategoryService.getAll({})
            setCategories(response.data)
        } catch (e: any) {
            console.error(e)
        }
    }

    const fetchInstructors = async () => {
        try {
            const response = await InstructorService.getAll({})
            setInstructors(response.data)
        } catch (e: any) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchCourses()
        fetchReviews()
        fetchCategories()
        fetchInstructors()
    }, [])

    return (
        <div>
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-floating-element-1" />
                <div className="hero-floating-element-2" />
                <div className="hero-floating-element-3" />

                <div className="hero-content">
                    <Title level={1} className="hero-title">
                        Learn Without Limits
                    </Title>
                    <Paragraph className="hero-description">
                        Start, switch, or advance your career with more than
                        5,000 courses, Professional Certificates, and degrees
                        from world-class universities and companies.
                    </Paragraph>
                    <div className="hero-search">
                        <Search
                            placeholder="What do you want to learn?"
                            allowClear
                            enterButton={
                                <Button
                                    type="primary"
                                    style={{
                                        background: '#20B2AA',
                                        border: 'none',
                                    }}
                                >
                                    <SearchOutlined />
                                </Button>
                            }
                            size="large"
                            onSearch={onSearch}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <Space size="large" className="hero-buttons">
                        <Button
                            type="primary"
                            size="large"
                            href={PATHS.COURSES}
                            icon={<PlayCircleOutlined />}
                            className="hero-primary-btn"
                        >
                            Start Learning Today
                        </Button>
                        <Button
                            href={PATHS.COURSES}
                            size="large"
                            className="hero-secondary-btn"
                        >
                            Browse Courses
                        </Button>
                    </Space>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="stats-background" />
                <div className="stats-content">
                    <Row gutter={[32, 32]} justify="center">
                        <Col xs={12} md={6}>
                            <div className="stats-item">
                                <Statistic
                                    title="Active Students"
                                    value={50000}
                                    suffix="+"
                                    valueStyle={{
                                        color: '#20B2AA',
                                        fontSize: '36px',
                                        fontWeight: 'bold',
                                    }}
                                />
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="stats-item">
                                <Statistic
                                    title="Expert Instructors"
                                    value={1200}
                                    suffix="+"
                                    valueStyle={{
                                        color: '#667eea',
                                        fontSize: '36px',
                                        fontWeight: 'bold',
                                    }}
                                />
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="stats-item">
                                <Statistic
                                    title="Online Courses"
                                    value={5000}
                                    suffix="+"
                                    valueStyle={{
                                        color: '#764ba2',
                                        fontSize: '36px',
                                        fontWeight: 'bold',
                                    }}
                                />
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="stats-item">
                                <Statistic
                                    title="Success Rate"
                                    value={98}
                                    suffix="%"
                                    valueStyle={{
                                        color: '#ff6b6b',
                                        fontSize: '36px',
                                        fontWeight: 'bold',
                                    }}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section">
                <div className="about-decorative-1" />
                <div className="about-decorative-2" />

                <div className="about-content">
                    <Row gutter={[48, 48]} align="middle">
                        <Col xs={24} lg={12}>
                            <div className="about-image">
                                <div className="about-image-floating-1" />
                                <div className="about-image-floating-2" />
                                <BookOutlined className="about-image-icon" />
                            </div>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Title level={2} style={{ marginBottom: '24px' }}>
                                About Mona Course Pro
                            </Title>
                            <Paragraph
                                style={{
                                    fontSize: '16px',
                                    color: '#666',
                                    marginBottom: '20px',
                                }}
                            >
                                We are a leading online education platform
                                dedicated to providing high-quality courses and
                                modern learning experiences. Our mission is to
                                make education accessible to everyone, anywhere,
                                anytime.
                            </Paragraph>
                            <Paragraph
                                style={{
                                    fontSize: '16px',
                                    color: '#666',
                                    marginBottom: '20px',
                                }}
                            >
                                With over 5,000 courses taught by industry
                                experts, we help students and professionals
                                advance their careers and achieve their learning
                                goals.
                            </Paragraph>
                            <ul
                                style={{
                                    fontSize: '16px',
                                    color: '#666',
                                    marginBottom: '30px',
                                    paddingLeft: '20px',
                                }}
                            >
                                <li>
                                    Expert-led courses from industry
                                    professionals
                                </li>
                                <li>
                                    Flexible learning schedules that fit your
                                    lifestyle
                                </li>
                                <li>
                                    Certificates and credentials recognized by
                                    employers
                                </li>
                                <li>24/7 support and community engagement</li>
                            </ul>
                            <Button
                                type="primary"
                                size="large"
                                href="/about"
                                className="about-btn"
                            >
                                Learn More About Us
                            </Button>
                        </Col>
                    </Row>
                </div>
            </section>

            {/* Featured Courses */}
            <section className="featured-courses-section">
                <div className="featured-courses-background" />

                <div className="featured-courses-content">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={2} style={{ marginBottom: '16px' }}>
                            Featured Courses
                        </Title>
                        <Paragraph style={{ fontSize: '18px', color: '#666' }}>
                            Discover our most popular courses taught by industry
                            experts
                        </Paragraph>
                    </div>
                    <Row gutter={[24, 24]}>
                        {courses.slice(0, 3).map((course) => (
                            <Col xs={24} md={8} key={course.id}>
                                <CourseSummaryCard course={course} />
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            {/* Popular Courses Banner */}
            <section className="banner-section">
                <div className="banner-floating-1" />
                <div className="banner-floating-2" />
                <div className="banner-floating-3" />
                <div className="banner-floating-4">
                    <PlayCircleOutlined
                        style={{
                            fontSize: '32px',
                            color: 'rgba(255,255,255,0.8)',
                        }}
                    />
                </div>

                <div className="banner-content">
                    <Row align="middle" justify="space-between">
                        <Col xs={24} lg={16}>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '16px',
                                }}
                            >
                                <div className="banner-icon-container">
                                    <BookOutlined
                                        style={{
                                            fontSize: '28px',
                                            color: 'white',
                                        }}
                                    />
                                </div>
                                <div>
                                    <Title
                                        level={2}
                                        style={{
                                            color: 'white',
                                            margin: 0,
                                            fontSize: '32px',
                                        }}
                                    >
                                        Get Online Courses
                                    </Title>
                                </div>
                            </div>
                            <Paragraph
                                style={{
                                    color: 'rgba(255,255,255,0.9)',
                                    fontSize: '16px',
                                    margin: 0,
                                    maxWidth: '600px',
                                }}
                            >
                                Want to learn something new today and grow your
                                career? Want to get organized and start your
                                online learning journey today!
                            </Paragraph>
                        </Col>
                        <Col xs={24} lg={8} style={{ textAlign: 'right' }}>
                            <Button
                                type="primary"
                                size="large"
                                href={PATHS.COURSES}
                                className="banner-btn"
                            >
                                JOIN NOW
                            </Button>
                        </Col>
                    </Row>
                </div>
            </section>

            {/* Featured Instructors */}
            <section className="instructors-section">
                <div className="instructors-background" />

                <div className="instructors-content">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={2} style={{ marginBottom: '16px' }}>
                            Meet Our Expert Instructors
                        </Title>
                        <Paragraph style={{ fontSize: '18px', color: '#666' }}>
                            Learn from industry leaders and experienced
                            professionals
                        </Paragraph>
                    </div>
                    <Row gutter={[24, 24]}>
                        {instructors.slice(0, 3).map((instructor, index) => (
                            <Col xs={24} md={8} key={index}>
                                <InstructorCard instructor={instructor} />
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            {/* Activities Section */}
            <section className="activities-section">
                <div className="activities-background" />

                <div className="activities-content">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={2} style={{ marginBottom: '16px' }}>
                            Learning Activities & Events
                        </Title>
                        <Paragraph style={{ fontSize: '18px', color: '#666' }}>
                            Join our community events and interactive learning
                            activities
                        </Paragraph>
                    </div>
                    <Row gutter={[24, 24]}>
                        {activities.map((activity, index) => (
                            <Col xs={24} sm={12} md={6} key={index}>
                                <ActivityCard activity={activity} />
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            {/* Student Reviews */}
            <section className="reviews-section">
                <div className="reviews-background" />

                <div className="reviews-content">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={2} style={{ marginBottom: '16px' }}>
                            What Our Students Say
                        </Title>
                        <Paragraph style={{ fontSize: '18px', color: '#666' }}>
                            Real feedback from our learning community
                        </Paragraph>
                    </div>
                    <Row gutter={[24, 24]}>
                        {reviews.slice(0, 3).map((review, index) => (
                            <Col xs={24} md={8} key={index}>
                                <FeedbackCard review={review} />
                            </Col>
                        ))}
                    </Row>
                    <div style={{ textAlign: 'center', marginTop: '40px' }}>
                        <Button size="large" className="reviews-btn">
                            Read More Reviews
                        </Button>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="categories-section">
                <div className="categories-background" />

                <div className="categories-content">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={2} style={{ marginBottom: '16px' }}>
                            Popular Categories
                        </Title>
                        <Paragraph style={{ fontSize: '18px', color: '#666' }}>
                            Choose from hundreds of courses in trending topics
                        </Paragraph>
                    </div>
                    <Row gutter={[24, 24]}>
                        {categories.slice(0, 4).map((category, index) => (
                            <Col xs={12} md={6} key={index}>
                                <CategoryCard category={category} />
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-floating-1" />
                <div className="cta-floating-2" />

                <div className="cta-content">
                    <Title
                        level={2}
                        style={{ color: 'white', marginBottom: '24px' }}
                    >
                        Ready to Start Your Learning Journey?
                    </Title>
                    <Paragraph
                        style={{
                            fontSize: '18px',
                            color: 'rgba(255,255,255,0.9)',
                            marginBottom: '40px',
                        }}
                    >
                        Join thousands of students who are already learning with
                        Mona Course Pro. Start your journey today and unlock
                        your potential.
                    </Paragraph>
                    <Space size="large">
                        <Button
                            href={PATHS.COURSES}
                            type="primary"
                            size="large"
                            className="cta-primary-btn"
                        >
                            Get Started Free
                        </Button>
                        <Button
                            href={PATHS.COURSES}
                            size="large"
                            className="cta-secondary-btn"
                        >
                            View All Courses
                        </Button>
                    </Space>
                </div>
            </section>
        </div>
    )
}

export default HomePage
