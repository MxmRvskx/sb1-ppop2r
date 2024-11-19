"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';

const mockProjects = [
  { id: '1', name: 'Проект A', effort: 100, cost: 50000, progress: 75, status: 'В работе', stage: 'Разработка' },
  { id: '2', name: 'Проект B', effort: 150, cost: 75000, progress: 50, status: 'Пауза', stage: 'Тестирование' },
  { id: '3', name: 'Проект C', effort: 200, cost: 100000, progress: 25, status: 'Открыт', stage: 'Планирование' },
];

const statusColors = {
  'Открыт': 'bg-blue-500',
  'В работе': 'bg-green-500',
  'Пауза': 'bg-yellow-500',
  'Закрыт': 'bg-gray-500'
};

export function ProjectGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockProjects.map((project) => (
        <Link href={`/projects/${project.id}`} key={project.id}>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <Badge className={`${statusColors[project.status]} text-white`}>
                  {project.status}
                </Badge>
                <span className="text-sm text-muted-foreground">{project.stage}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Прогресс</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} />
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between text-sm">
                  <span>Стоимость:</span>
                  <span>{project.cost.toLocaleString()} ₽</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}