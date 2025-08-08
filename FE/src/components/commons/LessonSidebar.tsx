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

const LessonSidebar = ({ lessons, currentLessonId, courseId }: any) => {
    const [currentResult, setCurrentResult] = useState<any>([])
    const [lessonEnableList, setLessonEnableList] = useState<boolean[]>([])

    useEffect(() => {
        const fetchEnableList = async () => {
            const result = await getLessonEnableList()
            setLessonEnableList(result)
        }

        fetchEnableList()
    }, [lessons])

    const fetchResult = async (lessonId: any) => {
        try {
            const response = await ResultQuizService.getMyQuizByLesson(lessonId)
            return checkCompleted(response.data)
        } catch (error) {
            return false
        }
    }

    const getCurrentLessonIndex = () =>
        lessons.findIndex((l: any) => l.id === Number(currentLessonId))

    const getLessonEnableList = async () => {
        return await Promise.all(
            lessons.map(async (lesson: any, idx: any) => {
                if (idx === 0) return true
                const prevLesson = lessons[idx - 1]
                return await fetchResult(prevLesson.id)
            })
        )
    }

    const getQuizResult = (quizId: number) => {
        const tmp = currentResult.find((r: any) => r.quiz_id === quizId)
        return !!tmp?.is_pass
    }

    const checkCompleted = (result: any) => {
        return (
            result.length > 0 && result.every((item: any) => item.is_pass === 1)
        )
    }

    useEffect(() => {
        ResultQuizService.getMyQuizByLesson(currentLessonId).then((res) => {
            setCurrentResult(res.data)
        })
    }, [currentLessonId, courseId])

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
                    defaultActiveKey={[getCurrentLessonIndex().toString()]}
                    expandIcon={({ isActive }) => (
                        <RightOutlined rotate={isActive ? 90 : 0} />
                    )}
                    className="lesson-collapse"
                >
                    {lessons.map((lesson: any, index: any) => {
                        const isActive = lesson.id === Number(currentLessonId)
                        const isEnabled = lessonEnableList[index] ?? false

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
                                key={index}
                                className={`lesson-panel ${isActive ? 'active-panel' : ''}`}
                            >
                                {isEnabled ? (
                                    <Link
                                        className={`lesson-content-item ${isActive ? 'active-lesson' : ''}`}
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
                                                        quizEnabled = isEnabled
                                                    } else {
                                                        quizEnabled =
                                                            isEnabled &&
                                                            getQuizResult(
                                                                lesson.quizzes[
                                                                    qIdx - 1
                                                                ].id
                                                            )
                                                    }
                                                    return quizEnabled ? (
                                                        <Link
                                                            key={quiz.id}
                                                            to={`/courses/${courseId}/quizzes/${quiz.id}`}
                                                            className="lesson-content-item quiz-item"
                                                            style={{
                                                                display: 'flex',
                                                                alignItems:
                                                                    'center',
                                                                color: getQuizResult(
                                                                    quiz.id
                                                                )
                                                                    ? undefined
                                                                    : '#595959',
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

export default LessonSidebar
