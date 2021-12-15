import { render,unmountComponentAtNode } from 'react-dom'
import App from './App'
import './global.less'

if (window.__MICRO_APP_ENVIRONMENT__) {
    // eslint-disable-next-line
    __webpack_public_path__ = window.__MICRO_APP_PUBLIC_PATH__
}

export function mount() {
    render(<App />, document.getElementById("root"))
}

export function unmount() {
    unmountComponentAtNode(document.getElementById("root"))
}

// 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_ENVIRONMENT__) {
    window[`micro-app-${window.__MICRO_APP_NAME__}`] = { mount, unmount }
} else {
    // 非微前端环境直接渲染
    mount()
}
// if (module.hot) {
//     module.hot.accept(function() {
//       console.log('Accepting the updated printMe module!');
//     })
// }