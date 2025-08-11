import React from 'react'

import { Button, Card, Space, Typography } from 'antd'

import { DownloadOutlined, EyeOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

const CertificateCard = ({ certificate }: { certificate: any }) => {
    const handleDownload = () => {
        window.open(certificate.certificate_url, '_blank')
    }

    const handleView = () => {
        window.open(certificate.certificate_url, '_blank')
    }

    return (
        <Card
            hoverable
            style={{
                borderRadius: 12,
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                textAlign: 'center',
            }}
            styles={{ body: { padding: '0 0 16px 0' } }}
        >
            <div
                style={{
                    width: '100%',
                    background: 'white',
                    border: '10px solid #d4af37',
                    padding: '20px',
                    boxSizing: 'border-box',
                    fontFamily: "'Segoe UI', sans-serif",
                    backgroundImage:
                        'linear-gradient(to bottom right, #fff 80%, rgba(0,0,0,0.02))',
                }}
            >
                <h1 style={{ textAlign: 'center', fontSize: 24, margin: 0 }}>
                    CHỨNG CHỈ
                </h1>
                <p
                    style={{
                        textAlign: 'center',
                        fontSize: 16,
                        margin: '4px 0',
                        fontWeight: '600',
                    }}
                >
                    MONA EDU
                </p>
                <p
                    style={{
                        textAlign: 'center',
                        fontSize: 14,
                        margin: '4px 0',
                        fontWeight: '500',
                    }}
                >
                    HÂN HẠNH TRAO TẶNG
                </p>

                <h2
                    style={{
                        textAlign: 'center',
                        fontSize: 22,
                        margin: '12px 0',
                        fontFamily: "'Brush Script MT', cursive",
                        fontWeight: 'normal',
                    }}
                >
                    {certificate.student_name}
                </h2>

                <p
                    style={{
                        textAlign: 'center',
                        fontSize: 14,
                        margin: '4px 0',
                        fontWeight: '600',
                    }}
                >
                    HOÀN THÀNH KHÓA HỌC {certificate.course.title.toUpperCase()}
                </p>

                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <div
                        style={{
                            display: 'inline-block',
                            background: '#fff',
                            borderRadius: '50%',
                            padding: '10px',
                            border: '3px solid gold',
                        }}
                    >
                        <div
                            style={{
                                width: '60px',
                                height: '60px',
                                background: '#0d47a1',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '14px',
                            }}
                        >
                            MONA
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontWeight: '600',
                        fontSize: '14px',
                        marginTop: '16px',
                    }}
                >
                    <span>MONA Games</span>
                    <span>MONA Education</span>
                </div>

                {certificate.issue_date && (
                    <Text
                        type="secondary"
                        style={{
                            display: 'block',
                            marginTop: '8px',
                            fontSize: '12px',
                        }}
                    >
                        Cấp ngày: {certificate.issue_date}
                    </Text>
                )}
            </div>

            <div style={{ marginTop: '16px' }}>
                <Space>
                    <Button
                        type="primary"
                        icon={<EyeOutlined />}
                        onClick={handleView}
                    >
                        Xem PDF
                    </Button>

                    <Button
                        icon={<DownloadOutlined />}
                        onClick={handleDownload}
                    >
                        Tải xuống
                    </Button>
                </Space>
            </div>
        </Card>
    )
}

export default CertificateCard
