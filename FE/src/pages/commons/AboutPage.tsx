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
                        Về Mona Course Pro
                    </Title>
                    <Paragraph className="about-hero-description">
                        Chúng tôi đam mê việc thay đổi giáo dục thông qua công
                        nghệ. Sứ mệnh của chúng tôi là mang đến cơ hội học tập
                        chất lượng cao cho mọi người, ở mọi nơi, giúp mỗi cá
                        nhân đạt được ước mơ và xây dựng sự nghiệp thành công.
                    </Paragraph>
                </div>
            </section>

            {/* Mission, Vision, Values */}
            <section className="about-mission-section">
                <div className="about-mission-background" />

                <div className="about-mission-content">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={2} style={{ marginBottom: '16px' }}>
                            Nền tảng của chúng tôi
                        </Title>
                        <Paragraph
                            style={{
                                fontSize: '18px',
                                color: '#666',
                                maxWidth: '600px',
                                margin: '0 auto',
                            }}
                        >
                            Được xây dựng trên những nguyên tắc vững chắc định
                            hướng mọi hoạt động của chúng tôi
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
                                    Sứ mệnh
                                </Title>
                                <Paragraph
                                    style={{ color: '#666', fontSize: '16px' }}
                                >
                                    Dân chủ hóa giáo dục bằng cách cung cấp trải
                                    nghiệm học tập đẳng cấp thế giới, dễ tiếp
                                    cận, hấp dẫn và hiệu quả cho mọi đối tượng
                                    học viên ở mọi trình độ.
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
                                    Tầm nhìn
                                </Title>
                                <Paragraph
                                    style={{ color: '#666', fontSize: '16px' }}
                                >
                                    Trở thành nền tảng giáo dục hàng đầu toàn
                                    cầu, nơi hàng triệu học viên khám phá tiềm
                                    năng, làm chủ kỹ năng mới và thay đổi sự
                                    nghiệp thông qua giáo dục đổi mới sáng tạo.
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
                                    Giá trị cốt lõi
                                </Title>
                                <Paragraph
                                    style={{ color: '#666', fontSize: '16px' }}
                                >
                                    Xuất sắc, đổi mới, hòa nhập và thành công
                                    của học viên là kim chỉ nam cho mọi quyết
                                    định của chúng tôi. Chúng tôi tin vào sức
                                    mạnh của giáo dục để thay đổi cuộc sống và
                                    cộng đồng.
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
                                Câu chuyện của chúng tôi
                            </Title>
                            <Paragraph
                                style={{
                                    fontSize: '16px',
                                    color: '#666',
                                    marginBottom: '20px',
                                }}
                            >
                                Được thành lập năm 2020 bởi đội ngũ giáo viên và
                                chuyên gia công nghệ đầy nhiệt huyết, Mona
                                Course Pro bắt đầu với tầm nhìn đơn giản nhưng
                                mạnh mẽ: thu hẹp khoảng cách giữa giáo dục
                                truyền thống và nhu cầu phát triển nhanh chóng
                                của lực lượng lao động hiện đại.
                            </Paragraph>
                            <Paragraph
                                style={{
                                    fontSize: '16px',
                                    color: '#666',
                                    marginBottom: '20px',
                                }}
                            >
                                Từ một sáng kiến nhỏ nhằm hỗ trợ người đi làm
                                nâng cao kỹ năng trong đại dịch, chúng tôi đã
                                phát triển thành nền tảng học tập toàn diện phục
                                vụ hàng ngàn học viên trên toàn thế giới. Chúng
                                tôi hợp tác với các chuyên gia, tổ chức uy tín
                                và doanh nghiệp hàng đầu để xây dựng các khóa
                                học thực sự giá trị.
                            </Paragraph>
                            <Paragraph
                                style={{
                                    fontSize: '16px',
                                    color: '#666',
                                    marginBottom: '30px',
                                }}
                            >
                                Ngày nay, chúng tôi tự hào là đơn vị tiên phong
                                trong đổi mới giáo dục, không ngừng phát triển
                                nền tảng để đáp ứng nhu cầu thay đổi của người
                                học trong kỷ nguyên số.
                            </Paragraph>
                            <Space>
                                <Text strong style={{ color: '#20B2AA' }}>
                                    Thành lập 2020
                                </Text>
                                <Text strong style={{ color: '#667eea' }}>
                                    50.000+ Học viên
                                </Text>
                                <Text strong style={{ color: '#ff6b6b' }}>
                                    1.200+ Giảng viên
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
                            Đội ngũ lãnh đạo
                        </Title>
                        <Paragraph style={{ fontSize: '18px', color: '#666' }}>
                            Những nhà lãnh đạo giàu kinh nghiệm dẫn dắt đổi mới
                            trong công nghệ giáo dục
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
                                    CEO & Đồng sáng lập
                                </Text>
                                <Paragraph
                                    ellipsis={{ rows: 3 }}
                                    style={{
                                        color: '#666',
                                        fontSize: '14px',
                                        textAlign: 'center',
                                    }}
                                >
                                    Nguyên Phó Chủ tịch Giáo dục tại TechCorp.
                                    Hơn 15 năm kinh nghiệm trong lĩnh vực EdTech
                                    và phát triển sản phẩm.
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
                                    CTO & Đồng sáng lập
                                </Text>
                                <Paragraph
                                    ellipsis={{ rows: 3 }}
                                    style={{
                                        color: '#666',
                                        fontSize: '14px',
                                        textAlign: 'center',
                                    }}
                                >
                                    Nguyên Kỹ sư cao cấp tại Google. Chuyên gia
                                    về nền tảng học tập quy mô lớn và AI.
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
                                    Giám đốc Marketing
                                </Text>
                                <Paragraph
                                    ellipsis={{ rows: 3 }}
                                    style={{
                                        color: '#666',
                                        fontSize: '14px',
                                        textAlign: 'center',
                                    }}
                                >
                                    Chiến lược gia marketing với hơn 12 năm xây
                                    dựng thương hiệu giáo dục toàn cầu.
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
                                    Trưởng bộ phận nội dung
                                </Text>
                                <Paragraph
                                    ellipsis={{ rows: 3 }}
                                    style={{
                                        color: '#666',
                                        fontSize: '14px',
                                        textAlign: 'center',
                                    }}
                                >
                                    Nhà thiết kế chương trình học, nguyên giảng
                                    viên đại học với hơn 20 năm kinh nghiệm.
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
                            Thành tựu nổi bật
                        </Title>
                        <Paragraph
                            style={{
                                fontSize: '18px',
                                color: 'rgba(255,255,255,0.9)',
                            }}
                        >
                            Thay đổi cuộc sống qua giáo dục trên toàn thế giới
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
                                            Học viên đã đăng ký
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
                                            Khóa học hiện có
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
                                            Giảng viên chuyên gia
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
                                            Quốc gia tiếp cận
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
                            Giá trị thúc đẩy chúng tôi
                        </Title>
                        <Paragraph style={{ fontSize: '18px', color: '#666' }}>
                            Những giá trị cốt lõi định hình văn hóa và định
                            hướng mọi quyết định của chúng tôi
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
                                    Đổi mới
                                </Title>
                                <Paragraph
                                    style={{ color: '#666', fontSize: '14px' }}
                                >
                                    Chúng tôi không ngừng sáng tạo để mang đến
                                    trải nghiệm học tập tiên tiến, thích ứng với
                                    tương lai của giáo dục.
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
                                    Chất lượng
                                </Title>
                                <Paragraph
                                    style={{ color: '#666', fontSize: '14px' }}
                                >
                                    Mỗi khóa học, tính năng và tương tác đều
                                    được chăm chút tỉ mỉ, đảm bảo tiêu chuẩn cao
                                    nhất.
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
                                    Cộng đồng
                                </Title>
                                <Paragraph
                                    style={{ color: '#666', fontSize: '14px' }}
                                >
                                    Chúng tôi xây dựng cộng đồng toàn cầu hòa
                                    nhập, nơi học viên hỗ trợ và phát triển cùng
                                    nhau.
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
                                    Phát triển
                                </Title>
                                <Paragraph
                                    style={{ color: '#666', fontSize: '14px' }}
                                >
                                    Chúng tôi tin vào việc học tập và phát triển
                                    không ngừng, cả cho học viên lẫn tổ chức.
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
                        Sẵn sàng bắt đầu hành trình học tập?
                    </Title>
                    <Paragraph
                        style={{
                            fontSize: '18px',
                            color: 'rgba(255,255,255,0.9)',
                            marginBottom: '40px',
                        }}
                    >
                        Tham gia cộng đồng học viên của chúng tôi và bắt đầu
                        chinh phục mục tiêu của bạn. Dù bạn muốn phát triển sự
                        nghiệp, học kỹ năng mới hay khám phá đam mê, chúng tôi
                        luôn đồng hành cùng bạn trên từng chặng đường.
                    </Paragraph>
                    <Space size="large">
                        <Button
                            href={PATHS.COURSES}
                            type="primary"
                            size="large"
                            className="about-cta-btn"
                        >
                            Xem các khóa học
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
                            Liên hệ với chúng tôi
                        </Button>
                    </Space>
                </div>
            </section>
        </div>
    )
}

export default AboutPage
