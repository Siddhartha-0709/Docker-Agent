import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const DockerContext = createContext();

export const useDocker = () => {
  const context = useContext(DockerContext);
  if (!context) {
    throw new Error('useDocker must be used within DockerProvider');
  }
  return context;
};

export const DockerProvider = ({ children }) => {
  const [host, setHost] = useState(() => localStorage.getItem('dockerHost') || '');
  const [showHostModal, setShowHostModal] = useState(!host);
  const [activeTab, setActiveTab] = useState('containers');
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const API_BASE_URL = 'http://localhost:3000/api/v1';
  const WS_URL = 'ws://localhost:3001';

  useEffect(() => {
    if (host) {
      localStorage.setItem('dockerHost', host);
    }
  }, [host]);

  const fetchData = async (endpoint) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}${endpoint}?host=${host}`);
      return response.data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const performAction = async (endpoint, method = 'post', data = null) => {
    try {
      const response = await axios({
        method,
        url: `${API_BASE_URL}${endpoint}?host=${host}`,
        data
      });
      return response.data;
    } catch (error) {
      console.error('Action error:', error);
      throw error;
    }
  };

  const value = {
    host,
    setHost,
    showHostModal,
    setShowHostModal,
    activeTab,
    setActiveTab,
    selectedItem,
    setSelectedItem,
    loading,
    API_BASE_URL,
    WS_URL,
    fetchData,
    performAction
  };

  return (
    <DockerContext.Provider value={value}>
      {children}
    </DockerContext.Provider>
  );
};