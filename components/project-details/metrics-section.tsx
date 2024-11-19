"use client"

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface MetricsSectionProps {
  metrics: {
    // Financial metrics
    plannedCost: number;
    cost: number;
    plannedRevenue: number;
    revenue: number;
    plannedExpenses: number;
    expenses: number;
    // Production metrics
    plannedEffort: number;
    effort: number;
    plannedProgress: number;
    progress: number;
    // Productivity metrics
    totalTasks: number;
    completedTasks: number;
    plannedProductivity: number;
    actualProductivity: number;
  };
  onMetricsUpdate: (newMetrics: any) => void;
}

export function MetricsSection({ metrics, onMetricsUpdate }: MetricsSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMetrics, setEditedMetrics] = useState(metrics);

  const handleSave = () => {
    onMetricsUpdate(editedMetrics);
    setIsEditing(false);
  };

  const handleChange = (key: string, value: string) => {
    setEditedMetrics(prev => ({
      ...prev,
      [key]: parseFloat(value) || 0
    }));
  };

  const renderValue = (planned: number, actual: number, isFinancial = false) => {
    if (isEditing) {
      return (
        <div className="space-y-2">
          <Input
            type="number"
            value={planned}
            onChange={(e) => handleChange(`planned${actual}`, e.target.value)}
            className="w-32"
          />
          <Input
            type="number"
            value={actual}
            onChange={(e) => handleChange(actual.toString(), e.target.value)}
            className="w-32"
          />
        </div>
      );
    }
    return (
      <>
        <div>{isFinancial ? planned.toLocaleString() : planned}</div>
        <div>{isFinancial ? actual.toLocaleString() : actual}</div>
      </>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Показатели проекта</h3>
        <Button onClick={isEditing ? handleSave : () => setIsEditing(true)}>
          {isEditing ? "Сохранить" : "Изменить"}
        </Button>
      </div>

      {/* Financial Metrics */}
      <div>
        <h4 className="font-medium mb-2">Финансовые показатели</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Показатель</TableHead>
              <TableHead>План/Факт</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Стоимость (руб)</TableCell>
              <TableCell>{renderValue(metrics.plannedCost, metrics.cost, true)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Доходы (руб)</TableCell>
              <TableCell>{renderValue(metrics.plannedRevenue, metrics.revenue, true)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Расходы (руб)</TableCell>
              <TableCell>{renderValue(metrics.plannedExpenses, metrics.expenses, true)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Прибыль (руб)</TableCell>
              <TableCell>
                {isEditing ? "-" : (
                  <>
                    <div>{(metrics.plannedRevenue - metrics.plannedExpenses).toLocaleString()}</div>
                    <div>{(metrics.revenue - metrics.expenses).toLocaleString()}</div>
                  </>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Production Metrics */}
      <div>
        <h4 className="font-medium mb-2">Производственные показатели</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Показатель</TableHead>
              <TableHead>План/Факт</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Трудоемкость (ч)</TableCell>
              <TableCell>{renderValue(metrics.plannedEffort, metrics.effort)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Прогресс (%)</TableCell>
              <TableCell>
                {isEditing ? (
                  <div className="space-y-2">
                    <Input
                      type="number"
                      value={metrics.plannedProgress}
                      onChange={(e) => handleChange('plannedProgress', e.target.value)}
                      className="w-32"
                    />
                    <Input
                      type="number"
                      value={metrics.progress}
                      onChange={(e) => handleChange('progress', e.target.value)}
                      className="w-32"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div>{metrics.plannedProgress}%</div>
                    <div className="flex items-center">
                      <Progress value={metrics.progress} className="w-[60px] mr-2" />
                      <span>{metrics.progress}%</span>
                    </div>
                  </div>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Productivity Metrics */}
      <div>
        <h4 className="font-medium mb-2">Продуктивные показатели</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Показатель</TableHead>
              <TableHead>План/Факт</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Задачи (шт)</TableCell>
              <TableCell>
                {isEditing ? (
                  <Input
                    type="number"
                    value={metrics.totalTasks}
                    onChange={(e) => handleChange('totalTasks', e.target.value)}
                    className="w-32"
                  />
                ) : (
                  <div>{metrics.completedTasks} / {metrics.totalTasks}</div>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Продуктивность (задач/час)</TableCell>
              <TableCell>{renderValue(metrics.plannedProductivity, metrics.actualProductivity)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}