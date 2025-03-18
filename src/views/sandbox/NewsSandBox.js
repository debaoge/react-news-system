import React from 'react'
import SideMenu from '../../component/sandbox/SideMenu'
import TopHeader from '../../component/sandbox/TopHeader'
import { Outlet } from 'react-router-dom'
import { Layout, theme } from 'antd';
import './NewsSandBox.css'

export default function NewsSandBox() {

    const { Content } = Layout;
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ height: '100vh' }}>
            <SideMenu></SideMenu>
            <Layout className="site-layout" style={{ height: '100%' }}>
                <TopHeader></TopHeader>
                <Content className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        height: '100%',
                        overflow: 'auto'
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}
