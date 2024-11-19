"use client"

import { useTheme } from 'next-themes';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ruLocale } from './ru-locale';
import { Badge } from '@/components/ui/badge';

const mockTransactions = [
  {
    id: '1',
    title: 'Оплата по проекту A',
    start: '2024-04-15',
    amount: 150000,
    type: 'income',
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
    textColor: '#ffffff',
  },
  {
    id: '2',
    title: 'Выплата подрядчикам',
    start: '2024-04-20',
    amount: -75000,
    type: 'expense',
    backgroundColor: '#f44336',
    borderColor: '#f44336',
    textColor: '#ffffff',
  },
];

export default function FinancialCalendar() {
  const { theme } = useTheme();

  const renderEventContent = (eventInfo: any) => {
    const amount = eventInfo.event.extendedProps.amount;
    const formattedAmount = Math.abs(amount).toLocaleString() + ' ₽';
    
    return (
      <div className="flex items-center gap-2 p-1">
        <span>{eventInfo.event.title}</span>
        <Badge variant={amount > 0 ? "default" : "destructive"}>
          {amount > 0 ? '+' : '-'}{formattedAmount}
        </Badge>
      </div>
    );
  };

  return (
    <div className={`financial-container ${theme === 'dark' ? 'fc-theme-dark' : ''}`}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale={ruLocale}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: '',
        }}
        events={mockTransactions}
        eventContent={renderEventContent}
        height="auto"
      />
    </div>
  );
}