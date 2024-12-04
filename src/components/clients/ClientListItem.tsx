import React from 'react';
import { formatDuration } from '@/lib/time-utils';
import type { Client } from '@/types/client';

interface ClientListItemProps {
  client: Client;
  isSelected: boolean;
  totalTime: number;
  onClick: () => void;
}

export const ClientListItem: React.FC<ClientListItemProps> = ({
  client,
  isSelected,
  totalTime,
  onClick,
}) => (
  <div
    onClick={onClick}
    className={`p-4 rounded-lg cursor-pointer transition-colors
      ${isSelected ? 'bg-gray-100 ring-2 ring-gray-200' : 'hover:bg-gray-50'}`}
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-medium">{client.name}</h3>
        {client.company && (
          <p className="text-sm text-gray-500">{client.company}</p>
        )}
      </div>
      <div className="text-sm text-gray-500">
        {formatDuration(totalTime)}
      </div>
    </div>
  </div>
);