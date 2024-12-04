import React from 'react';
import { DayViewHeader } from './DayViewHeader';
import { TaskDetails } from './TaskDetails';
import { Card } from "@/components/ui/card";
import type { Task } from '@/types/calendar';
import type { Client } from '@/types/client';

interface DayViewProps {
  selectedDate: Date | null;
  tasks: Task[];
  clients: Client[];
  onToggleTask: (taskId: string) => void;
  onTimeUpdate: (taskId: string, timeSpent: number) => void;
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
  onClientSelect: (taskId: string, clientId: string) => void;
}

export const DayView: React.FC<DayViewProps> = ({
  selectedDate,
  tasks,
  clients,
  onToggleTask,
  onTimeUpdate,
  onTaskUpdate,
  onClientSelect
}) => {
  if (!selectedDate) {
    return (
      <Card className="w-96 p-6">
        <div className="text-center text-gray-500">
          Select a day to view details
        </div>
      </Card>
    );
  }

  const dayTasks = tasks.filter(task => 
    new Date(task.date).toDateString() === selectedDate.toDateString()
  );

  return (
    <Card className="w-96 p-6">
      <DayViewHeader selectedDate={selectedDate} />
      
      <div className="mt-6 space-y-4">
        {dayTasks.length === 0 ? (
          <div className="text-center text-gray-500">
            No tasks for this day
          </div>
        ) : (
          dayTasks.map(task => (
            <TaskDetails
              key={task.id}
              task={task}
              clients={clients}
              onToggle={onToggleTask}
              onTimeUpdate={onTimeUpdate}
              onTaskUpdate={onTaskUpdate}
              onClientSelect={onClientSelect}
            />
          ))
        )}
      </div>
    </Card>
  );
};