import { Avatar, Dropdown } from 'antd'

import { UserOutlined } from '@ant-design/icons'

import './styles/Header.css'

const HeaderComponent = () => {
    const items = [
        {
            key: 'profile',
            label: <a href="/profile">Profile</a>,
        },
        {
            key: 'logout',
            label: (
                <a
                    onClick={() => {
                        console.log('logout')
                    }}
                >
                    Log out
                </a>
            ),
        },
    ]

    return (
        <div className="header-content">
            <Dropdown menu={{ items }} trigger={['click']}>
                <div className="user-info">
                    <Avatar icon={<UserOutlined />} />
                    <span className="username">{'Administrator'}</span>
                </div>
            </Dropdown>
        </div>
    )
}

export default HeaderComponent
