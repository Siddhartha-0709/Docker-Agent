// ==================== NetworkList.jsx ====================
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDocker } from '../../context/dockerContext';

export function NetworkList({ onSelect }) {
  const { fetchData, selectedItem } = useDocker();
  const [networks, setNetworks] = useState([]);

  useEffect(() => {
    loadNetworks();
  }, []);

  const loadNetworks = async () => {
    try {
      const data = await fetchData('/networks/networks');
      setNetworks(data);
    } catch (error) {
      console.error('Failed to load networks:', error);
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-2">
        {networks.map((network) => (
          <Card
            key={network.Id}
            className={`p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedItem?.Id === network.Id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => onSelect(network)}
          >
            <h3 className="font-semibold text-base mb-2">{network.Name}</h3>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                ID: {network.Id.substring(0, 12)}
              </p>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">{network.Driver}</Badge>
                <Badge variant="outline">{network.Scope}</Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}

