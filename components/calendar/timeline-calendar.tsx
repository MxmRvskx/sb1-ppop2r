"use client"

import { useTheme } from 'next-themes';
import FullCalendar from '@fullcalendar/react';
import timelinePlugin from '@fullcalendar/timeline';
import { ruLocale } from './ru-locale';

const mockProjects = [
  {
    id: '1',
    resourceId: 'p1',
    title: 'Проект A',
    start: '2024-04-01',
    end: '2024-05-15',
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
    textColor: '#ffffff',
  },
  {
    id: '2',
    resourceId: 'p2',
    title: 'Проект B',
    start: '2024-04-15',
    end: '2024-06-30',
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
    textColor: '#ffffff',
  },
];

const mockResources = [
  { id: 'p1', title: 'Проект A' },
  { id: 'p2', title: 'Проект B' },
];

export default function TimelineCalendar() {
  const { theme } = useTheme();

  return (
    <div className={`timeline-container ${theme === 'dark' ? 'fc-theme-dark' : ''}`}>
      <style jsx global>{`
        .timeline-container .fc-timeline-slot-frame {
          height: 4rem;
        }
      `}</style>
      <FullCalendar
        plugins={[timelinePlugin]}
        initialView="timelineMonth"
        locale={ruLocale}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timelineMonth,timelineQuarter,timelineYear',
        }}
        events={mockProjects}
        resources={mockResources}
        resourceAreaWidth="15%"
        height="auto"
        slotMinWidth={100}
        views={{
          timelineMonth: {
            buttonText: 'Месяц',
            slotDuration: { days: 1 },
          },
          timelineQuarter: {
            buttonText: 'Квартал',
            duration: { months: 3 },
            slotDuration: { days: 1 },
          },
          timelineYear: {
            buttonText: 'Год',
            duration: { years: 1 },
            slotDuration: { days: 7 },
          },
        }}
      />
    </div>
  );
}