import React, { useEffect, useState } from 'react'

import { Collapse, Typography } from 'antd'

import {
    CheckCircleOutlined,
    FileTextOutlined,
    PlayCircleOutlined,
    RightOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

import ResultQuizService from '@/services/resultQuiz'

const { Title, Text } = Typography
const { Panel } = Collapse

const QuizSidebar = ({
    lessons,
    currentLessonId,
    currentQuizId,
    courseId,
}: any) => {
    const [result, setResult] = useState<any>([])
    const fetchResult = async () => {
        try {
            const response =
                await ResultQuizService.getMyQuizByLesson(currentLessonId)
            setResult(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getCurrentQuizPanelKey = () => {
        const lesson = lessons.find((l: any) =>
            l.quizzes.some((q: any) => q.id === Number(currentQuizId))
        )
        return lesson ? lesson.id.toString() : null
    }

    const getLessonEnableList = () => {
        return lessons.map((lesson: any, idx: number) => {
            if (idx === 0) return true
            const prevLesson = lessons[idx - 1]
            if (prevLesson.quizzes && prevLesson.quizzes.length > 0) {
                return prevLesson.quizzes.every((q: any) => q.is_completed)
            } else {
                return prevLesson.is_completed
            }
        })
    }

    const getQuizResult = (quizId: number) => {
        const currentResult = result.find((r: any) => r.quiz_id === quizId)
        return currentResult?.is_pass
    }

    const lessonEnableList = getLessonEnableList()

    useEffect(() => {
        fetchResult()
    }, [currentLessonId, currentQuizId, courseId])

    return (
        <div className="lesson-sidebar-content" style={{ padding: 0 }}>
            <div
                className="lesson-sidebar-header"
                style={{
                    padding: '16px 24px 8px 24px',
                    borderBottom: '1px solid #f0f0f0',
                }}
            >
                <Title level={5} style={{ margin: 0 }}>
                    Nội dung khóa học
                </Title>
                <Text type="secondary">{lessons.length} bài học</Text>
            </div>
            <div className="lesson-list-container" style={{ padding: '0' }}>
                <Collapse
                    bordered={false}
                    defaultActiveKey={[getCurrentQuizPanelKey()]}
                    expandIcon={({ isActive }) => (
                        <RightOutlined rotate={isActive ? 90 : 0} />
                    )}
                    className="lesson-collapse"
                >
                    {lessons.map((lesson: any, index: any) => {
                        const isLessonEnabled = lessonEnableList[index]
                        return (
                            <Panel
                                header={
                                    <div className="lesson-module-header">
                                        <div className="lesson-module-title">
                                            {index + 1}. {lesson.title}
                                        </div>
                                        {lesson.is_completed && (
                                            <CheckCircleOutlined className="quiz-completed-icon" />
                                        )}
                                    </div>
                                }
                                key={lesson.id}
                                className={`lesson-panel ${lesson.id === Number(currentLessonId) ? 'active-panel' : ''}`}
                            >
                                {isLessonEnabled ? (
                                    <Link
                                        className={`lesson-content-item`}
                                        to={`/courses/${courseId}/lessons/${lesson.id}`}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <span
                                            className="lesson-content-icon"
                                            style={{ marginRight: '8px' }}
                                        >
                                            <PlayCircleOutlined />
                                        </span>
                                        <span className="lesson-content-title">
                                            {lesson.title}
                                        </span>
                                        {lesson.is_completed && (
                                            <CheckCircleOutlined className="quiz-completed-icon" />
                                        )}
                                    </Link>
                                ) : (
                                    <div
                                        className="lesson-content-item disabled-lesson"
                                        style={{
                                            cursor: 'not-allowed',
                                            color: '#bfbfbf',
                                            background: '#f5f5f5',
                                            pointerEvents: 'none',
                                        }}
                                    >
                                        <span
                                            className="lesson-content-icon"
                                            style={{ marginRight: '8px' }}
                                        >
                                            <PlayCircleOutlined />
                                        </span>
                                        <span className="lesson-content-title">
                                            {lesson.title}
                                        </span>
                                    </div>
                                )}
                                {lesson.quizzes &&
                                    lesson.quizzes.length > 0 && (
                                        <>
                                            {lesson.quizzes.map(
                                                (quiz: any, qIdx: number) => {
                                                    let quizEnabled = false
                                                    if (qIdx === 0) {
                                                        quizEnabled =
                                                            isLessonEnabled
                                                    } else {
                                                        quizEnabled =
                                                            isLessonEnabled &&
                                                            getQuizResult(
                                                                lesson.quizzes[
                                                                    qIdx - 1
                                                                ].id
                                                            )
                                                    }
                                                    const isActiveQuiz =
                                                        quiz.id ===
                                                        Number(currentQuizId)
                                                    return quizEnabled ? (
                                                        <Link
                                                            key={quiz.id}
                                                            to={`/courses/${courseId}/quizzes/${quiz.id}`}
                                                            style={{
                                                                display: 'flex',
                                                                alignItems:
                                                                    'center',
                                                            }}
                                                            className={`lesson-content-item quiz-item ${isActiveQuiz ? 'active-lesson' : ''}`}
                                                        >
                                                            <span
                                                                className="lesson-content-icon quiz-icon"
                                                                style={{
                                                                    marginRight:
                                                                        '8px',
                                                                }}
                                                            >
                                                                <FileTextOutlined />
                                                            </span>
                                                            <span className="lesson-content-title">
                                                                {quiz.title}
                                                            </span>
                                                            <div
                                                                style={{
                                                                    flexGrow: 1,
                                                                }}
                                                            ></div>
                                                            {!!getQuizResult(
                                                                quiz.id
                                                            ) && (
                                                                <CheckCircleOutlined className="quiz-completed-icon" />
                                                            )}
                                                        </Link>
                                                    ) : (
                                                        <div
                                                            key={quiz.id}
                                                            className="lesson-content-item quiz-item disabled-lesson"
                                                            style={{
                                                                color: '#bfbfbf',
                                                                background:
                                                                    '#f5f5f5',
                                                                cursor: 'not-allowed',
                                                                pointerEvents:
                                                                    'none',
                                                                borderRadius: 4,
                                                                display: 'flex',
                                                                alignItems:
                                                                    'center',
                                                            }}
                                                        >
                                                            <span
                                                                className="lesson-content-icon quiz-icon"
                                                                style={{
                                                                    marginRight:
                                                                        '8px',
                                                                }}
                                                            >
                                                                <FileTextOutlined />
                                                            </span>
                                                            <span className="lesson-content-title">
                                                                {quiz.title}
                                                            </span>
                                                        </div>
                                                    )
                                                }
                                            )}
                                        </>
                                    )}
                            </Panel>
                        )
                    })}
                </Collapse>
            </div>
        </div>
    )
}

export default QuizSidebar
