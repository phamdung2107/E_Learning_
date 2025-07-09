import 'antd/dist/reset.css'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import '@/configs/dayjs.config'

import App from './App'
import './assets/css/base.css'
import store from './stores'

ReactDOM.render(
    // @ts-ignore
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
