"use client"

import { useTheme } from 'next-themes';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { ruLocale } from './ru-locale';
import { Badge } from '@/components/ui/badge';

const mockResources = [
  { 
    id: 'e1',
    title: 'Иван Петров',
    role: 'Разработчик',
  },
  {
    id: 'e2',
    title: 'Мария Сидорова',
    role: 'Дизайнер',
  },
  {
    id: 'e3',
    title: 'Алексей Иванов',
    role: 'Менеджер',
  },
];

const mockSchedule = [
  {
    id: '1',
    resourceId: 'e1',
    title: 'Отпуск',
    start: '2024-04-15',
    end: '2024-04-30',
    type: 'vacation',
    backgroundColor: '#FF9800',
    borderColor: '#FF9800',
    textColor: '#ffffff',
  },
  {
    id: '2',
    resourceId: 'e2',
    title: 'Проект A',
    start: '2024-04-10',
    end: '2024-04-20',
    type: 'project',
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
    textColor: '#ffffff',
  },
];

export default function ResourceCalendar() {
  const { theme } = useTheme();

  const renderResourceContent = (info: any) => {
    return (
      <div className="flex flex-col gap-1">
        <div>{info.resource.title}</div>
        <Badge variant="outline">{info.resource.extendedProps.role}</Badge>
      </div>
    );
  };

  return (
    <div className={`resource-container ${theme === 'dark' ? 'fc-theme-dark' : ''}`}>
      <style jsx global>{`
        .resource-container .fc-timeline-slot-frame {
          height: 5rem;
        }
      `}</style>
      <FullCalendar
        plugins={[resourceTimelinePlugin]}
        initialView="resourceTimelineMonth"
        locale={ruLocale}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'resourceTimelineWeek,resourceTimelineMonth',
        }}
        resources={mockResources}
        events={mockSchedule}
        resourceContent={renderResourceContent}
        resourceAreaWidth="20%"
        height="auto"
        slotMinWidth={100}
        views={{
          resourceTimelineWeek: {
            buttonText: 'Неделя',
            slotDuration: { days: 1 },
            duration: { weeks: 1 },
          },
          resourceTimelineMonth: {
            buttonText: 'Месяц',
            slotDuration: { days: 1 },
            duration: { months: 1 },
          },
        }}
      />
    </div>
  );
}