/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { DockerProvider, useDocker } from './context/dockerContext';
import Sidebar from './components/layout/sidebar';
import Header from './components/layout/header';
import HostConfigModal from './components/modals/hostConfigModal';
import ContainerList from './components/containers/containerList';
import ContainerDetails from './components/containers/containerDetails';
import { ImageList } from './components/images/imageList';
import ImageDetails from './components/images/imageDetails';
import { NetworkList } from './components/networks/networkList';
import NetworkDetails from './components/networks/networkDetail';
import { VolumeList } from './components/volumes/volumeList';
import VolumeDetails from './components/volumes/volumeDetail';
import { Container, Info } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';



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
    <>
      {/* SIGNED OUT UI */}
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black text-white ">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl shadow-[0_0_40px_rgba(255,255,255,0.04)] p-8 text-center">

            {/* Logo */}
            <div className="flex items-center justify-center gap-2 mb-1">
              <Container className="h-6 w-6 text-white" />
              <h1 className="text-2xl font-semibold tracking-tight">
                Docker Agent
              </h1>
            </div>

            <p className="text-gray-400 mb-8 text-md">
              Your Remote Docker Management Console
            </p>
            <p className="text-gray-400 mb-2 text-sm">
              Sign in to access your Remote Docker Console
            </p>

            <SignInButton mode="modal">
              <button className="w-full py-1 rounded-lg border border-white/20 bg-white text-black font-medium hover:bg-transparent hover:text-white hover:border-white transition-all">
                Sign in
              </button>
            </SignInButton>

            <p className="text-xs text-gray-500 mt-6">
              Secure authentication powered by Clerk
            </p>
          </div>
        </div>
      </SignedOut>


      {/* SIGNED IN UI */}
      <SignedIn>
        <DockerProvider>
          <div className="min-h-screen bg-gray-950 text-white dark">
            <HostConfigModal />
            <MainContent />
          </div>
        </DockerProvider>
      </SignedIn>
    </>
  );
}