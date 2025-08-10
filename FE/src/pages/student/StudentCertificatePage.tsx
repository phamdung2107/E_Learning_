'use client'

import type React from 'react'
import { useEffect, useState } from 'react'

import { Card, Col, Empty, Pagination, Row, Spin, Typography } from 'antd'

import { useSelector } from 'react-redux'

import CertificateCard from '@/components/core/card/CertificateCard'
import CertificateService from '@/services/certificate'

const { Title, Text } = Typography

const StudentCertificates: React.FC = () => {
    const user = useSelector((state: any) => state.auth.user)
    const userId = user.user ? user.user.id : user.id
    const [certificates, setCertificates] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize] = useState(8)

    const fetchCertificates = async () => {
        try {
            setLoading(true)
            const response = await CertificateService.getAll({
                user: Number(userId),
            })
            if (response.status === 200) {
                setCertificates(response.data)
            }
        } catch (e) {
            console.error(e)
            setCertificates([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCertificates()
    }, [])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        const section = document.querySelector('.certificates-section')
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    const paginatedCertificates = certificates.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )

    return (
        <div>
            <Card style={{ marginBottom: '24px' }}>
                <Title level={2}>Chứng chỉ của tôi</Title>
                <Text type="secondary">
                    Xem và tải về các chứng chỉ bạn đã nhận được
                </Text>
            </Card>

            {loading ? (
                <Card>
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <Spin size="large" />
                        <div style={{ marginTop: '16px' }}>
                            <Text type="secondary">Đang tải chứng chỉ...</Text>
                        </div>
                    </div>
                </Card>
            ) : (
                <div className="certificates-section">
                    {certificates.length === 0 ? (
                        <Card>
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description="Không có chứng chỉ nào"
                                style={{ padding: '40px' }}
                            />
                        </Card>
                    ) : (
                        <>
                            <Row
                                gutter={[24, 24]}
                                style={{ marginBottom: '32px' }}
                            >
                                {paginatedCertificates.map((cert) => (
                                    <Col
                                        xs={24}
                                        sm={12}
                                        lg={8}
                                        xl={6}
                                        key={cert.id}
                                    >
                                        <CertificateCard certificate={cert} />
                                    </Col>
                                ))}
                            </Row>

                            <div
                                style={{
                                    textAlign: 'center',
                                    padding: '16px 24px',
                                }}
                            >
                                <Pagination
                                    current={currentPage}
                                    total={certificates.length}
                                    pageSize={pageSize}
                                    onChange={handlePageChange}
                                    showSizeChanger={false}
                                    showQuickJumper
                                    showTotal={(total, range) =>
                                        `${range[0]}-${range[1]} trên tổng ${total} chứng chỉ`
                                    }
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                />
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export default StudentCertificates
