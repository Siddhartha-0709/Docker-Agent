/* eslint-disable react-hooks/immutability */
import React, { useState, useEffect } from 'react';
import { Play, Square, RotateCw, Trash2, Terminal, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useDocker } from '../../context/dockerContext';

export default function ContainerDetails({ container, onUpdate }) {
  const { performAction, fetchData, WS_URL, host } = useDocker();
  const [details, setDetails] = useState(null);
  const [logs, setLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(false);
  const [wsConnection, setWsConnection] = useState(null);

  useEffect(() => {
    loadDetails();
    return () => {
      if (wsConnection) wsConnection.close();
    };
  }, [container]);

  const loadDetails = async () => {
    try {
      const data = await fetchData('/containers/inspect', { id: container.Id });

      setDetails(data);
    } catch (error) {
      console.error('Failed to load details:', error);
    }
  };

  const handleAction = async (action) => {
    try {
      let endpoint = '';
      let method = 'post';

      switch (action) {
        case 'start':
          endpoint = '/containers/start';
          break;
        case 'stop':
          endpoint = '/containers/stop';
          break;
        case 'restart':
          endpoint = '/containers/restart';
          break;
        case 'remove':
          endpoint = '/containers/remove';
          method = 'delete';
          break;
      }

      await performAction(endpoint, method, { id: container.Id });
      onUpdate();
    } catch (error) {
      console.error('Action failed:', error);
    }
  };


  const connectToLogs = () => {
    if (wsConnection) wsConnection.close();

    setLogs([]);
    setShowLogs(true);

    const ws = new WebSocket(`${WS_URL}?id=${container.Id}&host=${host}`);
    ws.onmessage = (e) => setLogs((prev) => [...prev, e.data].slice(-100));
    ws.onerror = () => setLogs((prev) => [...prev, 'Error connecting to logs']);
    ws.onclose = () => setLogs((prev) => [...prev, '--- Connection closed ---']);

    setWsConnection(ws);
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              {container.Names[0].replace('/', '')}
            </h2>
            <p className="text-sm text-muted-foreground">{container.Image}</p>
          </div>

          <div className="flex gap-2">
            {container.State === 'running' ? (
              <>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleAction('stop')}
                >
                  <Square className="h-4 w-4 mr-2" />
                  Stop
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAction('restart')}
                >
                  <RotateCw className="h-4 w-4 mr-2" />
                  Restart
                </Button>
              </>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => handleAction('start')}
              >
                <Play className="h-4 w-4 mr-2" />
                Start
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={connectToLogs}
            >
              <Terminal className="h-4 w-4 mr-2" />
              Logs
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAction('remove')}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        <Separator />

        {/* Logs View */}
        {showLogs ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Container Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black rounded-md p-4 font-mono text-xs text-green-400 h-96 overflow-auto">
                {logs.map((log, i) => (
                  <div key={i}>{log}</div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => setShowLogs(false)}
              >
                Hide Logs
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Status Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">{container.Status}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    State
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge className={container.State === 'running' ? 'bg-green-600' : 'bg-gray-600'}>
                    {container.State}
                  </Badge>
                </CardContent>
              </Card>
            </div>

            {/* Container ID */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Container ID
                </CardTitle>
              </CardHeader>
              <CardContent>
                <code className="text-sm bg-muted px-2 py-1 rounded">
                  {container.Id}
                </code>
              </CardContent>
            </Card>

            {/* Port Bindings */}
            {container.Ports?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Port Bindings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {container.Ports.map((port, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm p-2 bg-muted rounded">
                      <span className="font-medium">
                        {port.IP || '0.0.0.0'}:{port.PublicPort}
                      </span>
                      <span className="text-muted-foreground">→</span>
                      <span className="text-muted-foreground">
                        {port.PrivatePort}/{port.Type}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Volumes */}
            {container.Mounts?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Volumes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {container.Mounts.map((mount, i) => (
                    <div key={i} className="border-l-2 border-primary pl-3 space-y-1">
                      <p className="font-semibold text-sm">
                        {mount.Name || mount.Source}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        → {mount.Destination}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Type: {mount.Type} | Mode: {mount.RW ? 'RW' : 'RO'}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Network Settings */}
            {details?.NetworkSettings && (
              <Card>
                <CardHeader>
                  <CardTitle>Network Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(details.NetworkSettings.Networks).map(([name, network]) => (
                    <div key={name} className="border-l-2 border-green-600 pl-3 space-y-1">
                      <p className="font-semibold text-sm">{name}</p>
                      <p className="text-xs text-muted-foreground">
                        IP: {network.IPAddress || 'N/A'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Gateway: {network.Gateway || 'N/A'}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </ScrollArea>
  );
}