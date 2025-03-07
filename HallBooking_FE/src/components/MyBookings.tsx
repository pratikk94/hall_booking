import React from 'react';
import { Table, Button, Space, Tag, message, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

interface MyBookingsProps {
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
  currentUser: {
    name: string;
    department: string;
  };
}

const MyBookings: React.FC<MyBookingsProps> = ({ approvedEvents, onCancelBooking, currentUser }) => {
  // Filter bookings for current user
  const userBookings = approvedEvents.filter(
    event => event.extendedProps.organizer === currentUser.name
  );

  const handleCancel = (id: string) => {
    Modal.confirm({
      title: 'Cancel Booking',
      content: 'Are you sure you want to cancel this booking?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        onCancelBooking(id);
        message.success('Booking cancelled successfully');
      },
    });
  };

  const columns: ColumnsType<MyBookingsProps['approvedEvents'][0]> = [
    {
      title: 'Request ID',
      dataIndex: ['extendedProps', 'requestId'],
      key: 'requestId',
      width: 100,
    },
    {
      title: 'Venue',
      dataIndex: ['extendedProps', 'hall'],
      key: 'hall',
      width: 120,
    },
    {
      title: 'Date & Time',
      key: 'datetime',
      width: 150,
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
      ellipsis: true,
    },
    {
      title: 'Status',
      key: 'status',
      width: 80,
      render: (_, record) => (
        <Tag color="green">Approved</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: (_, record) => (
        <Button 
          danger 
          onClick={() => handleCancel(record.id)}
          size="small"
        >
          Cancel
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '16px 0', background: '#fff', borderRadius: '8px' }}>
      <h2 style={{ marginBottom: '16px', paddingLeft: '8px' }}>My Bookings</h2>
      {userBookings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          No bookings found
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={userBookings}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
          size="small"
          style={{ width: '100%' }}
        />
      )}
    </div>
  );
};

export default MyBookings; 