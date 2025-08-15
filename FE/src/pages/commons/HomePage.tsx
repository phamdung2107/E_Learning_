'use client'

import React, { useEffect, useState } from 'react'

import {
    Button,
    Col,
    Input,
    Modal,
    Row,
    Space,
    Statistic,
    Typography,
    message,
} from 'antd'

import {
    BookOutlined,
    PlayCircleOutlined,
    RocketOutlined,
    SearchOutlined,
    TrophyOutlined,
} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import ActivityCard from '@/components/core/card/ActivityCard'
import CategoryCard from '@/components/core/card/CategoryCard'
import CourseSummaryCard from '@/components/core/card/CourseSummaryCard'
import FeedbackCard from '@/components/core/card/FeedbackCard'
import InstructorCard from '@/components/core/card/InstructorCard'
import { DATE_TIME_FORMAT } from '@/constants/date'
import { PATHS } from '@/routers/path'
import CategoryService from '@/services/category'
import EnrollmentService from '@/services/enrollment'
import EventService from '@/services/event'
import InstructorService from '@/services/instructor'
import RecommendationService from '@/services/recommendation'
import ReviewService from '@/services/review'
import { formatDateTime } from '@/utils/format'

import '../styles/Home.css'

const { Title, Paragraph } = Typography
const { Search } = Input

const HomePage: React.FC = () => {
    const [courses, setCourses] = useState<any[]>([])
    const [reviews, setReviews] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])
    const [instructors, setInstructors] = useState<any[]>([])
    const [event, setEvent] = useState<any>()
    const [isEventModalVisible, setIsEventModalVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const isAuthenticated = useSelector(
        (state: any) => state.auth.isAuthenticated
    )

    const activities = [
        {
            title: 'Hội thảo trực tuyến hàng tuần',
            description:
                'Tham gia các buổi giao lưu trực tiếp với chuyên gia mỗi tuần',
            icon: <PlayCircleOutlined />,
            color: '#20B2AA',
            participants: '500+ mỗi tuần',
        },
        {
            title: 'Bootcamp lập trình',
            description: 'Các buổi thực hành lập trình chuyên sâu và workshop',
            icon: <BookOutlined />,
            color: '#667eea',
            participants: '200+ mỗi tháng',
        },
        {
            title: 'Workshop nghề nghiệp',
            description:
                'Hướng dẫn viết CV, luyện phỏng vấn và định hướng nghề nghiệp',
            icon: <TrophyOutlined />,
            color: '#764ba2',
            participants: '300+ mỗi tháng',
        },
        {
            title: 'Cuộc thi sinh viên',
            description: 'Thể hiện kỹ năng của bạn qua các cuộc thi hấp dẫn',
            icon: <RocketOutlined />,
            color: '#ff6b6b',
            participants: '150+ thí sinh',
        },
    ]

    const onSearch = async (value: any) => {
        setLoading(true)
        try {
            // const res = await RecommendationService.store({
            //     title: value,
            // })
            // const res = {
            //     status: 200,
            // }
            // if (res.status === 200) {
            //     message.success('Đã nhận được gợi ý từ AI!')
            //     navigate(PATHS.RECOMMENDATION)
            // }
        } catch (err: any) {
            message.error(
                err?.response?.data?.message || err.message || 'Có lỗi xảy ra!'
            )
        } finally {
            setLoading(false)
        }
    }

    const fetchCourses = async () => {
        try {
            const response = await EnrollmentService.getTopCourses()
            setCourses(response.data)
        } catch (e: any) {
            console.error(e)
        }
    }

    const fetchReviews = async () => {
        try {
            const response = await ReviewService.getAll({})
            setReviews(response.data)
        } catch (e: any) {
            console.error(e)
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await CategoryService.getAll({})
            setCategories(response.data)
        } catch (e: any) {
            console.error(e)
        }
    }

    const fetchInstructors = async () => {
        try {
            const response = await InstructorService.getAll({})
            setInstructors(response.data)
        } catch (e: any) {
            console.error(e)
        }
    }

    const fetchEvent = async () => {
        const eventModalShown = sessionStorage.getItem('eventModalShown')
        if (eventModalShown) {
            return
        }

        try {
            const response = await EventService.getMaximumBonusPercent()
            if (
                response.status === 200 &&
                response.data &&
                response.data?.bonus_percent > 0
            ) {
                setEvent(response.data)
                setIsEventModalVisible(true)
                sessionStorage.setItem('eventModalShown', 'true')
            }
        } catch (e: any) {
            console.error('Không thể lấy dữ liệu sự kiện:', e)
        }
    }

    useEffect(() => {
        fetchCourses()
        fetchReviews()
        fetchCategories()
        fetchInstructors()
        fetchEvent()
    }, [])

    return (
        <div>
            <section className="hero-section">
                <div className="hero-floating-element-1" />
                <div className="hero-floating-element-2" />
                <div className="hero-floating-element-3" />

                <div className="hero-content">
                    <Title level={1} className="hero-title">
                        Học không giới hạn
                    </Title>
                    <Paragraph className="hero-description">
                        Bắt đầu, chuyển hướng hoặc phát triển sự nghiệp của bạn
                        với hơn 5.000 khóa học, chứng chỉ chuyên môn và bằng cấp
                        từ các trường đại học, doanh nghiệp hàng đầu thế giới.
                    </Paragraph>

                    <Space size="large" className="hero-buttons">
                        <Button
                            type="primary"
                            size="large"
                            href={PATHS.COURSES}
                            icon={<PlayCircleOutlined />}
                            className="hero-primary-btn"
                        >
                            Bắt đầu học ngay
                        </Button>
                        <Button
                            href={PATHS.COURSES}
                            size="large"
                            className="hero-secondary-btn"
                        >
                            Xem tất cả khóa học
                        </Button>
                    </Space>
                </div>
            </section>

            <section className="stats-section">
                <div className="stats-background" />
                <div className="stats-content">
                    <Row gutter={[32, 32]} justify="center">
                        <Col xs={12} md={6}>
                            <div className="stats-item">
                                <Statistic
                                    title="Học viên đang học"
                                    value={50000}
                                    suffix="+"
                                    valueStyle={{
                                        color: '#20B2AA',
                                        fontSize: '36px',
                                        fontWeight: 'bold',
                                    }}
                                />
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="stats-item">
                                <Statistic
                                    title="Giảng viên chuyên gia"
                                    value={1200}
                                    suffix="+"
                                    valueStyle={{
                                        color: '#667eea',
                                        fontSize: '36px',
                                        fontWeight: 'bold',
                                    }}
                                />
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="stats-item">
                                <Statistic
                                    title="Khóa học trực tuyến"
                                    value={5000}
                                    suffix="+"
                                    valueStyle={{
                                        color: '#764ba2',
                                        fontSize: '36px',
                                        fontWeight: 'bold',
                                    }}
                                />
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="stats-item">
                                <Statistic
                                    title="Tỷ lệ thành công"
                                    value={98}
                                    suffix="%"
                                    valueStyle={{
                                        color: '#ff6b6b',
                                        fontSize: '36px',
                                        fontWeight: 'bold',
                                    }}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>

            <section className="about-section">
                <div className="about-decorative-1" />
                <div className="about-decorative-2" />

                <div className="about-content">
                    <Row gutter={[48, 48]} align="middle">
                        <Col xs={24} lg={12}>
                            <div className="about-image">
                                <div className="about-image-floating-1" />
                                <div className="about-image-floating-2" />
                                <BookOutlined className="about-image-icon" />
                            </div>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Title level={2} style={{ marginBottom: '24px' }}>
                                Về Mona Course Pro
                            </Title>
                            <Paragraph
                                style={{
                                    fontSize: '16px',
                                    color: '#666',
                                    marginBottom: '20px',
                                }}
                            >
                                Chúng tôi là nền tảng giáo dục trực tuyến hàng
                                đầu, cung cấp các khóa học chất lượng cao và
                                trải nghiệm học tập hiện đại. Sứ mệnh của chúng
                                tôi là mang giáo dục đến với mọi người, mọi nơi,
                                mọi lúc.
                            </Paragraph>
                            <Paragraph
                                style={{
                                    fontSize: '16px',
                                    color: '#666',
                                    marginBottom: '20px',
                                }}
                            >
                                Với hơn 5.000 khóa học do các chuyên gia giảng
                                dạy, chúng tôi giúp học viên và người đi làm
                                phát triển sự nghiệp và đạt được mục tiêu học
                                tập.
                            </Paragraph>
                            <ul
                                style={{
                                    fontSize: '16px',
                                    color: '#666',
                                    marginBottom: '30px',
                                    paddingLeft: '20px',
                                }}
                            >
                                <li>
                                    Khóa học do chuyên gia trong ngành giảng dạy
                                </li>
                                <li>
                                    Lịch học linh hoạt phù hợp với mọi đối tượng
                                </li>
                                <li>
                                    Chứng chỉ được công nhận bởi nhà tuyển dụng
                                </li>
                                <li>
                                    Hỗ trợ 24/7 và cộng đồng học tập sôi động
                                </li>
                            </ul>
                            <Button
                                type="primary"
                                size="large"
                                href={PATHS.ABOUT}
                                className="about-btn"
                            >
                                Tìm hiểu thêm về chúng tôi
                            </Button>
                            <Button
                                size="large"
                                href={PATHS.RECOMMENDATION}
                                className="ai-secondary-btn"
                                style={{
                                    border: '1px solid #20B2AA !important',
                                }}
                            >
                                Gợi ý về khóa học
                            </Button>
                        </Col>
                    </Row>
                </div>
            </section>

            <section className="featured-courses-section">
                <div className="featured-courses-background" />

                <div className="featured-courses-content">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={2} style={{ marginBottom: '16px' }}>
                            Khóa học nổi bật
                        </Title>
                        <Paragraph style={{ fontSize: '18px', color: '#666' }}>
                            Khám phá các khóa học được yêu thích nhất do chuyên
                            gia giảng dạy
                        </Paragraph>
                    </div>
                    <Row gutter={[24, 24]}>
                        {courses.slice(0, 3).map((course) => (
                            <Col xs={24} md={8} key={course.id}>
                                <CourseSummaryCard course={course} />
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            <section className="banner-section">
                <div className="banner-floating-1" />
                <div className="banner-floating-2" />
                <div className="banner-floating-3" />
                <div className="banner-floating-4">
                    <PlayCircleOutlined
                        style={{
                            fontSize: '32px',
                            color: 'rgba(255,255,255,0.8)',
                        }}
                    />
                </div>

                <div className="banner-content">
                    <Row align="middle" justify="space-between">
                        <Col xs={24} lg={16}>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '16px',
                                }}
                            >
                                <div className="banner-icon-container">
                                    <BookOutlined
                                        style={{
                                            fontSize: '28px',
                                            color: 'white',
                                        }}
                                    />
                                </div>
                                <div>
                                    <Title
                                        level={2}
                                        style={{
                                            color: 'white',
                                            margin: 0,
                                            fontSize: '32px',
                                        }}
                                    >
                                        Đăng ký khóa học online
                                    </Title>
                                </div>
                            </div>
                            <Paragraph
                                style={{
                                    color: 'rgba(255,255,255,0.9)',
                                    fontSize: '16px',
                                    margin: 0,
                                    maxWidth: '600px',
                                }}
                            >
                                Bạn muốn học điều mới hôm nay và phát triển sự
                                nghiệp? Hãy bắt đầu hành trình học tập trực
                                tuyến ngay!
                            </Paragraph>
                        </Col>
                        <Col xs={24} lg={8} style={{ textAlign: 'right' }}>
                            <Button
                                type="primary"
                                size="large"
                                href={PATHS.COURSES}
                                className="banner-btn"
                            >
                                THAM GIA NGAY
                            </Button>
                        </Col>
                    </Row>
                </div>
            </section>

            <section className="instructors-section">
                <div className="instructors-background" />

                <div className="instructors-content">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={2} style={{ marginBottom: '16px' }}>
                            Đội ngũ giảng viên chuyên gia
                        </Title>
                        <Paragraph style={{ fontSize: '18px', color: '#666' }}>
                            Học cùng các chuyên gia hàng đầu và giàu kinh nghiệm
                        </Paragraph>
                    </div>
                    <Row gutter={[24, 24]}>
                        {instructors.slice(0, 3).map((instructor, index) => (
                            <Col xs={24} md={8} key={index}>
                                <InstructorCard instructor={instructor} />
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            <section className="activities-section">
                <div className="activities-background" />

                <div className="activities-content">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={2} style={{ marginBottom: '16px' }}>
                            Hoạt động & Sự kiện học tập
                        </Title>
                        <Paragraph style={{ fontSize: '18px', color: '#666' }}>
                            Tham gia các sự kiện cộng đồng và hoạt động học tập
                            tương tác
                        </Paragraph>
                    </div>
                    <Row gutter={[24, 24]}>
                        {activities.map((activity, index) => (
                            <Col xs={24} sm={12} md={6} key={index}>
                                <ActivityCard activity={activity} />
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            <section className="reviews-section">
                <div className="reviews-background" />

                <div className="reviews-content">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={2} style={{ marginBottom: '16px' }}>
                            Học viên nói gì về chúng tôi
                        </Title>
                        <Paragraph style={{ fontSize: '18px', color: '#666' }}>
                            Phản hồi thực tế từ cộng đồng học viên
                        </Paragraph>
                    </div>
                    <Row gutter={[24, 24]}>
                        {reviews.slice(0, 3).map((review, index) => (
                            <Col xs={24} md={8} key={index}>
                                <FeedbackCard review={review} />
                            </Col>
                        ))}
                    </Row>
                    <div style={{ textAlign: 'center', marginTop: '40px' }}>
                        <Button size="large" className="reviews-btn">
                            Xem thêm đánh giá
                        </Button>
                    </div>
                </div>
            </section>

            <section className="categories-section">
                <div className="categories-background" />

                <div className="categories-content">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Title level={2} style={{ marginBottom: '16px' }}>
                            Danh mục phổ biến
                        </Title>
                        <Paragraph style={{ fontSize: '18px', color: '#666' }}>
                            Lựa chọn từ hàng trăm khóa học theo chủ đề hot nhất
                        </Paragraph>
                    </div>
                    <Row gutter={[24, 24]}>
                        {categories.slice(0, 4).map((category, index) => (
                            <Col xs={12} md={6} key={index}>
                                <CategoryCard category={category} />
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            <section className="cta-section">
                <div className="cta-floating-1" />
                <div className="cta-floating-2" />

                <div className="cta-content">
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
                        Tham gia cùng hàng ngàn học viên đang học tại Mona
                        Course Pro. Bắt đầu ngay hôm nay để khai phá tiềm năng
                        của bạn!
                    </Paragraph>
                    <Space size="large">
                        <Button
                            href={PATHS.COURSES}
                            type="primary"
                            size="large"
                            className="cta-primary-btn"
                        >
                            Học miễn phí ngay
                        </Button>
                        <Button
                            href={PATHS.COURSES}
                            size="large"
                            className="cta-secondary-btn"
                        >
                            Xem tất cả khóa học
                        </Button>
                    </Space>
                </div>
            </section>
            {event && (
                <Modal
                    open={isEventModalVisible}
                    onCancel={() => setIsEventModalVisible(false)}
                    footer={null}
                    centered
                    width={600}
                    className="event-modal"
                >
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <TrophyOutlined
                            style={{
                                fontSize: '64px',
                                color: '#ffc107',
                                marginBottom: '16px',
                            }}
                        />
                        <Title level={2} style={{ color: '#d9534f' }}>
                            {event.name}
                        </Title>
                        <Paragraph
                            style={{
                                fontSize: '18px',
                                color: '#555',
                                margin: '20px 0',
                            }}
                        >
                            {event.content}
                        </Paragraph>
                        <div
                            style={{
                                background: '#f8d7da',
                                padding: '20px',
                                borderRadius: '8px',
                                border: '2px dashed #d9534f',
                            }}
                        >
                            <Title
                                level={3}
                                style={{ margin: 0, color: '#721c24' }}
                            >
                                Tăng giá trị nạp tiền lên đến{' '}
                                <span
                                    style={{
                                        color: '#d9534f',
                                        fontSize: '40px',
                                    }}
                                >
                                    {event.bonus_percent}%
                                </span>
                            </Title>
                            <Paragraph
                                style={{ color: '#721c24', marginTop: '8px' }}
                            >
                                Áp dụng cho tất cả các học sinh!
                            </Paragraph>
                        </div>
                        <Paragraph
                            style={{
                                marginTop: '20px',
                                fontStyle: 'italic',
                                color: '#888',
                            }}
                        >
                            Sự kiện kết thúc vào ngày:{' '}
                            {formatDateTime(event.end_time, DATE_TIME_FORMAT)}
                        </Paragraph>
                        <Button
                            type="primary"
                            size="large"
                            href={PATHS.COURSES}
                            onClick={() => setIsEventModalVisible(false)}
                            style={{
                                background: '#d9534f',
                                borderColor: '#d9534f',
                                marginTop: '20px',
                            }}
                        >
                            Khám phá khóa học ngay!
                        </Button>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default HomePage
