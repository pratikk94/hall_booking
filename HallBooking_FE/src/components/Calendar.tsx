import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Select, Space, Tabs, message } from 'antd';
import BookingForm from './BookingForm';
import BookingApprovals from './BookingApprovals';
import './Calendar.css';

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

interface CalendarComponentProps {
  events: CalendarEvent[];
  onStatusUpdate: (id: string, status: 'pending' | 'approved' | 'rejected') => void;
}

const initialEvents: CalendarEvent[] = [
  {
    id: '1',
    start: '2025-03-07T10:00:00',
    end: '2025-03-07T12:00:00',
    title: 'Conference Room A - Team Meeting',
    backgroundColor: '#32CD32',
    extendedProps: {
      hall: 'Conference Room A',
      organizer: 'John Doe',
      status: 'approved',
      department: 'IT',
      mobileNumber: '1234567890',
      createdAt: '2025-03-01T10:00:00',
      requestId: 'REQ-001'
    }
  },
  {
    id: '2',
    start: '2025-03-07T14:00:00',
    end: '2025-03-07T16:00:00',
    title: 'Auditorium - Tech Talk',
    backgroundColor: '#FFD700',
    extendedProps: {
      hall: 'Auditorium',
      organizer: 'Jane Smith',
      status: 'pending',
      department: 'HR',
      mobileNumber: '9876543210',
      createdAt: '2025-03-02T14:00:00',
      requestId: 'REQ-002'
    }
  },
  {
    id: '3',
    start: '2025-03-08T09:00:00',
    end: '2025-03-08T17:00:00',
    title: 'Main Hall - Annual Conference',
    backgroundColor: '#32CD32',
    extendedProps: {
      hall: 'Main Hall',
      organizer: 'Event Team',
      status: 'approved',
      department: 'Marketing',
      mobileNumber: '5555555555',
      createdAt: '2025-03-03T09:00:00',
      requestId: 'REQ-003'
    }
  },
  {
    id: '4',
    start: '2025-03-09T13:00:00',
    end: '2025-03-09T15:00:00',
    title: 'Meeting Room B - Client Meeting',
    backgroundColor: '#FF4500',
    extendedProps: {
      hall: 'Meeting Room B',
      organizer: 'Sales Team',
      status: 'rejected',
      department: 'Sales',
      mobileNumber: '1111111111',
      createdAt: '2025-03-04T13:00:00',
      requestId: 'REQ-004'
    }
  },
  {
    id: '5',
    start: '2025-03-10T09:00:00',
    end: '2025-03-10T11:00:00',
    title: 'Workshop - Advanced React',
    backgroundColor: '#FFD700',
    extendedProps: {
      hall: 'Workshop Room 1',
      organizer: 'Tech Team',
      status: 'pending',
      department: 'IT',
      mobileNumber: '2222222222',
      createdAt: '2025-03-05T09:00:00',
      requestId: 'REQ-005'
    }
  },
  {
    id: '6',
    start: '2025-03-11T13:00:00',
    end: '2025-03-11T15:00:00',
    title: 'Seminar - Future of AI',
    backgroundColor: '#32CD32',
    extendedProps: {
      hall: 'Seminar Hall',
      organizer: 'AI Group',
      status: 'approved',
      department: 'IT',
      mobileNumber: '3333333333',
      createdAt: '2025-03-06T13:00:00',
      requestId: 'REQ-006'
    }
  }
];

const months = [
  { value: 0, label: 'January' },
  { value: 1, label: 'February' },
  { value: 2, label: 'March' },
  { value: 3, label: 'April' },
  { value: 4, label: 'May' },
  { value: 5, label: 'June' },
  { value: 6, label: 'July' },
  { value: 7, label: 'August' },
  { value: 8, label: 'September' },
  { value: 9, label: 'October' },
  { value: 10, label: 'November' },
  { value: 11, label: 'December' }
];

const years = Array.from({ length: 5 }, (_, i) => ({
  value: 2025 + i,
  label: (2025 + i).toString()
}));
const CalendarComponent: React.FC<CalendarComponentProps> = ({ events, onStatusUpdate }) => {
  const [calendarApi, setCalendarApi] = useState<FullCalendar | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number>(2); // March 2025
  const [selectedYear, setSelectedYear] = useState<number>(2025);

  // Filter out rejected events and use initialEvents if no events are provided
  const displayEvents = (events.length > 0 ? events : initialEvents)
    .filter(event => event.extendedProps.status !== 'rejected');

  // Get all approved events for conflict checking
  const approvedEvents = (events.length > 0 ? events : initialEvents)
    .filter(event => event.extendedProps.status === 'approved');

  // Get all pending events for the booking approval section
  const pendingEvents = (events.length > 0 ? events : initialEvents)
    .filter(event => event.extendedProps.status === 'pending');

  // Get user's approved bookings (assuming we have a way to identify the current user)
  // const userBookings = approvedEvents.filter(event => 
  //   event.extendedProps.organizer === 'John Doe' // Replace with actual user identification
  // );

  const handleMonthChange = (value: number) => {
    setSelectedMonth(value);
    if (calendarApi) {
      calendarApi.getApi().gotoDate(new Date(selectedYear, value, 1));
    }
  };

  const handleYearChange = (value: number) => {
    setSelectedYear(value);
    if (calendarApi) {
      calendarApi.getApi().gotoDate(new Date(value, selectedMonth, 1));
    }
  };

  const handleNewBooking = (bookingData: {
    title: string;
    start: Date;
    end: Date;
    extendedProps: {
      description?: string;
      organizer: string;
      attendees?: string[];
    }
  }) => {
    // Create a new event with a unique ID
    const newEvent = {
      ...bookingData,
      id: (events.length + 1).toString(),
      extendedProps: {
        ...bookingData.extendedProps,
        status: 'pending',
        createdAt: new Date().toISOString(),
        requestId: `REQ-${Date.now()}` // Add a unique request ID
      }
    };

    // Update the events state through the parent component
    onStatusUpdate(newEvent.id, 'pending');

    // Show success message
    message.success('Booking request submitted successfully! Please wait for approval.');
  };

  // const handleCancelBooking = (id: string) => {
  //   // Update the booking status to rejected
  //   onStatusUpdate(id, 'rejected');
  // };

  return (
    <div style={{ padding: '20px 0' }}>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: '1',
            label: 'Calendar View',
            children: (
              <div className="calendar-container">
                <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Space wrap>
                    <Select
                      value={selectedMonth}
                      onChange={handleMonthChange}
                      options={months}
                      style={{ width: 120 }}
                    />
                    <Select
                      value={selectedYear}
                      onChange={handleYearChange}
                      options={years}
                      style={{ width: 100 }}
                    />
                  </Space>
                  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '20px', height: '20px', backgroundColor: '#32CD32', borderRadius: '4px' }}></div>
                      <span>Approved</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '20px', height: '20px', backgroundColor: '#FFD700', borderRadius: '4px' }}></div>
                      <span>Pending</span>
                    </div>
                  </div>
                </div>
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin]}
                  initialView="dayGridMonth"
                  headerToolbar={{
                    start: 'prev,next today',
                    center: 'title',
                    end: 'dayGridMonth,timeGridWeek,timeGridDay'
                  }}
                  events={displayEvents}
                  height="100%" // Use full height of the container
                  eventContent={(eventInfo) => {
                    return (
                      <div 
                        style={{
                          padding: '4px',
                          borderRadius: '4px',
                          backgroundColor: eventInfo.event.backgroundColor,
                          color: '#000',
                          fontWeight: 'bold'
                        }}
                        title={`Hall: ${eventInfo.event.extendedProps.hall}\nOrganizer: ${eventInfo.event.extendedProps.organizer}\nStatus: ${eventInfo.event.extendedProps.status}\nRequest ID: ${eventInfo.event.extendedProps.requestId}`}
                      >
                        {eventInfo.event.title}
                      </div>
                    );
                  }}
                  eventClick={(info) => {
                    console.log('Event clicked:', info.event);
                  }}
                  datesSet={(dateInfo) => {
                    const calendar = dateInfo.view.calendar;
                    setCalendarApi(calendar as unknown as FullCalendar);
                    const currentDate = dateInfo.view.currentStart;
                    setSelectedMonth(currentDate.getMonth());
                    setSelectedYear(currentDate.getFullYear());
                  }}
                />
              </div>
            )
          },
          {
            key: '2',
            label: 'New Booking',
            children: <BookingForm 
              onSubmit={(values) => {
                const startDate = new Date(values.dateRange[0]);
                const endDate = new Date(values.dateRange[1]);
                handleNewBooking({
                  title: values.title,
                  start: startDate,
                  end: endDate,
                  extendedProps: {
                    description: values.description,
                    organizer: values.department,
                  }
                });
              }}
              existingEvents={approvedEvents} 
            />
          },
          {
            key: '3', 
            label: 'Booking Approvals',
            children: <BookingApprovals pendingEvents={pendingEvents} onStatusUpdate={onStatusUpdate} />
          }
        ]}
      />
    </div>
  );
};

export default CalendarComponent; 