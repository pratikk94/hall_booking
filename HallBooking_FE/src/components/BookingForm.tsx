import React from 'react';
import { Form, Input, DatePicker, Select, Button, message, Row, Col } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

interface BookingFormProps {
  onSubmit: (values: {
    title: string;
    description: string;
    venue: string;
    department: string;
    dateRange: [string, string];
  }) => void;
  existingEvents: Array<{
    start: string;
    end: string;
    extendedProps: {
      hall: string;
      status: string;
    };
  }>;
}

const venueTypes = [
  { value: 'conference_room', label: 'Conference Room' },
  { value: 'auditorium', label: 'Auditorium' },
  { value: 'seminar_hall', label: 'Seminar Hall' },
  { value: 'meeting_room', label: 'Meeting Room' },
  { value: 'workshop_room', label: 'Workshop Room' }
];

const departments = [
  { value: 'it', label: 'IT' },
  { value: 'hr', label: 'HR' },
  { value: 'finance', label: 'Finance' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'operations', label: 'Operations' }
];

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, existingEvents }) => {
  const [form] = Form.useForm();
  const [selectedVenue, setSelectedVenue] = React.useState<string | null>(null);

  const disabledTime = (current: Dayjs | null) => {
    if (!current || !selectedVenue) return {};

    const currentDate = current.format('YYYY-MM-DD');
    const venueEvents = existingEvents.filter(event => 
      event.extendedProps.hall === selectedVenue &&
      event.extendedProps.status === 'approved' &&
      event.start.startsWith(currentDate)
    );

    const disabledHours = () => {
      const hours: number[] = [];
      venueEvents.forEach(event => {
        const startHour = dayjs(event.start).hour();
        const endHour = dayjs(event.end).hour();
        for (let i = startHour; i < endHour; i++) {
          hours.push(i);
        }
      });
      return hours;
    };

    return {
      disabledHours: () => disabledHours(),
    };
  };

  interface BookingFormValues {
    dateTime: [Dayjs, Dayjs];
    venueType: string;
    name: string;
    department: string;
    reason: string;
    mobileNumber: string;
  }

  const handleSubmit = (values: BookingFormValues) => {
    const [startDate, endDate] = values.dateTime;
    
    // Check for conflicts with existing bookings
    const hasConflict = existingEvents.some(event => {
      if (event.extendedProps.hall !== values.venueType) return false;
      if (event.extendedProps.status !== 'approved') return false;
      
      const eventStart = dayjs(event.start);
      const eventEnd = dayjs(event.end);
      const newStart = startDate;
      const newEnd = endDate;

      return (
        (newStart.isAfter(eventStart) && newStart.isBefore(eventEnd)) ||
        (newEnd.isAfter(eventStart) && newEnd.isBefore(eventEnd)) ||
        (newStart.isBefore(eventStart) && newEnd.isAfter(eventEnd))
      );
    });

    if (hasConflict) {
      message.error('This time slot is already booked. Please select a different time.');
      return;
    }

    const bookingData = {
      title: `${values.venueType} - ${values.reason}`,
      description: values.reason,
      venue: values.venueType,
      department: values.department,
      dateRange: [startDate.format('YYYY-MM-DDTHH:mm:ss'), endDate.format('YYYY-MM-DDTHH:mm:ss')],
    } as { title: string; description: string; venue: string; department: string; dateRange: [string, string] };

    onSubmit(bookingData);
    form.resetFields();
    setSelectedVenue(null);
    message.success('Booking request submitted successfully!');
  };

  return (
    <div style={{ 
      padding: '24px',
      background: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      marginBottom: '24px'
    }}>
      <h2 style={{ marginBottom: '24px' }}>New Booking Request</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          dateTime: [dayjs(), dayjs().add(1, 'hour')]
        }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="venueType"
              label="Venue Type"
              rules={[{ required: true, message: 'Please select venue type' }]}
            >
              <Select 
                options={venueTypes}
                onChange={(value) => setSelectedVenue(value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="department"
              label="Department"
              rules={[{ required: true, message: 'Please select department' }]}
            >
              <Select options={departments} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="dateTime"
              label="Start and End Date/Time"
              rules={[{ required: true, message: 'Please select date and time' }]}
            >
              <RangePicker
                showTime
                format="YYYY-MM-DD HH:mm"
                style={{ width: '100%' }}
                disabledTime={disabledTime}
                disabledDate={(current) => {
                  return current && current < dayjs().startOf('day');
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="name"
              label="Your Name"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="mobileNumber"
              label="Mobile Number"
              rules={[
                { required: true, message: 'Please enter mobile number' },
                { pattern: /^[0-9]{10}$/, message: 'Please enter valid 10-digit mobile number' }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="reason"
              label="Reason for Booking"
              rules={[{ required: true, message: 'Please enter reason for booking' }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit Booking Request
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BookingForm; 