"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

interface Stage {
  name: string;
  plannedEffort: number;
  effort: number;
  progress: number;
}

interface StagesSectionProps {
  stages: Stage[];
}

export function StagesSection({ stages }: StagesSectionProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Название этапа</TableHead>
          <TableHead>Плановая трудоемкость (ч)</TableHead>
          <TableHead>Фактическая трудоемкость (ч)</TableHead>
          <TableHead>Прогресс (%)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stages.map((stage, index) => (
          <TableRow key={index}>
            <TableCell>{stage.name}</TableCell>
            <TableCell>{stage.plannedEffort}</TableCell>
            <TableCell>{stage.effort}</TableCell>
            <TableCell>
              <div className="flex items-center">
                <Progress value={stage.progress} className="w-[60px] mr-2" />
                <span>{stage.progress}%</span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}