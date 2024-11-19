"use client"

import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const mockOperations = [
  { id: 1, type: 'Расходы', amount: 50000, date: '2023-06-01', contractor: 'ООО "Рога и копыта"', project: 'Проект A', projectStage: 'Этап 1', article: 'Закупка материалов' },
  { id: 2, type: 'Доходы', amount: 100000, date: '2023-06-15', contractor: 'ИП Иванов', project: 'Проект B', projectStage: 'Этап 2', article: 'Аванс по проекту' },
  { id: 3, type: 'Расходы', amount: 30000, date: '2023-07-01', contractor: 'АО "Техно"', project: 'Проект C', projectStage: 'Этап 1', article: 'Оплата услуг' },
];

export function OperationsList() {
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    // В реальном приложении здесь был бы API запрос
    setOperations(mockOperations);
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Тип</TableHead>
          <TableHead>Сумма (руб)</TableHead>
          <TableHead>Дата</TableHead>
          <TableHead>Контрагент</TableHead>
          <TableHead>Проект</TableHead>
          <TableHead>Этап проекта</TableHead>
          <TableHead>Статья</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {operations.map((operation) => (
          <TableRow key={operation.id}>
            <TableCell>{operation.type}</TableCell>
            <TableCell>{operation.amount.toLocaleString()}</TableCell>
            <TableCell>{operation.date}</TableCell>
            <TableCell>{operation.contractor}</TableCell>
            <TableCell>{operation.project}</TableCell>
            <TableCell>{operation.projectStage}</TableCell>
            <TableCell>{operation.article}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}