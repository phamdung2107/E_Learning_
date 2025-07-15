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
        <Card hoverable>
            <Title level={4}>{certificate.course.title}</Title>
            <Text type="secondary">Issued on: {certificate.issue_date}</Text>

            <div style={{ marginTop: '12px' }}>
                <Space>
                    <Button
                        type="primary"
                        icon={<EyeOutlined />}
                        onClick={handleView}
                    >
                        View
                    </Button>

                    <Button
                        icon={<DownloadOutlined />}
                        onClick={handleDownload}
                    >
                        Download
                    </Button>
                </Space>
            </div>
        </Card>
    )
}

export default CertificateCard
