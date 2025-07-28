'use client'

import type React from 'react'
import { useEffect, useState } from 'react'

import { Button, Col, Input, Pagination, Row, Spin, Typography } from 'antd'

import { CalendarOutlined, SearchOutlined } from '@ant-design/icons'

import EventCard from '@/components/core/card/EventCard'
import EventService from '@/services/event'

import '../styles/Event.css'

const { Title, Paragraph } = Typography
const { Search } = Input

const EventsPage: React.FC = () => {
    const [allEvents, setAllEvents] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchKeyword, setSearchKeyword] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize] = useState(8)

    const fetchEvents = async (keyword?: string) => {
        try {
            setLoading(true)
            const params: any = {}
            if (keyword && keyword.trim()) {
                params.keyword = keyword.trim()
            }

            const response = await EventService.getAll(params)
            setAllEvents(response.data)
        } catch (e) {
            console.error(e)
            setAllEvents([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    const handleSearch = (value: string) => {
        fetchEvents(value)
        setSearchKeyword(value)
        setCurrentPage(1) // Reset to first page when searching
    }

    const handleClearFilters = () => {
        setSearchTerm('')
        fetchEvents() // Fetch all events without keyword
        setCurrentPage(1)
    }

    const handleJoinEvent = (eventId: number) => {
        console.log('Joining event:', eventId)
        // Add join logic here
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        // Scroll to top of events section
        const eventsSection = document.querySelector('.events-main-section')
        if (eventsSection) {
            eventsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    // Client-side pagination
    const paginatedEvents = allEvents.slice(
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
                        Sự kiện & Hoạt động
                    </Title>
                    <Paragraph className="events-hero-description">
                        Khám phá các hội thảo, hoạt động và sự kiện để nâng cao
                        việc học và nhận nhiều phần thưởng hấp dẫn.
                    </Paragraph>
                    <div className="events-hero-search">
                        <Search
                            placeholder="Tìm kiếm theo từ khóa..."
                            allowClear
                            enterButton={
                                <Button
                                    type="primary"
                                    style={{
                                        background: '#ff6b6b',
                                        border: 'none',
                                    }}
                                    loading={loading}
                                >
                                    <SearchOutlined />
                                </Button>
                            }
                            size="large"
                            onSearch={handleSearch}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: '100%' }}
                            disabled={loading}
                        />
                    </div>
                </div>
            </section>

            {/* Main Section */}
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
                                    Hiển thị {paginatedEvents.length} /{' '}
                                    {allEvents.length} sự kiện
                                    {searchKeyword && (
                                        <span
                                            style={{
                                                color: '#ff6b6b',
                                                marginLeft: '8px',
                                            }}
                                        >
                                            cho "{searchTerm}"
                                        </span>
                                    )}
                                </div>
                                {searchTerm && (
                                    <Button
                                        type="link"
                                        onClick={handleClearFilters}
                                        style={{ color: '#ff6b6b' }}
                                    >
                                        Xóa tìm kiếm
                                    </Button>
                                )}
                            </div>

                            {allEvents.length === 0 ? (
                                <div className="events-empty">
                                    <CalendarOutlined className="events-empty-icon" />
                                    <Title
                                        level={3}
                                        className="events-empty-title"
                                    >
                                        Không tìm thấy sự kiện nào
                                    </Title>
                                    <Paragraph className="events-empty-description">
                                        {searchTerm
                                            ? `Không tìm thấy sự kiện nào cho "${searchTerm}". Vui lòng thử từ khóa khác.`
                                            : 'Hiện chưa có sự kiện nào. Vui lòng quay lại sau.'}
                                    </Paragraph>
                                    {searchTerm && (
                                        <Button
                                            type="primary"
                                            className="events-empty-btn"
                                            onClick={handleClearFilters}
                                        >
                                            Xóa tìm kiếm
                                        </Button>
                                    )}
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

                                    {allEvents.length > pageSize && (
                                        <div className="events-pagination">
                                            <Pagination
                                                current={currentPage}
                                                total={allEvents.length}
                                                pageSize={pageSize}
                                                onChange={handlePageChange}
                                                showSizeChanger={false}
                                                showQuickJumper
                                                showTotal={(total, range) =>
                                                    `${range[0]}-${range[1]} trong tổng ${total} sự kiện`
                                                }
                                                style={{
                                                    textAlign: 'center',
                                                    marginTop: '40px',
                                                    padding: '20px',
                                                    background: '#f8f9fa',
                                                    borderRadius: '12px',
                                                }}
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

export default EventsPage
