import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import '@fullcalendar/core';
import '@fullcalendar/daygrid/index.css';
import '@fullcalendar/timegrid/index.css';
import './Calendar.css';

const dummyEvents = [
  {
    id: '1',
    start: '2024-03-07T10:00:00',
    end: '2024-03-07T12:00:00',
    title: 'Conference Room A - Team Meeting',
    backgroundColor: '#1677ff',
    extendedProps: {
      hall: 'Conference Room A',
      organizer: 'John Doe'
    }
  },
  {
    id: '2',
    start: '2024-03-07T14:00:00',
    end: '2024-03-07T16:00:00',
    title: 'Auditorium - Tech Talk',
    backgroundColor: '#52c41a',
    extendedProps: {
      hall: 'Auditorium',
      organizer: 'Jane Smith'
    }
  },
  {
    id: '3',
    start: '2024-03-08T09:00:00',
    end: '2024-03-08T17:00:00',
    title: 'Main Hall - Annual Conference',
    backgroundColor: '#722ed1',
    extendedProps: {
      hall: 'Main Hall',
      organizer: 'Event Team'
    }
  },
  {
    id: '4',
    start: '2024-03-09T13:00:00',
    end: '2024-03-09T15:00:00',
    title: 'Meeting Room B - Client Meeting',
    backgroundColor: '#fa8c16',
    extendedProps: {
      hall: 'Meeting Room B',
      organizer: 'Sales Team'
    }
  }
];

const CalendarComponent: React.FC = () => {
  return (
    <div style={{ padding: '20px 0' }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'prev,next today',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={dummyEvents}
        height="calc(100vh - 200px)"
        eventContent={(eventInfo) => {
          return (
            <div title={`Hall: ${eventInfo.event.extendedProps.hall}\nOrganizer: ${eventInfo.event.extendedProps.organizer}`}>
              {eventInfo.event.title}
            </div>
          );
        }}
      />
    </div>
  );
};

export default CalendarComponent; 