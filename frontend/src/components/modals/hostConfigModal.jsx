import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Server } from 'lucide-react';
import { useDocker } from '../../context/dockerContext';

export default function HostConfigModal() {
  const { showHostModal, setShowHostModal, setHost, host } = useDocker();
  const [inputValue, setInputValue] = useState(host);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setHost(inputValue.trim());
      setShowHostModal(false);
    }
  };

  return (
    <Dialog open={showHostModal} onOpenChange={setShowHostModal} className="backdrop-blur-sm light" hideClose>
      <DialogContent className="sm:max-w-md" hideClose>
        <DialogHeader >
          <div className="flex items-center gap-2 mb-2">
            <Server className="h-6 w-6" />
            <DialogTitle>Docker Host Configuration</DialogTitle>
          </div>
          <DialogDescription>
            Enter the IP address or hostname of your Docker daemon.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="host">Docker Host IP</Label>
            <Input
              id="host"
              placeholder="e.g., 192.168.1.100 or localhost"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              Make sure Docker API is exposed on port 2375
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="submit">
              Connect
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}