import React, { useEffect, useState } from 'react'

import {
    Button,
    Card,
    Checkbox,
    Modal,
    Progress,
    Radio,
    Typography,
    message,
    notification,
} from 'antd'

import {
    CheckCircleOutlined,
    LeftOutlined,
    QuestionCircleOutlined,
    RightOutlined,
} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import LessonQuizActionsFooter from '@/components/commons/LessonQuizActionsFooter'
import LessonQuizHeader from '@/components/commons/LessonQuizHeader'
import LessonQuizSidebar from '@/components/commons/LessonQuizSidebar'
import LessonQuizDetailLayout from '@/layouts/LessonQuizDetailLayout'
import AnswerService from '@/services/answer'
import CourseService from '@/services/course'
import LessonService from '@/services/lesson'
import ProgressService from '@/services/progress'
import QuestionService from '@/services/question'
import QuizService from '@/services/quiz'
import ResultQuizService from '@/services/resultQuiz'

const { Title, Paragraph, Text } = Typography

const QuizDetailPage: React.FC = () => {
    const user = useSelector((store: any) => store.auth.user)
    const userId = user.user ? user.user.id : user.id
    const params = useParams()
    const navigate = useNavigate()
    const courseId = params.courseId as string
    const quizId = params.quizId as string

    const [progress, setProgress] = useState<any>(null)
    const [course, setCourse] = useState<any>(null)
    const [currentQuiz, setCurrentQuiz] = useState<any>(null)
    const [lessons, setLessons] = useState<any[]>([])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<{
        [key: number]: string | string[]
    }>({})
    const [timeLeft, setTimeLeft] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [quizStarted, setQuizStarted] = useState(false)
    const [questions, setQuestions] = useState<any[]>([])

    const fetchData = async () => {
        try {
            const progressResponse = await ProgressService.getByUserCourse(
                userId,
                courseId
            )
            setProgress(progressResponse.total)
            const quizResponse = await QuizService.getDetail(quizId)
            setCurrentQuiz(quizResponse.data)
            const questionResponse = await QuestionService.getByQuiz(quizId)
            const questionsData = questionResponse.data

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

            const courseResponse = await CourseService.getDetail(courseId)
            setCourse(courseResponse.data)

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
            if (quizResponse.data.duration) {
                setTimeLeft(quizResponse.data.duration * 60)
            }
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    useEffect(() => {
        if (courseId && quizId) fetchData()
    }, [courseId, quizId, user.id])

    const getProgressPercentage = () => {
        if (!progress) return 0
        return Math.round((progress / lessons.length) * 100)
    }

    const handleSubmitQuiz = () => {
        Modal.confirm({
            title: 'Nộp bài kiểm tra',
            content:
                'Bạn có chắc chắn muốn nộp bài? Sau khi nộp bạn sẽ không thể thay đổi đáp án.',
            okText: 'Nộp bài',
            cancelText: 'Hủy',
            onOk: async () => {
                setIsSubmitting(true)
                try {
                    const formattedAnswers = Object.keys(answers).flatMap(
                        (questionIndexStr) => {
                            const questionIndex =
                                Number.parseInt(questionIndexStr)
                            const questionId = questions[questionIndex].id
                            const selectedAnswer = answers[questionIndex]

                            if (Array.isArray(selectedAnswer)) {
                                return selectedAnswer.map((answerId) => ({
                                    question_id: questionId,
                                    answer_id: Number.parseInt(answerId),
                                }))
                            } else if (selectedAnswer) {
                                return [
                                    {
                                        question_id: questionId,
                                        answer_id: Number.parseInt(
                                            selectedAnswer as string
                                        ),
                                    },
                                ]
                            }
                            return []
                        }
                    )

                    const payload = {
                        quiz_id: Number.parseInt(quizId),
                        answers: formattedAnswers,
                    }

                    const response = await ResultQuizService.create(payload)
                    if (response.status === 200) {
                        notification.success({
                            message: 'Nộp bài thành công!',
                            description: `Bài kiểm tra của bạn đã được nộp. Đang chuyển đến trang kết quả...`,
                        })
                        navigate(
                            `/courses/${courseId}/quizzes/${quizId}/results`
                        )
                    }
                } catch (error) {
                    console.error('Error submitting quiz:', error)
                    notification.error({
                        message: 'Nộp bài thất bại',
                        description: 'Không thể nộp bài. Vui lòng thử lại.',
                    })
                } finally {
                    setIsSubmitting(false)
                }
            },
        })
    }

    const fetchAnswer = async (questionId: number, questionIndex: number) => {
        try {
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

    const handleAnswerChange = (value: any) => {
        setAnswers({
            ...answers,
            [currentQuestion]: value,
        })
    }

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

    if (!course || !currentQuiz) {
        return (
            <div style={{ padding: 48, textAlign: 'center' }}>
                <Text type="danger">Đang tải bài kiểm tra...</Text>
            </div>
        )
    }

    return (
        <LessonQuizDetailLayout
            header={
                <LessonQuizHeader
                    courseId={courseId}
                    courseTitle={course?.title}
                    progress={progress}
                    totalLessons={lessons.length}
                    getProgressPercentage={getProgressPercentage}
                />
            }
            sidebar={
                <LessonQuizSidebar
                    currentLessonId={null}
                    currentQuizId={currentQuiz.id}
                    courseId={courseId}
                />
            }
            footer={
                <LessonQuizActionsFooter
                    currentElement={currentQuiz}
                    courseId={courseId}
                    progress={progress}
                    totalLessons={lessons.length}
                />
            }
        >
            <div
                style={{
                    maxWidth: 900,
                    margin: '0 auto',
                    padding: '32px 0 80px 0',
                }}
            >
                <div className="quiz-main">
                    <div className="quiz-main-content">
                        {!quizStarted ? (
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
                                        {currentQuiz?.title}
                                    </Title>

                                    <Text
                                        type="secondary"
                                        style={{
                                            fontSize: '16px',
                                            display: 'block',
                                            marginBottom: '32px',
                                        }}
                                    >
                                        Sẵn sàng kiểm tra kiến thức của bạn?
                                    </Text>

                                    <div className="quiz-info-section">
                                        <Title
                                            level={4}
                                            style={{ marginBottom: '16px' }}
                                        >
                                            Thông tin bài kiểm tra
                                        </Title>

                                        <div className="quiz-info-grid">
                                            <div className="quiz-info-item">
                                                <Text strong>Số câu hỏi:</Text>
                                                <Text>
                                                    {questions?.length || 0} câu
                                                    hỏi
                                                </Text>
                                            </div>

                                            <div className="quiz-info-item">
                                                <Text strong>Thời gian:</Text>
                                                <Text>
                                                    {currentQuiz?.duration
                                                        ? `${currentQuiz.duration} phút`
                                                        : 'Không giới hạn'}
                                                </Text>
                                            </div>

                                            <div className="quiz-info-item">
                                                <Text strong>Điểm đạt:</Text>
                                                <Text>100%</Text>
                                            </div>

                                            <div className="quiz-info-item">
                                                <Text strong>Số lần làm:</Text>
                                                <Text>Không giới hạn</Text>
                                            </div>
                                        </div>
                                    </div>

                                    {currentQuiz?.description && (
                                        <div
                                            style={{
                                                marginBottom: '32px',
                                                textAlign: 'left',
                                            }}
                                        >
                                            <Title level={4}>Mô tả</Title>
                                            <Text>
                                                {currentQuiz?.description}
                                            </Text>
                                        </div>
                                    )}

                                    <div className="quiz-instructions">
                                        <Title level={4}>Hướng dẫn</Title>
                                        <ul>
                                            <li>
                                                Đọc kỹ từng câu hỏi trước khi
                                                chọn đáp án
                                            </li>
                                            <li>
                                                Bạn có thể chuyển giữa các câu
                                                hỏi bằng nút Trước/Sau
                                            </li>
                                            <li>
                                                Tiến độ của bạn sẽ được lưu tự
                                                động
                                            </li>
                                            {currentQuiz?.duration && (
                                                <li>
                                                    Hoàn thành bài kiểm tra
                                                    trong thời gian quy định
                                                </li>
                                            )}
                                            <li>
                                                Nhấn "Nộp bài" khi bạn đã hoàn
                                                thành
                                            </li>
                                        </ul>
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Button
                                            type="default"
                                            size="large"
                                            onClick={() =>
                                                navigate(
                                                    `/courses/${courseId}/quizzes/${quizId}/results`
                                                )
                                            }
                                            className="quiz-result-button"
                                        >
                                            Xem kết quả
                                        </Button>
                                        <div style={{ flexGrow: 1 }}></div>
                                        <Button
                                            type="primary"
                                            size="large"
                                            onClick={handleStartQuiz}
                                            className="quiz-start-button"
                                        >
                                            Bắt đầu làm
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="quiz-taking-section">
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
                                            Câu hỏi {currentQuestion + 1} /{' '}
                                            {questions.length} (
                                            {questions[currentQuestion]
                                                ?.question_type === 'single'
                                                ? 'Chọn 1 đáp án'
                                                : 'Chọn nhiều đáp án'}
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

                                    {questions[currentQuestion]
                                        ?.question_type === 'single' ? (
                                        <Radio.Group
                                            value={
                                                answers[
                                                    currentQuestion
                                                ] as string
                                            }
                                            onChange={(e) =>
                                                handleAnswerChange(
                                                    e.target.value
                                                )
                                            }
                                            className="quiz-options"
                                        >
                                            <div className="quiz-options-container">
                                                {questions[
                                                    currentQuestion
                                                ]?.options?.map(
                                                    (option: any) => (
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
                                    ) : (
                                        <Checkbox.Group
                                            value={
                                                answers[
                                                    currentQuestion
                                                ] as string[]
                                            }
                                            onChange={(checkedValues) =>
                                                handleAnswerChange(
                                                    checkedValues
                                                )
                                            }
                                            className="quiz-options"
                                        >
                                            <div
                                                className="quiz-options-container"
                                                style={{ width: '100%' }}
                                            >
                                                {questions[
                                                    currentQuestion
                                                ]?.options?.map(
                                                    (option: any) => (
                                                        <Checkbox
                                                            key={option.id}
                                                            value={option.id.toString()}
                                                            className="quiz-option"
                                                        >
                                                            {option.text}
                                                        </Checkbox>
                                                    )
                                                )}
                                            </div>
                                        </Checkbox.Group>
                                    )}

                                    {/*<Radio.Group*/}
                                    {/*    value={answers[currentQuestion]}*/}
                                    {/*    onChange={(e) =>*/}
                                    {/*        handleAnswerChange(e.target.value)*/}
                                    {/*    }*/}
                                    {/*    className="quiz-options"*/}
                                    {/*>*/}
                                    {/*    <div className="quiz-options-container">*/}
                                    {/*        {questions[*/}
                                    {/*            currentQuestion*/}
                                    {/*        ]?.options?.map(*/}
                                    {/*            (*/}
                                    {/*                option: any,*/}
                                    {/*                index: number*/}
                                    {/*            ) => (*/}
                                    {/*                <Radio*/}
                                    {/*                    key={option.id}*/}
                                    {/*                    value={option.id.toString()}*/}
                                    {/*                    className="quiz-option"*/}
                                    {/*                >*/}
                                    {/*                    {option.text}*/}
                                    {/*                </Radio>*/}
                                    {/*            )*/}
                                    {/*        )}*/}
                                    {/*    </div>*/}
                                    {/*</Radio.Group>*/}

                                    {/* Navigation */}
                                    <div className="quiz-navigation">
                                        <Button
                                            disabled={currentQuestion === 0}
                                            onClick={handlePrevQuestion}
                                            icon={<LeftOutlined />}
                                            className="quiz-nav-button"
                                        >
                                            Trước
                                        </Button>

                                        <div className="quiz-progress-info">
                                            <Text type="secondary">
                                                {Object.keys(answers).length} /{' '}
                                                {questions.length} đã trả lời
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
                                                Nộp bài
                                            </Button>
                                        ) : (
                                            <Button
                                                type="primary"
                                                onClick={handleNextQuestion}
                                                icon={<RightOutlined />}
                                                className="quiz-submit-button"
                                            >
                                                Tiếp theo
                                            </Button>
                                        )}
                                    </div>
                                </Card>

                                {/* Question Navigator */}
                                <Card
                                    className="quiz-navigator-card"
                                    title="Danh sách câu hỏi"
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
                                            Đã trả lời
                                            <span style={{ color: '#d9d9d9' }}>
                                                {' '}
                                                ●
                                            </span>{' '}
                                            Chưa trả lời
                                            <span style={{ color: '#20B2AA' }}>
                                                {' '}
                                                ●
                                            </span>{' '}
                                            Đang làm
                                        </Text>
                                    </div>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </LessonQuizDetailLayout>
    )
}

export default QuizDetailPage
