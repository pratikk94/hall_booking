import React from 'react';
import { Layout, Space, Button, Badge, Avatar, Dropdown } from 'antd';
import {
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Header } = Layout;

const Navbar: React.FC = () => {
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
    },
  ];

  return (
    <Header style={{ 
      position: 'fixed', 
      zIndex: 1, 
      width: '100%', 
      padding: '0 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: '#001529'
    }}>
      <div style={{ 
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#fff'
      }}>
        Hall Booking
      </div>

      <Space size="large">
        <Badge count={5}>
          <Button type="text" icon={<BellOutlined style={{ fontSize: '20px', color: '#fff' }} />} />
        </Badge>
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer', backgroundColor: '#1677ff' }} />
        </Dropdown>
      </Space>
    </Header>
  );
};

export default Navbar; 