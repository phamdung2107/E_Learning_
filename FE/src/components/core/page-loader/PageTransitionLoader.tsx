import React, { useEffect, useState } from 'react'

import { Spin } from 'antd'

import { useLocation } from 'react-router-dom'

const PageTransitionLoader = () => {
    const location = useLocation()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        const timeout = setTimeout(() => {
            setLoading(false)
        }, 500)

        return () => clearTimeout(timeout)
    }, [location.pathname])

    if (!loading) return null

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(255,255,255,0.7)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
            }}
        >
            <Spin size="large" fullscreen={true} tip="Loading..." />
        </div>
    )
}

export default PageTransitionLoader
