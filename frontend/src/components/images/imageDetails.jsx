// ==================== ImageDetails.jsx ====================
import React from 'react';
import { Play, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useDocker } from '../../context/dockerContext';

export default function ImageDetails({ image, onUpdate }) {
  const { performAction } = useDocker();

  const handleAction = async (action) => {
    try {
      if (action === 'run') {
        await performAction(
          `/images/runImage?id=${image.RepoTags?.[0] || image.Id}`,
          'post'
        );
      } else if (action === 'delete') {
        await performAction(`/images/deleteImage?id=${image.Id}`, 'delete');
      }
      onUpdate();
    } catch (error) {
      console.error('Action failed:', error);
    }
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              {image.RepoTags?.[0] || 'Untagged Image'}
            </h2>
            <p className="text-sm text-muted-foreground">Docker Image</p>
          </div>

          <div className="flex gap-2">
            <Button variant="default" size="sm" onClick={() => handleAction('run')}>
              <Play className="h-4 w-4 mr-2" />
              Run
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleAction('delete')}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>Image ID</CardTitle>
          </CardHeader>
          <CardContent>
            <code className="text-sm bg-muted px-2 py-1 rounded break-all">
              {image.Id}
            </code>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Size
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">{formatBytes(image.Size)}</p>
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
                {new Date(image.Created * 1000).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        </div>

        {image.RepoDigests?.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Repository Digests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {image.RepoDigests.map((digest, i) => (
                <code key={i} className="text-xs bg-muted px-2 py-1 rounded block break-all">
                  {digest}
                </code>
              ))}   
            </CardContent>
          </Card>
        )}
      </div>
    </ScrollArea>
  );
}