"use client"

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from '@/components/ui/progress';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { GripVertical, ArrowUpDown } from 'lucide-react';
import Link from 'next/link';
import { ColumnSelector } from './column-selector';

const mockProjects = [
  { id: 1, name: 'Проект A', effort: 100, cost: 50000, progress: 75, startDate: '2023-06-01', endDate: '2023-12-31', status: 'В работе', stage: 'Разработка' },
  { id: 2, name: 'Проект B', effort: 150, cost: 75000, progress: 50, startDate: '2023-07-15', endDate: '2024-03-31', status: 'Пауза', stage: 'Тестирование' },
  { id: 3, name: 'Проект C', effort: 200, cost: 100000, progress: 25, startDate: '2023-08-01', endDate: '2024-06-30', status: 'Открыт', stage: 'Планирование' },
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

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newColumns = Array.from(visibleColumns);
    const [reorderedColumn] = newColumns.splice(result.source.index, 1);
    newColumns.splice(result.destination.index, 0, reorderedColumn);
    setVisibleColumns(newColumns);
  };

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

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <ColumnSelector
          allColumns={allColumns}
          visibleColumns={visibleColumns}
          onColumnToggle={(columnId) => {
            setVisibleColumns(prev =>
              prev.includes(columnId)
                ? prev.filter(id => id !== columnId)
                : [...prev, columnId]
            );
          }}
        />
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox />
              </TableHead>
              <Droppable droppableId="columns" direction="horizontal">
                {(provided) => (
                  <TableHead ref={provided.innerRef} {...provided.droppableProps} colSpan={visibleColumns.length}>
                    <div className="flex">
                      {visibleColumns.map((columnId, index) => {
                        const column = allColumns.find(col => col.id === columnId);
                        return (
                          <Draggable key={columnId} draggableId={columnId} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="flex-1"
                              >
                                <div className="flex items-center">
                                  <span {...provided.dragHandleProps}>
                                    <GripVertical className="h-4 w-4 mr-2" />
                                  </span>
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
                                </div>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  </TableHead>
                )}
              </Droppable>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProjects.map((project) => (
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
      </DragDropContext>
    </div>
  );
}