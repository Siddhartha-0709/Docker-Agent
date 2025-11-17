import React, { useState, useEffect } from 'react';
import { DockerProvider, useDocker } from './context/dockerContext';
import Sidebar from './components/layout/sidebar';
import Header from './components/layout/header';
import HostConfigModal from './components/modals/hostConfigModal';
import ContainerList from './components/containers/containerList';
import ContainerDetails from './components/containers/containerDetails';
import { ImageList } from './components/images/imageList';
import  ImageDetails  from './components/images/imageDetails';
import { NetworkList } from './components/networks/networkList';
import NetworkDetails from './components/networks/networkDetail';
import { VolumeList  } from './components/volumes/volumeList';
import VolumeDetails from './components/volumes/volumeDetail';
import { Info } from 'lucide-react';

function MainContent() {
  const { activeTab, selectedItem, setSelectedItem } = useDocker();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    setSelectedItem(null);
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  const handleUpdate = () => {
    setRefreshKey((prev) => prev + 1);
    setSelectedItem(null);
  };

  useEffect(() => {
    setSelectedItem(null);
  }, [activeTab]);

  const renderList = () => {
    switch (activeTab) {
      case 'containers':
        return <ContainerList key={refreshKey} onSelect={handleSelect} />;
      case 'images':
        return <ImageList key={refreshKey} onSelect={handleSelect} />;
      case 'networks':
        return <NetworkList key={refreshKey} onSelect={handleSelect} />;
      case 'volumes':
        return <VolumeList key={refreshKey} onSelect={handleSelect} />;
      default:
        return null;
    }
  };

  const renderDetails = () => {
    if (!selectedItem) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-muted-foreground">
            <Info className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Select an item to view details</p>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'containers':
        return (
          <ContainerDetails
            container={selectedItem}
            onUpdate={handleUpdate}
          />
        );
      case 'images':
        return <ImageDetails image={selectedItem} onUpdate={handleUpdate} />;
      case 'networks':
        return <NetworkDetails network={selectedItem} />;
      case 'volumes':
        return <VolumeDetails volume={selectedItem} onUpdate={handleUpdate} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onRefresh={handleRefresh} />
        
        <div className="flex-1 flex overflow-hidden">
          <div className="w-1/2 border-r overflow-hidden">
            {renderList()}
          </div>
          
          <div className="flex-1 overflow-hidden">
            {renderDetails()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <DockerProvider>
      <div className="">
        <HostConfigModal />
        <MainContent />
      </div>
    </DockerProvider>
  );
}