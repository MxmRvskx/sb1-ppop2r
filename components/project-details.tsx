"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

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

export function ProjectDetails({ project }) {
  const [currentProject, setCurrentProject] = useState(project);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async (updates: any) => {
    try {
      setCurrentProject(prev => ({
        ...prev,
        ...updates
      }));
      setIsEditing(false);
      toast.success("Проект обновлен");
    } catch (error) {
      toast.error("Не удалось обновить проект");
      console.error("Error updating project:", error);
    }
  };

  const calculateVariance = (planned: number, actual: number) => {
    return ((actual - planned) / planned * 100).toFixed(1);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{currentProject.name}</CardTitle>
          <Button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Сохранить" : "Редактировать"}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Project Overview - Left Column */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Статус и стадия</h3>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Select
                        value={currentProject.status}
                        onValueChange={(value) => handleUpdate({ status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Статус" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(statusColors).map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={currentProject.stage}
                        onValueChange={(value) => handleUpdate({ stage: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Стадия" />
                        </SelectTrigger>
                        <SelectContent>
                          {stages.map((stage) => (
                            <SelectItem key={stage} value={stage}>
                              {stage}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </>
                  ) : (
                    <>
                      <Badge className={`${statusColors[currentProject.status]} text-white`}>
                        {currentProject.status}
                      </Badge>
                      <Badge variant="outline">{currentProject.stage}</Badge>
                    </>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Описание</h3>
                {isEditing ? (
                  <Textarea
                    value={currentProject.description || ''}
                    onChange={(e) => handleUpdate({ description: e.target.value })}
                    className="min-h-[100px]"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{currentProject.description || 'Нет описания'}</p>
                )}
              </div>
            </div>

            {/* Project Overview - Right Column */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Сроки</h3>
                {isEditing ? (
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {format(new Date(currentProject.startDate), 'PP')}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={new Date(currentProject.startDate)}
                          onSelect={(date) => date && handleUpdate({ startDate: date })}
                        />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {format(new Date(currentProject.endDate), 'PP')}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={new Date(currentProject.endDate)}
                          onSelect={(date) => date && handleUpdate({ endDate: date })}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                ) : (
                  <div className="flex gap-2 text-sm">
                    <span>{format(new Date(currentProject.startDate), 'PP')}</span>
                    <span>—</span>
                    <span>{format(new Date(currentProject.endDate), 'PP')}</span>
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Прогресс</h3>
                <div className="flex items-center gap-2">
                  <Progress value={currentProject.progress} className="flex-1" />
                  <span className="text-sm font-medium">{currentProject.progress}%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ключевые показатели</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Показатель</TableHead>
                <TableHead className="text-right">План</TableHead>
                <TableHead className="text-right">Факт</TableHead>
                <TableHead className="text-right">Отклонение</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Стоимость (руб)</TableCell>
                <TableCell className="text-right">{currentProject.plannedCost.toLocaleString()}</TableCell>
                <TableCell className="text-right">{currentProject.cost.toLocaleString()}</TableCell>
                <TableCell className="text-right">{calculateVariance(currentProject.plannedCost, currentProject.cost)}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Трудоемкость (ч)</TableCell>
                <TableCell className="text-right">{currentProject.plannedEffort}</TableCell>
                <TableCell className="text-right">{currentProject.effort}</TableCell>
                <TableCell className="text-right">{calculateVariance(currentProject.plannedEffort, currentProject.effort)}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Прогресс (%)</TableCell>
                <TableCell className="text-right">{currentProject.plannedProgress}</TableCell>
                <TableCell className="text-right">{currentProject.progress}</TableCell>
                <TableCell className="text-right">{calculateVariance(currentProject.plannedProgress, currentProject.progress)}%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}