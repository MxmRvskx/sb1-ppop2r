"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { TableCell, TableRow } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface InfoSectionProps {
  projectInfo: {
    description: string;
    client: string;
    manager: string;
    startDate: Date;
    endDate: Date;
    priority: string;
    category: string;
  };
  onInfoUpdate: (newInfo: any) => void;
}

export function InfoSection({ projectInfo, onInfoUpdate }: InfoSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [info, setInfo] = useState(projectInfo);

  const handleSave = () => {
    onInfoUpdate(info);
    setIsEditing(false);
  };

  const handleChange = (key: string, value: any) => {
    setInfo(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <>
      <TableRow>
        <TableCell colSpan={2} className="text-right">
          <Button onClick={isEditing ? handleSave : () => setIsEditing(true)}>
            {isEditing ? "Сохранить" : "Изменить"}
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">Описание</TableCell>
        <TableCell>
          {isEditing ? (
            <Textarea
              value={info.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="min-h-[100px]"
            />
          ) : (
            <p className="whitespace-pre-wrap">{info.description}</p>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">Заказчик</TableCell>
        <TableCell>
          {isEditing ? (
            <Input
              value={info.client}
              onChange={(e) => handleChange('client', e.target.value)}
            />
          ) : (
            info.client
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">Руководитель проекта</TableCell>
        <TableCell>
          {isEditing ? (
            <Input
              value={info.manager}
              onChange={(e) => handleChange('manager', e.target.value)}
            />
          ) : (
            info.manager
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">Сроки</TableCell>
        <TableCell>
          {isEditing ? (
            <div className="flex items-center gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(info.startDate, 'PPP')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={info.startDate}
                    onSelect={(date) => date && handleChange('startDate', date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <span>—</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(info.endDate, 'PPP')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={info.endDate}
                    onSelect={(date) => date && handleChange('endDate', date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>{format(info.startDate, 'PPP')}</span>
              <span>—</span>
              <span>{format(info.endDate, 'PPP')}</span>
            </div>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">Приоритет</TableCell>
        <TableCell>
          {isEditing ? (
            <Input
              value={info.priority}
              onChange={(e) => handleChange('priority', e.target.value)}
            />
          ) : (
            info.priority
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">Категория</TableCell>
        <TableCell>
          {isEditing ? (
            <Input
              value={info.category}
              onChange={(e) => handleChange('category', e.target.value)}
            />
          ) : (
            info.category
          )}
        </TableCell>
      </TableRow>
    </>
  );
}