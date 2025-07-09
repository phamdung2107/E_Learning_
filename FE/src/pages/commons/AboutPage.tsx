'use client'

import type React from 'react'

import { Button, Card, Col, Row, Space, Statistic, Typography } from 'antd'

import {
    BookOutlined,
    BulbOutlined,
    CrownOutlined,
    EyeOutlined,
    GlobalOutlined,
    HeartOutlined,
    RocketOutlined,
    SafetyOutlined,
    UserOutlined,
} from '@ant-design/icons'

import { PATHS } from '@/routers/path'

import '../styles/About.css'

const { Title, Paragraph, Text } = Typography

const AboutPage: React.FC = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="about-hero-section">
                <div className="about-hero-floating-1" />
                <div className="about-hero-floating-2" />

                <div className="about-hero-content">
                    <Title level={1} className="about-hero-title">
                        About Mona Course Pro
                    </Title>
                    <Paragraph className="about-hero-description">
                        We are passionate about transforming education through
                        technology. Our mission is to make high-quality learning
                        accessible to everyone, everywhere, empowering
                        individuals to achieve their dreams and build successful
                        careers.
                    </Paragraph>
                </div>
            </section>

            {/* Mission, Vision, Values */}
            <section className="about-mission-section">
                <div className="about-mission-background" />

                <div className="about-mission-content">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={2} style={{ marginBottom: '16px' }}>
                            Our Foundation
                        </Title>
                        <Paragraph
                            style={{
                                fontSize: '18px',
                                color: '#666',
                                maxWidth: '600px',
                                margin: '0 auto',
                            }}
                        >
                            Built on strong principles that guide everything we
                            do
                        </Paragraph>
                    </div>

                    <Row gutter={[32, 32]}>
                        <Col xs={24} md={8}>
                            <Card
                                className="about-mission-card"
                                style={{ padding: '40px 20px' }}
                            >
                                <div className="about-mission-icon mission">
                                    <RocketOutlined />
                                </div>
                                <Title
                                    level={3}
                                    style={{ marginBottom: '16px' }}
                                >
                                    Our Mission
                                </Title>
                                <Paragraph
                                    style={{ color: '#666', fontSize: '16px' }}
                                >
                                    To democratize education by providing
                                    world-class learning experiences that are
                                    accessible, engaging, and effective for
                                    learners of all backgrounds and skill
                                    levels.
                                </Paragraph>
                            </Card>
                        </Col>

                        <Col xs={24} md={8}>
                            <Card
                                className="about-mission-card"
                                style={{ padding: '40px 20px' }}
                            >
                                <div className="about-mission-icon vision">
                                    <EyeOutlined />
                                </div>
                                <Title
                                    level={3}
                                    style={{ marginBottom: '16px' }}
                                >
                                    Our Vision
                                </Title>
                                <Paragraph
                                    style={{ color: '#666', fontSize: '16px' }}
                                >
                                    To become the leading global platform where
                                    millions of learners discover their
                                    potential, master new skills, and transform
                                    their careers through innovative education.
                                </Paragraph>
                            </Card>
                        </Col>

                        <Col xs={24} md={8}>
                            <Card
                                className="about-mission-card"
                                style={{ padding: '40px 20px' }}
                            >
                                <div className="about-mission-icon values">
                                    <HeartOutlined />
                                </div>
                                <Title
                                    level={3}
                                    style={{ marginBottom: '16px' }}
                                >
                                    Our Values
                                </Title>
                                <Paragraph
                                    style={{ color: '#666', fontSize: '16px' }}
                                >
                                    Excellence, innovation, inclusivity, and
                                    student success drive every decision we
                                    make. We believe in the power of education
                                    to change lives and communities.
                                </Paragraph>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </section>

            {/* Our Story */}
            <section className="about-story-section">
                <div className="about-story-decorative" />

                <div className="about-story-content">
                    <Row gutter={[48, 48]} align="middle">
                        <Col xs={24} lg={12}>
                            <div className="about-story-image">
                                <BookOutlined className="about-story-icon" />
                            </div>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Title level={2} style={{ marginBottom: '24px' }}>
                                Our Story
                            </Title>
                            <Paragraph
                                style={{
                                    fontSize: '16px',
                                    color: '#666',
                                    marginBottom: '20px',
                                }}
                            >
                                Founded in 2020 by a team of passionate
                                educators and technologists, Mona Course Pro
                                began with a simple yet powerful vision: to
                                bridge the gap between traditional education and
                                the rapidly evolving demands of the modern
                                workforce.
                            </Paragraph>
                            <Paragraph
                                style={{
                                    fontSize: '16px',
                                    color: '#666',
                                    marginBottom: '20px',
                                }}
                            >
                                What started as a small initiative to help
                                professionals upskill during the pandemic has
                                grown into a comprehensive learning platform
                                serving thousands of students worldwide. We've
                                partnered with industry experts, renowned
                                institutions, and leading companies to create
                                courses that truly matter.
                            </Paragraph>
                            <Paragraph
                                style={{
                                    fontSize: '16px',
                                    color: '#666',
                                    marginBottom: '30px',
                                }}
                            >
                                Today, we're proud to be at the forefront of
                                educational innovation, continuously evolving
                                our platform to meet the changing needs of
                                learners in the digital age.
                            </Paragraph>
                            <Space>
                                <Text strong style={{ color: '#20B2AA' }}>
                                    Est. 2020
                                </Text>
                                <Text strong style={{ color: '#667eea' }}>
                                    50,000+ Students
                                </Text>
                                <Text strong style={{ color: '#ff6b6b' }}>
                                    1,200+ Instructors
                                </Text>
                            </Space>
                        </Col>
                    </Row>
                </div>
            </section>

            {/* Leadership Team */}
            <section className="about-team-section">
                <div className="about-team-background" />

                <div className="about-team-content">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={2} style={{ marginBottom: '16px' }}>
                            Meet Our Leadership Team
                        </Title>
                        <Paragraph style={{ fontSize: '18px', color: '#666' }}>
                            Experienced leaders driving innovation in education
                            technology
                        </Paragraph>
                    </div>

                    <Row gutter={[24, 32]}>
                        <Col xs={24} sm={12} lg={6}>
                            <Card
                                styles={{ body: { padding: 0 } }}
                                className="about-team-card"
                                style={{ padding: '30px 20px' }}
                            >
                                <div className="about-team-avatar ceo">
                                    <UserOutlined />
                                </div>
                                <Title
                                    level={4}
                                    style={{ marginBottom: '8px' }}
                                >
                                    Sarah Chen
                                </Title>
                                <Text className="about-team-role">
                                    CEO & Co-Founder
                                </Text>
                                <Paragraph
                                    ellipsis={{ rows: 3 }}
                                    style={{
                                        color: '#666',
                                        fontSize: '14px',
                                        textAlign: 'center',
                                    }}
                                >
                                    Former VP of Education at TechCorp. 15+
                                    years in EdTech and product development.
                                </Paragraph>
                            </Card>
                        </Col>

                        <Col xs={24} sm={12} lg={6}>
                            <Card
                                styles={{ body: { padding: 0 } }}
                                className="about-team-card"
                                style={{ padding: '30px 20px' }}
                            >
                                <div className="about-team-avatar cto">
                                    <UserOutlined />
                                </div>
                                <Title
                                    level={4}
                                    style={{ marginBottom: '8px' }}
                                >
                                    Michael Rodriguez
                                </Title>
                                <Text className="about-team-role">
                                    CTO & Co-Founder
                                </Text>
                                <Paragraph
                                    ellipsis={{ rows: 3 }}
                                    style={{
                                        color: '#666',
                                        fontSize: '14px',
                                        textAlign: 'center',
                                    }}
                                >
                                    Former Senior Engineer at Google. Expert in
                                    scalable learning platforms and AI.
                                </Paragraph>
                            </Card>
                        </Col>

                        <Col xs={24} sm={12} lg={6}>
                            <Card
                                styles={{ body: { padding: 0 } }}
                                className="about-team-card"
                                style={{ padding: '30px 20px' }}
                            >
                                <div className="about-team-avatar cmo">
                                    <UserOutlined />
                                </div>
                                <Title
                                    level={4}
                                    style={{ marginBottom: '8px' }}
                                >
                                    Emily Johnson
                                </Title>
                                <Text className="about-team-role">
                                    Chief Marketing Officer
                                </Text>
                                <Paragraph
                                    ellipsis={{ rows: 3 }}
                                    style={{
                                        color: '#666',
                                        fontSize: '14px',
                                        textAlign: 'center',
                                    }}
                                >
                                    Marketing strategist with 12+ years building
                                    global education brands.
                                </Paragraph>
                            </Card>
                        </Col>

                        <Col xs={24} sm={12} lg={6}>
                            <Card
                                styles={{ body: { padding: 0 } }}
                                className="about-team-card"
                                style={{ padding: '30px 20px' }}
                            >
                                <div className="about-team-avatar lead">
                                    <UserOutlined />
                                </div>
                                <Title
                                    level={4}
                                    style={{ marginBottom: '8px' }}
                                >
                                    David Kim
                                </Title>
                                <Text className="about-team-role">
                                    Head of Content
                                </Text>
                                <Paragraph
                                    ellipsis={{ rows: 3 }}
                                    style={{
                                        color: '#666',
                                        fontSize: '14px',
                                        textAlign: 'center',
                                    }}
                                >
                                    Curriculum designer and former university
                                    professor with 20+ years experience.
                                </Paragraph>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </section>

            {/* Stats Section */}
            <section className="about-stats-section">
                <div className="about-stats-floating-1" />
                <div className="about-stats-floating-2" />

                <div className="about-stats-content">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title
                            level={2}
                            style={{ color: 'white', marginBottom: '16px' }}
                        >
                            Our Impact in Numbers
                        </Title>
                        <Paragraph
                            style={{
                                fontSize: '18px',
                                color: 'rgba(255,255,255,0.9)',
                            }}
                        >
                            Transforming lives through education worldwide
                        </Paragraph>
                    </div>

                    <Row gutter={[32, 32]} justify="center">
                        <Col xs={12} md={6}>
                            <div className="about-stats-item">
                                <Statistic
                                    title={
                                        <span
                                            style={{
                                                color: 'rgba(255,255,255,0.8)',
                                            }}
                                        >
                                            Students Enrolled
                                        </span>
                                    }
                                    value={50000}
                                    suffix="+"
                                    valueStyle={{
                                        color: 'white',
                                        fontSize: '36px',
                                        fontWeight: 'bold',
                                    }}
                                />
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="about-stats-item">
                                <Statistic
                                    title={
                                        <span
                                            style={{
                                                color: 'rgba(255,255,255,0.8)',
                                            }}
                                        >
                                            Courses Available
                                        </span>
                                    }
                                    value={5000}
                                    suffix="+"
                                    valueStyle={{
                                        color: 'white',
                                        fontSize: '36px',
                                        fontWeight: 'bold',
                                    }}
                                />
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="about-stats-item">
                                <Statistic
                                    title={
                                        <span
                                            style={{
                                                color: 'rgba(255,255,255,0.8)',
                                            }}
                                        >
                                            Expert Instructors
                                        </span>
                                    }
                                    value={1200}
                                    suffix="+"
                                    valueStyle={{
                                        color: 'white',
                                        fontSize: '36px',
                                        fontWeight: 'bold',
                                    }}
                                />
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="about-stats-item">
                                <Statistic
                                    title={
                                        <span
                                            style={{
                                                color: 'rgba(255,255,255,0.8)',
                                            }}
                                        >
                                            Countries Reached
                                        </span>
                                    }
                                    value={45}
                                    suffix="+"
                                    valueStyle={{
                                        color: 'white',
                                        fontSize: '36px',
                                        fontWeight: 'bold',
                                    }}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>

            {/* Core Values */}
            <section className="about-values-section">
                <div className="about-values-background" />

                <div className="about-values-content">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={2} style={{ marginBottom: '16px' }}>
                            What Drives Us
                        </Title>
                        <Paragraph style={{ fontSize: '18px', color: '#666' }}>
                            The core values that shape our culture and guide our
                            decisions
                        </Paragraph>
                    </div>

                    <Row gutter={[24, 32]}>
                        <Col xs={24} sm={12} lg={6}>
                            <Card
                                className="about-values-card"
                                style={{ padding: '30px 20px' }}
                            >
                                <div className="about-values-icon innovation">
                                    <BulbOutlined />
                                </div>
                                <Title
                                    level={4}
                                    style={{ marginBottom: '16px' }}
                                >
                                    Innovation
                                </Title>
                                <Paragraph
                                    style={{ color: '#666', fontSize: '14px' }}
                                >
                                    We continuously push boundaries to create
                                    cutting-edge learning experiences that adapt
                                    to the future of education.
                                </Paragraph>
                            </Card>
                        </Col>

                        <Col xs={24} sm={12} lg={6}>
                            <Card
                                className="about-values-card"
                                style={{ padding: '30px 20px' }}
                            >
                                <div className="about-values-icon quality">
                                    <SafetyOutlined />
                                </div>
                                <Title
                                    level={4}
                                    style={{ marginBottom: '16px' }}
                                >
                                    Quality
                                </Title>
                                <Paragraph
                                    style={{ color: '#666', fontSize: '14px' }}
                                >
                                    Every course, feature, and interaction is
                                    crafted with meticulous attention to detail
                                    and highest standards.
                                </Paragraph>
                            </Card>
                        </Col>

                        <Col xs={24} sm={12} lg={6}>
                            <Card
                                className="about-values-card"
                                style={{ padding: '30px 20px' }}
                            >
                                <div className="about-values-icon community">
                                    <GlobalOutlined />
                                </div>
                                <Title
                                    level={4}
                                    style={{ marginBottom: '16px' }}
                                >
                                    Community
                                </Title>
                                <Paragraph
                                    style={{ color: '#666', fontSize: '14px' }}
                                >
                                    We foster an inclusive global community
                                    where learners support each other and grow
                                    together.
                                </Paragraph>
                            </Card>
                        </Col>

                        <Col xs={24} sm={12} lg={6}>
                            <Card
                                className="about-values-card"
                                style={{ padding: '30px 20px' }}
                            >
                                <div className="about-values-icon growth">
                                    <CrownOutlined />
                                </div>
                                <Title
                                    level={4}
                                    style={{ marginBottom: '16px' }}
                                >
                                    Growth
                                </Title>
                                <Paragraph
                                    style={{ color: '#666', fontSize: '14px' }}
                                >
                                    We believe in continuous learning and
                                    improvement, both for our students and our
                                    organization.
                                </Paragraph>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </section>

            {/* Call to Action */}
            <section className="about-cta-section">
                <div className="about-cta-floating-1" />
                <div className="about-cta-floating-2" />

                <div className="about-cta-content">
                    <Title
                        level={2}
                        style={{ color: 'white', marginBottom: '24px' }}
                    >
                        Ready to Start Your Learning Journey?
                    </Title>
                    <Paragraph
                        style={{
                            fontSize: '18px',
                            color: 'rgba(255,255,255,0.9)',
                            marginBottom: '40px',
                        }}
                    >
                        Join our community of learners and take the first step
                        towards achieving your goals. Whether you're looking to
                        advance your career, learn new skills, or explore your
                        passions, we're here to support you every step of the
                        way.
                    </Paragraph>
                    <Space size="large">
                        <Button
                            href={PATHS.COURSES}
                            type="primary"
                            size="large"
                            className="about-cta-btn"
                        >
                            Browse Courses
                        </Button>
                        <Button
                            href={PATHS.CONTACT}
                            size="large"
                            style={{
                                background: 'transparent',
                                color: 'white',
                                borderColor: 'white',
                                borderRadius: '25px',
                                padding: '0 40px',
                                height: '50px',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'white'
                                e.currentTarget.style.color = '#667eea'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent'
                                e.currentTarget.style.color = 'white'
                            }}
                        >
                            Contact Us
                        </Button>
                    </Space>
                </div>
            </section>
        </div>
    )
}

export default AboutPage
