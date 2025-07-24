"use client";

import type { FC } from "react";
import { useState, useMemo } from "react";
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
import { Input } from "@/component/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/component/ui/select";
import { Switch } from "@/component/ui/switch";
import { Label } from "@/component/ui/label";

const providerColors = {
  AWS: "#FF9900",
  GCP: "#4285F4",
  Azure: "#0078D4",
  Other: "#9E9E9E",
};

function getLatencyColor(latency: number) {
  if (latency < 50) return "#2E8B57"; // SeaGreen
  if (latency < 100) return "#FFD700"; // Gold
  if (latency > 100) return "#E34B30"; // Red
  return "#DC143C"; // Crimson
}

const ServerLatencyPage: FC = () => {
  const [isTableOpen, setIsTableOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [latencyRange, setLatencyRange] = useState<[number, number]>([0, 500]);
  const [selectedProviders, setSelectedProviders] = useState<{
    AWS: boolean;
    GCP: boolean;
    Azure: boolean;
    Other: boolean;
  }>({
    AWS: true,
    GCP: true,
    Azure: true,
    Other: true,
  });
  const [selectedExchange, setSelectedExchange] = useState<string>("all");

  const exchanges = useMemo(() => {
    const uniqueExchanges = [
      ...new Set(geoData.servers.map((s) => s.exchange)),
    ];
    return ["all", ...uniqueExchanges.sort()];
  }, []);

  const filteredServers = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return geoData.servers.filter((server) => {
      const searchMatch =
        !searchTerm ||
        server.name.toLowerCase().includes(searchLower) ||
        server.exchange.toLowerCase().includes(searchLower) ||
        server.city.toLowerCase().includes(searchLower) ||
        server.country.toLowerCase().includes(searchLower) ||
        server.cloudProvider.toLowerCase().includes(searchLower);

      const latencyMatch =
        server.latency >= latencyRange[0] && server.latency <= latencyRange[1];

      const providerMatch =
        selectedProviders[
          server.cloudProvider as keyof typeof selectedProviders
        ];

      const exchangeMatch =
        selectedExchange === "all" || server.exchange === selectedExchange;

      return searchMatch && latencyMatch && providerMatch && exchangeMatch;
    });
  }, [searchTerm, latencyRange, selectedProviders, selectedExchange]);

  const handleLatencyChange = (event: Event, value: number | number[]) => {
    const [min, max] = Array.isArray(value) ? value : [0, value];
    setLatencyRange([Math.max(0, min), Math.min(500, max)]);
  };

  return (
    <div className="min-h-[50vh] w-full bg-black font-body text-foreground antialiased">
      <main className="p-2 sm:p-4 md:p-6 lg:p-8">
        <Card className="bg-background/80 backdrop-blur-sm w-full max-w-[100vw] mx-auto">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="text-base sm:text-lg md:text-xl">
              Server Latency Information
            </CardTitle>
            <div className="w-full sm:w-auto">
              <Card className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg rounded-lg p-4 border border-gray-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="text"
                      placeholder="Search servers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-gray-800 text-white border-gray-600 placeholder-gray-400 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Select
                      value={selectedExchange}
                      onValueChange={setSelectedExchange}
                    >
                      <SelectTrigger className="w-full bg-gray-800 text-white border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="All Exchanges" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 text-white border-gray-600">
                        {exchanges.map((exchange) => (
                          <SelectItem
                            key={exchange}
                            value={exchange}
                            className="hover:bg-gray-700"
                          >
                            {exchange}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={latencyRange[1]}
                      onChange={(e) =>
                        handleLatencyChange(e, [
                          latencyRange[0],
                          parseInt(e.target.value) || 500,
                        ])
                      }
                      className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <span className="text-white text-sm">
                      {latencyRange[1]} ms
                    </span>
                  </div>
                  <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex flex-wrap gap-2">
                    {(["AWS", "GCP", "Azure", "Other"] as const).map(
                      (provider) => (
                        <div
                          key={provider}
                          className="flex items-center space-x-2"
                        >
                          <Switch
                            checked={selectedProviders[provider]}
                            onCheckedChange={(checked) =>
                              setSelectedProviders((prev) => ({
                                ...prev,
                                [provider]: checked,
                              }))
                            }
                            className="bg-gray-600 data-[state=checked]:bg-blue-500"
                          />
                          <Label className="text-white text-sm">
                            {provider}
                          </Label>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </Card>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsTableOpen(!isTableOpen)}
              className="md:hidden text-white hover:text-blue-500"
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
                  {filteredServers.map((server) => (
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
