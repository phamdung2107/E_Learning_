'use client'

import type React from 'react'
import { useEffect, useState } from 'react'

import { Button, Card, Col, Collapse, Divider, notification, Rate, Row, Space, Tag, Typography } from 'antd'

import {
    BookOutlined,
    CheckOutlined,
    ClockCircleOutlined,
    FileTextOutlined,
    PlayCircleOutlined,
    RightOutlined,
    ShareAltOutlined,
    TrophyOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { Link, useParams } from 'react-router-dom'

import CourseCard from '@/components/core/card/CourseCard'
import { DATE_TIME_FORMAT } from '@/constants/date'
import CourseService from '@/services/course'
import EnrollmentService from '@/services/enrollment'
import LessonService from '@/services/lesson'
import OrderService from '@/services/order'
import QuizService from '@/services/quiz'
import ReviewService from '@/services/review'
import InstructorService from '@/services/instructor'
import { formatDateTime, formatPrice } from '@/utils/format'

import '../styles/CourseDetail.css'

const { Title, Paragraph, Text } = Typography
const { Panel } = Collapse

const CourseDetailPage: React.FC = () => {
    const params = useParams()
    const courseId = params.id as string
    const [course, setCourse] = useState<any>(null)
    const [enrollLoading, setEnrollLoading] = useState(false)
    const [totalStudentsOfCourse, setTotalStudentsOfCourse] = useState(0)
    const [totalCoursesOfInstructor, setTotalCoursesOfInstructor] = useState(0)
    const [totalStudentsOfInstructor, setTotalStudentsOfInstructor] =
        useState(0)
    const [averageRating, setAverageRating] = useState(0)
    const [lessons, setLessons] = useState<any[]>([])
    const [reviews, setReviews] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const requirements = [
        'No experience needed',
        'A computer with internet connection',
        'Willingness to learn and practice',
    ]

    const features = [
        'Learn through video',
        'Downloadable resources',
        'Full lifetime access',
        'Access on mobile and TV',
        'Certificate of completion',
        '30-day money-back guarantee',
    ]

    const relatedCourses: any[] = []

    const fetchCourseDetail = async () => {
        setLoading(true)
        try {
            const courseRes = await CourseService.getDetail(courseId)
            const courseData = courseRes.data
            setCourse(courseData)

            const [
                resStudent,
                resCourse,
                enrollmentRes,
                avgRatingRes,
                lessonsRes,
                reviewsRes
            ] = await Promise.all([
                InstructorService.getStudents(courseData.instructor.id),
                InstructorService.getCourses(courseData.instructor.id),
                EnrollmentService.countByCourse(courseId),
                ReviewService.getAverageByCourse(courseId),
                LessonService.getByCourse(courseId),
                ReviewService.getByCourse(courseId)
            ])

            setTotalStudentsOfInstructor(resStudent.total)
            setTotalCoursesOfInstructor(resCourse.total)
            setTotalStudentsOfCourse(enrollmentRes.data.enrolled)
            setAverageRating(avgRatingRes.data.average_rating)
            setReviews(reviewsRes.data)

            const lessonsWithQuiz = await Promise.all(
                (lessonsRes.data || []).map(async (lesson: any) => {
                    try {
                        const quizRes = await QuizService.getByLesson(lesson.id)
                        return { ...lesson, quizzes: quizRes.data || [] }
                    } catch {
                        return { ...lesson, quizzes: [] }
                    }
                })
            )
            setLessons(lessonsWithQuiz)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCourseDetail()
    }, [courseId])

    const handleEnroll = async () => {
        setEnrollLoading(true)
        try {
            const res = await OrderService.create({
                course_id: Number(courseId),
            })
            if (res.status === 200) {
                notification.success({
                    message: 'Enroll successfully. Please check your cart.',
                })
            }
        } catch (error) {
            console.log(error)
            notification.error({
                message: 'Enroll failed. Please try again.',
            })
        } finally {
            setEnrollLoading(false)
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
                                    <Rate
                                        disabled
                                        allowHalf
                                        defaultValue={averageRating}
                                    />
                                    <span>
                                        {averageRating} ({totalStudentsOfCourse}{' '}
                                        students)
                                    </span>
                                </div>
                                <div className="course-detail-hero-meta-item">
                                    <UserOutlined />
                                    <span>
                                        Created by{' '}
                                        {course.instructor.user.full_name}
                                    </span>
                                </div>
                                <div className="course-detail-hero-meta-item">
                                    <ClockCircleOutlined />
                                    <span>
                                        Last updated{' '}
                                        {formatDateTime(
                                            course.updated_at,
                                            DATE_TIME_FORMAT
                                        )}
                                    </span>
                                </div>
                            </div>

                            <Paragraph className="course-detail-hero-description">
                                {course.description}
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
                                            loading={enrollLoading}
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
                                    src={course.thumbnail || '/placeholder.svg'}
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
                                                {lessons.length}
                                            </div>
                                            <div className="course-detail-stat-label">
                                                Lessons
                                            </div>
                                        </div>
                                        <div className="course-detail-stat-item">
                                            <ClockCircleOutlined className="course-detail-stat-icon" />
                                            <div className="course-detail-stat-number">
                                                {/*{course.duration}*/}
                                            </div>
                                            <div className="course-detail-stat-label">
                                                Total Duration
                                            </div>
                                        </div>
                                        <div className="course-detail-stat-item">
                                            <UserOutlined className="course-detail-stat-icon" />
                                            <div className="course-detail-stat-number">
                                                {totalStudentsOfCourse}
                                            </div>
                                            <div className="course-detail-stat-label">
                                                Students
                                            </div>
                                        </div>
                                        <div className="course-detail-stat-item">
                                            <TrophyOutlined className="course-detail-stat-icon" />
                                            <div className="course-detail-stat-number">
                                                intermediate
                                            </div>
                                            <div className="course-detail-stat-label">
                                                Level
                                            </div>
                                        </div>
                                    </div>
                                    <Divider />
                                    <Title
                                        level={3}
                                        style={{ marginBottom: '20px' }}
                                    >
                                        Requirements
                                    </Title>
                                    <ul style={{ paddingLeft: '20px' }}>
                                        {requirements.map(
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
                                        </div>
                                    </div>
                                    <div className="course-detail-enrollment-body">
                                        <Button
                                            type="primary"
                                            size="large"
                                            block
                                            className="course-detail-enrollment-btn"
                                            onClick={handleEnroll}
                                            loading={enrollLoading}
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
                                            {features.map(
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
                                Lessons of Course
                            </Title>
                            <Paragraph
                                style={{
                                    color: 'rgba(255,255,255,0.9)',
                                    margin: '10px 0 0 0',
                                }}
                            >
                                {lessons.length} lessons
                            </Paragraph>
                        </div>
                        <div className="course-detail-curriculum-body">
                            <Collapse
                                defaultActiveKey={['1']}
                                expandIcon={({ isActive }) => (
                                    <RightOutlined rotate={isActive ? 90 : 0} />
                                )}
                            >
                                {lessons.map((lesson: any) => (
                                    <Panel
                                        header={
                                            <div className="course-detail-module-header">
                                                <div>
                                                    <div className="course-detail-module-title">
                                                        {lesson?.title}
                                                    </div>
                                                    <div className="course-detail-module-meta">
                                                        1 lesson
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        key={lesson.id}
                                    >
                                        <Link
                                            to={`/courses/${courseId}/lessons/${lesson.id}`}
                                            className="course-detail-lesson"
                                        >
                                            <div className="course-detail-lesson-info">
                                                <span className="course-detail-lesson-icon">
                                                    <PlayCircleOutlined />
                                                </span>
                                                <span className="course-detail-lesson-title">
                                                    {lesson.content}
                                                </span>
                                            </div>
                                        </Link>
                                        {lesson?.quizzes.map((quiz: any) => (
                                            <Link
                                                to={`/courses/${courseId}/quizzes/${quiz.id}`}
                                                className="course-detail-lesson"
                                            >
                                                <div className="course-detail-lesson-info">
                                                    <span className="course-detail-lesson-icon">
                                                        <FileTextOutlined />
                                                    </span>
                                                    <span className="course-detail-lesson-title">
                                                        {quiz.title}
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
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
                            <Col xs={24} md={8}>
                                <div className="course-detail-instructor-avatar">
                                    <UserOutlined />
                                </div>
                                <Title
                                    level={3}
                                    style={{ marginBottom: '8px' }}
                                >
                                    {course.instructor.user.full_name}
                                </Title>
                                <Text
                                    style={{
                                        color: '#20b2aa',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                    }}
                                >
                                    {course.instructor.bio}
                                </Text>
                                <div className="course-detail-instructor-stats">
                                    <div className="course-detail-instructor-stat">
                                        <div className="course-detail-instructor-stat-number">
                                            {totalStudentsOfInstructor}
                                        </div>
                                        <div className="course-detail-instructor-stat-label">
                                            Students
                                        </div>
                                    </div>
                                    <div className="course-detail-instructor-stat">
                                        <div className="course-detail-instructor-stat-number">
                                            {totalCoursesOfInstructor}
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
                                        {course.instructor.experience_years}
                                    </Tag>
                                    <Tag color="orange">
                                        Students:{' '}
                                        {totalStudentsOfInstructor}
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
                            {averageRating}
                        </div>
                        <div className="course-detail-reviews-stars">
                            <Rate disabled allowHalf value={averageRating} />
                        </div>
                        <div className="course-detail-reviews-count">
                            Based on {totalStudentsOfCourse} student
                            reviews
                        </div>
                    </div>

                    <Row gutter={[24, 24]}>
                        {reviews.slice(0, 4).map((review: any) => (
                            <Col xs={24} md={12} key={review.id}>
                                <div className="course-detail-review-card">
                                    <div className="course-detail-review-header">
                                        <div className="course-detail-review-avatar">
                                            <UserOutlined />
                                        </div>
                                        <div className="course-detail-review-info">
                                            <div className="course-detail-review-name">
                                                {review.user.full_name}
                                            </div>
                                            <div className="course-detail-review-date">
                                                {review.date}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="course-detail-review-rating">
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Rate disabled value={review.rating} />
                                            <Title style={{ marginBottom: 0, marginLeft: 5 }} level={5}>
                                                ({review.rating})
                                            </Title>
                                        </div>
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
