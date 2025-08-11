'use client'

import type React from 'react'

import { Breadcrumb, Typography } from 'antd'

import { HomeOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Title } = Typography

interface BreadcrumbSectionProps {
    title: string
    breadcrumbItems: Array<{
        title: string
        href?: string
    }>
}

const BreadcrumbSection: React.FC<BreadcrumbSectionProps> = ({
    title,
    breadcrumbItems,
}) => {
    return (
        <div className="breadcrumb-wrapper">
            <div
                style={{
                    position: 'relative',
                    background:
                        'linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%)',
                    minHeight: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `
              radial-gradient(circle at 20% 80%, rgba(66, 133, 244, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(66, 133, 244, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
            `,
                    }}
                />

                <div
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '50px',
                        width: '300px',
                        height: '100px',
                        background:
                            'linear-gradient(45deg, rgba(66, 133, 244, 0.2), transparent)',
                        borderRadius: '50px',
                        transform: 'rotate(-15deg)',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        right: '50px',
                        width: '200px',
                        height: '80px',
                        background:
                            'linear-gradient(-45deg, rgba(66, 133, 244, 0.2), transparent)',
                        borderRadius: '40px',
                        transform: 'rotate(15deg)',
                    }}
                />

                <div
                    style={{
                        position: 'absolute',
                        top: '30px',
                        right: '100px',
                        width: '80px',
                        height: '80px',
                        backgroundImage: `
              radial-gradient(circle, rgba(255, 255, 255, 0.3) 2px, transparent 2px)
            `,
                        backgroundSize: '15px 15px',
                    }}
                />

                <div
                    style={{
                        position: 'absolute',
                        top: '50px',
                        left: '30px',
                        color: 'rgba(255, 255, 255, 0.4)',
                        fontSize: '24px',
                    }}
                >
                    <div
                        style={{
                            transform: 'rotate(45deg)',
                            marginBottom: '10px',
                        }}
                    >
                        ▲
                    </div>
                    <div style={{ transform: 'rotate(45deg)' }}>▲</div>
                </div>

                <div
                    style={{
                        textAlign: 'center',
                        zIndex: 2,
                        position: 'relative',
                    }}
                >
                    <Title
                        level={1}
                        style={{
                            color: 'white',
                            fontSize: '48px',
                            fontWeight: 'bold',
                            margin: '0 0 20px 0',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        }}
                    >
                        {title}
                    </Title>

                    <Breadcrumb
                        style={{
                            justifyContent: 'center',
                            display: 'flex',
                        }}
                        separator={
                            <span
                                style={{
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    margin: '0 8px',
                                }}
                            >
                                →
                            </span>
                        }
                    >
                        {breadcrumbItems.map((item, index) => (
                            <Breadcrumb.Item key={index}>
                                {index === 0 && (
                                    <HomeOutlined
                                        style={{
                                            marginRight: '4px',
                                            color: 'white',
                                        }}
                                    />
                                )}
                                {item.href ? (
                                    <Link
                                        to={item.href}
                                        style={{
                                            color: 'rgba(255, 255, 255, 0.9)',
                                            textDecoration: 'none',
                                            fontSize: '16px',
                                        }}
                                    >
                                        {item.title}
                                    </Link>
                                ) : (
                                    <span
                                        style={{
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            fontSize: '16px',
                                        }}
                                    >
                                        {item.title}
                                    </span>
                                )}
                            </Breadcrumb.Item>
                        ))}
                    </Breadcrumb>
                </div>
            </div>
        </div>
    )
}

export default BreadcrumbSection
