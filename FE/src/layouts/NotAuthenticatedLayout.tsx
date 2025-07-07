import { Layout } from 'antd'

import { Outlet } from 'react-router-dom'

const { Content } = Layout

const NotAuthenticatedLayout: React.FC = () => {
    return (
        <Layout
            style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f0f2f5',
            }}
        >
            <Content
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    padding: '24px',
                    background: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Outlet />
            </Content>
        </Layout>
    )
}

export default NotAuthenticatedLayout
