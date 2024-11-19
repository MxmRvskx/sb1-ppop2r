"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Начальные данные
const initialStatuses = [
  { id: 1, name: 'открыт', color: '#2196F3' },
  { id: 2, name: 'в работе', color: '#4CAF50' },
  { id: 3, name: 'пауза', color: '#FFC107' },
  { id: 4, name: 'закрыт', color: '#9E9E9E' },
];

const initialPrograms = ['Программа A', 'Программа B', 'Программа C'];
const initialTypes = ['Тип 1', 'Тип 2', 'Тип 3'];

export default function ProjectSettings() {
  const [statuses, setStatuses] = useState(initialStatuses);
  const [newStatus, setNewStatus] = useState({ name: '', color: '#000000' });
  const [programs, setPrograms] = useState(initialPrograms);
  const [newProgram, setNewProgram] = useState('');
  const [types, setTypes] = useState(initialTypes);
  const [newType, setNewType] = useState('');

  const handleAddStatus = () => {
    if (newStatus.name) {
      setStatuses([...statuses, { id: Date.now(), ...newStatus }]);
      setNewStatus({ name: '', color: '#000000' });
    }
  };

  const handleDeleteStatus = (id) => {
    setStatuses(statuses.filter(status => status.id !== id));
  };

  const handleAddProgram = () => {
    if (newProgram && !programs.includes(newProgram)) {
      setPrograms([...programs, newProgram]);
      setNewProgram('');
    }
  };

  const handleAddType = () => {
    if (newType && !types.includes(newType)) {
      setTypes([...types, newType]);
      setNewType('');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Статусы проектов</h3>
        <div className="space-y-4 mb-4">
          <div>
            <Label htmlFor="statusName">Название статуса</Label>
            <Input
              id="statusName"
              value={newStatus.name}
              onChange={(e) => setNewStatus({ ...newStatus, name: e.target.value })}
              placeholder="Название статуса"
            />
          </div>
          <div>
            <Label htmlFor="statusColor">Цвет</Label>
            <Input
              id="statusColor"
              type="color"
              value={newStatus.color}
              onChange={(e) => setNewStatus({ ...newStatus, color: e.target.value })}
            />
          </div>
          <Button onClick={handleAddStatus}>Добавить статус</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название</TableHead>
              <TableHead>Цвет</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {statuses.map((status) => (
              <TableRow key={status.id}>
                <TableCell>{status.name}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded mr-2" style={{ backgroundColor: status.color }}></div>
                    {status.color}
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteStatus(status.id)}>
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Остальной код компонента остается без изменений */}
    </div>
  );
}