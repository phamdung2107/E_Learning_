import React from 'react'

import { Button, Result } from 'antd'

import { useNavigate } from 'react-router-dom'

const NotFound: React.FC = () => {
    const navigate = useNavigate()

    return (
        <Result
            status="404"
            title="404"
            subTitle={'Sorry, the page you visited does not exist.\n'}
            extra={
                <Button type="primary" onClick={() => navigate('/')}>
                    {'Turn Back Home'}
                </Button>
            }
        ></Result>
    )
}

export default NotFound
