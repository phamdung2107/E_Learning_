import React from 'react'

import { Button, Col, Row } from 'antd'

import { LeftOutlined, RightOutlined } from '@ant-design/icons'

const LessonActionsFooter = ({
    getPrevLesson,
    getNextLesson,
    handleLessonSelect,
    currentLesson,
}: any) => (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        <Row gutter={[16, 16]} justify="space-between" align="middle">
            <Col>
                <Button
                    disabled={!getPrevLesson()}
                    onClick={() =>
                        getPrevLesson() && handleLessonSelect(getPrevLesson())
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
                    disabled={!getNextLesson()}
                    onClick={() =>
                        getNextLesson() && handleLessonSelect(getNextLesson())
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

export default LessonActionsFooter
