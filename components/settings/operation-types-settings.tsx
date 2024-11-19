"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Фиксированные типы операций
const operationTypes = ['Доходы', 'Расходы'];

// Начальные данные для статей операций
const initialOperationArticles = [
  { id: 1, name: 'Оплата от клиента', type: 'Доходы' },
  { id: 2, name: 'Закупка материалов', type: 'Расходы' },
  { id: 3, name: 'Зарплата', type: 'Расходы' },
];

export default function OperationTypesSettings() {
  const [operationArticles, setOperationArticles] = useState(initialOperationArticles);
  const [newArticle, setNewArticle] = useState({ name: '', type: '' });

  const handleAddArticle = () => {
    if (newArticle.name && newArticle.type) {
      setOperationArticles([...operationArticles, { id: Date.now(), ...newArticle }]);
      setNewArticle({ name: '', type: '' });
    }
  };

  const handleDeleteArticle = (id) => {
    setOperationArticles(operationArticles.filter(article => article.id !== id));
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Типы операций</h3>
        <ul className="list-disc list-inside">
          {operationTypes.map((type, index) => (
            <li key={index}>{type}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Статьи операций</h3>
        <div className="space-y-4 mb-4">
          <div>
            <Label htmlFor="articleName">Название статьи</Label>
            <Input
              id="articleName"
              value={newArticle.name}
              onChange={(e) => setNewArticle({ ...newArticle, name: e.target.value })}
              placeholder="Название статьи"
            />
          </div>
          <div>
            <Label htmlFor="articleType">Тип</Label>
            <Select
              value={newArticle.type}
              onValueChange={(value) => setNewArticle({ ...newArticle, type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите тип" />
              </SelectTrigger>
              <SelectContent>
                {operationTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleAddArticle}>Добавить статью</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название</TableHead>
              <TableHead>Тип</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {operationArticles.map((article) => (
              <TableRow key={article.id}>
                <TableCell>{article.name}</TableCell>
                <TableCell>{article.type}</TableCell>
                <TableCell>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteArticle(article.id)}>
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}