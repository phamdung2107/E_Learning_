import React from 'react'

import { Collapse, Typography } from 'antd'

import {
    CheckCircleOutlined,
    FileTextOutlined,
    PlayCircleOutlined,
    RightOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Title, Text } = Typography
const { Panel } = Collapse

const QuizSidebar = ({
    lessons,
    currentLessonId,
    currentQuizId,
    courseId,
}: any) => {
    const getCurrentQuizIndex = () => {
        const lesson = lessons.find((l: any) =>
            l.quizzes.some((q: any) => q.id === Number.parseInt(currentQuizId))
        )
        return lesson ? lesson.id.toString() : null
    }

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
                    defaultActiveKey={[getCurrentQuizIndex()]}
                    expandIcon={({ isActive }) => (
                        <RightOutlined rotate={isActive ? 90 : 0} />
                    )}
                    className="lesson-collapse"
                >
                    {lessons.map((lesson: any, index: any) => (
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
                            className={`lesson-panel ${lesson.id === Number(currentLessonId) ? 'active-panel' : ''}`}
                        >
                            <Link
                                className="lesson-content-item"
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
                            {lesson.quizzes && lesson.quizzes.length > 0 && (
                                <>
                                    {lesson.quizzes.map((quiz: any) => (
                                        <Link
                                            key={quiz.id}
                                            to={`/courses/${courseId}/quizzes/${quiz.id}`}
                                            style={{
                                                display: 'block',
                                                padding: '8px 0 8px 24px',
                                            }}
                                            className={`lesson-content-item quiz-item ${quiz.id === Number.parseInt(currentQuizId) ? 'active-lesson' : ''}`}
                                        >
                                            <span
                                                className="lesson-content-icon quiz-icon"
                                                style={{ marginRight: '8px' }}
                                            >
                                                <FileTextOutlined />
                                            </span>
                                            <span className="lesson-content-title">
                                                {quiz.title}
                                            </span>
                                            {quiz.is_completed && (
                                                <CheckCircleOutlined className="quiz-completed-icon" />
                                            )}
                                        </Link>
                                    ))}
                                </>
                            )}
                        </Panel>
                    ))}
                </Collapse>
            </div>
        </div>
    )
}

export default QuizSidebar
