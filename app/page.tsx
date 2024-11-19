"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plus, FileText, ArrowUpDown, TrendingUp, Calendar as CalendarIcon } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

// Моковые данные для сводки
const mockSummary = {
  totalProjects: 5,
  activeProjects: 3,
  totalIncome: 250000,
  totalExpenses: 180000,
  projectsProgress: 65,
  upcomingDeadlines: [
    { id: 1, name: 'Проект A', date: '2024-04-15' },
    { id: 2, name: 'Проект B', date: '2024-04-20' }
  ]
};

export default function Home() {
  const [date, setDate] = useState<Date>(new Date());

  const quickActions = [
    { icon: Plus, label: 'Новый проект', href: '/projects/new', color: 'bg-blue-500' },
    { icon: FileText, label: 'Новая операция', href: '/operations', color: 'bg-green-500' },
    { icon: ArrowUpDown, label: 'Все операции', href: '/operations', color: 'bg-purple-500' },
    { icon: TrendingUp, label: 'Все проекты', href: '/projects', color: 'bg-orange-500' },
  ];

  return (
    <div className="container mx-auto space-y-8">
      {/* Быстрые действия */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Быстрые действия</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link href={action.href} key={index}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="flex items-center p-6">
                  <div className={`${action.color} p-3 rounded-lg mr-4`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-medium">{action.label}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Сводка за месяц */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Сводка</h2>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(date, 'LLLL yyyy', { locale: ru })}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Проекты</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-sm text-muted-foreground">Всего проектов</span>
                <p className="text-2xl font-bold">{mockSummary.totalProjects}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Активных проектов</span>
                <p className="text-2xl font-bold">{mockSummary.activeProjects}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Средний прогресс</span>
                <p className="text-2xl font-bold">{mockSummary.projectsProgress}%</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Финансы</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-sm text-muted-foreground">Доходы</span>
                <p className="text-2xl font-bold text-green-600">
                  {mockSummary.totalIncome.toLocaleString()} ₽
                </p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Расходы</span>
                <p className="text-2xl font-bold text-red-600">
                  {mockSummary.totalExpenses.toLocaleString()} ₽
                </p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Баланс</span>
                <p className="text-2xl font-bold">
                  {(mockSummary.totalIncome - mockSummary.totalExpenses).toLocaleString()} ₽
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Ближайшие дедлайны</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockSummary.upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="flex justify-between items-center">
                  <Link href={`/projects/${deadline.id}`} className="text-blue-600 hover:underline">
                    {deadline.name}
                  </Link>
                  <span className="text-muted-foreground">
                    {new Date(deadline.date).toLocaleDateString('ru')}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}