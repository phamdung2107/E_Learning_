'use client'

import type React from 'react'
import { useEffect, useState } from 'react'

import {
    Button,
    Card,
    Col,
    Empty,
    Input,
    Pagination,
    Row,
    Select,
    Spin,
    Typography,
} from 'antd'

import { SearchOutlined } from '@ant-design/icons'

import EnrollCourseCard from '@/components/core/card/EnrollCourseCard'
import CategoryService from '@/services/category'
import CourseService from '@/services/course'
import InstructorService from '@/services/instructor'

const { Title, Text } = Typography
const { Search } = Input

const StudentCourses: React.FC = () => {
    const [allEnrolledCourses, setAllEnrolledCourses] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])
    const [instructors, setInstructors] = useState<any[]>([])
    const [selectedCategory, setSelectedCategory] = useState<any>(null)
    const [selectedInstructor, setSelectedInstructor] = useState<any>(null)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize] = useState(4)

    const fetchEnrollCourses = async (params: any = {}) => {
        try {
            setLoading(true)

            // Build API parameters
            const apiParams: any = {}

            if (params.search && params.search.trim()) {
                apiParams.search = params.search.trim()
            }

            if (params.category_id) {
                apiParams.category_id = params.category_id
            }

            if (params.instructor_id) {
                apiParams.instructor_id = params.instructor_id
            }

            const response = await CourseService.getMyEnrolledCourses(apiParams)
            setAllEnrolledCourses(response.data)

            // Reset to page 1 when filters change
            if (params.resetPage !== false) {
                setCurrentPage(1)
            }
        } catch (e) {
            console.error(e)
            setAllEnrolledCourses([])
        } finally {
            setLoading(false)
        }
    }

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

    useEffect(() => {
        fetchEnrollCourses({})
        fetchCategories()
        fetchInstructors()
    }, [])

    // Handle category change - immediate API call
    const handleCategoryChange = (value: any) => {
        setSelectedCategory(value)
        fetchEnrollCourses({
            search: searchKeyword,
            category_id: value,
            instructor_id: selectedInstructor,
        })
    }

    // Handle instructor change - immediate API call
    const handleInstructorChange = (value: any) => {
        setSelectedInstructor(value)
        fetchEnrollCourses({
            search: searchKeyword,
            category_id: selectedCategory,
            instructor_id: value,
        })
    }

    // Handle search - only when button clicked or Enter pressed
    const handleSearch = (value: string) => {
        setSearchKeyword(value)
        fetchEnrollCourses({
            search: value,
            category_id: selectedCategory,
            instructor_id: selectedInstructor,
        })
    }

    // Handle clear filters
    const handleClearFilters = () => {
        setSelectedCategory(null)
        setSelectedInstructor(null)
        setSearchKeyword('')
        fetchEnrollCourses({})
    }

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        // Scroll to top of courses section
        const coursesSection = document.querySelector('.courses-section')
        if (coursesSection) {
            coursesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }
    }

    // Calculate paginated courses
    const paginatedCourses = allEnrolledCourses.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )

    return (
        <div>
            <Card style={{ marginBottom: '24px' }}>
                <Title level={2}>My Courses</Title>
                <Text type="secondary">
                    Manage and continue your enrolled courses
                </Text>
            </Card>

            {/* Filters */}
            <Card style={{ marginBottom: '24px' }}>
                <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} sm={8} md={6}>
                        <Text type="secondary">
                            Showing {paginatedCourses.length} of{' '}
                            {allEnrolledCourses.length} courses
                        </Text>
                    </Col>

                    <Col xs={24} sm={16} md={18}>
                        <Row gutter={[12, 12]} align="middle" justify="end">
                            <Col xs={24} sm={8} md={6}>
                                <Select
                                    placeholder="Choose a category..."
                                    showSearch
                                    allowClear
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                    optionFilterProp="label"
                                    options={categories}
                                    style={{ width: '100%' }}
                                    disabled={loading}
                                />
                            </Col>

                            <Col xs={24} sm={8} md={6}>
                                <Select
                                    placeholder="Choose an instructor..."
                                    showSearch
                                    allowClear
                                    optionFilterProp="label"
                                    value={selectedInstructor}
                                    onChange={handleInstructorChange}
                                    options={instructors}
                                    style={{ width: '100%' }}
                                    disabled={loading}
                                />
                            </Col>

                            <Col
                                xs={24}
                                sm={8}
                                md={8}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Search
                                    placeholder="Search courses..."
                                    allowClear
                                    enterButton={
                                        <SearchOutlined
                                            style={{ color: '#20B2AA' }}
                                        />
                                    }
                                    onSearch={handleSearch}
                                    style={{
                                        width: '100%',
                                        marginRight: '12px',
                                    }}
                                    disabled={loading}
                                />
                                <Button
                                    type="default"
                                    color="primary"
                                    onClick={handleClearFilters}
                                >
                                    Clear All
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>

            {/* Loading State */}
            {loading && (
                <Card>
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <Spin size="large" />
                        <div style={{ marginTop: '16px' }}>
                            <Text type="secondary">Loading courses...</Text>
                        </div>
                    </div>
                </Card>
            )}

            {/* Courses Grid */}
            {!loading && (
                <div className="courses-section">
                    {allEnrolledCourses.length === 0 ? (
                        <Card>
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description="No courses found"
                                style={{ padding: '40px' }}
                            />
                        </Card>
                    ) : (
                        <>
                            <Row
                                gutter={[24, 24]}
                                style={{ marginBottom: '32px' }}
                            >
                                {paginatedCourses.map((course) => (
                                    <Col
                                        xs={24}
                                        sm={12}
                                        lg={8}
                                        xl={6}
                                        key={course.id}
                                    >
                                        <EnrollCourseCard course={course} />
                                    </Col>
                                ))}
                            </Row>

                            {/* Pagination */}
                            {
                                <div
                                    style={{
                                        textAlign: 'center',
                                        padding: '16px 24px',
                                    }}
                                >
                                    <Pagination
                                        current={currentPage}
                                        total={allEnrolledCourses.length}
                                        pageSize={pageSize}
                                        onChange={handlePageChange}
                                        showSizeChanger={false}
                                        showQuickJumper
                                        showTotal={(total, range) =>
                                            `${range[0]}-${range[1]} of ${total} courses`
                                        }
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    />
                                </div>
                            }
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export default StudentCourses
