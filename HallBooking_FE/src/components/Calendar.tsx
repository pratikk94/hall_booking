import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import './Calendar.css';

const dummyEvents = [
  {
    id: '1',
    start: '2025-03-07T10:00:00',
    end: '2025-03-07T12:00:00',
    title: 'Conference Room A - Team Meeting',
    backgroundColor: '#1E90FF', // Dodger Blue
    extendedProps: {
      hall: 'Conference Room A',
      organizer: 'John Doe'
    }
  },
  {
    id: '2',
    start: '2025-03-07T14:00:00',
    end: '2025-03-07T16:00:00',
    title: 'Auditorium - Tech Talk',
    backgroundColor: '#32CD32', // Lime Green
    extendedProps: {
      hall: 'Auditorium',
      organizer: 'Jane Smith'
    }
  },
  {
    id: '3',
    start: '2025-03-08T09:00:00',
    end: '2025-03-08T17:00:00',
    title: 'Main Hall - Annual Conference',
    backgroundColor: '#FF4500', // Orange Red
    extendedProps: {
      hall: 'Main Hall',
      organizer: 'Event Team'
    }
  },
  {
    id: '4',
    start: '2025-03-09T13:00:00',
    end: '2025-03-09T15:00:00',
    title: 'Meeting Room B - Client Meeting',
    backgroundColor: '#FFD700', // Gold
    extendedProps: {
      hall: 'Meeting Room B',
      organizer: 'Sales Team'
    }
  },
  {
    id: '5',
    start: '2025-03-10T09:00:00',
    end: '2025-03-10T11:00:00',
    title: 'Workshop - Advanced React',
    backgroundColor: '#FF69B4', // Hot Pink
    extendedProps: {
      hall: 'Workshop Room 1',
      organizer: 'Tech Team'
    }
  },
  {
    id: '6',
    start: '2025-03-11T13:00:00',
    end: '2025-03-11T15:00:00',
    title: 'Seminar - Future of AI',
    backgroundColor: '#8A2BE2', // Blue Violet
    extendedProps: {
      hall: 'Seminar Hall',
      organizer: 'AI Group'
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