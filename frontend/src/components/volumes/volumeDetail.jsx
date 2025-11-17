
// ==================== VolumeDetails.jsx ====================
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useDocker } from '../../context/dockerContext';

export default function VolumeDetails({ volume, onUpdate }) {
  const { performAction } = useDocker();

  const handleDelete = async () => {
    try {
      await performAction(
        `/volumes/delete?volumeName=${volume.Name}`,
        'delete'
      );
      onUpdate();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{volume.Name}</h2>
            <p className="text-sm text-muted-foreground">Docker Volume</p>
          </div>

          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>

        <Separator />

        <div className="grid grid-cols-1 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Driver
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">{volume.Driver}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Mount Point
              </CardTitle>
            </CardHeader>
            <CardContent>
              <code className="text-sm bg-muted px-2 py-1 rounded break-all">
                {volume.Mountpoint}
              </code>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Created
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">
                {new Date(volume.CreatedAt).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}