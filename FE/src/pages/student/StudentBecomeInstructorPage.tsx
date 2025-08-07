import React, { useState } from 'react'

import { Button, Card, Col, Divider, Row, Typography, notification } from 'antd'

import {
    CheckCircleOutlined,
    InfoCircleOutlined,
    SmileOutlined,
    StarFilled,
    UserAddOutlined,
} from '@ant-design/icons'

import RequestInstructorModal from '@/components/core/modal/RequestInstructorModal'
import InstructorService from '@/services/instructor'

const { Title, Paragraph, Text } = Typography

const benefits = [
    'Chủ động xây dựng khóa học theo chuyên môn của bạn',
    'Nhận thu nhập hấp dẫn từ mỗi khóa học',
    'Tham gia cộng đồng giảng viên chuyên nghiệp',
    'Được hỗ trợ kỹ thuật và truyền thông từ đội ngũ E-Learning',
]

const conditions = [
    'Có chuyên môn và kinh nghiệm thực tế trong lĩnh vực giảng dạy',
    'Có kỹ năng truyền đạt, giao tiếp tốt',
    'Có tinh thần trách nhiệm và hợp tác',
]

const StudentBecomeInstructorPage = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleRequestInstructor = async (values: any) => {
        setLoading(true)
        try {
            const response =
                await InstructorService.requestBecomeInstructor(values)
            if (response.status === 200) {
                notification.success({
                    message: 'Gửi yêu cầu trở thành giảng viên thành công',
                })
            }
        } catch (e) {
            console.error('Error: ', e)
            notification.error({
                message: 'Gửi yêu cầu thất bại',
            })
        } finally {
            setLoading(false)
            setModalVisible(false)
        }
    }

    return (
        <div
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f0f4ff 0%, #e6f7ff 100%)',
                padding: '40px 0',
            }}
        >
            <Row justify="center" align="middle" style={{ marginBottom: 40 }}>
                <Col xs={22} sm={20} md={16} lg={12}>
                    <Card
                        style={{
                            borderRadius: 18,
                            boxShadow: '0 4px 24px #00000015',
                            background:
                                'linear-gradient(120deg, #fff 70%, #e6f7ff 100%)',
                            padding: 0,
                        }}
                        styles={{ body: { padding: 40 } }}
                    >
                        <Row gutter={32} align="middle">
                            <Col
                                xs={24}
                                md={10}
                                style={{ textAlign: 'center' }}
                            >
                                <img
                                    src="/logo-2.png"
                                    alt="Become Instructor"
                                    style={{
                                        width: '90%',
                                        maxWidth: 220,
                                        marginBottom: 16,
                                        borderRadius: 12,
                                        boxShadow: '0 2px 12px #00000010',
                                    }}
                                />
                                <div style={{ marginTop: 12 }}>
                                    <StarFilled
                                        style={{
                                            color: '#faad14',
                                            fontSize: 28,
                                            margin: '0 4px',
                                        }}
                                    />
                                    <StarFilled
                                        style={{
                                            color: '#faad14',
                                            fontSize: 28,
                                            margin: '0 4px',
                                        }}
                                    />
                                    <StarFilled
                                        style={{
                                            color: '#faad14',
                                            fontSize: 28,
                                            margin: '0 4px',
                                        }}
                                    />
                                    <StarFilled
                                        style={{
                                            color: '#faad14',
                                            fontSize: 28,
                                            margin: '0 4px',
                                        }}
                                    />
                                    <StarFilled
                                        style={{
                                            color: '#faad14',
                                            fontSize: 28,
                                            margin: '0 4px',
                                        }}
                                    />
                                </div>
                            </Col>
                            <Col xs={24} md={14}>
                                <Title
                                    level={2}
                                    style={{
                                        fontWeight: 800,
                                        color: '#1d39c4',
                                        marginBottom: 12,
                                    }}
                                >
                                    Trở thành giảng viên tại E-Learning
                                </Title>
                                <Text type="secondary" style={{ fontSize: 18 }}>
                                    Bạn đam mê chia sẻ kiến thức, kinh nghiệm và
                                    muốn truyền cảm hứng cho hàng ngàn học viên?{' '}
                                    <br />
                                    <b>
                                        Hãy trở thành giảng viên của chúng tôi!
                                    </b>
                                </Text>
                                <Divider style={{ margin: '24px 0' }} />
                                <Paragraph>
                                    <CheckCircleOutlined
                                        style={{
                                            color: '#52c41a',
                                            marginRight: 8,
                                            fontSize: 20,
                                        }}
                                    />
                                    <b>Quyền lợi:</b>
                                </Paragraph>
                                <ul
                                    style={{
                                        marginBottom: 24,
                                        marginLeft: 32,
                                        fontSize: 16,
                                    }}
                                >
                                    {benefits.map((item, idx) => (
                                        <li
                                            key={idx}
                                            style={{ marginBottom: 6 }}
                                        >
                                            <span
                                                style={{
                                                    color: '#52c41a',
                                                    marginRight: 6,
                                                }}
                                            >
                                                ✔
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <Paragraph>
                                    <InfoCircleOutlined
                                        style={{
                                            color: '#faad14',
                                            marginRight: 8,
                                            fontSize: 20,
                                        }}
                                    />
                                    <b>Điều kiện:</b>
                                </Paragraph>
                                <ul
                                    style={{
                                        marginBottom: 32,
                                        marginLeft: 32,
                                        fontSize: 16,
                                    }}
                                >
                                    {conditions.map((item, idx) => (
                                        <li
                                            key={idx}
                                            style={{ marginBottom: 6 }}
                                        >
                                            <span
                                                style={{
                                                    color: '#faad14',
                                                    marginRight: 6,
                                                }}
                                            >
                                                ★
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <div
                                    style={{
                                        textAlign: 'center',
                                        marginTop: 24,
                                    }}
                                >
                                    <Button
                                        type="primary"
                                        size="large"
                                        icon={<UserAddOutlined />}
                                        onClick={() => setModalVisible(true)}
                                        style={{
                                            padding: '0 40px',
                                            fontWeight: 600,
                                            fontSize: 18,
                                            borderRadius: 8,
                                            boxShadow: '0 2px 8px #1d39c420',
                                            background:
                                                'linear-gradient(90deg, #1d39c4 60%, #2f54eb 100%)',
                                            transition: 'all 0.2s',
                                        }}
                                        onMouseOver={(e) =>
                                            (e.currentTarget.style.background =
                                                '#2f54eb')
                                        }
                                        onMouseOut={(e) =>
                                            (e.currentTarget.style.background =
                                                'linear-gradient(90deg, #1d39c4 60%, #2f54eb 100%)')
                                        }
                                    >
                                        Gửi yêu cầu trở thành giảng viên
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Row justify="center">
                <Col xs={22} sm={20} md={16} lg={12}>
                    <Card
                        style={{
                            borderRadius: 14,
                            background: '#fffbe6',
                            boxShadow: '0 2px 12px #faad1420',
                            marginTop: 32,
                        }}
                        styles={{ body: { padding: 32 } }}
                    >
                        <SmileOutlined
                            style={{
                                color: '#faad14',
                                fontSize: 32,
                                marginBottom: 8,
                            }}
                        />
                        <Paragraph
                            style={{
                                fontSize: 18,
                                textAlign: 'center',
                                margin: 0,
                            }}
                        >
                            <i>
                                "Tôi đã thay đổi cuộc sống của mình khi trở
                                thành giảng viên tại E-Learning. <br />
                                Được chia sẻ kiến thức, kết nối với học viên và
                                nhận được sự hỗ trợ tuyệt vời từ đội ngũ!"
                            </i>
                        </Paragraph>
                        <div style={{ textAlign: 'right', marginTop: 8 }}>
                            <Text strong>
                                - Nguyễn Văn A, Giảng viên E-Learning
                            </Text>
                        </div>
                    </Card>
                </Col>
            </Row>
            <RequestInstructorModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleRequestInstructor}
                loading={loading}
            />
        </div>
    )
}

export default StudentBecomeInstructorPage
