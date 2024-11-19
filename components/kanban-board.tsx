"use client"

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Моковые данные для этапов и проектов
const initialStages = [
  { id: 'stage1', title: 'Планирование', color: '#FFD700' },
  { id: 'stage2', title: 'Разработка', color: '#00CED1' },
  { id: 'stage3', title: 'Тестирование', color: '#FF69B4' },
  { id: 'stage4', title: 'Завершение', color: '#32CD32' },
];

const initialProjects = [
  { id: 'project1', title: 'Проект A', stage: 'stage1' },
  { id: 'project2', title: 'Проект B', stage: 'stage2' },
  { id: 'project3', title: 'Проект C', stage: 'stage1' },
  { id: 'project4', title: 'Проект D', stage: 'stage3' },
  { id: 'project5', title: 'Проект E', stage: 'stage2' },
];

export default function KanbanBoard() {
  const [stages] = useState(initialStages);
  const [projects, setProjects] = useState(initialProjects);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

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
          <div key={stage.id} className="flex-shrink-0 w-72">
            <Card className="h-full">
              <CardHeader style={{ backgroundColor: stage.color }}>
                <CardTitle>{stage.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Droppable droppableId={stage.id}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="min-h-[200px]"
                    >
                      {projects
                        .filter(project => project.stage === stage.id)
                        .map((project, index) => (
                          <Draggable key={project.id} draggableId={project.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-white p-4 mb-2 rounded shadow"
                              >
                                {project.title}
                              </div>
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