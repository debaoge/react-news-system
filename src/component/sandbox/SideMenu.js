import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, UngroupOutlined, TeamOutlined, ProductOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.css';
import axios from 'axios';

const { Sider } = Layout;

export default function SideMenu() {
    const [collapsed, setCollapsed] = useState(false);
    const [menu, setMenu] = useState([]);
    const navigate = useNavigate();

    const iconList = {
        "/home": <UserOutlined />,
        "/right-manage": <UngroupOutlined />,
        "/news-manage": <ProductOutlined />,
        "/user-manage": <TeamOutlined />,
        "/user-manage/list": <UngroupOutlined />,
        "/right-manage/role/list": <TeamOutlined />,
        "/right-manage/right/list": <ProductOutlined />
    }


    useEffect(() => {
        axios.get("http://localhost:8000/rights?_embed=children")
            .then(res => {
                const formattedMenu = res.data.map(item => ({
                    key: item.key,
                    label: item.title,
                    icon: iconList[item.key],
                    children: item.children?.length > 0 ?
                        item.children
                            .filter(child => child.pagepermisson === 1)
                            .map(child => ({
                                key: child.key,
                                label: child.title,
                                icon: iconList[item.key],
                            })) : undefined
                }));
                setMenu(formattedMenu);
            })
            .catch(error => {
                console.error('获取菜单数据失败：', error);
            });
    }, []);

    const handleMenuClick = ({ key }) => {
        navigate(key);
    };

    const location = useLocation()

    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div>
                <div className="logo">新闻发布系统</div>
                <div style={{ flex: 1, overflow: 'scroll' }}>
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={[location.pathname]} // 使用 selectedKeys 而不是 defaultSelectedKeys
                        items={menu}
                        onClick={handleMenuClick}
                    />
                </div>
            </div>
        </Sider>
    );
}