import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from 'lucide-react';
import { Task } from '../calendar/Task';
import type { Task as TaskType } from '@/types/calendar';

interface OngoingTasksProps {
  tasks: TaskType[];
  onAddTask: (title: string) => void;
  onToggleTask: (taskId: string) => void;
}

export const OngoingTasks: React.FC<OngoingTasksProps> = ({
  tasks,
  onAddTask,
  onToggleTask,
}) => {
  const [newTask, setNewTask] = useState('');

  const handleSubmit = () => {
    if (newTask.trim()) {
      onAddTask(newTask.trim());
      setNewTask('');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Ongoing Tasks</h2>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Add ongoing task..."
            className="flex-1"
          />
          <Button 
            size="sm"
            onClick={handleSubmit}
            disabled={!newTask.trim()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {tasks.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              No ongoing tasks
            </div>
          ) : (
            tasks.map(task => (
              <Task
                key={task.id}
                task={task}
                onToggle={() => onToggleTask(task.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};