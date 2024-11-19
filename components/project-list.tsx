"use client"

import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from '@/components/ui/progress';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from 'next/link';
import { ArrowUpDown } from 'lucide-react';

const mockProjects = [
  { id: '1', name: 'Проект A', effort: 100, cost: 50000, progress: 75, startDate: '2023-06-01', endDate: '2023-12-31', status: 'В работе', stage: 'Разработка' },
  { id: '2', name: 'Проект B', effort: 150, cost: 75000, progress: 50, startDate: '2023-07-15', endDate: '2024-03-31', status: 'Пауза', stage: 'Тестирование' },
  { id: '3', name: 'Проект C', effort: 200, cost: 100000, progress: 25, startDate: '2023-08-01', endDate: '2024-06-30', status: 'Открыт', stage: 'Планирование' },
];

const statusColors = {
  'Открыт': 'bg-blue-500',
  'В работе': 'bg-green-500',
  'Пауза': 'bg-yellow-500',
  'Закрыт': 'bg-gray-500'
};

const allColumns = [
  { id: 'name', name: 'Название', sortable: true },
  { id: 'status', name: 'Статус', sortable: true },
  { id: 'stage', name: 'Стадия', sortable: true },
  { id: 'effort', name: 'Трудоемкость (ч)', sortable: true },
  { id: 'cost', name: 'Стоимость (руб)', sortable: true },
  { id: 'progress', name: 'Прогресс', sortable: true },
  { id: 'startDate', name: 'Начало', sortable: true },
  { id: 'endDate', name: 'Завершение', sortable: true },
];

export function ProjectList() {
  const [projects, setProjects] = useState(mockProjects);
  const [visibleColumns, setVisibleColumns] = useState(allColumns.map(col => col.id));
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filterConfig, setFilterConfig] = useState({ column: null, value: '' });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedProjects = [...projects].sort((a, b) => {
    if (sortConfig.key != null) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  const filteredProjects = sortedProjects.filter(project => {
    if (!filterConfig.column || !filterConfig.value) return true;
    const value = project[filterConfig.column];
    return value.toString().toLowerCase().includes(filterConfig.value.toLowerCase());
  });

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Выберите столбцы для отображения:</h3>
        <div className="flex flex-wrap gap-2">
          {allColumns.map(column => (
            <label key={column.id} className="flex items-center space-x-2">
              <Checkbox
                checked={visibleColumns.includes(column.id)}
                onCheckedChange={() => {
                  setVisibleColumns(prev =>
                    prev.includes(column.id)
                      ? prev.filter(id => id !== column.id)
                      : [...prev, column.id]
                  );
                }}
              />
              <span>{column.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Фильтр:</h3>
        <div className="flex space-x-2">
          <select
            className="border p-2 rounded"
            value={filterConfig.column || ''}
            onChange={(e) => setFilterConfig({ ...filterConfig, column: e.target.value })}
          >
            <option value="">Выберите столбец</option>
            {visibleColumns.map(columnId => (
              <option key={columnId} value={columnId}>
                {allColumns.find(col => col.id === columnId).name}
              </option>
            ))}
          </select>
          <Input
            type="text"
            placeholder="Введите значение для фильтрации"
            value={filterConfig.value}
            onChange={(e) => setFilterConfig({ ...filterConfig, value: e.target.value })}
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">
              <Checkbox />
            </TableHead>
            {visibleColumns.map(columnId => {
              const column = allColumns.find(col => col.id === columnId);
              return (
                <TableHead key={columnId}>
                  {column.sortable ? (
                    <Button
                      variant="ghost"
                      onClick={() => requestSort(columnId)}
                      className="flex items-center"
                    >
                      {column.name}
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    column.name
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProjects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              {visibleColumns.map(columnId => (
                <TableCell key={columnId}>
                  {columnId === 'name' ? (
                    <Link href={`/projects/${project.id}`} className="text-blue-600 hover:underline">
                      {project[columnId]}
                    </Link>
                  ) : columnId === 'status' ? (
                    <Badge className={`${statusColors[project[columnId]]} text-white`}>
                      {project[columnId]}
                    </Badge>
                  ) : columnId === 'progress' ? (
                    <div className="flex items-center">
                      <Progress value={project[columnId]} className="w-[60px] mr-2" />
                      <span>{project[columnId]}%</span>
                    </div>
                  ) : columnId === 'cost' ? (
                    project[columnId].toLocaleString()
                  ) : (
                    project[columnId]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}