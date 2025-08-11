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
    TreeSelect,
    Typography,
} from 'antd'

import { SearchOutlined } from '@ant-design/icons'

import EnrollCourseCard from '@/components/core/card/EnrollCourseCard'
import CategoryService from '@/services/category'
import CourseService from '@/services/course'
import InstructorService from '@/services/instructor'
import { convertCategoriesToTreeData } from '@/utils/convert'

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

    useEffect(() => {
        fetchEnrollCourses({})
        fetchCategories()
        fetchInstructors()
    }, [])

    const handleCategoryChange = (value: any) => {
        setSelectedCategory(value)
        fetchEnrollCourses({
            search: searchKeyword,
            category_id: value,
            instructor_id: selectedInstructor,
        })
    }

    const handleInstructorChange = (value: any) => {
        setSelectedInstructor(value)
        fetchEnrollCourses({
            search: searchKeyword,
            category_id: selectedCategory,
            instructor_id: value,
        })
    }

    const handleSearch = (value: string) => {
        setSearchKeyword(value)
        fetchEnrollCourses({
            search: value,
            category_id: selectedCategory,
            instructor_id: selectedInstructor,
        })
    }

    const handleClearFilters = () => {
        setSelectedCategory(null)
        setSelectedInstructor(null)
        setSearchKeyword('')
        fetchEnrollCourses({})
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        const coursesSection = document.querySelector('.courses-section')
        if (coursesSection) {
            coursesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }
    }

    const paginatedCourses = allEnrolledCourses.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )

    return (
        <div>
            <Card style={{ marginBottom: '24px' }}>
                <Title level={2}>Khóa học của tôi</Title>
                <Text type="secondary">
                    Quản lý và tiếp tục các khóa học bạn đã đăng ký
                </Text>
            </Card>

            <Card style={{ marginBottom: '24px' }}>
                <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} sm={8} md={6}>
                        <Text type="secondary">
                            Hiển thị {paginatedCourses.length} /{' '}
                            {allEnrolledCourses.length} khóa học
                        </Text>
                    </Col>

                    <Col xs={24} sm={16} md={18}>
                        <Row gutter={[12, 12]} align="middle" justify="end">
                            <Col xs={24} sm={8} md={6}>
                                <TreeSelect
                                    placeholder="Chọn danh mục..."
                                    allowClear
                                    showSearch
                                    treeDefaultExpandAll
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                    style={{ width: '100%' }}
                                    treeData={categories}
                                    disabled={loading}
                                />
                            </Col>

                            <Col xs={24} sm={8} md={6}>
                                <Select
                                    placeholder="Chọn giảng viên..."
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
                                    placeholder="Tìm kiếm khóa học..."
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
                                    Xóa bộ lọc
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>

            {loading && (
                <Card>
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <Spin size="large" />
                        <div style={{ marginTop: '16px' }}>
                            <Text type="secondary">Đang tải khóa học...</Text>
                        </div>
                    </div>
                </Card>
            )}

            {!loading && (
                <div className="courses-section">
                    {allEnrolledCourses.length === 0 ? (
                        <Card>
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description="Không có khóa học nào"
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
                                            `${range[0]}-${range[1]} trên tổng ${total} khóa học`
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
