import {render} from 'react-dom'
import App from './App'
import './global.less'
import microApp from '@micro-zoe/micro-app'
microApp.start()

render(<App />,document.getElementById('root'))


// if (module.hot) {
//     module.hot.accept(function() {
//       console.log('Accepting the updated printMe module!');
//     })
// }