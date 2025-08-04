import React, { useState } from 'react'

import { Button, Card, Divider, Typography, notification } from 'antd'

import {
    CheckCircleOutlined,
    InfoCircleOutlined,
    UserAddOutlined,
} from '@ant-design/icons'

import RequestInstructorModal from '@/components/core/modal/RequestInstructorModal'
import InstructorService from '@/services/instructor'

const { Title, Paragraph, Text } = Typography

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
        <div>
            <Card style={{ marginBottom: '24px' }}>
                <Title level={2}>Trở thành giảng viên tại E-Learning</Title>
                <Text type="secondary">
                    Bạn đam mê chia sẻ kiến thức, kinh nghiệm và muốn truyền cảm
                    hứng cho hàng ngàn học viên? Hãy trở thành giảng viên của
                    chúng tôi!
                </Text>
            </Card>
            <Card
                style={{
                    borderRadius: 12,
                    boxShadow: '0 2px 12px #00000010',
                    background: '#fff',
                }}
                styles={{ body: { padding: 32 } }}
            >
                <Paragraph>
                    <CheckCircleOutlined
                        style={{ color: '#52c41a', marginRight: 8 }}
                    />
                    <b>Quyền lợi:</b>
                </Paragraph>
                <ul style={{ marginBottom: 24, marginLeft: 32 }}>
                    <li>Chủ động xây dựng khóa học theo chuyên môn của bạn</li>
                    <li>Nhận thu nhập hấp dẫn từ mỗi khóa học</li>
                    <li>Tham gia cộng đồng giảng viên chuyên nghiệp</li>
                    <li>
                        Được hỗ trợ kỹ thuật và truyền thông từ đội ngũ
                        E-Learning
                    </li>
                </ul>
                <Divider />
                <Paragraph>
                    <InfoCircleOutlined
                        style={{ color: '#faad14', marginRight: 8 }}
                    />
                    <b>Điều kiện:</b>
                </Paragraph>
                <ul style={{ marginBottom: 32, marginLeft: 32 }}>
                    <li>
                        Có chuyên môn và kinh nghiệm thực tế trong lĩnh vực
                        giảng dạy
                    </li>
                    <li>Có kỹ năng truyền đạt, giao tiếp tốt</li>
                    <li>Có tinh thần trách nhiệm và hợp tác</li>
                </ul>
                <div style={{ textAlign: 'center' }}>
                    <Button
                        type="primary"
                        size="large"
                        icon={<UserAddOutlined />}
                        onClick={() => setModalVisible(true)}
                        style={{
                            padding: '0 32px',
                            fontWeight: 500,
                            fontSize: 16,
                        }}
                    >
                        Gửi yêu cầu trở thành giảng viên
                    </Button>
                </div>
            </Card>
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
