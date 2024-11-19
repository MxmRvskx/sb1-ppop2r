"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TableCell, TableRow } from "@/components/ui/table"
import { useState } from "react"

const statusColors = {
  'Открыт': 'bg-blue-500',
  'В работе': 'bg-green-500',
  'Пауза': 'bg-yellow-500',
  'Закрыт': 'bg-gray-500'
};

const stages = [
  'Планирование',
  'Разработка',
  'Тестирование',
  'Завершение'
];

interface StatusSectionProps {
  initialStatus: string;
  initialStage: string;
  onStatusUpdate: (newStatus: string) => void;
  onStageUpdate: (newStage: string) => void;
}

export function StatusSection({ 
  initialStatus, 
  initialStage,
  onStatusUpdate,
  onStageUpdate 
}: StatusSectionProps) {
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [isEditingStage, setIsEditingStage] = useState(false);
  const [status, setStatus] = useState(initialStatus);
  const [stage, setStage] = useState(initialStage);

  const handleSaveStatus = () => {
    onStatusUpdate(status);
    setIsEditingStatus(false);
  };

  const handleSaveStage = () => {
    onStageUpdate(stage);
    setIsEditingStage(false);
  };

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">Статус</TableCell>
        <TableCell>
          {isEditingStatus ? (
            <Select
              value={status}
              onValueChange={setStatus}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите статус" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(statusColors).map((statusOption) => (
                  <SelectItem key={statusOption} value={statusOption}>
                    {statusOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Badge className={`${statusColors[status]} text-white`}>
              {status}
            </Badge>
          )}
        </TableCell>
        <TableCell>
          {isEditingStatus ? (
            <Button onClick={handleSaveStatus}>Сохранить</Button>
          ) : (
            <Button variant="outline" onClick={() => setIsEditingStatus(true)}>
              Изменить
            </Button>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">Стадия</TableCell>
        <TableCell>
          {isEditingStage ? (
            <Select
              value={stage}
              onValueChange={setStage}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите стадию" />
              </SelectTrigger>
              <SelectContent>
                {stages.map((stageOption) => (
                  <SelectItem key={stageOption} value={stageOption}>
                    {stageOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Badge variant="outline">
              {stage}
            </Badge>
          )}
        </TableCell>
        <TableCell>
          {isEditingStage ? (
            <Button onClick={handleSaveStage}>Сохранить</Button>
          ) : (
            <Button variant="outline" onClick={() => setIsEditingStage(true)}>
              Изменить
            </Button>
          )}
        </TableCell>
      </TableRow>
    </>
  );
}