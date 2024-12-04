import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { CATEGORIES } from '@/constants/categories';
import type { Task as TaskType } from '@/types/calendar';

interface TaskProps {
  task: TaskType;
  onToggle: () => void;
}

export const Task: React.FC<TaskProps> = ({ task, onToggle }) => (
  <div className={`flex items-center gap-2 p-1 rounded ${CATEGORIES[task.category].color}`}>
    <Checkbox
      checked={task.completed}
      onCheckedChange={onToggle}
    />
    <span className={`text-sm ${task.completed ? 'line-through text-gray-500' : ''}`}>
      {task.title}
    </span>
  </div>
);