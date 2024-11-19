"use client"

import { LayoutList, LayoutGrid, Trello } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type ViewMode = 'list' | 'grid' | 'kanban';

interface ProjectViewSelectorProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const views = [
  { id: 'list', label: 'Список', icon: LayoutList },
  { id: 'grid', label: 'Сетка', icon: LayoutGrid },
  { id: 'kanban', label: 'Канбан', icon: Trello },
] as const;

export function ProjectViewSelector({ currentView, onViewChange }: ProjectViewSelectorProps) {
  const currentViewData = views.find(view => view.id === currentView);
  const CurrentIcon = currentViewData?.icon || LayoutList;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <CurrentIcon className="h-4 w-4" />
          <span>{currentViewData?.label || 'Вид'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {views.map((view) => (
          <DropdownMenuItem
            key={view.id}
            onClick={() => onViewChange(view.id)}
            className="gap-2"
          >
            <view.icon className="h-4 w-4" />
            <span>{view.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}