"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Моковые данные для выпадающих списков
const mockContractors = ['ООО "Рога и копыта"', 'ИП Иванов', 'АО "Техно"'];
const mockProjects = ['Проект A', 'Проект B', 'Проект C'];
const mockProjectStages = ['Этап 1', 'Этап 2', 'Этап 3'];
const mockOperationArticles = ['Оплата услуг', 'Закупка материалов', 'Зарплата', 'Аванс по проекту'];
const operationTypes = ['Доходы', 'Расходы'];

export function AddOperationForm({ onAddOperation }) {
  const [operation, setOperation] = useState({
    type: 'Расходы',
    amount: '',
    date: '',
    contractor: '',
    project: '',
    projectStage: '',
    article: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOperation(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setOperation(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddOperation(operation);
    console.log('Отправка операции:', operation);
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Добавить новую операцию</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="type">Тип операции</Label>
            <Select name="type" value={operation.type} onValueChange={(value) => handleSelectChange('type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите тип операции" />
              </SelectTrigger>
              <SelectContent>
                {operationTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="amount">Сумма (в рублях)</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              value={operation.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="date">Дата операции</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={operation.date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="contractor">Контрагент</Label>
            <Select name="contractor" onValueChange={(value) => handleSelectChange('contractor', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите контрагента" />
              </SelectTrigger>
              <SelectContent>
                {mockContractors.map((contractor) => (
                  <SelectItem key={contractor} value={contractor}>{contractor}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="project">Проект</Label>
            <Select name="project" onValueChange={(value) => handleSelectChange('project', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите проект" />
              </SelectTrigger>
              <SelectContent>
                {mockProjects.map((project) => (
                  <SelectItem key={project} value={project}>{project}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="projectStage">Этап проекта</Label>
            <Select name="projectStage" onValueChange={(value) => handleSelectChange('projectStage', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите этап проекта" />
              </SelectTrigger>
              <SelectContent>
                {mockProjectStages.map((stage) => (
                  <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="article">Статья</Label>
            <Select name="article" onValueChange={(value) => handleSelectChange('article', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите статью" />
              </SelectTrigger>
              <SelectContent>
                {mockOperationArticles.map((article) => (
                  <SelectItem key={article} value={article}>{article}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Описание</Label>
            <Input
              id="description"
              name="description"
              value={operation.description}
              onChange={handleChange}
            />
          </div>

          <Button type="submit">Добавить операцию</Button>
        </form>
      </CardContent>
    </Card>
  );
}