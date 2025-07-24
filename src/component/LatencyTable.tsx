"use client";

import type { FC } from "react";
import { useState } from "react";
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
import { Button } from "@/component/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

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
  const [isTableOpen, setIsTableOpen] = useState<boolean>(false);

  return (
    <div className="min-h-[50vh] w-full bg-black font-body text-foreground antialiased">
      <main className="p-2 sm:p-4 md:p-6 lg:p-8">
        <Card className="bg-background/80 backdrop-blur-sm w-full max-w-[100vw] mx-auto">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base sm:text-lg md:text-xl">
              Server Latency Information
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsTableOpen(!isTableOpen)}
              className="md:hidden text-muted-foreground hover:text-foreground"
            >
              {isTableOpen ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </Button>
          </CardHeader>
          <CardContent
            className={`transition-all duration-300 ease-in-out ${
              isTableOpen ? "block" : "hidden md:block"
            }`}
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs sm:text-sm w-[20%] min-w-[100px]">
                      Server Name
                    </TableHead>
                    <TableHead className="text-xs sm:text-sm w-[20%] min-w-[80px]">
                      Exchange
                    </TableHead>
                    <TableHead className="text-xs sm:text-sm w-[25%] min-w-[120px]">
                      Location
                    </TableHead>
                    <TableHead className="text-xs sm:text-sm w-[20%] min-w-[80px]">
                      Provider
                    </TableHead>
                    <TableHead className="text-xs sm:text-sm w-[15%] min-w-[80px] text-right">
                      Latency
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {geoData.servers.map((server) => (
                    <TableRow key={server.id}>
                      <TableCell className="font-medium text-xs sm:text-sm truncate">
                        {server.name}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm truncate">
                        {server.exchange}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm truncate">
                        {server.city}, {server.country}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm">
                        <Badge
                          variant="secondary"
                          style={{
                            backgroundColor:
                              providerColors[server.cloudProvider],
                            color: "#fff",
                            textShadow: "0 0 2px black",
                            fontSize: "0.75rem",
                            padding: "0.25rem 0.5rem",
                          }}
                        >
                          {server.cloudProvider}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-xs sm:text-sm">
                        <span
                          className="font-bold text-sm sm:text-base md:text-lg"
                          style={{ color: getLatencyColor(server.latency) }}
                        >
                          {server.latency}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ServerLatencyPage;
