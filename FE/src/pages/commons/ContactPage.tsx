'use client'

import type React from 'react'
import { useState } from 'react'

import {
    Button,
    Card,
    Col,
    Collapse,
    Form,
    Input,
    Row,
    Typography,
    message,
} from 'antd'

import {
    ClockCircleOutlined,
    EnvironmentOutlined,
    FacebookOutlined,
    InstagramOutlined,
    LinkedinOutlined,
    MailOutlined,
    MessageOutlined,
    PhoneOutlined,
    QuestionCircleOutlined,
    SendOutlined,
    UserOutlined,
    XOutlined,
    YoutubeOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

import { COMMON_INFORMATION } from '@/constants/information'

import '../styles/Contact.css'

const { Title, Paragraph, Text } = Typography
const { TextArea } = Input

const ContactPage: React.FC = () => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    const onFinish = async (values: any) => {
        setLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            message.success(
                'Cảm ơn bạn đã gửi liên hệ! Chúng tôi sẽ phản hồi sớm nhất.'
            )
            form.resetFields()
        } catch (error) {
            message.error('Đã xảy ra lỗi. Vui lòng thử lại.')
        } finally {
            setLoading(false)
        }
    }

    const onFinishFailed = (errorInfo: any) => {
        message.error('Vui lòng điền đầy đủ các trường bắt buộc.')
    }

    const faqData = [
        {
            key: '1',
            label: 'Làm thế nào để đăng ký một khóa học?',
            children: (
                <p>
                    Bạn có thể đăng ký bất kỳ khóa học nào bằng cách nhấn nút
                    "Đăng ký ngay" trên trang khóa học. Bạn cần tạo tài khoản và
                    hoàn tất thanh toán. Sau khi đăng ký, bạn sẽ được truy cập
                    ngay vào toàn bộ tài liệu khóa học.
                </p>
            ),
        },
        {
            key: '2',
            label: 'Những phương thức thanh toán nào được chấp nhận?',
            children: (
                <p>
                    Chúng tôi chấp nhận tất cả các loại thẻ tín dụng phổ biến
                    (Visa, MasterCard, American Express), PayPal và chuyển khoản
                    ngân hàng. Tất cả thanh toán đều được xử lý an toàn qua cổng
                    thanh toán bảo mật.
                </p>
            ),
        },
        {
            key: '3',
            label: 'Tôi có được hoàn tiền nếu không hài lòng?',
            children: (
                <p>
                    Có, chúng tôi áp dụng chính sách hoàn tiền trong 30 ngày cho
                    tất cả các khóa học. Nếu bạn không hài lòng với khóa học,
                    bạn có thể yêu cầu hoàn tiền trong vòng 30 ngày kể từ ngày
                    đăng ký mà không cần lý do.
                </p>
            ),
        },
        {
            key: '4',
            label: 'Tôi có nhận được chứng chỉ sau khi hoàn thành khóa học không?',
            children: (
                <p>
                    Sau khi hoàn thành bất kỳ khóa học nào, bạn sẽ nhận được
                    chứng chỉ hoàn thành có thể tải về và chia sẻ lên LinkedIn
                    hoặc đính kèm vào CV.
                </p>
            ),
        },
        {
            key: '5',
            label: 'Tôi có thể truy cập tài liệu khóa học trong bao lâu?',
            children: (
                <p>
                    Sau khi đăng ký, bạn sẽ được truy cập trọn đời vào toàn bộ
                    tài liệu khóa học, bao gồm cả các cập nhật trong tương lai.
                    Bạn có thể học bất cứ lúc nào và xem lại nội dung khi cần.
                </p>
            ),
        },
    ]

    return (
        <div>
            <section className="contact-hero-section">
                <div className="contact-hero-floating-1" />
                <div className="contact-hero-floating-2" />

                <div className="contact-hero-content">
                    <Title level={1} className="contact-hero-title">
                        Liên hệ với chúng tôi
                    </Title>
                    <Paragraph className="contact-hero-description">
                        Bạn có thắc mắc về các khóa học hoặc cần hỗ trợ? Chúng
                        tôi luôn sẵn sàng giúp đỡ! Hãy liên hệ với chúng tôi qua
                        các kênh bên dưới, đội ngũ của chúng tôi sẽ phản hồi bạn
                        sớm nhất có thể.
                    </Paragraph>
                </div>
            </section>

            <section className="contact-info-section">
                <div className="contact-info-background" />

                <div className="contact-info-content">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={2} style={{ marginBottom: '16px' }}>
                            Thông tin liên hệ
                        </Title>
                        <Paragraph
                            style={{
                                fontSize: '18px',
                                color: '#666',
                                maxWidth: '600px',
                                margin: '0 auto',
                            }}
                        >
                            Nhiều cách để liên hệ với chúng tôi thuận tiện cho
                            bạn
                        </Paragraph>
                    </div>

                    <Row gutter={[32, 32]}>
                        <Col xs={24} sm={12} lg={6}>
                            <Card className="contact-info-card">
                                <div className="contact-info-icon phone">
                                    <PhoneOutlined />
                                </div>
                                <Title
                                    level={4}
                                    style={{ marginBottom: '16px' }}
                                >
                                    Điện thoại
                                </Title>
                                <Text
                                    style={{
                                        color: '#666',
                                        fontSize: '16px',
                                        display: 'block',
                                    }}
                                >
                                    {COMMON_INFORMATION.PHONE_NUMBER}
                                </Text>
                            </Card>
                        </Col>

                        <Col xs={24} sm={12} lg={6}>
                            <Card className="contact-info-card">
                                <div className="contact-info-icon email">
                                    <MailOutlined />
                                </div>
                                <Title
                                    level={4}
                                    style={{ marginBottom: '16px' }}
                                >
                                    Email
                                </Title>
                                <Text
                                    style={{
                                        color: '#666',
                                        fontSize: '16px',
                                        display: 'block',
                                    }}
                                >
                                    {COMMON_INFORMATION.EMAIL}
                                </Text>
                            </Card>
                        </Col>

                        <Col xs={24} sm={12} lg={6}>
                            <Card className="contact-info-card">
                                <div className="contact-info-icon location">
                                    <EnvironmentOutlined />
                                </div>
                                <Title
                                    level={4}
                                    style={{ marginBottom: '16px' }}
                                >
                                    Địa chỉ
                                </Title>
                                <Text
                                    style={{
                                        color: '#666',
                                        fontSize: '16px',
                                        display: 'block',
                                    }}
                                >
                                    123 Đường Giáo Dục
                                </Text>
                                <Text
                                    style={{ color: '#666', fontSize: '16px' }}
                                >
                                    New York, NY 10001
                                </Text>
                            </Card>
                        </Col>

                        <Col xs={24} sm={12} lg={6}>
                            <Card className="contact-info-card">
                                <div className="contact-info-icon time">
                                    <ClockCircleOutlined />
                                </div>
                                <Title
                                    level={4}
                                    style={{ marginBottom: '16px' }}
                                >
                                    Giờ làm việc
                                </Title>
                                <Text
                                    style={{
                                        color: '#666',
                                        fontSize: '16px',
                                        display: 'block',
                                        marginBottom: '8px',
                                    }}
                                >
                                    Thứ 2 - Thứ 6: 9:00 - 18:00
                                </Text>
                                <Text
                                    style={{ color: '#666', fontSize: '16px' }}
                                >
                                    Thứ 7 - Chủ nhật: 10:00 - 16:00
                                </Text>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </section>

            <section className="contact-form-section">
                <div className="contact-form-decorative" />

                <div className="contact-form-content">
                    <Row gutter={[48, 48]} align="middle">
                        <Col xs={24} lg={12}>
                            <Card className="contact-form-card">
                                <div className="contact-form-header">
                                    <Title
                                        level={2}
                                        style={{
                                            color: 'white',
                                            marginBottom: '16px',
                                        }}
                                    >
                                        Gửi tin nhắn cho chúng tôi
                                    </Title>
                                    <Paragraph
                                        style={{
                                            color: 'rgba(255,255,255,0.9)',
                                            fontSize: '16px',
                                            margin: 0,
                                        }}
                                    >
                                        Điền vào form bên dưới, chúng tôi sẽ
                                        phản hồi bạn trong vòng 24 giờ
                                    </Paragraph>
                                </div>
                                <div className="contact-form-body">
                                    <Form
                                        form={form}
                                        name="contact"
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                        layout="vertical"
                                        size="large"
                                    >
                                        <Row gutter={16}>
                                            <Col xs={24} md={12}>
                                                <Form.Item
                                                    name="firstName"
                                                    label="Họ"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Vui lòng nhập họ của bạn!',
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        prefix={
                                                            <UserOutlined
                                                                style={{
                                                                    color: '#bfbfbf',
                                                                }}
                                                            />
                                                        }
                                                        placeholder="Nhập họ của bạn"
                                                        className="contact-form-input"
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={12}>
                                                <Form.Item
                                                    name="lastName"
                                                    label="Tên"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Vui lòng nhập tên của bạn!',
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        prefix={
                                                            <UserOutlined
                                                                style={{
                                                                    color: '#bfbfbf',
                                                                }}
                                                            />
                                                        }
                                                        placeholder="Nhập tên của bạn"
                                                        className="contact-form-input"
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Form.Item
                                            name="email"
                                            label="Email"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Vui lòng nhập email!',
                                                },
                                                {
                                                    type: 'email',
                                                    message:
                                                        'Vui lòng nhập đúng định dạng email!',
                                                },
                                            ]}
                                        >
                                            <Input
                                                prefix={
                                                    <MailOutlined
                                                        style={{
                                                            color: '#bfbfbf',
                                                        }}
                                                    />
                                                }
                                                placeholder="Nhập địa chỉ email"
                                                className="contact-form-input"
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="phone"
                                            label="Số điện thoại"
                                        >
                                            <Input
                                                prefix={
                                                    <PhoneOutlined
                                                        style={{
                                                            color: '#bfbfbf',
                                                        }}
                                                    />
                                                }
                                                placeholder="Nhập số điện thoại"
                                                className="contact-form-input"
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="subject"
                                            label="Chủ đề"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Vui lòng nhập chủ đề!',
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder="Nhập chủ đề liên hệ"
                                                className="contact-form-input"
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="message"
                                            label="Nội dung"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Vui lòng nhập nội dung tin nhắn!',
                                                },
                                            ]}
                                        >
                                            <TextArea
                                                rows={4}
                                                placeholder="Nhập nội dung liên hệ..."
                                                className="contact-form-textarea"
                                            />
                                        </Form.Item>

                                        <Form.Item>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                loading={loading}
                                                icon={<SendOutlined />}
                                                className="contact-form-btn"
                                                block
                                            >
                                                {loading
                                                    ? 'Đang gửi...'
                                                    : 'Gửi tin nhắn'}
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </Card>
                        </Col>

                        <Col xs={24} lg={12}>
                            <div style={{ padding: '0 20px' }}>
                                <Title
                                    level={2}
                                    style={{ marginBottom: '24px' }}
                                >
                                    Vì sao chọn chúng tôi?
                                </Title>
                                <div style={{ marginBottom: '30px' }}>
                                    <Title
                                        level={4}
                                        style={{
                                            color: '#20b2aa',
                                            marginBottom: '12px',
                                        }}
                                    >
                                        Giảng viên chuyên gia
                                    </Title>
                                    <Paragraph
                                        style={{
                                            color: '#666',
                                            fontSize: '16px',
                                        }}
                                    >
                                        Học cùng các chuyên gia trong ngành với
                                        nhiều năm kinh nghiệm thực tế.
                                    </Paragraph>
                                </div>
                                <div style={{ marginBottom: '30px' }}>
                                    <Title
                                        level={4}
                                        style={{
                                            color: '#20b2aa',
                                            marginBottom: '12px',
                                        }}
                                    >
                                        Học tập linh hoạt
                                    </Title>
                                    <Paragraph
                                        style={{
                                            color: '#666',
                                            fontSize: '16px',
                                        }}
                                    >
                                        Chủ động học theo tốc độ của bạn với
                                        quyền truy cập trọn đời vào tài liệu và
                                        hỗ trợ trực tuyến 24/7.
                                    </Paragraph>
                                </div>
                                <div style={{ marginBottom: '30px' }}>
                                    <Title
                                        level={4}
                                        style={{
                                            color: '#20b2aa',
                                            marginBottom: '12px',
                                        }}
                                    >
                                        Dự án thực tiễn
                                    </Title>
                                    <Paragraph
                                        style={{
                                            color: '#666',
                                            fontSize: '16px',
                                        }}
                                    >
                                        Thực hành xây dựng các dự án thực tế để
                                        bổ sung vào portfolio và gây ấn tượng
                                        với nhà tuyển dụng.
                                    </Paragraph>
                                </div>
                                <div>
                                    <Title
                                        level={4}
                                        style={{
                                            color: '#20b2aa',
                                            marginBottom: '12px',
                                        }}
                                    >
                                        Hỗ trợ nghề nghiệp
                                    </Title>
                                    <Paragraph
                                        style={{
                                            color: '#666',
                                            fontSize: '16px',
                                        }}
                                    >
                                        Nhận tư vấn nghề nghiệp, chỉnh sửa CV và
                                        hỗ trợ kết nối việc làm từ đội ngũ
                                        chuyên trách.
                                    </Paragraph>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>

            <section className="contact-map-section">
                <div className="contact-map-content">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={2} style={{ marginBottom: '16px' }}>
                            Tìm chúng tôi tại đây
                        </Title>
                        <Paragraph style={{ fontSize: '18px', color: '#666' }}>
                            Ghé thăm văn phòng chính hoặc các chi nhánh của
                            chúng tôi
                        </Paragraph>
                    </div>

                    <div className="contact-map-placeholder">
                        <EnvironmentOutlined className="contact-map-icon" />
                    </div>
                </div>
            </section>

            <section className="contact-offices-section">
                <div className="contact-offices-background" />

                <div className="contact-offices-content">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={2} style={{ marginBottom: '16px' }}>
                            Hệ thống văn phòng
                        </Title>
                        <Paragraph style={{ fontSize: '18px', color: '#666' }}>
                            Nhiều địa điểm để phục vụ bạn tốt hơn
                        </Paragraph>
                    </div>

                    <Row gutter={[24, 32]}>
                        <Col xs={24} md={8}>
                            <Card className="contact-office-card">
                                <div className="contact-office-header">
                                    <Title
                                        level={4}
                                        style={{ color: 'white', margin: 0 }}
                                    >
                                        Văn phòng New York
                                    </Title>
                                </div>
                                <div className="contact-office-body">
                                    <div className="contact-office-item">
                                        <EnvironmentOutlined className="contact-office-icon" />
                                        <span>
                                            123 Đường Giáo Dục, New York, NY
                                            10001
                                        </span>
                                    </div>
                                    <div className="contact-office-item">
                                        <PhoneOutlined className="contact-office-icon" />
                                        <span>+1 (555) 123-4567</span>
                                    </div>
                                    <div className="contact-office-item">
                                        <MailOutlined className="contact-office-icon" />
                                        <span>ny@monaeducation.com</span>
                                    </div>
                                    <div className="contact-office-item">
                                        <ClockCircleOutlined className="contact-office-icon" />
                                        <span>Thứ 2 - Thứ 6: 9:00 - 18:00</span>
                                    </div>
                                </div>
                            </Card>
                        </Col>

                        <Col xs={24} md={8}>
                            <Card className="contact-office-card">
                                <div className="contact-office-header">
                                    <Title
                                        level={4}
                                        style={{ color: 'white', margin: 0 }}
                                    >
                                        Văn phòng Los Angeles
                                    </Title>
                                </div>
                                <div className="contact-office-body">
                                    <div className="contact-office-item">
                                        <EnvironmentOutlined className="contact-office-icon" />
                                        <span>
                                            456 Learning Ave, Los Angeles, CA
                                            90210
                                        </span>
                                    </div>
                                    <div className="contact-office-item">
                                        <PhoneOutlined className="contact-office-icon" />
                                        <span>+1 (555) 987-6543</span>
                                    </div>
                                    <div className="contact-office-item">
                                        <MailOutlined className="contact-office-icon" />
                                        <span>la@monaeducation.com</span>
                                    </div>
                                    <div className="contact-office-item">
                                        <ClockCircleOutlined className="contact-office-icon" />
                                        <span>Thứ 2 - Thứ 6: 8:00 - 17:00</span>
                                    </div>
                                </div>
                            </Card>
                        </Col>

                        <Col xs={24} md={8}>
                            <Card className="contact-office-card">
                                <div className="contact-office-header">
                                    <Title
                                        level={4}
                                        style={{ color: 'white', margin: 0 }}
                                    >
                                        Văn phòng Chicago
                                    </Title>
                                </div>
                                <div className="contact-office-body">
                                    <div className="contact-office-item">
                                        <EnvironmentOutlined className="contact-office-icon" />
                                        <span>
                                            789 Knowledge Blvd, Chicago, IL
                                            60601
                                        </span>
                                    </div>
                                    <div className="contact-office-item">
                                        <PhoneOutlined className="contact-office-icon" />
                                        <span>+1 (555) 456-7890</span>
                                    </div>
                                    <div className="contact-office-item">
                                        <MailOutlined className="contact-office-icon" />
                                        <span>chicago@monaeducation.com</span>
                                    </div>
                                    <div className="contact-office-item">
                                        <ClockCircleOutlined className="contact-office-icon" />
                                        <span>Thứ 2 - Thứ 6: 9:00 - 18:00</span>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </section>

            <section className="contact-faq-section">
                <div className="contact-faq-content">
                    <Row gutter={[48, 48]}>
                        <Col xs={24} lg={12}>
                            <Card className="contact-faq-card">
                                <div className="contact-faq-header">
                                    <Title
                                        level={2}
                                        style={{
                                            color: 'white',
                                            marginBottom: '16px',
                                        }}
                                    >
                                        Câu hỏi thường gặp
                                    </Title>
                                    <Paragraph
                                        style={{
                                            color: 'rgba(255,255,255,0.9)',
                                            fontSize: '16px',
                                            margin: 0,
                                        }}
                                    >
                                        Tìm câu trả lời cho các thắc mắc về khóa
                                        học và dịch vụ của chúng tôi
                                    </Paragraph>
                                </div>
                                <div className="contact-faq-body">
                                    <Collapse
                                        items={faqData}
                                        defaultActiveKey={['1']}
                                        expandIcon={({ isActive }) => (
                                            <QuestionCircleOutlined
                                                rotate={isActive ? 90 : 0}
                                                style={{ color: '#20b2aa' }}
                                            />
                                        )}
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                        }}
                                    />
                                </div>
                            </Card>
                        </Col>

                        <Col xs={24} lg={12}>
                            <div style={{ padding: '0 20px' }}>
                                <Title
                                    level={2}
                                    style={{ marginBottom: '24px' }}
                                >
                                    Vẫn còn thắc mắc?
                                </Title>
                                <Paragraph
                                    style={{
                                        color: '#666',
                                        fontSize: '16px',
                                        marginBottom: '30px',
                                    }}
                                >
                                    Nếu bạn không tìm thấy câu trả lời, đừng
                                    ngần ngại liên hệ đội ngũ hỗ trợ của chúng
                                    tôi. Chúng tôi luôn sẵn sàng đồng hành cùng
                                    bạn trên hành trình học tập.
                                </Paragraph>

                                <div style={{ marginBottom: '30px' }}>
                                    <Title
                                        level={4}
                                        style={{
                                            color: '#20b2aa',
                                            marginBottom: '12px',
                                        }}
                                    >
                                        <MessageOutlined
                                            style={{ marginRight: '8px' }}
                                        />
                                        Hỗ trợ chat trực tuyến
                                    </Title>
                                    <Paragraph
                                        style={{
                                            color: '#666',
                                            fontSize: '16px',
                                        }}
                                    >
                                        Nhận hỗ trợ ngay lập tức từ đội ngũ tư
                                        vấn qua tính năng chat trực tuyến 24/7.
                                    </Paragraph>
                                </div>

                                <div style={{ marginBottom: '30px' }}>
                                    <Title
                                        level={4}
                                        style={{
                                            color: '#20b2aa',
                                            marginBottom: '12px',
                                        }}
                                    >
                                        <PhoneOutlined
                                            style={{ marginRight: '8px' }}
                                        />
                                        Hỗ trợ qua điện thoại
                                    </Title>
                                    <Paragraph
                                        style={{
                                            color: '#666',
                                            fontSize: '16px',
                                        }}
                                    >
                                        Gọi trực tiếp cho chúng tôi trong giờ
                                        làm việc để được hỗ trợ nhanh chóng.
                                    </Paragraph>
                                </div>

                                <div>
                                    <Title
                                        level={4}
                                        style={{
                                            color: '#20b2aa',
                                            marginBottom: '12px',
                                        }}
                                    >
                                        <MailOutlined
                                            style={{ marginRight: '8px' }}
                                        />
                                        Hỗ trợ qua email
                                    </Title>
                                    <Paragraph
                                        style={{
                                            color: '#666',
                                            fontSize: '16px',
                                        }}
                                    >
                                        Gửi email cho chúng tôi và sẽ nhận được
                                        phản hồi chi tiết trong vòng 24 giờ.
                                    </Paragraph>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>

            <section className="contact-social-section">
                <div className="contact-social-floating-1" />
                <div className="contact-social-floating-2" />

                <div className="contact-social-content">
                    <Title
                        level={2}
                        style={{ color: 'white', marginBottom: '24px' }}
                    >
                        Kết nối với chúng tôi
                    </Title>
                    <Paragraph
                        style={{
                            fontSize: '18px',
                            color: 'rgba(255,255,255,0.9)',
                            marginBottom: '40px',
                        }}
                    >
                        Theo dõi chúng tôi trên mạng xã hội để cập nhật tin tức,
                        mẹo học tập và nội dung giáo dục mới nhất. Tham gia cộng
                        đồng học viên và luôn giữ liên lạc!
                    </Paragraph>

                    <div className="contact-social-icons">
                        <Link
                            target={'_blank'}
                            to={COMMON_INFORMATION.FACEBOOK_LINK}
                            className="contact-social-icon"
                        >
                            <FacebookOutlined />
                        </Link>
                        <Link
                            target={'_blank'}
                            to={COMMON_INFORMATION.X_LINK}
                            className="contact-social-icon"
                        >
                            <XOutlined />
                        </Link>
                        <Link
                            target={'_blank'}
                            to={COMMON_INFORMATION.INSTAGRAM_LINK}
                            className="contact-social-icon"
                        >
                            <InstagramOutlined />
                        </Link>
                        <Link
                            target={'_blank'}
                            to={COMMON_INFORMATION.YOUTUBE_LINK}
                            className="contact-social-icon"
                        >
                            <YoutubeOutlined />
                        </Link>
                        <Link
                            target={'_blank'}
                            to={COMMON_INFORMATION.LINKEDIN_LINK}
                            className="contact-social-icon"
                        >
                            <LinkedinOutlined />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ContactPage
