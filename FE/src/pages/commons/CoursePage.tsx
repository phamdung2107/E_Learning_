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

import '../styles/Course.css'

const { Title, Paragraph } = Typography
const { Search } = Input
const { Option } = Select

const CoursesPage: React.FC = () => {
    const [courses, setCourses] = useState<any[]>([])
    const [filteredCourses, setFilteredCourses] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [selectedInstructor, setSelectedInstructor] = useState<string>('all')
    const [searchKeyword, setSearchKeyword] = useState('')
    // const [selectedLevel, setSelectedLevel] = useState<string>("all")
    // const [selectedPrice, setSelectedPrice] = useState<string>("all")
    const [sortBy, setSortBy] = useState<string>('popular')
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize] = useState(12)

    // Mock data - in real app, this would come from API
    const mockCourses: any[] = [
        {
            id: 1,
            title: 'Complete Web Development Bootcamp 2024',
            description:
                'Learn HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and become a full-stack developer.',
            instructor: 'John Smith',
            category: 'Web Development',
            level: 'beginner',
            duration: '40h',
            rating: 4.8,
            students: 15420,
            price: 1990000,
            originalPrice: 2990000,
            image: '/placeholder.svg?height=200&width=300',
        },
        {
            id: 2,
            title: 'Digital Marketing Mastery Course',
            description:
                'Master SEO, social media marketing, Google Ads, email marketing, and analytics to grow any business online.',
            instructor: 'Sarah Johnson',
            category: 'Marketing',
            level: 'intermediate',
            duration: '25h',
            rating: 4.9,
            students: 12350,
            price: 1590000,
            originalPrice: 2290000,
            image: '/placeholder.svg?height=200&width=300',
        },
        {
            id: 3,
            title: 'UI/UX Design Fundamentals',
            description:
                'Learn design principles, user research, wireframing, prototyping, and create stunning user interfaces.',
            instructor: 'Mike Chen',
            category: 'Design',
            level: 'beginner',
            duration: '30h',
            rating: 4.7,
            students: 8920,
            price: 1790000,
            image: '/placeholder.svg?height=200&width=300',
        },
        {
            id: 4,
            title: 'Python for Data Science',
            description:
                'Master Python programming for data analysis, machine learning, and data visualization with real projects.',
            instructor: 'Dr. Emily Rodriguez',
            category: 'Data Science',
            level: 'intermediate',
            duration: '35h',
            rating: 4.6,
            students: 6780,
            price: 2190000,
            originalPrice: 2990000,
            image: '/placeholder.svg?height=200&width=300',
        },
        {
            id: 5,
            title: 'Mobile App Development with React Native',
            description:
                'Build cross-platform mobile apps for iOS and Android using React Native and JavaScript.',
            instructor: 'Alex Thompson',
            category: 'Mobile Development',
            level: 'advanced',
            duration: '45h',
            rating: 4.5,
            students: 4560,
            price: 2490000,
            image: '/placeholder.svg?height=200&width=300',
        },
        {
            id: 6,
            title: 'Introduction to Programming',
            description:
                'Perfect for beginners! Learn programming fundamentals with hands-on exercises and projects.',
            instructor: 'Lisa Wang',
            category: 'Programming',
            level: 'beginner',
            duration: '20h',
            rating: 4.8,
            students: 18900,
            isFree: true,
            price: 0,
            image: '/placeholder.svg?height=200&width=300',
        },
        {
            id: 7,
            title: 'Advanced JavaScript & ES6+',
            description:
                'Deep dive into modern JavaScript, async programming, modules, and advanced concepts for experienced developers.',
            instructor: 'David Kim',
            category: 'Web Development',
            level: 'advanced',
            duration: '28h',
            rating: 4.9,
            students: 7890,
            price: 1890000,
            image: '/placeholder.svg?height=200&width=300',
        },
        {
            id: 8,
            title: 'Graphic Design Masterclass',
            description:
                'Learn Adobe Photoshop, Illustrator, and InDesign. Create logos, posters, and brand identities.',
            instructor: 'Maria Garcia',
            category: 'Design',
            level: 'intermediate',
            duration: '32h',
            rating: 4.7,
            students: 9340,
            price: 1690000,
            originalPrice: 2190000,
            image: '/placeholder.svg?height=200&width=300',
        },
        {
            id: 9,
            title: 'Cloud Computing with AWS',
            description:
                'Master Amazon Web Services, deploy applications, and become AWS certified with hands-on labs.',
            instructor: 'Robert Johnson',
            category: 'Cloud Computing',
            level: 'intermediate',
            duration: '38h',
            rating: 4.6,
            students: 5670,
            price: 2290000,
            image: '/placeholder.svg?height=200&width=300',
        },
        {
            id: 10,
            title: 'Cybersecurity Fundamentals',
            description:
                'Learn ethical hacking, network security, and protect systems from cyber threats.',
            instructor: 'Jennifer Lee',
            category: 'Cybersecurity',
            level: 'beginner',
            duration: '26h',
            rating: 4.5,
            students: 4230,
            price: 1990000,
            image: '/placeholder.svg?height=200&width=300',
        },
        {
            id: 11,
            title: 'Business Analytics with Excel',
            description:
                'Master Excel for business analysis, create dashboards, and make data-driven decisions.',
            instructor: 'Michael Brown',
            category: 'Business',
            level: 'beginner',
            duration: '22h',
            rating: 4.4,
            students: 11200,
            isFree: true,
            price: 0,
            image: '/placeholder.svg?height=200&width=300',
        },
        {
            id: 12,
            title: 'Machine Learning A-Z',
            description:
                'Complete machine learning course covering algorithms, Python, R, and real-world applications.',
            instructor: 'Dr. Andrew Wilson',
            category: 'Data Science',
            level: 'advanced',
            duration: '42h',
            rating: 4.8,
            students: 8760,
            price: 2690000,
            originalPrice: 3490000,
            image: '/placeholder.svg?height=200&width=300',
        },
    ]

    useEffect(() => {
        // Simulate API call
        const loadCourses = async () => {
            setLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setCourses(mockCourses)
            setFilteredCourses(mockCourses)
            setLoading(false)
        }

        loadCourses()
    }, [])

    useEffect(() => {
        const filtered = courses.filter((course) => {
            const matchesSearch =
                course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                course.instructor
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())

            const matchesCategory =
                selectedCategory === 'all' ||
                course.category === selectedCategory
            return matchesSearch && matchesCategory
        })

        // Sort courses
        switch (sortBy) {
            case 'popular':
                filtered.sort((a, b) => b.students - a.students)
                break
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating)
                break
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price)
                break
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price)
                break
            case 'newest':
                filtered.sort((a, b) => b.id - a.id)
                break
            default:
                break
        }

        setFilteredCourses(filtered)
        setCurrentPage(1)
    }, [courses, searchTerm, selectedCategory, sortBy])

    const handleSearch = (value: string) => {
        setSearchTerm(value)
    }

    const handleClearFilters = () => {
        setSearchTerm('')
        setSelectedCategory('all')
        setSortBy('popular')
    }

    const handleEnroll = (courseId: number) => {
        console.log('Enrolling in course:', courseId)
        // Handle enrollment logic here
    }

    const categories = [
        {
            value: 'all',
            label: 'All Categories',
        },
        {
            value: 'Web Development',
            label: 'Web Development',
        },
        {
            value: 'Marketing',
            label: 'Marketing',
        },
        {
            value: 'Design',
            label: 'Design',
        },
        {
            value: 'Data Science',
            label: 'Data Science',
        },
        {
            value: 'Mobile Development',
            label: 'Mobile Development',
        },
    ]

    const paginatedCourses = filteredCourses.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )

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
                                        showSearch
                                        value={selectedCategory}
                                        onChange={setSelectedCategory}
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
                                        showSearch
                                        optionFilterProp="label"
                                        value={selectedInstructor}
                                        onChange={setSelectedInstructor}
                                        style={{ width: '100%' }}
                                        size="large"
                                    >
                                        <Option value="all">
                                            All Instructors
                                        </Option>
                                        <Option value="beginner">
                                            Beginner
                                        </Option>
                                        <Option value="intermediate">
                                            Intermediate
                                        </Option>
                                        <Option value="advanced">
                                            Advanced
                                        </Option>
                                    </Select>
                                </div>
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <div className="courses-filter-group">
                                    <label className="courses-filter-label">
                                        Keyword
                                    </label>
                                    <Input
                                        value={searchKeyword}
                                        onChange={(e) =>
                                            setSearchKeyword(e.target.value)
                                        }
                                        size="large"
                                        placeholder="Search by keyword"
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
                    {loading ? (
                        <div className="courses-loading">
                            <Spin
                                size="large"
                                className="courses-loading-spinner"
                            />
                            <Title
                                level={3}
                                style={{ marginTop: '20px', color: '#666' }}
                            >
                                Loading courses...
                            </Title>
                        </div>
                    ) : (
                        <>
                            {filteredCourses.length === 0 ? (
                                <div className="courses-empty">
                                    <BookOutlined className="courses-empty-icon" />
                                    <Title
                                        level={3}
                                        className="courses-empty-title"
                                    >
                                        No courses found
                                    </Title>
                                    <Paragraph className="courses-empty-description">
                                        Try adjusting your search criteria or
                                        browse our featured courses.
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
                                    <Row
                                        gutter={[24, 24]}
                                        className="courses-grid"
                                    >
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

                                    {filteredCourses.length > pageSize && (
                                        <div className="courses-pagination">
                                            <Pagination
                                                current={currentPage}
                                                total={filteredCourses.length}
                                                pageSize={pageSize}
                                                onChange={setCurrentPage}
                                                showSizeChanger={false}
                                                showQuickJumper
                                                showTotal={(total, range) =>
                                                    `${range[0]}-${range[1]} of ${total} courses`
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

export default CoursesPage
