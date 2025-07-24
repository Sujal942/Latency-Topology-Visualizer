import { Bot } from "lucide-react";

export const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 glass-header">
      <div className="flex items-center justify-between p-4 md:p-6">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative">
            <Bot className="h-8 w-8 md:h-10 md:w-10 text-primary animate-glow" />
            <div className="absolute inset-0 h-8 w-8 md:h-10 md:w-10 text-primary opacity-50 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl md:text-3xl font-bold font-headline text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text">
              Latency Visualizer
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground font-medium">
              Visualizing Global Crypto Exchange Infrastructure
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Live Data</span>
        </div>
      </div>
    </header>
  );
};
