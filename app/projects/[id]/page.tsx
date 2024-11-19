import { ProjectDetails } from '@/components/project-details';

// Моковые данные для проекта (в реальном приложении эти данные будут загружаться с сервера)
const mockProjects = [
  { 
    id: '1', 
    name: 'Проект A', 
    effort: 100, 
    cost: 50000, 
    progress: 75, 
    startDate: '2023-06-01', 
    endDate: '2023-12-31', 
    status: 'В работе', 
    stage: 'Разработка', 
    plannedEffort: 90, 
    plannedCost: 45000, 
    plannedProgress: 80
  },
  { 
    id: '2', 
    name: 'Проект B', 
    effort: 150, 
    cost: 75000, 
    progress: 50, 
    startDate: '2023-07-15', 
    endDate: '2024-03-31', 
    status: 'Пауза', 
    stage: 'Тестирование', 
    plannedEffort: 140, 
    plannedCost: 70000, 
    plannedProgress: 60
  },
  { 
    id: '3', 
    name: 'Проект C', 
    effort: 200, 
    cost: 100000, 
    progress: 25, 
    startDate: '2023-08-01', 
    endDate: '2024-06-30', 
    status: 'Открыт', 
    stage: 'Планирование', 
    plannedEffort: 180, 
    plannedCost: 90000, 
    plannedProgress: 30
  },
  { 
    id: '4', 
    name: 'Проект D', 
    effort: 80, 
    cost: 40000, 
    progress: 100, 
    startDate: '2023-09-01', 
    endDate: '2023-11-30', 
    status: 'Закрыт', 
    stage: 'Завершение', 
    plannedEffort: 75, 
    plannedCost: 38000, 
    plannedProgress: 100
  },
  { 
    id: '5', 
    name: 'Проект E', 
    effort: 120, 
    cost: 60000, 
    progress: 10, 
    startDate: '2023-10-01', 
    endDate: '2024-04-30', 
    status: 'В работе', 
    stage: 'Разработка', 
    plannedEffort: 110, 
    plannedCost: 55000, 
    plannedProgress: 15
  },
];

export function generateStaticParams() {
  return mockProjects.map((project) => ({
    id: project.id.toString()
  }));
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = mockProjects.find(p => p.id === params.id);

  if (!project) {
    return <div>Проект не найден</div>;
  }

  return <ProjectDetails project={project} />;
}