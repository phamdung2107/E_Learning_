'use client'

import type React from 'react'
import { useEffect, useState } from 'react'

import {
    Button,
    Card,
    Col,
    Collapse,
    Progress,
    Row,
    Typography,
    message,
} from 'antd'

import {
    ArrowLeftOutlined,
    CheckCircleOutlined,
    FileTextOutlined,
    LeftOutlined,
    PlayCircleOutlined,
    RightOutlined,
} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import CourseService from '@/services/course'
import LessonService from '@/services/lesson'
import ProgressService from '@/services/progress'
import QuizService from '@/services/quiz'

import '../styles/LessonDetail.css'

const { Title, Text, Paragraph } = Typography
const { Panel } = Collapse

const LessonDetailPage: React.FC = () => {
    const user = useSelector((store: any) => store.auth.user)
    const params = useParams()
    const navigate = useNavigate()
    const courseId = params.courseId as string
    const lessonId = params.lessonId as string

    const [course, setCourse] = useState<any>(null)
    const [currentLesson, setCurrentLesson] = useState<any>(null)
    const [lessons, setLessons] = useState<any[]>([])
    const [progress, setProgress] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [videoLoading, setVideoLoading] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    const fetchCourseDetails = async () => {
        try {
            const response = await CourseService.getDetail(courseId)
            setCourse(response.data)
        } catch (error) {
            console.error('Error fetching course:', error)
            message.error('Không thể tải thông tin khóa học')
        }
    }

    const fetchLessons = async () => {
        try {
            const response = await LessonService.getByCourse(courseId)
            const lessonsWithQuizzes = await Promise.all(
                response.data.map(async (lesson: any) => {
                    try {
                        const quizResponse = await QuizService.getByLesson(
                            lesson.id
                        )
                        return {
                            ...lesson,
                            quizzes: quizResponse.data || [],
                        }
                    } catch (error) {
                        console.error(
                            `Error fetching quizzes for lesson ${lesson.id}:`,
                            error
                        )
                        return {
                            ...lesson,
                            quizzes: [],
                        }
                    }
                })
            )

            setLessons(lessonsWithQuizzes)
        } catch (error) {
            console.error('Error fetching lessons:', error)
            message.error('Không thể tải danh sách bài học')
        }
    }

    const fetchLessonDetails = async () => {
        try {
            setVideoLoading(true)
            const response = await LessonService.getDetail(lessonId)
            setCurrentLesson(response.data)
        } catch (error) {
            console.error('Error fetching lesson details:', error)
            message.error('Không thể tải chi tiết bài học')
        } finally {
            setVideoLoading(false)
        }
    }

    const fetchProgress = async () => {
        try {
            const response = await ProgressService.getByUserCourse(
                user.id,
                courseId
            )
            setProgress(response.total)
        } catch (error) {
            console.error('Error fetching progress:', error)
        }
    }

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            await Promise.all([
                fetchCourseDetails(),
                fetchLessons(),
                fetchLessonDetails(),
                fetchProgress(),
            ])
            setLoading(false)
        }

        if (courseId && lessonId) {
            loadData()
        }
    }, [courseId, lessonId])

    const handleLessonSelect = (lesson: any) => {
        if (lesson.id !== currentLesson?.id) {
            navigate(`/courses/${courseId}/lessons/${lesson.id}`)
        }
    }

    const handleMarkComplete = async () => {
        // try {
        //     await ProgressService.markLessonComplete(lessonId)
        //     message.success("Đã đánh dấu hoàn thành bài học!")
        //
        //     // Refresh progress and lesson data
        //     await Promise.all([fetchProgress(), fetchLessons()])
        //
        //     // Update current lesson completion status
        //     setCurrentLesson((prev: any) => ({ ...prev, is_completed: true }))
        // } catch (error) {
        //     console.error("Error marking lesson complete:", error)
        //     message.error("Không thể đánh dấu hoàn thành bài học")
        // }
    }

    const getCurrentLessonIndex = () => {
        return lessons.findIndex((l: any) => l.id === Number.parseInt(lessonId))
    }

    const getNextLesson = () => {
        const currentIndex = lessons.findIndex(
            (l: any) => l.id === Number.parseInt(lessonId)
        )
        if (currentIndex !== -1 && currentIndex < lessons.length - 1) {
            return lessons[currentIndex + 1]
        }
        return null
    }

    const getPrevLesson = () => {
        const currentIndex = lessons.findIndex(
            (l: any) => l.id === Number.parseInt(lessonId)
        )
        if (currentIndex > 0) {
            return lessons[currentIndex - 1]
        }
        return null
    }

    const handleVideoPlay = () => {
        setIsPlaying(true)
    }

    const handleVideoPause = () => {
        setIsPlaying(false)
    }

    const getProgressPercentage = () => {
        if (!progress) return 0
        return Math.round((progress / lessons.length) * 100)
    }

    if (!course || !currentLesson) {
        return (
            <div className="lesson-error">
                <Text type="danger">Không thể tải chi tiết bài học</Text>
            </div>
        )
    }

    return (
        <div className="lesson-detail-container">
            {/* Header */}
            <Card className="lesson-header" size="small">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Link to={`/courses/${courseId}`}>
                            <Button icon={<ArrowLeftOutlined />} type="text">
                                Quay lại khóa học
                            </Button>
                        </Link>
                    </Col>
                    <Col flex="1" style={{ textAlign: 'center' }}>
                        <Title
                            level={4}
                            style={{ margin: 0, color: '#20B2AA' }}
                        >
                            {course.title}
                        </Title>
                    </Col>
                    <Col>
                        <Text type="secondary">
                            Tiến độ: {progress || 0}/{lessons.length} bài học
                        </Text>
                    </Col>
                </Row>
                <Progress
                    percent={getProgressPercentage()}
                    style={{ marginTop: '12px' }}
                    strokeColor="#20B2AA"
                    size="small"
                />
            </Card>

            <Row gutter={[0, 0]} className="lesson-content">
                {/* Sidebar - Course Content */}
                <Col xs={24} lg={6} className="lesson-sidebar">
                    <div className="lesson-sidebar-content">
                        <div className="lesson-sidebar-header">
                            <Title level={5}>Nội dung khóa học</Title>
                            <Text type="secondary">
                                {lessons.length} bài học
                            </Text>
                        </div>

                        <div className="lesson-list-container">
                            <Collapse
                                defaultActiveKey={[
                                    getCurrentLessonIndex().toString(),
                                ]}
                                expandIcon={({ isActive }) => (
                                    <RightOutlined rotate={isActive ? 90 : 0} />
                                )}
                                className="lesson-collapse"
                            >
                                {lessons.map((lesson: any, index: number) => (
                                    <Panel
                                        header={
                                            <div className="lesson-module-header">
                                                <div className="lesson-module-info">
                                                    <div className="lesson-module-title">
                                                        {index + 1}.{' '}
                                                        {lesson.title}
                                                    </div>
                                                </div>
                                                {lesson.is_completed && (
                                                    <CheckCircleOutlined className="quiz-completed-icon" />
                                                )}
                                            </div>
                                        }
                                        key={index}
                                        className={`lesson-panel ${lesson.id === Number.parseInt(lessonId) ? 'active-panel' : ''}`}
                                    >
                                        {/* Main Lesson Content */}
                                        <div
                                            className={`lesson-content-item ${lesson.id === Number.parseInt(lessonId) ? 'active-lesson' : ''}`}
                                            onClick={() =>
                                                handleLessonSelect(lesson)
                                            }
                                        >
                                            <div className="lesson-content-info">
                                                <span className="lesson-content-icon">
                                                    <PlayCircleOutlined />
                                                </span>
                                                <span className="lesson-content-title">
                                                    {lesson.content ||
                                                        lesson.title}
                                                </span>
                                                {lesson.is_completed && (
                                                    <CheckCircleOutlined className="quiz-completed-icon" />
                                                )}
                                            </div>
                                        </div>

                                        {/* Quizzes for this lesson */}
                                        {lesson.quizzes &&
                                            lesson.quizzes.length > 0 && (
                                                <>
                                                    {lesson.quizzes.map(
                                                        (quiz: any) => (
                                                            <Link
                                                                key={quiz.id}
                                                                to={`/courses/${courseId}/quizzes/${quiz.id}`}
                                                                className="lesson-content-item quiz-item"
                                                            >
                                                                <div className="lesson-content-info">
                                                                    <span className="lesson-content-icon quiz-icon">
                                                                        <FileTextOutlined />
                                                                    </span>
                                                                    <span className="lesson-content-title">
                                                                        {
                                                                            quiz.title
                                                                        }
                                                                    </span>
                                                                    {quiz.is_completed && (
                                                                        <CheckCircleOutlined className="quiz-completed-icon" />
                                                                    )}
                                                                </div>
                                                            </Link>
                                                        )
                                                    )}
                                                </>
                                            )}
                                    </Panel>
                                ))}
                            </Collapse>
                        </div>
                    </div>
                </Col>

                {/* Main Content */}
                <Col xs={24} lg={18} className="lesson-main">
                    <div className="lesson-main-content">
                        {/* Lesson Title */}
                        <div className="lesson-title-section">
                            <Title level={3}>{currentLesson.title}</Title>
                        </div>

                        {/* Video Player */}
                        <div className="video-player-container">
                            <div className="video-player">
                                {currentLesson.video_url ? (
                                    <video
                                        controls
                                        width="100%"
                                        height="100%"
                                        poster={currentLesson.thumbnail}
                                        onPlay={handleVideoPlay}
                                        onPause={handleVideoPause}
                                        onTimeUpdate={(e) =>
                                            setCurrentTime(
                                                (e.target as HTMLVideoElement)
                                                    .currentTime
                                            )
                                        }
                                        onLoadedMetadata={(e) =>
                                            setDuration(
                                                (e.target as HTMLVideoElement)
                                                    .duration
                                            )
                                        }
                                    >
                                        <source
                                            src={currentLesson.video_url}
                                            type="video/mp4"
                                        />
                                        Trình duyệt của bạn không hỗ trợ video.
                                    </video>
                                ) : (
                                    <div className="video-placeholder">
                                        <PlayCircleOutlined className="video-placeholder-icon" />
                                        <Text>Không có video</Text>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Text Content */}
                        {currentLesson.content && (
                            <div className="lesson-content-section">
                                {currentLesson.type === 'text' ? (
                                    <div
                                        className="lesson-text-content"
                                        dangerouslySetInnerHTML={{
                                            __html: currentLesson.content,
                                        }}
                                    />
                                ) : (
                                    <div className="lesson-description">
                                        <Title level={4}>Mô tả bài học</Title>
                                        <Paragraph>
                                            {currentLesson.content}
                                        </Paragraph>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Lesson Actions */}
                        <div className="lesson-actions">
                            <Row
                                gutter={[16, 16]}
                                justify="space-between"
                                align="middle"
                            >
                                <Col>
                                    <Button
                                        disabled={!getPrevLesson()}
                                        onClick={() =>
                                            getPrevLesson() &&
                                            handleLessonSelect(getPrevLesson())
                                        }
                                        icon={<LeftOutlined />}
                                        size="large"
                                    >
                                        Bài học trước
                                    </Button>
                                </Col>

                                <Col>
                                    {!currentLesson.is_completed && (
                                        <Button
                                            type="primary"
                                            icon={<CheckCircleOutlined />}
                                            onClick={handleMarkComplete}
                                            size="large"
                                            className="complete-lesson-btn"
                                        >
                                            Đánh dấu hoàn thành
                                        </Button>
                                    )}
                                    {currentLesson.is_completed && (
                                        <Button
                                            type="default"
                                            icon={<CheckCircleOutlined />}
                                            disabled
                                            size="large"
                                            className="completed-lesson-btn"
                                        >
                                            Đã hoàn thành
                                        </Button>
                                    )}
                                </Col>

                                <Col>
                                    <Button
                                        type="primary"
                                        disabled={!getNextLesson()}
                                        onClick={() =>
                                            getNextLesson() &&
                                            handleLessonSelect(getNextLesson())
                                        }
                                        icon={<RightOutlined />}
                                        size="large"
                                    >
                                        Bài học tiếp theo
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default LessonDetailPage
