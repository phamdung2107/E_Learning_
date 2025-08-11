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
    TreeSelect,
    Typography,
} from 'antd'

import { BookOutlined, FilterOutlined, SearchOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

import CourseCard from '@/components/core/card/CourseCard'
import CategoryService from '@/services/category'
import CourseService from '@/services/course'
import InstructorService from '@/services/instructor'
import { convertCategoriesToTreeData } from '@/utils/convert'

import '../styles/Course.css'

const { Title, Paragraph } = Typography
const { Search } = Input

const CoursesPage: React.FC = () => {
    const navigate = useNavigate()
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
            const response = await CategoryService.getTree()
            setCategories(convertCategoriesToTreeData(response.data))
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
            setAllCourses(
                response.data.filter(
                    (course: any) => course.status === 'published'
                ) || []
            )
        } catch (e) {
            console.error(e)
            setAllCourses([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories()
        fetchInstructors()
        fetchCourses()
    }, [])

    useEffect(() => {
        fetchCourses({
            search: searchKeyword,
            category_id: selectedCategory,
            instructor_id: selectedInstructor,
        })
        setCurrentPage(1)
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
        fetchCourses({
            search: searchKeyword,
            category_id: selectedCategory,
            instructor_id: selectedInstructor,
        })
        setCurrentPage(1)
    }

    const handleEnroll = (courseId: number) => {
        navigate(`/courses/${courseId}`)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
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
        fetchCourses({
            search: searchKeyword,
            category_id: selectedCategory,
            instructor_id: selectedInstructor,
        })
        setCurrentPage(1)
    }

    const totalCourses = allCourses.length
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedCourses = allCourses.slice(startIndex, endIndex)
    const displayStart = totalCourses > 0 ? startIndex + 1 : 0
    const displayEnd = Math.min(endIndex, totalCourses)

    return (
        <div>
            <section className="courses-hero-section">
                <div className="courses-hero-floating-1" />
                <div className="courses-hero-floating-2" />
                <div className="courses-hero-content">
                    <Title level={1} className="courses-hero-title">
                        Khám phá các khóa học
                    </Title>
                    <Paragraph className="courses-hero-description">
                        Khám phá hàng ngàn khóa học được giảng dạy bởi các
                        chuyên gia trong ngành. Học kỹ năng mới, phát triển sự
                        nghiệp và chinh phục mục tiêu của bạn với nền tảng học
                        tập toàn diện.
                    </Paragraph>
                    <div className="courses-hero-search">
                        <Search
                            placeholder="Tìm kiếm khóa học, giảng viên hoặc chủ đề..."
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

            <section className="courses-filter-section">
                <div className="courses-filter-content">
                    <Card className="courses-filter-card">
                        <Title level={4} className="courses-filter-title">
                            <FilterOutlined style={{ marginRight: '8px' }} />
                            Lọc khóa học
                        </Title>
                        <Row gutter={[24, 16]}>
                            <Col xs={24} sm={12} md={6}>
                                <div className="courses-filter-group">
                                    <label className="courses-filter-label">
                                        Danh mục
                                    </label>
                                    <TreeSelect
                                        placeholder="Chọn danh mục..."
                                        allowClear
                                        showSearch
                                        treeDefaultExpandAll
                                        value={selectedCategory}
                                        onChange={handleCategoryChange}
                                        style={{ width: '100%' }}
                                        size="large"
                                        treeData={categories}
                                    />
                                </div>
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <div className="courses-filter-group">
                                    <label className="courses-filter-label">
                                        Giảng viên
                                    </label>
                                    <Select
                                        placeholder="Chọn giảng viên..."
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
                                        Từ khóa
                                    </label>
                                    <Input
                                        value={searchKeyword}
                                        onChange={handleKeywordChange}
                                        size="large"
                                        placeholder="Tìm kiếm theo từ khóa"
                                        onPressEnter={handleKeywordEnter}
                                    />
                                </div>
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <div className="courses-filter-group">
                                    <label className="courses-filter-label">
                                        Thao tác
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
                                                Tìm kiếm
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
                                                Xóa bộ lọc
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </section>

            <section className="courses-main-section">
                <div className="courses-main-content">
                    {!loading && totalCourses > 0 && (
                        <div className="courses-header">
                            <div className="courses-results-info">
                                Hiển thị {displayStart}-{displayEnd} trên tổng
                                số {totalCourses} khóa học
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
                                Đang tải khóa học...
                            </Title>
                        </div>
                    ) : totalCourses === 0 ? (
                        <div className="courses-empty">
                            <BookOutlined className="courses-empty-icon" />
                            <Title level={3} className="courses-empty-title">
                                Không tìm thấy khóa học nào
                            </Title>
                            <Paragraph className="courses-empty-description">
                                Hãy thử thay đổi tiêu chí tìm kiếm hoặc xem các
                                khóa học nổi bật của chúng tôi.
                            </Paragraph>
                            <Button
                                type="primary"
                                className="courses-empty-btn"
                                onClick={handleClearFilters}
                            >
                                Xóa bộ lọc
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
                                            `${range[0]}-${range[1]} trên tổng ${total} khóa học`
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
