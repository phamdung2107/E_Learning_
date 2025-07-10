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
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000))
            console.log('Form values:', values)
            message.success(
                "Thank you for your message! We'll get back to you soon."
            )
            form.resetFields()
        } catch (error) {
            message.error('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
        message.error('Please fill in all required fields.')
    }

    const faqData = [
        {
            key: '1',
            label: 'How do I enroll in a course?',
            children: (
                <p>
                    You can enroll in any course by clicking the "Enroll Now"
                    button on the course page. You'll need to create an account
                    and complete the payment process. Once enrolled, you'll have
                    immediate access to all course materials.
                </p>
            ),
        },
        {
            key: '2',
            label: 'What payment methods do you accept?',
            children: (
                <p>
                    We accept all major credit cards (Visa, MasterCard, American
                    Express), PayPal, and bank transfers. All payments are
                    processed securely through our encrypted payment gateway.
                </p>
            ),
        },
        {
            key: '3',
            label: "Can I get a refund if I'm not satisfied?",
            children: (
                <p>
                    Yes, we offer a 30-day money-back guarantee for all our
                    courses. If you're not satisfied with your purchase, you can
                    request a full refund within 30 days of enrollment, no
                    questions asked.
                </p>
            ),
        },
        {
            key: '4',
            label: 'Do you provide certificates upon completion?',
            children: (
                <p>
                    Upon successful completion of any course, you'll receive a
                    certificate of completion that you can download and share on
                    your LinkedIn profile or include in your resume.
                </p>
            ),
        },
        {
            key: '5',
            label: 'How long do I have access to the course materials?',
            children: (
                <p>
                    Once you enroll in a course, you have lifetime access to all
                    course materials, including any future updates. You can
                    learn at your own pace and revisit the content whenever you
                    need to.
                </p>
            ),
        },
    ]

    return (
        <div>
            {/* Hero Section */}
            <section className="contact-hero-section">
                <div className="contact-hero-floating-1" />
                <div className="contact-hero-floating-2" />

                <div className="contact-hero-content">
                    <Title level={1} className="contact-hero-title">
                        Get In Touch
                    </Title>
                    <Paragraph className="contact-hero-description">
                        Have questions about our courses or need support? We're
                        here to help! Reach out to us through any of the
                        channels below, and our team will get back to you as
                        soon as possible.
                    </Paragraph>
                </div>
            </section>

            {/* Contact Information */}
            <section className="contact-info-section">
                <div className="contact-info-background" />

                <div className="contact-info-content">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={2} style={{ marginBottom: '16px' }}>
                            Contact Information
                        </Title>
                        <Paragraph
                            style={{
                                fontSize: '18px',
                                color: '#666',
                                maxWidth: '600px',
                                margin: '0 auto',
                            }}
                        >
                            Multiple ways to reach us for your convenience
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
                                    Phone
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
                                    Address
                                </Title>
                                <Text
                                    style={{
                                        color: '#666',
                                        fontSize: '16px',
                                        display: 'block',
                                    }}
                                >
                                    123 Education Street
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
                                    Business Hours
                                </Title>
                                <Text
                                    style={{
                                        color: '#666',
                                        fontSize: '16px',
                                        display: 'block',
                                        marginBottom: '8px',
                                    }}
                                >
                                    Mon - Fri: 9:00 AM - 6:00 PM
                                </Text>
                                <Text
                                    style={{ color: '#666', fontSize: '16px' }}
                                >
                                    Sat - Sun: 10:00 AM - 4:00 PM
                                </Text>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </section>

            {/* Contact Form */}
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
                                        Send us a Message
                                    </Title>
                                    <Paragraph
                                        style={{
                                            color: 'rgba(255,255,255,0.9)',
                                            fontSize: '16px',
                                            margin: 0,
                                        }}
                                    >
                                        Fill out the form below and we'll get
                                        back to you within 24 hours
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
                                                    label="First Name"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Please enter your first name!',
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
                                                        placeholder="Enter your first name"
                                                        className="contact-form-input"
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={12}>
                                                <Form.Item
                                                    name="lastName"
                                                    label="Last Name"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Please enter your last name!',
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
                                                        placeholder="Enter your last name"
                                                        className="contact-form-input"
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Form.Item
                                            name="email"
                                            label="Email Address"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please enter your email!',
                                                },
                                                {
                                                    type: 'email',
                                                    message:
                                                        'Please enter a valid email!',
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
                                                placeholder="Enter your email address"
                                                className="contact-form-input"
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="phone"
                                            label="Phone Number"
                                        >
                                            <Input
                                                prefix={
                                                    <PhoneOutlined
                                                        style={{
                                                            color: '#bfbfbf',
                                                        }}
                                                    />
                                                }
                                                placeholder="Enter your phone number"
                                                className="contact-form-input"
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="subject"
                                            label="Subject"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please enter a subject!',
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder="Enter the subject of your message"
                                                className="contact-form-input"
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="message"
                                            label="Message"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please enter your message!',
                                                },
                                            ]}
                                        >
                                            <TextArea
                                                rows={4}
                                                placeholder="Enter your message here..."
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
                                                    ? 'Sending...'
                                                    : 'Send Message'}
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
                                    Why Choose Us?
                                </Title>
                                <div style={{ marginBottom: '30px' }}>
                                    <Title
                                        level={4}
                                        style={{
                                            color: '#20b2aa',
                                            marginBottom: '12px',
                                        }}
                                    >
                                        Expert Instructors
                                    </Title>
                                    <Paragraph
                                        style={{
                                            color: '#666',
                                            fontSize: '16px',
                                        }}
                                    >
                                        Learn from industry professionals with
                                        years of real-world experience in their
                                        respective fields.
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
                                        Flexible Learning
                                    </Title>
                                    <Paragraph
                                        style={{
                                            color: '#666',
                                            fontSize: '16px',
                                        }}
                                    >
                                        Study at your own pace with lifetime
                                        access to course materials and 24/7
                                        online support.
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
                                        Practical Projects
                                    </Title>
                                    <Paragraph
                                        style={{
                                            color: '#666',
                                            fontSize: '16px',
                                        }}
                                    >
                                        Build real-world projects that you can
                                        add to your portfolio and showcase to
                                        potential employers.
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
                                        Career Support
                                    </Title>
                                    <Paragraph
                                        style={{
                                            color: '#666',
                                            fontSize: '16px',
                                        }}
                                    >
                                        Get career guidance, resume reviews, and
                                        job placement assistance from our
                                        dedicated career team.
                                    </Paragraph>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>

            {/* Map Section */}
            <section className="contact-map-section">
                <div className="contact-map-content">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={2} style={{ marginBottom: '16px' }}>
                            Find Us Here
                        </Title>
                        <Paragraph style={{ fontSize: '18px', color: '#666' }}>
                            Visit our main office or any of our branch locations
                        </Paragraph>
                    </div>

                    <div className="contact-map-placeholder">
                        <EnvironmentOutlined className="contact-map-icon" />
                    </div>
                </div>
            </section>

            {/* Office Locations */}
            <section className="contact-offices-section">
                <div className="contact-offices-background" />

                <div className="contact-offices-content">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={2} style={{ marginBottom: '16px' }}>
                            Our Office Locations
                        </Title>
                        <Paragraph style={{ fontSize: '18px', color: '#666' }}>
                            Multiple locations to serve you better
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
                                        New York Office
                                    </Title>
                                </div>
                                <div className="contact-office-body">
                                    <div className="contact-office-item">
                                        <EnvironmentOutlined className="contact-office-icon" />
                                        <span>
                                            123 Education Street, New York, NY
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
                                        <span>
                                            Mon - Fri: 9:00 AM - 6:00 PM
                                        </span>
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
                                        Los Angeles Office
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
                                        <span>
                                            Mon - Fri: 8:00 AM - 5:00 PM
                                        </span>
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
                                        Chicago Office
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
                                        <span>
                                            Mon - Fri: 9:00 AM - 6:00 PM
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </section>

            {/* FAQ Section */}
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
                                        Frequently Asked Questions
                                    </Title>
                                    <Paragraph
                                        style={{
                                            color: 'rgba(255,255,255,0.9)',
                                            fontSize: '16px',
                                            margin: 0,
                                        }}
                                    >
                                        Find answers to common questions about
                                        our courses and services
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
                                    Still Have Questions?
                                </Title>
                                <Paragraph
                                    style={{
                                        color: '#666',
                                        fontSize: '16px',
                                        marginBottom: '30px',
                                    }}
                                >
                                    Can't find the answer you're looking for?
                                    Don't hesitate to reach out to our support
                                    team. We're here to help you succeed in your
                                    learning journey.
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
                                        Live Chat Support
                                    </Title>
                                    <Paragraph
                                        style={{
                                            color: '#666',
                                            fontSize: '16px',
                                        }}
                                    >
                                        Get instant help from our support team
                                        through our live chat feature available
                                        24/7.
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
                                        Phone Support
                                    </Title>
                                    <Paragraph
                                        style={{
                                            color: '#666',
                                            fontSize: '16px',
                                        }}
                                    >
                                        Call us directly during business hours
                                        for immediate assistance with any
                                        questions or concerns.
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
                                        Email Support
                                    </Title>
                                    <Paragraph
                                        style={{
                                            color: '#666',
                                            fontSize: '16px',
                                        }}
                                    >
                                        Send us an email and we'll respond
                                        within 24 hours with detailed answers to
                                        your questions.
                                    </Paragraph>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>

            {/* Social Media */}
            <section className="contact-social-section">
                <div className="contact-social-floating-1" />
                <div className="contact-social-floating-2" />

                <div className="contact-social-content">
                    <Title
                        level={2}
                        style={{ color: 'white', marginBottom: '24px' }}
                    >
                        Connect With Us
                    </Title>
                    <Paragraph
                        style={{
                            fontSize: '18px',
                            color: 'rgba(255,255,255,0.9)',
                            marginBottom: '40px',
                        }}
                    >
                        Follow us on social media for the latest updates, tips,
                        and educational content. Join our community of learners
                        and stay connected!
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
