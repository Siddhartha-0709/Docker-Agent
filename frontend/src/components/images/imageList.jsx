/* eslint-disable react-hooks/immutability */
// ==================== ImageList.jsx ====================
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDocker } from '../../context/dockerContext';

export function ImageList({ onSelect }) {
  const { fetchData, selectedItem } = useDocker();
  const [images, setImages] = useState([]);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const data = await fetchData('/images/listImages');
      setImages(data);
    } catch (error) {
      console.error('Failed to load images:', error);
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
      <div className="p-4 space-y-2">
        {images.map((image) => (
          <Card
            key={image.Id}
            className={`p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedItem?.Id === image.Id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => onSelect(image)}
          >
            <h3 className="font-semibold text-base mb-2">
              {image.RepoTags?.[0] || 'Untagged'}
            </h3>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                ID: {image.Id.replace('sha256:', '').substring(0, 12)}
              </p>
              <p className="text-sm text-muted-foreground">
                Size: {formatBytes(image.Size)}
              </p>
            </div>
          </Card>
        ))}

        {images.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No images found</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}