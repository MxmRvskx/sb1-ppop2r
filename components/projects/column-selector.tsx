"use client"

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings2 } from 'lucide-react';

interface Column {
  id: string;
  name: string;
  sortable: boolean;
}

interface ColumnSelectorProps {
  allColumns: Column[];
  visibleColumns: string[];
  onColumnToggle: (columnId: string) => void;
}

export function ColumnSelector({ allColumns, visibleColumns, onColumnToggle }: ColumnSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Settings2 className="h-4 w-4" />
          <span>Настройка столбцов</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {allColumns.map((column) => (
          <DropdownMenuItem
            key={column.id}
            className="flex items-center space-x-2"
            onSelect={(e) => {
              e.preventDefault();
              onColumnToggle(column.id);
            }}
          >
            <Checkbox
              checked={visibleColumns.includes(column.id)}
              onCheckedChange={() => onColumnToggle(column.id)}
            />
            <span>{column.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}