import React from 'react'

import { Menu, Tooltip } from 'antd'

import { AppstoreOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

import { PATHS } from '@/routers/path'

interface NavBarProps {
    collapsed: boolean
}

const NavBar: React.FC<NavBarProps> = ({ collapsed }) => {
    const navigate = useNavigate()
    const location = useLocation()

    const items = [
        {
            key: PATHS.HOME,
            icon: <AppstoreOutlined />,
            label: collapsed ? (
                <Tooltip>
                    <span>Trang chủ</span>
                </Tooltip>
            ) : (
                'Trang chủ'
            ),
        },
    ]

    return (
        <Menu
            mode="vertical"
            selectedKeys={[location.pathname]}
            style={{
                borderRight: 0,
                maxHeight: 'calc(100vh - 64px)',
                transition: 'all 0.3s ease',
            }}
            onClick={({ key }) => navigate(key)}
            items={items}
        />
    )
}

export default NavBar
