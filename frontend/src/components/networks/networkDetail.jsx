// ==================== NetworkDetails.jsx ====================
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export default function NetworkDetails({ network }) {
  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold">{network.Name}</h2>
          <p className="text-sm text-muted-foreground">Docker Network</p>
        </div>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>Network ID</CardTitle>
          </CardHeader>
          <CardContent>
            <code className="text-sm bg-muted px-2 py-1 rounded break-all">
              {network.Id}
            </code>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Driver
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">{network.Driver}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Scope
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">{network.Scope}</p>
            </CardContent>
          </Card>
        </div>

        {network.IPAM?.Config?.[0] && (
          <Card>
            <CardHeader>
              <CardTitle>IPAM Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subnet</span>
                <code className="text-sm bg-muted px-2 py-1 rounded">
                  {network.IPAM.Config[0].Subnet}
                </code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Gateway</span>
                <code className="text-sm bg-muted px-2 py-1 rounded">
                  {network.IPAM.Config[0].Gateway}
                </code>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ScrollArea>
  );
}
