import React, { useState } from 'react';
import { Layout, Menu, Button, Space, Modal } from 'antd';
import {
  HomeOutlined,
  CheckSquareOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FileTextOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

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
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onCollapse,
  // approvedEvents, 
  // onCancelBooking,
  //  currentUser 
  }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [rulesModalVisible, setRulesModalVisible] = useState(false);

  const showRulesModal = () => {
    setRulesModalVisible(true);
  };

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: '/approvals',
      icon: <CheckSquareOutlined />,
      label: 'My Bookings',
    },
    {
      key: '/users',
      icon: <UserOutlined />,
      label: 'User Management',
    },
    {
      key: 'rules',
      icon: <FileTextOutlined />,
      label: 'Rules & Regulations',
      onClick: showRulesModal,
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key !== 'rules') {
      navigate(key);
    }
  };

  return (
    <>
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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <div style={{ 
            padding: '16px', 
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Button 
              type="text" 
              onClick={() => onCollapse(!collapsed)}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />
            {!collapsed && (
              <h2 style={{ margin: 0, color: '#1890ff' }}>Hall Booking</h2>
            )}
          </div>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={handleMenuClick}
          />
        </div>
        <div style={{ padding: '16px', borderTop: '1px solid #f0f0f0' }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button 
              type="primary" 
              icon={<LogoutOutlined />} 
              block
              danger
            />
          </Space>
        </div>
      </Sider>

      <Modal
        title="Rules & Regulations"
        open={rulesModalVisible}
        onCancel={() => setRulesModalVisible(false)}
        footer={[
          <Button key="close" type="primary" onClick={() => setRulesModalVisible(false)}>
            Close
          </Button>
        ]}
        width={700}
      >
        <div style={{ maxHeight: '60vh', overflow: 'auto' }}>
          <h3>General Rules</h3>
          <ol>
            <li>Bookings must be made at least 24 hours in advance.</li>
            <li>Maximum duration for a single booking is 4 hours unless special permission is granted.</li>
            <li>Cancellations should be made at least 12 hours before the scheduled time.</li>
            <li>The room must be left clean and in its original condition after use.</li>
          </ol>

          <h3>Booking Process</h3>
          <ol>
            <li>Select the desired venue and time slot from the calendar.</li>
            <li>Fill in all required details in the booking form.</li>
            <li>Submit the request and wait for approval from the admin.</li>
            <li>You will receive a notification once your booking is approved or rejected.</li>
          </ol>

          <h3>Venue-specific Rules</h3>
          <h4>Conference Rooms</h4>
          <ul>
            <li>Maximum capacity: 20 people</li>
            <li>Available equipment: Projector, whiteboard, video conferencing system</li>
            <li>Food and beverages are not allowed</li>
          </ul>

          <h4>Auditorium</h4>
          <ul>
            <li>Maximum capacity: 200 people</li>
            <li>Technical support must be requested in advance</li>
            <li>Special permission required for events longer than 4 hours</li>
          </ul>

          <h4>Training Rooms</h4>
          <ul>
            <li>Maximum capacity: 30 people</li>
            <li>Computers and equipment must be shut down after use</li>
            <li>Report any technical issues immediately</li>
          </ul>

          <h3>Important Notes</h3>
          <ul>
            <li>All bookings are subject to approval by the administration.</li>
            <li>Repeated no-shows may result in booking privileges being suspended.</li>
            <li>Any damage to equipment or facilities must be reported immediately.</li>
            <li>Emergency exits and fire safety procedures must be noted before using any venue.</li>
          </ul>

          <h3>Contact Information</h3>
          <p>For any queries or support:</p>
          <ul>
            <li>Technical Support: ext. 1234</li>
            <li>Admin Office: ext. 5678</li>
            <li>Emergency: ext. 9999</li>
          </ul>
        </div>
      </Modal>
    </>
  );
};

export default Sidebar; 