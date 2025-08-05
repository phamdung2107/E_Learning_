import React, { useEffect, useState } from 'react'

import { Button, Col, Row } from 'antd'

import { LeftOutlined, RightOutlined } from '@ant-design/icons'

import ResultQuizService from '@/services/resultQuiz'

const LessonActionsFooter = ({
    getPrevLesson,
    getNextLesson,
    handleLessonSelect,
    currentLesson,
}: any) => {
    const [result, setResult] = useState<any>([])
    const fetchResult = async () => {
        try {
            const response = await ResultQuizService.getMyQuizByLesson(
                currentLesson?.id
            )
            setResult(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchResult()
    }, [currentLesson])

    const checkCompleted = () => {
        return (
            result.length > 0 && result.every((item: any) => item.is_pass === 1)
        )
    }

    const isNextDisabled = !checkCompleted() || !getNextLesson()

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
            <Row gutter={[16, 16]} justify="space-between" align="middle">
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
                        Bài trước
                    </Button>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        disabled={isNextDisabled}
                        onClick={() =>
                            getNextLesson() &&
                            handleLessonSelect(getNextLesson())
                        }
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

export default LessonActionsFooter
