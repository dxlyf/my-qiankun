import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd'

import { Routes, Route, BrowserRouter, Link, NavLink, useOutlet, Outlet,useLocation, useNavigate } from 'react-router-dom'
import styles from './app.module.less'
import Home from './pages/home'
import { getActiveApps } from '@micro-zoe/micro-app'

const { Sider, Content } = Layout

const BasicLayout = () => {
    console.log('main BasicLayout')
    return <div>
        <h3>main BasicLayout</h3>
        <Outlet></Outlet>
    </div>
}
const AppLayoutWrapper = () => {
    console.log('AppLayoutWrapper')
    return <micro-app name='app1' url='http://localhost:8461/' baseroute='/app1'></micro-app>
}

const CustLink=(props:any)=>{
    let navigate=useNavigate()
    return <a onClick={()=>{
        const apps=getActiveApps().filter(name=>props.app==name)
        if(apps.length==0){
            navigate(props.to)
        }else{  
            window.history.pushState(null, '',props.to)
            // 主动触发一次popstate事件
            window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
        }
    }}>{props.children}</a>
}
const App = () => {
    return <BrowserRouter>
            <Layout className={styles.container}>
                <Sider>
                    <Menu>
                        <Menu.Item key="/home" ><Link to="/home">main home</Link></Menu.Item>
                        <Menu.Item key="/app1/home" ><CustLink to="/app1/home" app="app1">app1 home</CustLink></Menu.Item>
                        <Menu.Item key="/app1/home2" ><CustLink to="/app1/home2" app="app1">app1 home2</CustLink></Menu.Item>
                    </Menu>
                </Sider>
                <Content>
                    <h2>我是main应用:</h2>
                    <Routes>
                        <Route path="/" element={<BasicLayout></BasicLayout>}>
                             <Route index element={<Home></Home>}></Route>
                             <Route path="home" element={<Home></Home>}>
                            </Route>
                            <Route path="app1/*" element={<AppLayoutWrapper></AppLayoutWrapper>}>
                            </Route>
                        </Route>
                    </Routes>
                </Content>
            </Layout>
    </BrowserRouter>
}

export default App