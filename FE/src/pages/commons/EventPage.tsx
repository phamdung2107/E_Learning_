'use client'

import type React from 'react'
import { useEffect, useState } from 'react'

import {
    Button,
    Card,
    Col,
    Input,
    Pagination,
    Row,
    Select,
    Spin,
    Typography,
} from 'antd'

import {
    CalendarOutlined,
    FilterOutlined,
    SearchOutlined,
    SortAscendingOutlined,
} from '@ant-design/icons'

import EventCard from '@/components/core/card/EventCard'

import '../styles/Event.css'

const { Title, Paragraph } = Typography
const { Search } = Input
const { Option } = Select

const EventPage: React.FC = () => {
    const [events, setEvents] = useState<any[]>([])
    const [filteredEvents, setFilteredEvents] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedStatus, setSelectedStatus] = useState<string>('all')
    const [selectedBonus, setSelectedBonus] = useState<string>('all')
    const [sortBy, setSortBy] = useState<string>('newest')
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize] = useState(12)

    // Mock data based on the Laravel Event model
    const mockEvents = [
        {
            id: 1,
            name: 'Flash Sale Khóa Học - Giảm 70%',
            content:
                'Cơ hội vàng để sở hữu các khóa học chất lượng cao với mức giá ưu đãi nhất trong năm. Áp dụng cho tất cả khóa học Web Development, Design và Marketing.',
            bonus_percent: 15,
            start_time: '2024-01-15 09:00:00',
            end_time: '2024-01-20 23:59:59',
            status: 'active',
            image: '/placeholder.svg?height=200&width=300',
        },
        {
            id: 2,
            name: 'Webinar: Xu Hướng Công Nghệ 2024',
            content:
                'Tham gia cùng các chuyên gia hàng đầu để khám phá những xu hướng công nghệ mới nhất và cơ hội nghề nghiệp trong năm 2024.',
            bonus_percent: 0,
            start_time: '2024-01-25 19:00:00',
            end_time: '2024-01-25 21:00:00',
            status: 'upcoming',
            image: '/placeholder.svg?height=200&width=300',
        },
        {
            id: 3,
            name: 'Thử Thách Lập Trình 30 Ngày',
            content:
                'Thử thách bản thân với 30 ngày lập trình liên tục. Hoàn thành thử thách để nhận chứng chỉ và phần thưởng hấp dẫn.',
            bonus_percent: 25,
            start_time: '2024-02-01 00:00:00',
            end_time: '2024-03-01 23:59:59',
            status: 'upcoming',
            image: '/placeholder.svg?height=200&width=300',
        },
        {
            id: 4,
            name: 'Workshop: UI/UX Design Thực Chiến',
            content:
                'Workshop thực hành thiết kế UI/UX với các dự án thực tế. Học cách sử dụng Figma, Adobe XD và các công cụ thiết kế chuyên nghiệp.',
            bonus_percent: 10,
            start_time: '2024-01-10 14:00:00',
            end_time: '2024-01-12 18:00:00',
            status: 'ended',
            image: '/placeholder.svg?height=200&width=300',
        },
        {
            id: 5,
            name: 'Hackathon: Xây Dựng App Mobile',
            content:
                'Cuộc thi lập trình 48 giờ để xây dựng ứng dụng mobile sáng tạo. Giải thưởng lên đến 50 triệu đồng cho đội thắng cuộc.',
            bonus_percent: 20,
            start_time: '2024-02-15 18:00:00',
            end_time: '2024-02-17 18:00:00',
            status: 'upcoming',
            image: '/placeholder.svg?height=200&width=300',
        },
        {
            id: 6,
            name: 'Khóa Học Miễn Phí: Python Cơ Bản',
            content:
                'Khóa học Python hoàn toàn miễn phí dành cho người mới bắt đầu. Học từ cú pháp cơ bản đến xây dựng ứng dụng đầu tiên.',
            bonus_percent: 0,
            start_time: '2024-01-20 10:00:00',
            end_time: '2024-02-20 23:59:59',
            status: 'active',
            image: '/placeholder.svg?height=200&width=300',
        },
        {
            id: 7,
            name: 'Sự Kiện Tết: Học Vui - Quà Trao',
            content:
                'Chương trình đặc biệt mừng Tết Nguyên Đán với nhiều hoạt động thú vị và phần quà giá trị cho học viên tích cực.',
            bonus_percent: 30,
            start_time: '2024-02-08 00:00:00',
            end_time: '2024-02-18 23:59:59',
            status: 'upcoming',
            image: '/placeholder.svg?height=200&width=300',
        },
        {
            id: 8,
            name: 'Masterclass: Digital Marketing 2024',
            content:
                'Buổi học chuyên sâu về Digital Marketing với các chuyên gia từ Google, Facebook và các công ty hàng đầu.',
            bonus_percent: 5,
            start_time: '2024-01-30 20:00:00',
            end_time: '2024-01-30 22:30:00',
            status: 'upcoming',
            image: '/placeholder.svg?height=200&width=300',
        },
        {
            id: 9,
            name: 'Cuộc Thi Thiết Kế Logo',
            content:
                'Thể hiện tài năng thiết kế của bạn trong cuộc thi thiết kế logo cho startup. Giải nhất 20 triệu đồng.',
            bonus_percent: 0,
            start_time: '2024-01-05 00:00:00',
            end_time: '2024-01-15 23:59:59',
            status: 'ended',
            image: '/placeholder.svg?height=200&width=300',
        },
        {
            id: 10,
            name: 'Black Friday Sale - Giảm 80%',
            content:
                'Sự kiện sale lớn nhất trong năm với mức giảm giá lên đến 80% cho tất cả khóa học. Cơ hội không thể bỏ lỡ!',
            bonus_percent: 50,
            start_time: '2024-01-12 00:00:00',
            end_time: '2024-01-19 23:59:59',
            status: 'active',
            image: '/placeholder.svg?height=200&width=300',
        },
    ]

    useEffect(() => {
        // Simulate API call
        const loadEvents = async () => {
            setLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setEvents(mockEvents)
            setFilteredEvents(mockEvents)
            setLoading(false)
        }

        loadEvents()
    }, [])

    useEffect(() => {
        const getEventStatus = (event: any) => {
            const now = new Date().getTime()
            const startTime = new Date(event.start_time).getTime()
            const endTime = new Date(event.end_time).getTime()

            if (now < startTime) return 'upcoming'
            if (now >= startTime && now <= endTime) return 'active'
            return 'ended'
        }

        const filtered = events.filter((event) => {
            const matchesSearch =
                event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.content.toLowerCase().includes(searchTerm.toLowerCase())

            const eventStatus = getEventStatus(event)
            const matchesStatus =
                selectedStatus === 'all' || eventStatus === selectedStatus

            const matchesBonus =
                selectedBonus === 'all' ||
                (selectedBonus === 'with_bonus' && event.bonus_percent > 0) ||
                (selectedBonus === 'no_bonus' && event.bonus_percent === 0)

            return matchesSearch && matchesStatus && matchesBonus
        })

        // Sort events
        switch (sortBy) {
            case 'newest':
                filtered.sort(
                    (a, b) =>
                        new Date(b.start_time).getTime() -
                        new Date(a.start_time).getTime()
                )
                break
            case 'oldest':
                filtered.sort(
                    (a, b) =>
                        new Date(a.start_time).getTime() -
                        new Date(b.start_time).getTime()
                )
                break
            case 'bonus_high':
                filtered.sort((a, b) => b.bonus_percent - a.bonus_percent)
                break
            case 'bonus_low':
                filtered.sort((a, b) => a.bonus_percent - b.bonus_percent)
                break
            case 'ending_soon':
                filtered.sort(
                    (a, b) =>
                        new Date(a.end_time).getTime() -
                        new Date(b.end_time).getTime()
                )
                break
            default:
                break
        }

        setFilteredEvents(filtered)
        setCurrentPage(1)
    }, [events, searchTerm, selectedStatus, selectedBonus, sortBy])

    const handleSearch = (value: string) => {
        setSearchTerm(value)
    }

    const handleClearFilters = () => {
        setSearchTerm('')
        setSelectedStatus('all')
        setSelectedBonus('all')
        setSortBy('newest')
    }

    const handleJoinEvent = (eventId: number) => {
        console.log('Joining event:', eventId)
        // Handle join event logic here
    }

    const paginatedEvents = filteredEvents.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )

    return (
        <div>
            {/* Hero Section */}
            <section className="events-hero-section">
                <div className="events-hero-floating-1" />
                <div className="events-hero-floating-2" />

                <div className="events-hero-content">
                    <Title level={1} className="events-hero-title">
                        Events & Activities
                    </Title>
                    <Paragraph className="events-hero-description">
                        Join exciting learning events, in-depth workshops and
                        receive attractive rewards. Stay updated with the latest
                        activities from our learning community.
                    </Paragraph>
                    <div className="events-hero-search">
                        <Search
                            placeholder="Search events, workshops, competitions..."
                            allowClear
                            enterButton={
                                <Button
                                    type="primary"
                                    style={{
                                        background: '#ff6b6b',
                                        border: 'none',
                                    }}
                                >
                                    <SearchOutlined />
                                </Button>
                            }
                            size="large"
                            onSearch={handleSearch}
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="events-main-section">
                <div className="events-main-content">
                    {loading ? (
                        <div className="events-loading">
                            <Spin
                                size="large"
                                className="events-loading-spinner"
                            />
                            <Title
                                level={3}
                                style={{ marginTop: '20px', color: '#666' }}
                            >
                                Đang tải sự kiện...
                            </Title>
                        </div>
                    ) : (
                        <>
                            <div className="events-header">
                                <div className="events-results-info">
                                    Hiển thị {paginatedEvents.length} trong{' '}
                                    {filteredEvents.length} sự kiện
                                </div>
                            </div>

                            {filteredEvents.length === 0 ? (
                                <div className="events-empty">
                                    <CalendarOutlined className="events-empty-icon" />
                                    <Title
                                        level={3}
                                        className="events-empty-title"
                                    >
                                        Không tìm thấy sự kiện
                                    </Title>
                                    <Paragraph className="events-empty-description">
                                        Thử điều chỉnh bộ lọc hoặc tìm kiếm với
                                        từ khóa khác.
                                    </Paragraph>
                                    <Button
                                        type="primary"
                                        className="events-empty-btn"
                                        onClick={handleClearFilters}
                                    >
                                        Xóa bộ lọc
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <Row
                                        gutter={[24, 24]}
                                        className="events-grid"
                                    >
                                        {paginatedEvents.map((event) => (
                                            <Col
                                                xs={24}
                                                sm={12}
                                                lg={8}
                                                xl={6}
                                                key={event.id}
                                            >
                                                <EventCard
                                                    event={event}
                                                    onJoin={handleJoinEvent}
                                                />
                                            </Col>
                                        ))}
                                    </Row>

                                    {filteredEvents.length > pageSize && (
                                        <div className="events-pagination">
                                            <Pagination
                                                current={currentPage}
                                                total={filteredEvents.length}
                                                pageSize={pageSize}
                                                onChange={setCurrentPage}
                                                showSizeChanger={false}
                                                showQuickJumper
                                                showTotal={(total, range) =>
                                                    `${range[0]}-${range[1]} trong ${total} sự kiện`
                                                }
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    )
}

export default EventPage
