import React from 'react';
import { Layout, Menu, Button, Space } from 'antd';
import {
  HomeOutlined,
  CalendarOutlined,
  CheckSquareOutlined,
  UserOutlined,
  LogoutOutlined,
  BookOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import MyBookings from './MyBookings';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  approvedEvents: Array<{
    id: string;
    start: string;
    end: string;
    title: string;
    backgroundColor: string;
    extendedProps: {
      hall: string;
      organizer: string;
      status: string;
      department: string;
      mobileNumber: string;
      createdAt: string;
      requestId: string;
    };
  }>;
  onCancelBooking: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onCollapse, approvedEvents, onCancelBooking }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: '/calendar',
      icon: <CalendarOutlined />,
      label: 'Calendar',
    },
    {
      key: '/approvals',
      icon: <CheckSquareOutlined />,
      label: 'My Bookings',
    },
  ];

  const handleMenuClick = (key: string) => {
    navigate(key);
  };

  return (
    <Sider 
      trigger={null} 
      collapsible 
      collapsed={collapsed}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        background: '#fff',
        boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)',
      }}
    >
      <div style={{ padding: '16px', textAlign: 'center' }}>
        <h2 style={{ margin: 0, color: '#1890ff' }}>Hall Booking</h2>
      </div>
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => handleMenuClick(key)}
      />
      <div style={{ padding: '16px', borderTop: '1px solid #f0f0f0' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button 
            type="primary" 
            icon={<LogoutOutlined />} 
            block
            danger
          >
            Logout
          </Button>
        </Space>
      </div>
      {/* {!collapsed && (
        <div style={{ padding: '16px', borderTop: '1px solid #f0f0f0' }}>
          <h3 style={{ marginBottom: '16px' }}>My Bookings</h3>
          <MyBookings 
            approvedEvents={approvedEvents} 
            onCancelBooking={onCancelBooking}
          />
        </div>
      )} */}
    </Sider>
  );
};

export default Sidebar; 