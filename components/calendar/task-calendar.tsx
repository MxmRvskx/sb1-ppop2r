"use client"

import { useTheme } from 'next-themes';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { ruLocale } from './ru-locale';
import { Badge } from '@/components/ui/badge';

const mockTasks = [
  {
    id: '1',
    title: 'Разработка функционала',
    start: '2024-04-15T10:00:00',
    end: '2024-04-15T16:00:00',
    project: 'Проект A',
    priority: 'high',
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
    textColor: '#ffffff',
  },
  {
    id: '2',
    title: 'Тестирование',
    start: '2024-04-16T09:00:00',
    end: '2024-04-16T12:00:00',
    project: 'Проект B',
    priority: 'medium',
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
    textColor: '#ffffff',
  },
];

const priorityColors = {
  high: 'bg-red-500',
  medium: 'bg-yellow-500',
  low: 'bg-blue-500',
};

export default function TaskCalendar() {
  const { theme } = useTheme();

  const renderEventContent = (eventInfo: any) => {
    const priority = eventInfo.event.extendedProps.priority;
    const project = eventInfo.event.extendedProps.project;
    
    return (
      <div className="flex flex-col gap-1 p-1">
        <div className="flex items-center gap-2">
          <span>{eventInfo.event.title}</span>
          <Badge className={priorityColors[priority]}>{priority}</Badge>
        </div>
        <small className="text-muted-foreground">{project}</small>
      </div>
    );
  };

  return (
    <div className={`task-container ${theme === 'dark' ? 'fc-theme-dark' : ''}`}>
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        locale={ruLocale}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: '',
        }}
        events={mockTasks}
        eventContent={renderEventContent}
        height="auto"
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        allDaySlot={false}
        slotDuration="00:30:00"
      />
    </div>
  );
}