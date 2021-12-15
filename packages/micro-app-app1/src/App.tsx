
import {BrowserRouter,Route,Routes,Outlet,useLocation,useNavigate} from 'react-router-dom'
import React,{useEffect} from 'react'
import {Layout,Menu} from 'antd'
import styles from './app.module.less'
import Home from './pages/home'
import Home2 from './pages/home2'

const {Sider,Content}=Layout
console.log('window.__MICRO_APP_BASE_ROUTE__ ',window.__MICRO_APP_BASE_ROUTE__ )

const BasicLayout=()=>{


    useEffect(() => {

    }, [])

    console.log('app1 BasicLayout render')
    return <div>
        <h3>app1 BasicLayout</h3>
        <Outlet></Outlet>
    </div>
}
const App=()=>{
    return <BrowserRouter  basename={window.__MICRO_APP_BASE_ROUTE__ || '/'} >
    <Layout className={styles.container}>
        <Content>
            <h2> 我的App1-我的路由信息会显示在下面:</h2>
            <Routes>
                <Route path="/" element={<BasicLayout></BasicLayout>}>
                    <Route path="home" element={<Home></Home>}></Route>
                    <Route path="home2" element={<Home2></Home2>}></Route>
                </Route>
            </Routes>
        </Content>
    </Layout>
</BrowserRouter>
}

export default App