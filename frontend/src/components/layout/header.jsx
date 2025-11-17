import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDocker } from '../../context/dockerContext';

export default function Header({ onRefresh }) {
  const { activeTab, loading } = useDocker();

  return (
    <div className="border-b bg-card">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-2xl font-bold capitalize">{activeTab}</h2>
          <p className="text-sm text-muted-foreground">
            Manage your Docker {activeTab}
          </p>
        </div>
        
        <Button
          variant="outline"
          onClick={onRefresh}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
    </div>
  );
}