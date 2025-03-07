import React from 'react';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CalendarComponent from './components/Calendar';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout hasSider>
      <Navbar />
      <Sidebar />
      <Layout style={{ marginLeft: 200, minHeight: '100vh' }}>
        <Content style={{ 
          margin: '88px 24px 24px',
          padding: 24,
          background: '#fff',
          borderRadius: 4
        }}>
          <CalendarComponent />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
