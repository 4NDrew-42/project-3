import React from 'react';
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ClientList } from './ClientList';
import { OngoingTasks } from './OngoingTasks';
import type { Client, TimeEntry } from '@/types/client';
import type { Task } from '@/types/calendar';

interface ClientSectionProps {
  clients: Client[];
  timeEntries: TimeEntry[];
  ongoingTasks: Task[];
  onAddClient: (name: string) => void;
  onSelectClient: (clientId: string) => void;
  selectedClientId: string | null;
  onAddOngoingTask: (title: string) => void;
  onToggleOngoingTask: (taskId: string) => void;
}

export const ClientSection: React.FC<ClientSectionProps> = ({
  clients,
  timeEntries,
  ongoingTasks,
  onAddClient,
  onSelectClient,
  selectedClientId,
  onAddOngoingTask,
  onToggleOngoingTask,
}) => {
  return (
    <Card className="w-96 p-6">
      <div className="space-y-6">
        <ClientList
          clients={clients}
          timeEntries={timeEntries}
          onAddClient={onAddClient}
          onSelectClient={onSelectClient}
          selectedClientId={selectedClientId}
        />
        
        <Separator />
        
        <OngoingTasks
          tasks={ongoingTasks}
          onAddTask={onAddOngoingTask}
          onToggleTask={onToggleOngoingTask}
        />
      </div>
    </Card>
  );
};