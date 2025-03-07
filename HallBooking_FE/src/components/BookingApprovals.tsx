import React from 'react';
import { Table, Button, Space, Tag, message,  Grid } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

interface BookingApprovalsProps {
  pendingEvents: Array<{
    id: string;
    start: string;
    end: string;
    title: string;
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
  onStatusUpdate: (id: string, status: 'pending' | 'approved' | 'rejected') => void;
}

const BookingApprovals: React.FC<BookingApprovalsProps> = ({ pendingEvents, onStatusUpdate }) => {
  const handleApprove = (id: string) => {
    onStatusUpdate(id, 'approved');
    message.success('Booking request approved successfully!');
  };

  const handleReject = (id: string) => {
    onStatusUpdate(id, 'rejected');
    message.success('Booking request rejected.');
  };

  const columns: ColumnsType<BookingApprovalsProps['pendingEvents'][0]> = [
    {
      title: 'Request ID',
      dataIndex: ['extendedProps', 'requestId'],
      key: 'requestId',
      width: 120,
    },
    {
      title: 'Venue',
      dataIndex: ['extendedProps', 'hall'],
      key: 'hall',
      width: 150,
    },
    {
      title: 'Organizer',
      dataIndex: ['extendedProps', 'organizer'],
      key: 'organizer',
      width: 150,
    },
    {
      title: 'Department',
      dataIndex: ['extendedProps', 'department'],
      key: 'department',
      width: 120,
    },
    {
      title: 'Date & Time',
      key: 'datetime',
      width: 200,
      render: (_, record) => (
        <span>
          {dayjs(record.start).format('MMM D, YYYY')} <br />
          {dayjs(record.start).format('HH:mm')} - {dayjs(record.end).format('HH:mm')}
        </span>
      ),
    },
    {
      title: 'Reason',
      dataIndex: 'title',
      key: 'title',
      render: (title) => title.split(' - ')[1],
    },
    {
      title: 'Status',
      key: 'status',
      width: 100,
      render: () => (
        <Tag color="gold">Pending</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 200,
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            onClick={() => handleApprove(record.id)}
            style={{ backgroundColor: '#32CD32', borderColor: '#32CD32' }}
          >
            Approve
          </Button>
          <Button 
            danger 
            onClick={() => handleReject(record.id)}
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  return (
    <div style={{ padding: '24px', background: '#fff', borderRadius: '8px' }}>
      <h2 style={{ marginBottom: '24px' }}>Pending Booking Requests</h2>
      <Table
        columns={columns}
        dataSource={pendingEvents}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 'max-content' }}
      />
      {screens.md ? <p>Visible on medium screens and up</p> : <p>Visible on small screens</p>}
    </div>
  );
};


export default BookingApprovals; 