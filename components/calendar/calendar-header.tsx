"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Calendar as CalendarIcon, Settings } from "lucide-react"

export function CalendarHeader() {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-2">
        <CalendarIcon className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Календарь</h2>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            Показывать выходные
          </DropdownMenuItem>
          <DropdownMenuItem>
            Рабочие часы
          </DropdownMenuItem>
          <DropdownMenuItem>
            Часовой пояс
          </DropdownMenuItem>
          <DropdownMenuItem>
            Формат даты
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}