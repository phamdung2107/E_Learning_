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

import { BookOutlined, FilterOutlined, SearchOutlined } from '@ant-design/icons'

import CourseCard from '@/components/core/card/CourseCard'
import CategoryService from '@/services/category'
import CourseService from '@/services/course'
import InstructorService from '@/services/instructor'

import '../styles/Course.css'

const { Title, Paragraph } = Typography
const { Search } = Input

const CoursesPage: React.FC = () => {
    const [allCourses, setAllCourses] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])
    const [instructors, setInstructors] = useState<any[]>([])
    const [selectedCategory, setSelectedCategory] = useState<any>(null)
    const [selectedInstructor, setSelectedInstructor] = useState<any>(null)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize] = useState(8)
    const [loading, setLoading] = useState(false)

    const fetchCategories = async () => {
        try {
            const response = await CategoryService.getAll({})
            setCategories(
                response.data.map((category: any) => ({
                    value: category.id,
                    label: category.name,
                }))
            )
        } catch (e) {
            console.error(e)
        }
    }

    const fetchInstructors = async () => {
        try {
            const response = await InstructorService.getAll({})
            setInstructors(
                response.data.map((instructor: any) => ({
                    value: instructor.id,
                    label: instructor.user.full_name,
                }))
            )
        } catch (e) {
            console.error(e)
        }
    }

    const fetchCourses = async (filters: any = {}) => {
        try {
            setLoading(true)

            const apiFilters: any = {}

            if (filters.search || searchKeyword) {
                apiFilters.search = filters.search || searchKeyword
            }

            if (filters.category_id || selectedCategory) {
                apiFilters.category_id = filters.category_id || selectedCategory
            }

            if (filters.instructor_id || selectedInstructor) {
                apiFilters.instructor_id =
                    filters.instructor_id || selectedInstructor
            }

            const response = await CourseService.getAll(apiFilters)
            setAllCourses(response.data.filter((course: any) => course.status === 'published') || [])
        } catch (e) {
            console.error(e)
            setAllCourses([])
        } finally {
            setLoading(false)
        }
    }

    // Initial load
    useEffect(() => {
        fetchCategories()
        fetchInstructors()
        fetchCourses()
    }, [])

    // Fetch courses when filters change (not page)
    useEffect(() => {
        fetchCourses({
            search: searchKeyword,
            category_id: selectedCategory,
            instructor_id: selectedInstructor,
        })
        setCurrentPage(1) // Reset to first page when filters change
    }, [searchKeyword, selectedCategory, selectedInstructor])

    const handleSearch = (value: string) => {
        setSearchKeyword(value)
    }

    const handleClearFilters = () => {
        setSelectedCategory(null)
        setSelectedInstructor(null)
        setSearchKeyword('')
        setCurrentPage(1)
    }

    const handleSearchClick = () => {
        // Trigger search with current filters
        fetchCourses({
            search: searchKeyword,
            category_id: selectedCategory,
            instructor_id: selectedInstructor,
        })
        setCurrentPage(1)
    }

    const handleEnroll = (courseId: number) => {
        console.log('Enrolling in course:', courseId)
        // Handle enrollment logic here
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        // Scroll to top of courses section
        document.querySelector('.courses-main-section')?.scrollIntoView({
            behavior: 'smooth',
        })
    }

    const handleCategoryChange = (value: any) => {
        setSelectedCategory(value)
    }

    const handleInstructorChange = (value: any) => {
        setSelectedInstructor(value)
    }

    const handleKeywordChange = (e: any) => {
        setSearchKeyword(e.target.value)
    }

    const handleKeywordEnter = () => {
        // Trigger search on Enter
        fetchCourses({
            search: searchKeyword,
            category_id: selectedCategory,
            instructor_id: selectedInstructor,
        })
        setCurrentPage(1)
    }

    // Calculate pagination for UI
    const totalCourses = allCourses.length
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedCourses = allCourses.slice(startIndex, endIndex)

    // Calculate display range for results info
    const displayStart = totalCourses > 0 ? startIndex + 1 : 0
    const displayEnd = Math.min(endIndex, totalCourses)

    return (
        <div>
            {/* Hero Section */}
            <section className="courses-hero-section">
                <div className="courses-hero-floating-1" />
                <div className="courses-hero-floating-2" />
                <div className="courses-hero-content">
                    <Title level={1} className="courses-hero-title">
                        Explore Our Courses
                    </Title>
                    <Paragraph className="courses-hero-description">
                        Discover thousands of courses taught by industry
                        experts. Learn new skills, advance your career, and
                        achieve your goals with our comprehensive learning
                        platform.
                    </Paragraph>
                    <div className="courses-hero-search">
                        <Search
                            placeholder="Search for courses, instructors, or topics..."
                            allowClear
                            enterButton={
                                <Button
                                    type="primary"
                                    style={{
                                        background: '#20B2AA',
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

            {/* Filter Section */}
            <section className="courses-filter-section">
                <div className="courses-filter-content">
                    <Card className="courses-filter-card">
                        <Title level={4} className="courses-filter-title">
                            <FilterOutlined style={{ marginRight: '8px' }} />
                            Filter Courses
                        </Title>
                        <Row gutter={[24, 16]}>
                            <Col xs={24} sm={12} md={6}>
                                <div className="courses-filter-group">
                                    <label className="courses-filter-label">
                                        Category
                                    </label>
                                    <Select
                                        placeholder="Choose a category..."
                                        showSearch
                                        allowClear
                                        value={selectedCategory}
                                        onChange={handleCategoryChange}
                                        style={{ width: '100%' }}
                                        size="large"
                                        optionFilterProp="label"
                                        options={categories}
                                    />
                                </div>
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <div className="courses-filter-group">
                                    <label className="courses-filter-label">
                                        Instructor
                                    </label>
                                    <Select
                                        placeholder="Choose an instructor..."
                                        showSearch
                                        allowClear
                                        optionFilterProp="label"
                                        value={selectedInstructor}
                                        onChange={handleInstructorChange}
                                        style={{ width: '100%' }}
                                        size="large"
                                        options={instructors}
                                    />
                                </div>
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <div className="courses-filter-group">
                                    <label className="courses-filter-label">
                                        Keyword
                                    </label>
                                    <Input
                                        value={searchKeyword}
                                        onChange={handleKeywordChange}
                                        size="large"
                                        placeholder="Search by keyword"
                                        onPressEnter={handleKeywordEnter}
                                    />
                                </div>
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <div className="courses-filter-group">
                                    <label className="courses-filter-label">
                                        Actions
                                    </label>
                                    <Row
                                        gutter={[16, 16]}
                                        justify="space-between"
                                    >
                                        <Col span={12}>
                                            <Button
                                                className="courses-search-btn"
                                                size="large"
                                                icon={<SearchOutlined />}
                                                onClick={handleSearchClick}
                                                loading={loading}
                                            >
                                                Search
                                            </Button>
                                        </Col>
                                        <Col span={12}>
                                            <Button
                                                className="courses-clear-btn"
                                                size="large"
                                                block
                                                onClick={handleClearFilters}
                                                disabled={loading}
                                            >
                                                Clear Filters
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </section>

            {/* Main Content */}
            <section className="courses-main-section">
                <div className="courses-main-content">
                    {/* Results Info */}
                    {!loading && totalCourses > 0 && (
                        <div className="courses-header">
                            <div className="courses-results-info">
                                Showing {displayStart}-{displayEnd} of{' '}
                                {totalCourses} courses
                            </div>
                        </div>
                    )}

                    {loading ? (
                        <div className="courses-loading">
                            <Spin
                                size="large"
                                className="courses-loading-spinner"
                            />
                            <Title
                                level={3}
                                style={{
                                    marginTop: '20px',
                                    color: '#666',
                                    textAlign: 'center',
                                }}
                            >
                                Loading courses...
                            </Title>
                        </div>
                    ) : totalCourses === 0 ? (
                        <div className="courses-empty">
                            <BookOutlined className="courses-empty-icon" />
                            <Title level={3} className="courses-empty-title">
                                No courses found
                            </Title>
                            <Paragraph className="courses-empty-description">
                                Try adjusting your search criteria or browse our
                                featured courses.
                            </Paragraph>
                            <Button
                                type="primary"
                                className="courses-empty-btn"
                                onClick={handleClearFilters}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    ) : (
                        <>
                            <Row gutter={[24, 24]} className="courses-grid">
                                {paginatedCourses.map((course: any) => (
                                    <Col
                                        xs={24}
                                        sm={12}
                                        lg={8}
                                        xl={6}
                                        key={course.id}
                                    >
                                        <CourseCard
                                            course={course}
                                            onEnroll={handleEnroll}
                                        />
                                    </Col>
                                ))}
                            </Row>

                            {/* Pagination */}
                            {totalCourses > pageSize && (
                                <div className="courses-pagination">
                                    <Pagination
                                        current={currentPage}
                                        total={totalCourses}
                                        pageSize={pageSize}
                                        onChange={handlePageChange}
                                        showSizeChanger={false}
                                        showQuickJumper
                                        showTotal={(total, range) =>
                                            `${range[0]}-${range[1]} of ${total} courses`
                                        }
                                        style={{
                                            textAlign: 'center',
                                            marginTop: '40px',
                                            padding: '20px 0',
                                        }}
                                        disabled={loading}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    )
}

export default CoursesPage
