"use client";

import { Zap, Shield, Skull, Target, Bomb, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  unlockedPanels: number;
  totalPanels: number;
}

export function ProgressBar({ unlockedPanels, totalPanels }: ProgressBarProps) {
  const progress = (unlockedPanels / totalPanels) * 100;

  const getTitle = () => {
    if (unlockedPanels === 0) return "INICIO DE LA LEYENDA";
    if (unlockedPanels < 4) return "DESPERTAR DEL CYBORG";
    if (unlockedPanels < 7) return "ASCENSO DEL GUERRERO";
    if (unlockedPanels < 10) return "GUERRA TOTAL";
    if (unlockedPanels < 12) return "MODO SUPREMO";
    return "CONQUISTA COMPLETA";
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <Skull className="w-6 h-6 text-primary" />
          <span className="text-foreground font-bold text-lg uppercase tracking-wider">
            {getTitle()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-accent" />
          <span className="text-accent font-bold">
            {unlockedPanels} / {totalPanels}
          </span>
        </div>
      </div>

      <div className="relative h-4 bg-secondary rounded-sm overflow-hidden border border-border">
        {/* Progress fill */}
        <div
          className={cn(
            "absolute inset-y-0 left-0 transition-all duration-700 ease-out",
            "bg-gradient-to-r from-primary via-primary to-accent"
          )}
          style={{ width: `${progress}%` }}
        />

        {/* Markers */}
        {Array.from({ length: totalPanels }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "absolute top-0 bottom-0 w-0.5 bg-border",
              index < unlockedPanels && "bg-primary-foreground/30"
            )}
            style={{ left: `${((index + 1) / totalPanels) * 100}%` }}
          />
        ))}

        {/* Glow effect */}
        <div
          className="absolute inset-y-0 left-0 bg-primary/30 blur-sm transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Ability unlocks */}
      <div className="flex justify-between mt-4 flex-wrap gap-2">
        {[
          { icon: Shield, name: "Escudo", unlockAt: 2, color: "text-primary" },
          { icon: Zap, name: "Rayo", unlockAt: 4, color: "text-yellow-500" },
          { icon: Skull, name: "Devastador", unlockAt: 6, color: "text-primary" },
          { icon: Target, name: "Anti-Bloqueo", unlockAt: 8, color: "text-blue-500" },
          { icon: Bomb, name: "Dinamita", unlockAt: 10, color: "text-amber-500" },
          { icon: Crown, name: "Supremo", unlockAt: 12, color: "text-yellow-400" },
        ].map((ability, index) => (
          <div
            key={index}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-300",
              unlockedPanels >= ability.unlockAt
                ? `${ability.color} opacity-100`
                : "text-muted-foreground opacity-50"
            )}
          >
            <ability.icon
              className={cn(
                "w-6 h-6 md:w-8 md:h-8 transition-all",
                unlockedPanels >= ability.unlockAt && "animate-pulse"
              )}
            />
            <span className="text-[10px] md:text-xs font-bold uppercase">{ability.name}</span>
            <span className="text-[8px] md:text-[10px] text-muted-foreground">
              Panel {ability.unlockAt}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
