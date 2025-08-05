import React from 'react'

import { Button, Col, Row } from 'antd'

import {
    CheckCircleOutlined,
    LeftOutlined,
    RightOutlined,
} from '@ant-design/icons'

const QuizActionsFooter = ({
    getPrevQuiz,
    getNextQuiz,
    handleQuizSelect,
    currentQuiz,
    handleSubmitQuiz,
    isSubmitted,
}: any) => (
    <div
        style={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1200,
            background: '#fff',
            borderTop: '1px solid #f0f0f0',
            boxShadow: '0 -2px 8px rgba(0,0,0,0.04)',
            padding: '16px 0',
        }}
    >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
            <Row gutter={[16, 16]} justify="space-between" align="middle">
                <Col>
                    <Button
                        disabled={!getPrevQuiz()}
                        onClick={() =>
                            getPrevQuiz() && handleQuizSelect(getPrevQuiz())
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
                        disabled={!getNextQuiz()}
                        onClick={() =>
                            getNextQuiz() && handleQuizSelect(getNextQuiz())
                        }
                        icon={<RightOutlined />}
                        size="large"
                    >
                        Bài tiếp theo
                    </Button>
                </Col>
            </Row>
        </div>
    </div>
)

export default QuizActionsFooter
