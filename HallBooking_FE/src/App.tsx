import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CalendarComponent from './components/Calendar';
import BookingApprovals from './components/BookingApprovals';
import UserManagement from './components/UserManagement';
import Login from './components/Login';
import Signup from './components/Signup';
import LogoutButton from './components/LogoutButton';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import { AuthProvider } from './context/AuthContext';

const { Content } = Layout;

// Define the CalendarEvent type
interface CalendarEvent {
  id: string;
  start: string;
  end: string;
  title: string;
  backgroundColor: string;
  extendedProps: {
    hall: string;
    organizer: string;
    status: 'pending' | 'approved' | 'rejected';
    department: string;
    mobileNumber: string;
    createdAt: string;
    requestId: string;
  };
}

// Dummy data for initial bookings
const initialBookings: CalendarEvent[] = [
  {
    id: '1',
    start: '2025-03-15T10:00:00',
    end: '2025-03-15T12:00:00',
    title: 'Conference Room A - Team Meeting',
    backgroundColor: '#32CD32',
    extendedProps: {
      hall: 'Conference Room A',
      organizer: 'John Doe',
      status: 'approved' as const,
      department: 'IT',
      mobileNumber: '1234567890',
      createdAt: '2025-03-01T10:00:00',
      requestId: 'REQ-001'
    }
  },
  {
    id: '2',
    start: '2025-03-16T14:00:00',
    end: '2025-03-16T16:00:00',
    title: 'Auditorium - Tech Talk',
    backgroundColor: '#FFD700',
    extendedProps: {
      hall: 'Auditorium',
      organizer: 'John Doe',
      status: 'pending' as const,
      department: 'IT',
      mobileNumber: '1234567890',
      createdAt: '2025-03-02T14:00:00',
      requestId: 'REQ-002'
    }
  },
  {
    id: '3',
    start: '2025-03-17T09:00:00',
    end: '2025-03-17T17:00:00',
    title: 'Main Hall - Annual Conference',
    backgroundColor: '#32CD32',
    extendedProps: {
      hall: 'Main Hall',
      organizer: 'John Doe',
      status: 'approved' as const,
      department: 'IT',
      mobileNumber: '1234567890',
      createdAt: '2025-03-03T09:00:00',
      requestId: 'REQ-003'
    }
  },
  {
    id: '4',
    start: '2025-03-18T13:00:00',
    end: '2025-03-18T15:00:00',
    title: 'Meeting Room B - Project Discussion',
    backgroundColor: '#FF4500',
    extendedProps: {
      hall: 'Meeting Room B',
      organizer: 'John Doe',
      status: 'rejected' as const,
      department: 'IT',
      mobileNumber: '1234567890',
      createdAt: '2025-03-04T13:00:00',
      requestId: 'REQ-004'
    }
  },
  {
    id: '5',
    start: '2025-03-19T09:00:00',
    end: '2025-03-19T11:00:00',
    title: 'Workshop - Advanced React',
    backgroundColor: '#FFD700',
    extendedProps: {
      hall: 'Workshop Room 1',
      organizer: 'John Doe',
      status: 'pending' as const,
      department: 'IT',
      mobileNumber: '1234567890',
      createdAt: '2025-03-05T09:00:00',
      requestId: 'REQ-005'
    }
  },
  {
    id: '6',
    start: '2025-03-20T13:00:00',
    end: '2025-03-20T15:00:00',
    title: 'Seminar - Future of AI',
    backgroundColor: '#32CD32',
    extendedProps: {
      hall: 'Seminar Hall',
      organizer: 'John Doe',
      status: 'approved' as const,
      department: 'IT',
      mobileNumber: '1234567890',
      createdAt: '2025-03-06T13:00:00',
      requestId: 'REQ-006'
    }
  },
  {
    id: '7',
    start: '2025-03-21T10:00:00',
    end: '2025-03-21T12:00:00',
    title: 'Training Room - Team Training',
    backgroundColor: '#FFD700',
    extendedProps: {
      hall: 'Training Room',
      organizer: 'John Doe',
      status: 'pending' as const,
      department: 'IT',
      mobileNumber: '1234567890',
      createdAt: '2025-03-07T10:00:00',
      requestId: 'REQ-007'
    }
  },
  {
    id: '8',
    start: '2025-03-22T14:00:00',
    end: '2025-03-22T16:00:00',
    title: 'Conference Room B - Sprint Planning',
    backgroundColor: '#FFD700',
    extendedProps: {
      hall: 'Conference Room B',
      organizer: 'John Doe',
      status: 'pending' as const,
      department: 'IT',
      mobileNumber: '1234567890',
      createdAt: '2025-03-08T14:00:00',
      requestId: 'REQ-008'
    }
  }
];

// Mock current user data (replace with actual authentication later)
// const currentUser = {
//   name: 'John Doe',
//   department: 'IT'
// };

const AppContent: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>(initialBookings);

  const handleStatusUpdate = (id: string, status: 'pending' | 'approved' | 'rejected') => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === id 
          ? { 
              ...event, 
              backgroundColor: status === 'approved' ? '#32CD32' : status === 'pending' ? '#FFD700' : '#FF4500',
              extendedProps: {
                ...event.extendedProps,
                status
              }
            }
          : event
      )
    );
  };

  useEffect(() => {
    const handleOrientationChange = () => {
      if (window.innerHeight > window.innerWidth) {
        document.body.style.transform = 'rotate(90deg)';
        document.body.style.transformOrigin = 'left top';
        document.body.style.width = '100vh';
        document.body.style.position = 'absolute';
        document.body.style.top = '100%';
        document.body.style.left = '0';
      } else {
        document.body.style.transform = '';
        document.body.style.transformOrigin = '';
        document.body.style.width = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
      }
    };

    window.addEventListener('resize', handleOrientationChange);
    handleOrientationChange(); // Initial check

    return () => window.removeEventListener('resize', handleOrientationChange);
  }, []);

  return (
    <AuthProvider>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar 
          collapsed={collapsed} 
          onCollapse={setCollapsed}
          approvedEvents={events.filter(event => event.extendedProps?.status === 'approved')}
        />
        <Layout style={{ 
          marginLeft: collapsed ? 80 : 200,
          transition: 'margin-left 0.2s ease'
        }}>
          <Content style={{ 
            margin: '24px 16px', 
            padding: 24,
            background: '#fff',
            borderRadius: '8px'
          }}>
            <Routes>
              <Route path="/" element={<ProtectedRoute><CalendarComponent events={events} onStatusUpdate={handleStatusUpdate} /></ProtectedRoute>} />
              <Route path="/approvals" element={<ProtectedRoute><BookingApprovals pendingEvents={events.filter(event => event.extendedProps?.status === 'pending')} onStatusUpdate={handleStatusUpdate} /></ProtectedRoute>} />
              <Route path="/users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </Content>
        </Layout>
        <LogoutButton />
      </Layout>
    </AuthProvider>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/protected" element={<ProtectedRoute><AppContent /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <LogoutButton />
      </Router>
    </AuthProvider>
  );
};

export default App;
