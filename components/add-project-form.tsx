"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function AddProjectForm({ onAddProject, isSubmitting }) {
  const [project, setProject] = useState({
    name: '',
    effort: '',
    cost: '',
    progress: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProject(project);
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Добавить новый проект</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Название проекта</Label>
            <Input
              id="name"
              name="name"
              value={project.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="effort">Трудоемкость (в часах)</Label>
            <Input
              id="effort"
              name="effort"
              type="number"
              value={project.effort}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="cost">Стоимость (в рублях)</Label>
            <Input
              id="cost"
              name="cost"
              type="number"
              value={project.cost}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="progress">Прогресс (%)</Label>
            <Input
              id="progress"
              name="progress"
              type="number"
              min="0"
              max="100"
              value={project.progress}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Добавление...' : 'Добавить проект'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}