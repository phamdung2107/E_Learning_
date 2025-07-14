'use client'

import type React from 'react'
import { useEffect, useState } from 'react'

import {
    Alert,
    Button,
    Card,
    Col,
    Collapse,
    Modal,
    Progress,
    Radio,
    Row,
    Spin,
    Typography,
    message,
    notification,
} from 'antd'

import {
    ArrowLeftOutlined,
    BookOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    FileTextOutlined,
    LeftOutlined,
    PlayCircleOutlined,
    QuestionCircleOutlined,
    RightOutlined,
} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import AnswerService from '@/services/answer'
import CourseService from '@/services/course'
import LessonService from '@/services/lesson'
import ProgressService from '@/services/progress'
import QuestionService from '@/services/question'
import QuizService from '@/services/quiz'
import ResultQuizService from '@/services/resultQuiz'

import '../styles/QuizDetail.css'

const { Title, Text } = Typography
const { Panel } = Collapse

const QuizDetailPage: React.FC = () => {
    const user = useSelector((state: any) => state.auth.user)
    const params = useParams()
    const router = useNavigate()
    const courseId = params.courseId as string
    const quizId = params.quizId as string

    const [progress, setProgress] = useState<any>(null)
    const [quiz, setQuiz] = useState<any>(null)
    const [course, setCourse] = useState<any>(null)
    const [lessons, setLessons] = useState<any[]>([])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<{ [key: number]: string }>({})
    const [timeLeft, setTimeLeft] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [quizStarted, setQuizStarted] = useState(false)
    const [questions, setQuestions] = useState<any[]>([])

    useEffect(() => {
        setQuizStarted(false)
        setAnswers({})
        setCurrentQuestion(0)
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
            const questionResponse = await QuestionService.getByQuiz(quizId)
            const questionsData = questionResponse.data

            // Fetch answers for each question
            const questionsWithAnswers = await Promise.all(
                questionsData.map(async (question: any) => {
                    try {
                        const answerResponse =
                            await AnswerService.getByQuestion(question.id)
                        return {
                            ...question,
                            options: answerResponse.data.map((answer: any) => ({
                                id: answer.id,
                                text: answer.answer_text,
                                is_correct: answer.is_correct,
                            })),
                        }
                    } catch (error) {
                        console.error(
                            `Error fetching answers for question ${question.id}:`,
                            error
                        )
                        return { ...question, options: [] }
                    }
                })
            )
            setQuestions(questionsWithAnswers)

            // Fetch course details
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

            // Set timer if quiz has duration
            if (quizResponse.data.duration) {
                setTimeLeft(quizResponse.data.duration * 60) // Convert minutes to seconds
            }
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    // Function to fetch selected answer for a specific question
    const fetchAnswer = async (questionId: number, questionIndex: number) => {
        try {
            // Use ResultQuizService to fetch the user's selected answer
            const response = await ResultQuizService.getMyQuiz(quizId)
            if (response.data && response.data.answer_id !== undefined) {
                setAnswers((prev) => ({
                    ...prev,
                    [questionIndex]: response.data.answer_id.toString(),
                }))
            }
        } catch (error) {
            console.error('Error fetching selected answer:', error)
        }
    }

    // Modified handleAnswerChange to only update local state
    const handleAnswerChange = (value: string) => {
        setAnswers({
            ...answers,
            [currentQuestion]: value,
        })
    }

    // Fetch answer when changing questions
    useEffect(() => {
        if (quizStarted && questions[currentQuestion]?.id) {
            fetchAnswer(questions[currentQuestion].id, currentQuestion)
        }
    }, [currentQuestion, quizStarted])

    const handleStartQuiz = () => {
        setQuizStarted(true)
    }

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        }
    }

    const handlePrevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1)
        }
    }

    const handleSubmitQuiz = () => {
        Modal.confirm({
            title: 'Submit Quiz',
            content:
                'Are you sure you want to submit your quiz? You cannot change your answers after submission.',
            onOk: async () => {
                try {
                    setIsSubmitting(true)

                    // Prepare answers for final submission
                    const formattedAnswers = Object.keys(answers).map(
                        (questionIndex) => ({
                            question_id:
                                questions[Number.parseInt(questionIndex)].id,
                            answer_id: Number.parseInt(
                                answers[Number.parseInt(questionIndex)]
                            ),
                        })
                    )
                    const payload = {
                        quiz_id: Number.parseInt(quizId),
                        answers: formattedAnswers,
                    }
                    // Submit quiz to API
                    const response = await ResultQuizService.create(payload)
                    if (response.status === 200) {
                        notification.success({
                            message: 'Quiz submitted successfully!',
                            description: `Your quiz has been submitted. Redirecting to results...`,
                        })
                        // Redirect to results page
                        router(`/courses/${courseId}/quizzes/${quizId}/results`)
                    }
                } catch (error) {
                    console.error('Error submitting quiz:', error)
                    notification.error({
                        message: 'Submission Failed',
                        description: 'Failed to submit quiz. Please try again.',
                    })
                } finally {
                    setIsSubmitting(false)
                }
            },
        })
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
                        {!quizStarted ? (
                            // Quiz Introduction
                            <div className="quiz-intro-section">
                                <div
                                    style={{
                                        textAlign: 'center',
                                        padding: '40px 20px',
                                    }}
                                >
                                    <QuestionCircleOutlined className="quiz-intro-icon" />

                                    <Title
                                        level={2}
                                        style={{ marginBottom: '8px' }}
                                    >
                                        {quiz?.title}
                                    </Title>

                                    <Text
                                        type="secondary"
                                        style={{
                                            fontSize: '16px',
                                            display: 'block',
                                            marginBottom: '32px',
                                        }}
                                    >
                                        Ready to test your knowledge?
                                    </Text>

                                    <div className="quiz-info-section">
                                        <Title
                                            level={4}
                                            style={{ marginBottom: '16px' }}
                                        >
                                            Quiz Information
                                        </Title>

                                        <div className="quiz-info-grid">
                                            <div className="quiz-info-item">
                                                <Text strong>Questions:</Text>
                                                <Text>
                                                    {questions?.length || 0}{' '}
                                                    questions
                                                </Text>
                                            </div>

                                            <div className="quiz-info-item">
                                                <Text strong>Duration:</Text>
                                                <Text>No time limit</Text>
                                            </div>

                                            <div className="quiz-info-item">
                                                <Text strong>
                                                    Passing Score:
                                                </Text>
                                                <Text>100%</Text>
                                            </div>

                                            <div className="quiz-info-item">
                                                <Text strong>Attempts:</Text>
                                                <Text>Unlimited</Text>
                                            </div>
                                        </div>
                                    </div>

                                    {quiz?.description && (
                                        <div
                                            style={{
                                                marginBottom: '32px',
                                                textAlign: 'left',
                                            }}
                                        >
                                            <Title level={4}>Description</Title>
                                            <Text>{quiz?.description}</Text>
                                        </div>
                                    )}

                                    <div className="quiz-instructions">
                                        <Title level={4}>Instructions</Title>
                                        <ul>
                                            <li>
                                                Read each question carefully
                                                before selecting your answer
                                            </li>
                                            <li>
                                                You can navigate between
                                                questions using the
                                                Previous/Next buttons
                                            </li>
                                            <li>
                                                Your progress is saved
                                                automatically
                                            </li>
                                            {quiz?.duration && (
                                                <li>
                                                    Complete the quiz within the
                                                    time limit
                                                </li>
                                            )}
                                            <li>
                                                Click "Submit Quiz" when you're
                                                ready to finish
                                            </li>
                                        </ul>
                                    </div>
                                    <Button
                                        type="default"
                                        size="large"
                                        onClick={() =>
                                            router(
                                                `/courses/${courseId}/quizzes/${quizId}/results`
                                            )
                                        }
                                        className="quiz-result-button"
                                    >
                                        View Result
                                    </Button>
                                    <Button
                                        type="primary"
                                        size="large"
                                        onClick={handleStartQuiz}
                                        className="quiz-start-button"
                                    >
                                        Start Quiz
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            // Quiz Taking Interface
                            <div className="quiz-taking-section">
                                {/* Progress */}
                                <Card
                                    size="small"
                                    style={{ marginBottom: '24px' }}
                                >
                                    <Progress
                                        percent={
                                            ((currentQuestion + 1) /
                                                questions.length) *
                                            100
                                        }
                                        strokeColor="#20B2AA"
                                        format={() =>
                                            `${currentQuestion + 1}/${questions.length}`
                                        }
                                    />
                                </Card>

                                {/* Question */}
                                <Card className="quiz-question-card">
                                    <div className="quiz-question-header">
                                        <Title level={5}>
                                            <QuestionCircleOutlined
                                                style={{
                                                    marginRight: '8px',
                                                    color: '#20B2AA',
                                                }}
                                            />
                                            Question {currentQuestion + 1} of{' '}
                                            {questions.length} (Choose{' '}
                                            {questions[currentQuestion]
                                                ?.question_type === 'single'
                                                ? 'one answer'
                                                : 'many answers'}
                                            )
                                        </Title>
                                        <Title
                                            level={4}
                                            className="quiz-question-title"
                                        >
                                            {
                                                questions[currentQuestion]
                                                    ?.question_text
                                            }
                                        </Title>
                                    </div>

                                    <Radio.Group
                                        value={answers[currentQuestion]}
                                        onChange={(e) =>
                                            handleAnswerChange(e.target.value)
                                        }
                                        className="quiz-options"
                                    >
                                        <div className="quiz-options-container">
                                            {questions[
                                                currentQuestion
                                            ]?.options?.map(
                                                (
                                                    option: any,
                                                    index: number
                                                ) => (
                                                    <Radio
                                                        key={option.id}
                                                        value={option.id.toString()}
                                                        className="quiz-option"
                                                    >
                                                        {option.text}
                                                    </Radio>
                                                )
                                            )}
                                        </div>
                                    </Radio.Group>

                                    {/* Navigation */}
                                    <div className="quiz-navigation">
                                        <Button
                                            disabled={currentQuestion === 0}
                                            onClick={handlePrevQuestion}
                                            icon={<LeftOutlined />}
                                            className="quiz-nav-button"
                                        >
                                            Previous
                                        </Button>

                                        <div className="quiz-progress-info">
                                            <Text type="secondary">
                                                {Object.keys(answers).length} of{' '}
                                                {questions.length} answered
                                            </Text>
                                        </div>

                                        {currentQuestion ===
                                        questions.length - 1 ? (
                                            <Button
                                                type="primary"
                                                onClick={handleSubmitQuiz}
                                                loading={isSubmitting}
                                                icon={<CheckCircleOutlined />}
                                                className="quiz-submit-button"
                                            >
                                                Submit Quiz
                                            </Button>
                                        ) : (
                                            <Button
                                                type="primary"
                                                onClick={handleNextQuestion}
                                                icon={<RightOutlined />}
                                                className="quiz-submit-button"
                                            >
                                                Next
                                            </Button>
                                        )}
                                    </div>
                                </Card>

                                {/* Question Navigator */}
                                <Card
                                    className="quiz-navigator-card"
                                    title="Question Navigator"
                                    size="small"
                                >
                                    <div className="quiz-navigator-buttons">
                                        {questions.map(
                                            (_: any, index: number) => (
                                                <Button
                                                    key={index}
                                                    size="small"
                                                    className="quiz-navigator-button"
                                                    type={
                                                        index ===
                                                        currentQuestion
                                                            ? 'primary'
                                                            : 'default'
                                                    }
                                                    style={{
                                                        background:
                                                            answers[index] !==
                                                            undefined
                                                                ? index ===
                                                                  currentQuestion
                                                                    ? '#20B2AA'
                                                                    : '#52c41a'
                                                                : index ===
                                                                    currentQuestion
                                                                  ? '#20B2AA'
                                                                  : 'white',
                                                        borderColor:
                                                            answers[index] !==
                                                            undefined
                                                                ? '#52c41a'
                                                                : '#d9d9d9',
                                                        color:
                                                            answers[index] !==
                                                                undefined &&
                                                            index !==
                                                                currentQuestion
                                                                ? 'white'
                                                                : undefined,
                                                    }}
                                                    onClick={() =>
                                                        setCurrentQuestion(
                                                            index
                                                        )
                                                    }
                                                >
                                                    {index + 1}
                                                </Button>
                                            )
                                        )}
                                    </div>
                                    <div className="quiz-navigator-legend">
                                        <Text type="secondary">
                                            <span style={{ color: '#52c41a' }}>
                                                ●
                                            </span>{' '}
                                            Answered
                                            <span style={{ color: '#d9d9d9' }}>
                                                {' '}
                                                ●
                                            </span>{' '}
                                            Not Answered
                                            <span style={{ color: '#20B2AA' }}>
                                                {' '}
                                                ●
                                            </span>{' '}
                                            Current
                                        </Text>
                                    </div>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuizDetailPage
