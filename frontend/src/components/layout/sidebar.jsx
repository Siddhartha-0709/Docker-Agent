import React from 'react';
import { Container, Image, Network, HardDrive, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useDocker } from '../../context/dockerContext';

const navigationItems = [
  { id: 'containers', label: 'Containers', icon: Container },
  { id: 'images', label: 'Images', icon: Image },
  { id: 'networks', label: 'Networks', icon: Network },
  { id: 'volumes', label: 'Volumes', icon: HardDrive },
];

export default function Sidebar() {
  const { activeTab, setActiveTab, setSelectedItem, host, setShowHostModal } = useDocker();

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSelectedItem(null);
  };

  return (
    <div className="w-64 border-r bg-card flex flex-col h-screen">
      {/* Header */}
      <div className="p-5 border-b">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg">
            <Container className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg">Docker Agent</h1>
            <p className="text-xs text-muted-foreground">Management Console</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? 'secondary' : 'ghost'}
              className="w-full justify-start bg-white/5 hover:bg-white/10"
              onClick={() => handleTabChange(item.id)}
            >
              <Icon className="h-4 w-4 mr-3" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      <Separator />

      {/* Footer */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Status</span>
          <Badge variant="default" className="bg-green-600">
            <span className="w-1.5 h-1.5 bg-white rounded-full mr-1.5" />
            Connected
          </Badge>
        </div>

        <div className="text-xs text-muted-foreground">
          <p className="font-medium">Host:</p>
          <p className="truncate">{host || 'Not configured'}</p>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => setShowHostModal(true)}
        >
          <Settings className="h-3 w-3 mr-2" />
          Change Host
        </Button>
      </div>
    </div>
  );
}