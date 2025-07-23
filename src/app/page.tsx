"use client";

import type { FC } from "react";
import { useState, useMemo } from "react";
import geoData from "@/data/data.json";
import type { ServerLocation } from "@/types/geo";
import { Header } from "@/component/header";
import ServerLatencyPage from "@/component/LatencyTable";
import { ControlPanel, type Filters } from "@/component/control-panel";
import { MapContainer } from "@/component/map-container";
import { Skeleton } from "@/component/ui/skeleton";

const LatencyMap: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    exchange: "all",
    latency: [0, 500],
    providers: { AWS: true, GCP: true, Azure: true, Other: true },
    layers: { servers: true, regions: true },
  });

  const exchanges = useMemo(() => {
    const uniqueExchanges = [
      ...new Set(geoData.servers.map((s) => s.exchange)),
    ];
    return ["all", ...uniqueExchanges.sort()];
  }, []);

  const filteredGeoData = useMemo(() => {
    const searchLower = filters.search.toLowerCase();

    const filteredServers = geoData.servers
      .filter((server) => {
        const searchMatch =
          !filters.search ||
          server.name.toLowerCase().includes(searchLower) ||
          server.city.toLowerCase().includes(searchLower) ||
          server.country.toLowerCase().includes(searchLower) ||
          server.exchange.toLowerCase().includes(searchLower);

        const exchangeMatch =
          filters.exchange === "all" || server.exchange === filters.exchange;

        const latencyMatch =
          server.latency >= filters.latency[0] &&
          server.latency <= filters.latency[1];

        const providerMatch =
          filters.providers[
            server.cloudProvider as keyof typeof filters.providers
          ];

        return searchMatch && exchangeMatch && latencyMatch && providerMatch;
      })
      .map((server) => ({
        ...server,
        cloudProvider: server.cloudProvider as
          | "AWS"
          | "GCP"
          | "Azure"
          | "Other",
      }));

    const filteredRegions = geoData.regions
      .filter(
        (region) =>
          filters.providers[region.provider as keyof typeof filters.providers]
      )
      .map((region) => ({
        ...region,
        provider: region.provider as "AWS" | "GCP" | "Azure",
      }));

    return { servers: filteredServers, regions: filteredRegions };
  }, [filters]);

  return (
    <div className="relative h-svh w-full bg-black font-body antialiased">
      <Header />

      <main className="relative h-full w-full">
        {loading && <MapSkeleton />}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center text-destructive">
            {error}
          </div>
        )}
        {!loading && !error && (
          <>
            <MapContainer
              geoData={filteredGeoData}
              layerVisibility={filters.layers}
            />
            <ControlPanel
              filters={filters}
              onFiltersChange={setFilters}
              exchanges={exchanges}
              className="absolute top-24 left-4 z-10 w-80 max-h-[calc(100svh-7rem)]"
            />
          </>
        )}
      </main>

      <div>
        <ServerLatencyPage />
      </div>
    </div>
  );
};

const MapSkeleton = () => (
  <div className="absolute inset-0">
    <Skeleton className="h-full w-full bg-gray-800" />
  </div>
);

export default LatencyMap;
