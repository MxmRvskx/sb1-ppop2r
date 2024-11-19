"use client"

import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { ViewType, CalendarEvent } from './types';
import { ruLocale } from './ru-locale';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';
import { CalendarHeader } from './calendar-header';
import { EventDialog } from './event-dialog';

interface ProjectCalendarProps {
  view: ViewType;
}

const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Проект A: Начало разработки',
    start: '2024-04-10',
    end: '2024-04-15',
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
    textColor: '#ffffff',
    description: 'Старт разработки проекта A',
    location: 'Офис',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Проект B: Тестирование',
    start: '2024-04-12T10:00:00',
    end: '2024-04-12T15:00:00',
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
    textColor: '#ffffff',
    description: 'Тестирование новых функций',
    location: 'Удаленно',
    priority: 'medium',
  },
];

export default function ProjectCalendar({ view }: ProjectCalendarProps) {
  const { theme } = useTheme();
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleEventClick = (info: any) => {
    const event = events.find(e => e.id === info.event.id);
    if (event) {
      setSelectedEvent(event);
      setIsEventDialogOpen(true);
    }
  };

  const handleDateClick = (info: any) => {
    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: '',
      start: info.dateStr,
      end: info.dateStr,
      backgroundColor: '#4CAF50',
      borderColor: '#4CAF50',
      textColor: '#ffffff',
      description: '',
      location: '',
      priority: 'medium',
    };
    setSelectedEvent(newEvent);
    setIsEventDialogOpen(true);
  };

  const handleEventDrop = (info: any) => {
    const updatedEvents = events.map(event => {
      if (event.id === info.event.id) {
        return {
          ...event,
          start: info.event.startStr,
          end: info.event.endStr,
        };
      }
      return event;
    });
    setEvents(updatedEvents);
    toast.success('Событие перемещено');
  };

  const handleEventSave = (event: CalendarEvent) => {
    if (event.id) {
      setEvents(prev => {
        const index = prev.findIndex(e => e.id === event.id);
        if (index !== -1) {
          const newEvents = [...prev];
          newEvents[index] = event;
          return newEvents;
        }
        return [...prev, event];
      });
    }
    setIsEventDialogOpen(false);
    toast.success('Событие сохранено');
  };

  const handleEventDelete = (eventId: string) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
    setIsEventDialogOpen(false);
    toast.success('Событие удалено');
  };

  return (
    <div className={`calendar-container ${theme === 'dark' ? 'fc-theme-dark' : ''}`}>
      <style jsx global>{`
        .fc {
          --fc-border-color: hsl(var(--border));
          --fc-page-bg-color: hsl(var(--background));
          --fc-neutral-bg-color: hsl(var(--secondary));
          --fc-list-event-hover-bg-color: hsl(var(--accent));
          --fc-today-bg-color: hsl(var(--accent) / 0.2);
        }
        .fc-theme-dark {
          --fc-page-bg-color: hsl(var(--background));
          --fc-neutral-bg-color: hsl(var(--secondary));
          --fc-list-event-hover-bg-color: hsl(var(--accent));
          --fc-today-bg-color: hsl(var(--accent) / 0.2);
        }
        .fc-header-toolbar {
          margin-bottom: 1rem !important;
          padding: 1rem;
        }
        .fc-view-harness {
          background-color: hsl(var(--background));
        }
        .fc th {
          padding: 0.5rem;
        }
        .fc td {
          border-color: hsl(var(--border));
        }
        .fc-button {
          background-color: hsl(var(--primary)) !important;
          border-color: hsl(var(--primary)) !important;
        }
        .fc-button:hover {
          background-color: hsl(var(--primary) / 0.9) !important;
        }
        .fc-button-active {
          background-color: hsl(var(--accent)) !important;
          border-color: hsl(var(--accent)) !important;
        }
      `}</style>

      <CalendarHeader />

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView={view}
        locale={ruLocale}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: '',
        }}
        events={events}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        height="auto"
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        eventDrop={handleEventDrop}
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        allDaySlot={true}
        slotDuration="00:30:00"
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: '09:00',
          endTime: '18:00',
        }}
      />

      <EventDialog
        event={selectedEvent}
        isOpen={isEventDialogOpen}
        onClose={() => setIsEventDialogOpen(false)}
        onSave={handleEventSave}
        onDelete={handleEventDelete}
      />
    </div>
  );
}