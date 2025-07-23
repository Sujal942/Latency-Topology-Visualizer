"use client";

import type { FC } from "react";
import Link from "next/link";
import geoData from "@/data/data.json";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/component/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/component/ui/card";
import { Badge } from "@/component/ui/badge";
import { Bot, Home } from "lucide-react";
import { Button } from "@/component/ui/button";

const providerColors = {
  AWS: "#FF9900",
  GCP: "#4285F4",
  Azure: "#0078D4",
  Other: "#9E9E9E",
};

function getLatencyColor(latency: number) {
  if (latency < 50) return "#2E8B57"; // SeaGreen
  if (latency < 100) return "#FFD700"; // Gold
  return "#DC143C"; // Crimson
}

const ServerLatencyPage: FC = () => {
  return (
    <div className="min-h-svh w-full bg-black font-body text-foreground antialiased">
      <main className="p-4 md:p-8">
        <Card className="bg-background/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Server Latency Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Server Name</TableHead>
                  <TableHead>Exchange</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Cloud Provider</TableHead>
                  <TableHead className="text-right">Latency (ms)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {geoData.servers.map((server) => (
                  <TableRow key={server.id}>
                    <TableCell className="font-medium">{server.name}</TableCell>
                    <TableCell>{server.exchange}</TableCell>
                    <TableCell>
                      {server.city}, {server.country}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        style={{
                          backgroundColor: providerColors[server.cloudProvider],
                          color: "#fff",
                          textShadow: "0 0 3px black",
                        }}
                      >
                        {server.cloudProvider}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className="font-bold text-lg"
                        style={{ color: getLatencyColor(server.latency) }}
                      >
                        {server.latency}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ServerLatencyPage;
