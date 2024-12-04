import React, { useState } from 'react';
import { TaskTimer } from './TaskTimer';
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORIES } from '@/constants/categories';
import { format } from 'date-fns';
import type { Task } from '@/types/calendar';
import type { Client } from '@/types/client';

interface TaskDetailsProps {
  task: Task;
  clients: Client[];
  onToggle: (taskId: string) => void;
  onTimeUpdate: (taskId: string, timeSpent: number) => void;
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
  onClientSelect: (taskId: string, clientId: string) => void;
}

export const TaskDetails: React.FC<TaskDetailsProps> = ({
  task,
  clients,
  onToggle,
  onTimeUpdate,
  onTaskUpdate,
  onClientSelect,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(task.notes || '');
  const [startTime, setStartTime] = useState(task.startTime || '');
  const [endTime, setEndTime] = useState(task.endTime || '');

  const handleBlur = () => {
    setIsEditing(false);
    onTaskUpdate(task.id, {
      notes,
      startTime,
      endTime,
      updatedAt: new Date()
    });
  };

  return (
    <div className={`p-3 rounded-lg ${CATEGORIES[task.category].color}`}>
      <div className="flex items-start gap-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
        />
        <div className="flex-1">
          <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </h4>
          
          <div className="mt-3 space-y-2">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Client</label>
              <Select
                value={task.clientId}
                onValueChange={(value) => onClientSelect(task.id, value)}
              >
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map(client => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">Start Time</label>
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  onBlur={handleBlur}
                  className="h-8 text-sm"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">End Time</label>
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  onBlur={handleBlur}
                  className="h-8 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Notes</label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onBlur={handleBlur}
                placeholder="Add notes..."
                className="text-sm min-h-[80px] resize-none"
              />
            </div>
          </div>

          <div className="mt-3">
            <TaskTimer task={task} onTimeUpdate={onTimeUpdate} />
          </div>

          <div className="mt-2 space-y-1 text-xs text-gray-500">
            <p>Created: {format(new Date(task.createdAt), 'MMM d, yyyy h:mm a')}</p>
            <p>Last updated: {format(new Date(task.updatedAt), 'MMM d, yyyy h:mm a')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};