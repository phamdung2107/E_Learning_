import React from 'react'

import { Layout } from 'antd'

const SIDEBAR_WIDTH = 370
const HEADER_HEIGHT = 64

const LessonQuizDetailLayout = ({ header, sidebar, children, footer }: any) => {
    return (
        <div style={{ minHeight: '100vh', background: '#fff' }}>
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    height: HEADER_HEIGHT,
                    background: '#fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div style={{ width: '100%', margin: '0 auto', padding: '0' }}>
                    {header}
                </div>
            </div>
            <div
                style={{
                    position: 'fixed',
                    top: HEADER_HEIGHT,
                    right: 0,
                    width: SIDEBAR_WIDTH,
                    height: `calc(100vh - ${HEADER_HEIGHT}px)`,
                    background: '#fff',
                    borderLeft: '1px solid #f0f0f0',
                    boxShadow: '0 0 8px #00000010',
                    zIndex: 100,
                    overflowY: 'auto',
                    padding: 0,
                }}
            >
                {sidebar}
            </div>
            <div
                style={{
                    marginTop: HEADER_HEIGHT,
                    marginRight: SIDEBAR_WIDTH,
                    minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
                    background: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        margin: '0 auto',
                        padding: '0 0 64px 0',
                        flex: 1,
                        minHeight: 0,
                    }}
                >
                    {children}
                </div>
            </div>
            <div
                style={{
                    position: 'fixed',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1200,
                    background: '#fff',
                    borderTop: '1px solid #f0f0f0',
                    boxShadow: '0 -2px 8px rgba(0,0,0,0.04)',
                    padding: '16px 0',
                }}
            >
                {footer}
            </div>
        </div>
    )
}

export default LessonQuizDetailLayout
