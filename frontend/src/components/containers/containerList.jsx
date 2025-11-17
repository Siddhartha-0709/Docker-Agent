import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDocker } from '../../context/dockerContext';

export default function ContainerList({ onSelect }) {
  const { fetchData, selectedItem } = useDocker();
  const [containers, setContainers] = useState([]);

  useEffect(() => {
    loadContainers();
  }, []);

  const loadContainers = async () => {
    try {
      const data = await fetchData('/containers/getAll');
      setContainers(data);
    } catch (error) {
      console.error('Failed to load containers:', error);
    }
  };

  const getStatusColor = (state) => {
    switch (state) {
      case 'running':
        return 'bg-green-600';
      case 'exited':
        return 'bg-gray-600';
      case 'paused':
        return 'bg-yellow-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-2">
        {containers.map((container) => (
          <Card
            key={container.Id}
            className={`p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedItem?.Id === container.Id
                ? 'ring-2 ring-primary'
                : ''
            }`}
            onClick={() => onSelect(container)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base truncate">
                  {container.Names[0].replace('/', '')}
                </h3>
                <p className="text-sm text-muted-foreground truncate">
                  {container.Image}
                </p>
              </div>
              <Badge className={getStatusColor(container.State)}>
                {container.State}
              </Badge>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                ID: {container.Id.substring(0, 12)}
              </p>
              <p className="text-xs text-muted-foreground">
                {container.Status}
              </p>
            </div>
          </Card>
        ))}

        {containers.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No containers found</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}