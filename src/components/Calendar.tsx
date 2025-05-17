import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'meeting' | 'reminder' | 'task';
}

const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Standup',
    date: new Date(2024, 3, 15, 10, 0),
    type: 'meeting'
  },
  {
    id: '2',
    title: 'Project Review',
    date: new Date(2024, 3, 18, 14, 0),
    type: 'meeting'
  },
  {
    id: '3',
    title: 'Submit Report',
    date: new Date(2024, 3, 20, 17, 0),
    type: 'task'
  }
];

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEventsForDay = (day: Date) => {
    return mockEvents.filter(event => 
      event.date.getDate() === day.getDate() &&
      event.date.getMonth() === day.getMonth() &&
      event.date.getFullYear() === day.getFullYear()
    );
  };

  return (
    <div className="card my-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-lg">Calendar</h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
            className="btn btn-outline btn-sm"
          >
            Previous
          </button>
          <button 
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
            className="btn btn-outline btn-sm"
          >
            Next
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-medium text-sm py-2">
            {day}
          </div>
        ))}
        
        {days.map(day => {
          const events = getEventsForDay(day);
          return (
            <div
              key={day.toString()}
              className={`min-h-[80px] p-1 border rounded ${
                !isSameMonth(day, currentDate) ? 'bg-gray-50' : ''
              } ${isToday(day) ? 'border-primary' : ''}`}
            >
              <div className="text-sm mb-1">{format(day, 'd')}</div>
              <div className="space-y-1">
                {events.map(event => (
                  <div
                    key={event.id}
                    className={`text-xs p-1 rounded truncate ${
                      event.type === 'meeting' ? 'bg-blue-100 text-blue-800' :
                      event.type === 'task' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar; 