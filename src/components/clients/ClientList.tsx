import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from 'lucide-react';
import { ClientListItem } from './ClientListItem';
import type { Client, TimeEntry } from '@/types/client';

interface ClientListProps {
  clients: Client[];
  timeEntries: TimeEntry[];
  onAddClient: (name: string) => void;
  onSelectClient: (clientId: string) => void;
  selectedClientId: string | null;
}

export const ClientList: React.FC<ClientListProps> = ({
  clients,
  timeEntries,
  onAddClient,
  onSelectClient,
  selectedClientId,
}) => {
  const [newClientName, setNewClientName] = useState('');

  const getClientTotalTime = (clientId: string): number => {
    return timeEntries
      .filter(entry => entry.clientId === clientId)
      .reduce((total, entry) => total + entry.duration, 0);
  };

  const handleSubmit = () => {
    if (newClientName.trim()) {
      onAddClient(newClientName.trim());
      setNewClientName('');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Clients</h2>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={newClientName}
            onChange={(e) => setNewClientName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Add new client..."
            className="flex-1"
          />
          <Button 
            size="sm"
            onClick={handleSubmit}
            disabled={!newClientName.trim()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {clients.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              No clients yet
            </div>
          ) : (
            clients.map(client => (
              <ClientListItem
                key={client.id}
                client={client}
                isSelected={client.id === selectedClientId}
                totalTime={getClientTotalTime(client.id)}
                onClick={() => onSelectClient(client.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};