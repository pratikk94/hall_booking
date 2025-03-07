import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  CalendarOutlined,
  BookOutlined,
  ContactsOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState<string>('home');

  const menuItems: MenuProps['items'] = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: 'halls',
      icon: <BookOutlined />,
      label: 'Halls',
    },
    {
      key: 'bookings',
      icon: <CalendarOutlined />,
      label: 'My Bookings',
    },
    {
      key: 'contact',
      icon: <ContactsOutlined />,
      label: 'Contact',
    },
  ];

  const handleClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        paddingTop: 64, // Height of the header
      }}
    >
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[current]}
        items={menuItems}
        onClick={handleClick}
      />
    </Sider>
  );
};

export default Sidebar; 