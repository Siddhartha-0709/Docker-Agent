/* eslint-disable no-undef */
/* eslint-disable react-hooks/immutability */

// ==================== VolumeList.jsx ====================
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDocker } from '../../context/dockerContext';
import React, { useEffect, useState } from 'react';
export function VolumeList({ onSelect }) {
  const { fetchData, selectedItem } = useDocker();
  const [volumes, setVolumes] = useState([]);

  useEffect(() => {
    loadVolumes();
  }, []);

  const loadVolumes = async () => {
    try {
      const data = await fetchData('/volumes/list');
      setVolumes(data.Volumes || []);
    } catch (error) {
      console.error('Failed to load volumes:', error);
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-2">
        {volumes.map((volume) => (
          <Card
            key={volume.Name}
            className={`p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedItem?.Name === volume.Name ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => onSelect(volume)}
          >
            <h3 className="font-semibold text-base mb-2">{volume.Name}</h3>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                Driver: {volume.Driver}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {volume.Mountpoint}
              </p>
            </div>
          </Card>
        ))}

        {volumes.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No volumes found</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
