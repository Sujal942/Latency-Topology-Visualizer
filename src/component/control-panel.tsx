// "use client";

// import type { FC } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/component/ui/card";
// import { Input } from "@/component/ui/input";
// import { Label } from "@/component/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/component/ui/select";
// import { Slider } from "@/component/ui/slider";
// import { Switch } from "@/component/ui/switch";
// import { Separator } from "@/component/ui/separator";
// import { cn } from "@/lib/utils";
// import { Server, Cloud, Network, Search, Layers } from "lucide-react";
// import { ScrollArea } from "../component/ui/scroll-area";

// export interface Filters {
//   search: string;
//   exchange: string;
//   latency: [number, number];
//   providers: {
//     AWS: boolean;
//     GCP: boolean;
//     Azure: boolean;
//     Other: boolean;
//   };
//   layers: {
//     servers: boolean;
//     regions: boolean;
//   };
// }

// interface ControlPanelProps {
//   filters: Filters;
//   onFiltersChange: (filters: Filters) => void;
//   exchanges: string[];
//   className?: string;
// }

// export const ControlPanel: FC<ControlPanelProps> = ({
//   filters,
//   onFiltersChange,
//   exchanges,
//   className,
// }) => {
//   return (
//     <Card
//       className={cn("shadow-2xl bg-background/80 backdrop-blur-sm", className)}
//     >
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2 text-lg">
//           <Layers />
//           Controls & Filters
//         </CardTitle>
//         <CardDescription>Interact with the map data.</CardDescription>
//       </CardHeader>
//       <ScrollArea className="h-full">
//         <CardContent className="space-y-6 pb-6">
//           <div className="space-y-2">
//             <Label htmlFor="search" className="flex items-center gap-2">
//               <Search size={16} />
//               Search
//             </Label>
//             <Input
//               id="search"
//               placeholder="Search server, city, country..."
//               value={filters.search}
//               onChange={(e) =>
//                 onFiltersChange({ ...filters, search: e.target.value })
//               }
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="exchange" className="flex items-center gap-2">
//               <Server size={16} />
//               Exchange
//             </Label>
//             <Select
//               value={filters.exchange}
//               onValueChange={(value) =>
//                 onFiltersChange({ ...filters, exchange: value })
//               }
//             >
//               <SelectTrigger id="exchange">
//                 <SelectValue placeholder="Select Exchange" />
//               </SelectTrigger>
//               <SelectContent>
//                 {exchanges.map((ex) => (
//                   <SelectItem key={ex} value={ex}>
//                     {ex === "all" ? "All Exchanges" : ex}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <Label className="flex items-center gap-2">
//               <Cloud size={16} />
//               Cloud Providers
//             </Label>
//             <div className="grid grid-cols-2 gap-2 text-sm">
//               {Object.keys(filters.providers).map((provider) => (
//                 <div key={provider} className="flex items-center gap-2">
//                   <Switch
//                     id={provider}
//                     checked={
//                       filters.providers[
//                         provider as keyof typeof filters.providers
//                       ]
//                     }
//                     onCheckedChange={(checked) =>
//                       onFiltersChange({
//                         ...filters,
//                         providers: {
//                           ...filters.providers,
//                           [provider]: checked,
//                         },
//                       })
//                     }
//                   />
//                   <Label htmlFor={provider}>{provider}</Label>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="latency" className="flex items-center gap-2">
//               <Network size={16} />
//               Latency ({filters.latency[0]} - {filters.latency[1]}ms)
//             </Label>
//             <Slider
//               id="latency"
//               min={0}
//               max={500}
//               step={10}
//               value={filters.latency}
//               onValueChange={(value: [number, number]) =>
//                 onFiltersChange({ ...filters, latency: value })
//               }
//             />
//           </div>

//           <Separator />

//           <div className="space-y-3">
//             <Label className="flex items-center gap-2">
//               <Layers size={16} />
//               Layers
//             </Label>
//             <div className="flex items-center justify-between">
//               <Label htmlFor="servers-layer" className="font-normal">
//                 Exchange Servers
//               </Label>
//               <Switch
//                 id="servers-layer"
//                 checked={filters.layers.servers}
//                 onCheckedChange={(checked) =>
//                   onFiltersChange({
//                     ...filters,
//                     layers: { ...filters.layers, servers: checked },
//                   })
//                 }
//               />
//             </div>
//             <div className="flex items-center justify-between">
//               <Label htmlFor="regions-layer" className="font-normal">
//                 Cloud Regions
//               </Label>
//               <Switch
//                 id="regions-layer"
//                 checked={filters.layers.regions}
//                 onCheckedChange={(checked) =>
//                   onFiltersChange({
//                     ...filters,
//                     layers: { ...filters.layers, regions: checked },
//                   })
//                 }
//               />
//             </div>
//           </div>
//         </CardContent>
//       </ScrollArea>
//     </Card>
//   );
// };

"use client";

import type { FC } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/component/ui/card";
import { Input } from "@/component/ui/input";
import { Label } from "@/component/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/component/ui/select";
import { Slider } from "@/component/ui/slider";
import { Switch } from "@/component/ui/switch";
import { Separator } from "@/component/ui/separator";
import { cn } from "@/lib/utils";
import { Server, Cloud, Network, Search, Layers } from "lucide-react";
import { ScrollArea } from "../component/ui/scroll-area";

export interface Filters {
  search: string;
  exchange: string;
  latency: [number, number];
  providers: {
    AWS: boolean;
    GCP: boolean;
    Azure: boolean;
    Other: boolean;
  };
  layers: {
    servers: boolean;
    regions: boolean;
  };
}

interface ControlPanelProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  exchanges: string[];
  className?: string;
}

export const ControlPanel: FC<ControlPanelProps> = ({
  filters,
  onFiltersChange,
  exchanges,
  className,
}) => {
  const handleFilterChange = (
    newFilters: Partial<Filters> | { [key: string]: any }
  ) => {
    onFiltersChange({ ...filters, ...newFilters });
  };

  return (
    <Card
      className={cn("shadow-2xl bg-background/80 backdrop-blur-sm", className)}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Layers />
          Controls & Filters
        </CardTitle>
        <CardDescription>Interact with the map data.</CardDescription>
      </CardHeader>
      <ScrollArea className="h-full">
        <CardContent className="space-y-6 pb-6">
          <div className="space-y-2">
            <Label htmlFor="search" className="flex items-center gap-2">
              <Search size={16} />
              Search
            </Label>
            <Input
              id="search"
              placeholder="Search server, city, country..."
              value={filters.search}
              onChange={(e) => handleFilterChange({ search: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="exchange" className="flex items-center gap-2">
              <Server size={16} />
              Exchange
            </Label>
            <Select
              value={filters.exchange}
              onValueChange={(value) => handleFilterChange({ exchange: value })}
            >
              <SelectTrigger id="exchange">
                <SelectValue placeholder="Select Exchange" />
              </SelectTrigger>
              <SelectContent>
                {exchanges.map((ex) => (
                  <SelectItem key={ex} value={ex}>
                    {ex === "all" ? "All Exchanges" : ex}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Cloud size={16} />
              Cloud Providers
            </Label>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {Object.keys(filters.providers).map((provider) => (
                <div key={provider} className="flex items-center gap-2">
                  <Switch
                    id={provider}
                    checked={
                      filters.providers[
                        provider as keyof typeof filters.providers
                      ]
                    }
                    onCheckedChange={(checked) =>
                      handleFilterChange({
                        providers: {
                          ...filters.providers,
                          [provider]: checked,
                        },
                      })
                    }
                  />
                  <Label htmlFor={provider}>{provider}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="latency" className="flex items-center gap-2">
              <Network size={16} />
              Latency ({filters.latency[0]} - {filters.latency[1]}ms)
            </Label>
            <Slider
              id="latency"
              min={0}
              max={500}
              step={10}
              value={filters.latency}
              onValueChange={(value: [number, number]) =>
                handleFilterChange({ latency: value })
              }
            />
          </div>

          <Separator />

          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Layers size={16} />
              Layers
            </Label>
            <div className="flex items-center justify-between">
              <Label htmlFor="servers-layer" className="font-normal">
                Exchange Servers
              </Label>
              <Switch
                id="servers-layer"
                checked={filters.layers.servers}
                onCheckedChange={(checked) =>
                  handleFilterChange({
                    layers: { ...filters.layers, servers: checked },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="regions-layer" className="font-normal">
                Cloud Regions
              </Label>
              <Switch
                id="regions-layer"
                checked={filters.layers.regions}
                onCheckedChange={(checked) =>
                  handleFilterChange({
                    layers: { ...filters.layers, regions: checked },
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
};
