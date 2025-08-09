import React, { useEffect, useState } from 'react'

import { Button, Col, Row } from 'antd'

import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

import CourseService from '@/services/course'
import { convertLessonWithQuizData } from '@/utils/convert'

const LessonQuizActionsFooter = ({ currentElement, courseId }: any) => {
    const [lessonWithQuiz, setLessonWithQuiz] = useState<any[]>([])
    const navigate = useNavigate()

    const fetchLessonWithQuiz = async () => {
        try {
            const response = await CourseService.lessonWithQuiz(courseId)
            setLessonWithQuiz(convertLessonWithQuizData(response.data))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchLessonWithQuiz()
    }, [currentElement])

    const currentIndex = lessonWithQuiz.findIndex((item) => {
        if (currentElement.lesson_id) {
            return item.id === currentElement.id && item.type === 'quiz'
        } else {
            return item.id === currentElement.id && item.type === 'lesson'
        }
    })

    const currentItem =
        currentIndex !== -1 ? lessonWithQuiz[currentIndex] : null

    const isPrevDisabled = !currentItem || currentIndex <= 0

    const isNextDisabled = (() => {
        if (!currentItem) return true

        if (currentItem.type === 'lesson') {
            return currentIndex === lessonWithQuiz.length - 1
        }

        if (currentItem.type === 'quiz') {
            return (
                currentItem.is_pass !== 1 ||
                currentIndex === lessonWithQuiz.length - 1
            )
        }

        return true
    })()

    const getPrevItem = () => {
        if (isPrevDisabled) return null
        return lessonWithQuiz[currentIndex - 1]
    }

    const getNextItem = () => {
        if (isNextDisabled) return null
        console.log(lessonWithQuiz[currentIndex + 1])
        return lessonWithQuiz[currentIndex + 1]
    }

    const onNavigate = (item: any) => {
        if (!item) return
        if (item.type === 'lesson') {
            navigate(`/courses/${courseId}/lessons/${item.id}`)
        } else if (item.type === 'quiz') {
            navigate(`/courses/${courseId}/quizzes/${item.id}`)
        }
    }

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
            <Row gutter={[16, 16]} justify="space-between" align="middle">
                <Col>
                    <Button
                        disabled={isPrevDisabled}
                        onClick={() => onNavigate(getPrevItem())}
                        icon={<LeftOutlined />}
                        size="large"
                    >
                        Bài trước
                    </Button>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        disabled={isNextDisabled}
                        onClick={() => onNavigate(getNextItem())}
                        icon={<RightOutlined />}
                        size="large"
                    >
                        Bài tiếp theo
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default LessonQuizActionsFooter
