"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AddProjectForm } from '@/components/add-project-form';
import { ProjectViewSelector } from '@/components/projects/project-view-selector';
import { ProjectList } from '@/components/projects/project-list';
import { ProjectGrid } from '@/components/projects/project-grid';
import { ProjectKanban } from '@/components/projects/project-kanban';

type ViewMode = 'list' | 'grid' | 'kanban';

export default function ProjectsPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const renderProjectView = () => {
    switch (viewMode) {
      case 'grid':
        return <ProjectGrid />;
      case 'kanban':
        return <ProjectKanban />;
      default:
        return <ProjectList />;
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Проекты</h1>
        <div className="flex items-center gap-4">
          <ProjectViewSelector currentView={viewMode} onViewChange={setViewMode} />
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? 'Отменить' : 'Добавить проект'}
          </Button>
        </div>
      </div>

      {showAddForm && <AddProjectForm onAddProject={() => setShowAddForm(false)} />}
      
      {renderProjectView()}
    </div>
  );
}