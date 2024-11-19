"use client"

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { useState } from 'react';

const initialStages = [
  { id: 'stage1', title: 'Планирование', color: 'bg-purple-100 dark:bg-purple-900' },
  { id: 'stage2', title: 'Разработка', color: 'bg-blue-100 dark:bg-blue-900' },
  { id: 'stage3', title: 'Тестирование', color: 'bg-pink-100 dark:bg-pink-900' },
  { id: 'stage4', title: 'Завершение', color: 'bg-green-100 dark:bg-green-900' },
];

const initialProjects = [
  { id: '1', title: 'Проект A', stage: 'stage1', progress: 25 },
  { id: '2', title: 'Проект B', stage: 'stage2', progress: 50 },
  { id: '3', title: 'Проект C', stage: 'stage1', progress: 75 },
  { id: '4', title: 'Проект D', stage: 'stage3', progress: 90 },
  { id: '5', title: 'Проект E', stage: 'stage2', progress: 30 },
];

export function ProjectKanban() {
  const [stages] = useState(initialStages);
  const [projects, setProjects] = useState(initialProjects);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    setProjects(prevProjects => {
      const newProjects = [...prevProjects];
      const movedProject = newProjects.find(project => project.id === draggableId);
      if (movedProject) {
        movedProject.stage = destination.droppableId;
      }
      return newProjects;
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {stages.map((stage) => (
          <div key={stage.id} className="flex-shrink-0 w-80">
            <Card className="h-full">
              <CardHeader className={`${stage.color}`}>
                <CardTitle className="text-lg">{stage.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <Droppable droppableId={stage.id}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="min-h-[200px] space-y-2"
                    >
                      {projects
                        .filter(project => project.stage === stage.id)
                        .map((project, index) => (
                          <Draggable
                            key={project.id}
                            draggableId={project.id}
                            index={index}
                          >
                            {(provided) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-card"
                              >
                                <CardContent className="p-4 space-y-2">
                                  <Link
                                    href={`/projects/${project.id}`}
                                    className="text-blue-600 hover:underline block"
                                  >
                                    {project.title}
                                  </Link>
                                  <div className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                      <span>Прогресс</span>
                                      <span>{project.progress}%</span>
                                    </div>
                                    <Progress value={project.progress} />
                                  </div>
                                </CardContent>
                              </Card>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}