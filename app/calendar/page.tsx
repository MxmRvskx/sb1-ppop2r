"use client"

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProjectCalendar from '@/components/calendar/project-calendar';
import TimelineCalendar from '@/components/calendar/timeline-calendar';
import FinancialCalendar from '@/components/calendar/financial-calendar';
import TaskCalendar from '@/components/calendar/task-calendar';
import ResourceCalendar from '@/components/calendar/resource-calendar';
import { ViewType } from '@/components/calendar/types';

export default function CalendarPage() {
  const [view, setView] = useState<ViewType>('dayGridMonth');

  const handleViewChange = (newView: string) => {
    setView(newView as ViewType);
  };

  return (
    <div className="container mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Календарь проектов</h1>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">Общий</TabsTrigger>
          <TabsTrigger value="timeline">Таймлайн</TabsTrigger>
          <TabsTrigger value="financial">Финансы</TabsTrigger>
          <TabsTrigger value="tasks">Задачи</TabsTrigger>
          <TabsTrigger value="resources">Ресурсы</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <Tabs defaultValue="dayGridMonth" className="w-full" onValueChange={handleViewChange}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="timeGridDay">День</TabsTrigger>
                <TabsTrigger value="timeGridWeek">Неделя</TabsTrigger>
                <TabsTrigger value="dayGridMonth">Месяц</TabsTrigger>
                <TabsTrigger value="listWeek">Расписание</TabsTrigger>
              </TabsList>

              <TabsContent value="timeGridDay">
                <ProjectCalendar view="timeGridDay" />
              </TabsContent>
              
              <TabsContent value="timeGridWeek">
                <ProjectCalendar view="timeGridWeek" />
              </TabsContent>
              
              <TabsContent value="dayGridMonth">
                <ProjectCalendar view="dayGridMonth" />
              </TabsContent>
              
              <TabsContent value="listWeek">
                <ProjectCalendar view="listWeek" />
              </TabsContent>
            </Tabs>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <TimelineCalendar />
          </Card>
        </TabsContent>

        <TabsContent value="financial">
          <Card>
            <FinancialCalendar />
          </Card>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <TaskCalendar />
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <ResourceCalendar />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}