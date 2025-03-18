import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { Button, Layout, theme, Dropdown, Avatar } from 'antd';

export default function TopHeader() {
  const { Header } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          Admin
        </a>
      ),
    },
    {
      key: '2',
      danger: true,
      label: 'Abmelden',
    },
  ];

  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
      <div style={{ float: 'right' }}>
        <span>欢迎 回来</span>
        <Dropdown menu={{ items }}>
          <Avatar size='small' icon={<UserOutlined />}></Avatar>
        </Dropdown>
      </div>
    </Header>
  )
}
