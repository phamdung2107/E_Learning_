import type React from 'react'
import { useEffect, useState } from 'react'

import {
    Button,
    Card,
    Col,
    Collapse,
    Progress,
    Row,
    Table,
    Typography,
} from 'antd'

import {
    ArrowLeftOutlined,
    CheckCircleOutlined,
    FileTextOutlined,
    PlayCircleOutlined,
    RightOutlined,
} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { RESULT_QUIZ_COLUMNS } from '@/constants/table'
import CourseService from '@/services/course'
import LessonService from '@/services/lesson'
import ProgressService from '@/services/progress'
import QuizService from '@/services/quiz'
import ResultQuizService from '@/services/resultQuiz'

import '../styles/QuizDetail.css'

const { Title, Text } = Typography
const { Panel } = Collapse

const ResultQuizPage = () => {
    const user = useSelector((state: any) => state.auth.user)
    const params = useParams()
    const router = useNavigate()
    const courseId = params.courseId as string
    const quizId = params.quizId as string

    const [progress, setProgress] = useState<any>(null)
    const [quiz, setQuiz] = useState<any>(null)
    const [course, setCourse] = useState<any>(null)
    const [lessons, setLessons] = useState<any[]>([])
    const [resultQuiz, setResultQuiz] = useState<any[]>([])

    useEffect(() => {
        fetchData()
    }, [quizId, courseId])

    const fetchData = async () => {
        try {
            const progressResponse = await ProgressService.getByUserCourse(
                user.id,
                courseId
            )
            setProgress(progressResponse.total)
            // Fetch quiz details
            const quizResponse = await QuizService.getDetail(quizId)
            setQuiz(quizResponse.data)

            const resultQuizResponse = await ResultQuizService.getMyQuiz(quizId)
            setResultQuiz(resultQuizResponse.data)

            const courseResponse = await CourseService.getDetail(courseId)
            setCourse(courseResponse.data)

            // Fetch lessons with quizzes
            const lessonsResponse = await LessonService.getByCourse(courseId)
            const lessonsWithQuizzes = await Promise.all(
                lessonsResponse.data.map(async (lesson: any) => {
                    try {
                        const quizzesResponse = await QuizService.getByLesson(
                            lesson.id
                        )
                        return {
                            ...lesson,
                            quizzes: quizzesResponse.data || [],
                        }
                    } catch (error) {
                        return {
                            ...lesson,
                            quizzes: [],
                        }
                    }
                })
            )
            setLessons(lessonsWithQuizzes)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const getCurrentLessonPanel = () => {
        const lesson = lessons.find((l: any) =>
            l.quizzes.some((q: any) => q.id === Number.parseInt(quizId))
        )
        return lesson ? lesson.id.toString() : null
    }

    const handleLessonSelect = (lesson: any) => {
        router(`/courses/${courseId}/lessons/${lesson.id}`)
    }

    return (
        <div className="quiz-detail-container">
            {/* Header */}
            <Card className="quiz-header" size="small">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Link to={`/courses/${courseId}`}>
                            <Button icon={<ArrowLeftOutlined />} type="text">
                                Back to Course
                            </Button>
                        </Link>
                    </Col>
                    <Col flex="1" style={{ textAlign: 'center' }}>
                        <Title
                            level={4}
                            style={{ margin: 0, color: '#20B2AA' }}
                        >
                            {course?.title}
                        </Title>
                    </Col>
                    <Col>
                        <Text type="secondary">
                            Progress: {progress}/{lessons.length} lessons
                        </Text>
                    </Col>
                </Row>
                <Progress
                    percent={(progress / lessons.length) * 100}
                    style={{ marginTop: '12px' }}
                    strokeColor="#20B2AA"
                    size="small"
                />
            </Card>

            {/* Main Content */}
            <div className="quiz-content">
                <Col xs={24} lg={6} className="lesson-sidebar">
                    <div className="lesson-sidebar-content">
                        <div className="lesson-sidebar-header">
                            <Title level={5}>Course Content</Title>
                            <Text type="secondary">
                                {lessons.length} lessons
                            </Text>
                        </div>

                        <div className="lesson-list-container">
                            <Collapse
                                defaultActiveKey={getCurrentLessonPanel()}
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
                                        key={lesson.id}
                                        className={`lesson-panel ${lesson.quizzes.some((q: any) => q.id === Number.parseInt(quizId)) ? 'active-panel' : ''}`}
                                    >
                                        {/* Main Lesson Content */}
                                        <div
                                            className={`lesson-content-item`}
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
                                                                className={`lesson-content-item quiz-item ${quiz.id === Number.parseInt(quizId) ? 'active-lesson' : ''}`}
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

                {/* Main Quiz Content */}
                <div className="quiz-main">
                    <div className="quiz-main-content">
                        <div className="quiz-taking-section">
                            <div className="quiz-taking-header">
                                <Link
                                    style={{ color: 'black' }}
                                    to={`/courses/${courseId}/quizzes/${quizId}`}
                                >
                                    <ArrowLeftOutlined
                                        style={{ marginRight: 8 }}
                                    />
                                    Back to Quiz
                                </Link>
                                <Title level={4}>{quiz?.title} - Result</Title>
                            </div>
                            <br />
                            <Table
                                bordered
                                columns={RESULT_QUIZ_COLUMNS}
                                dataSource={resultQuiz}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResultQuizPage
