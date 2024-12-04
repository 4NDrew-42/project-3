import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TaskInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  disabled: boolean;
  placeholder: string;
}

export const TaskInput: React.FC<TaskInputProps> = ({ 
  value, 
  onChange, 
  onSubmit, 
  disabled, 
  placeholder 
}) => (
  <div className="flex gap-4">
    <Input
      type="text"
      value={value}
      onChange={onChange}
      onKeyPress={(e) => e.key === 'Enter' && onSubmit()}
      placeholder={placeholder}
      className="flex-1"
      disabled={disabled}
    />
    <Button 
      onClick={onSubmit}
      disabled={disabled || !value.trim()}
    >
      Add Task
    </Button>
  </div>
);