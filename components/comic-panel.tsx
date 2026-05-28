"use client";

import { useState } from "react";
import Image from "next/image";
import { Lock, Unlock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComicPanelProps {
  panelNumber: number;
  title: string;
  imageSrc: string;
  dialogue: string[];
  isUnlocked: boolean;
  onUnlock: () => void;
  isActive: boolean;
  onClick: () => void;
}

export function ComicPanel({
  panelNumber,
  title,
  imageSrc,
  dialogue,
  isUnlocked,
  onUnlock,
  isActive,
  onClick,
}: ComicPanelProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className={cn(
        "relative group cursor-pointer transition-all duration-500 h-full",
        !isUnlocked && "opacity-60"
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={isUnlocked ? onClick : onUnlock}
    >
      {/* Panel Frame */}
      <div
        className={cn(
          "relative border-4 border-border bg-card overflow-hidden transition-all duration-300 h-full flex flex-col",
          isActive && "border-primary shadow-[0_0_30px_rgba(255,100,50,0.5)]",
          isHovering && isUnlocked && "border-accent"
        )}
      >
        {/* Panel Number Badge */}
        <div className="absolute top-2 left-2 z-20 bg-primary text-primary-foreground px-3 py-1 font-bold text-sm">
          PANEL {panelNumber}
        </div>

        {/* Lock Overlay */}
        {!isUnlocked && (
          <div className="absolute inset-0 z-30 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
            <Lock className="w-16 h-16 text-primary animate-pulse" />
            <p className="text-foreground font-bold text-lg">BLOQUEADO</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUnlock();
              }}
              className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-primary-foreground px-6 py-3 font-bold transition-all hover:scale-105"
            >
              <Unlock className="w-5 h-5" />
              DESBLOQUEAR
            </button>
          </div>
        )}

        {/* Comic Image */}
        <div className="relative aspect-square w-full h-full">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className={cn(
              "object-cover transition-all duration-500",
              !isUnlocked && "blur-md grayscale"
            )}
          />
        </div>

        {/* Title Bar */}
        <div className="bg-secondary p-3 border-t-2 border-border">
          <h3 className="text-foreground font-bold text-lg uppercase tracking-wider">
            {title}
          </h3>
        </div>

        {/* Dialogue Bubbles - Only show when active and unlocked and NOT in the new layout */}
        {isActive && isUnlocked && !isActive && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            {dialogue.map((text, index) => (
              <div
                key={index}
                className={cn(
                  "absolute bg-foreground text-background p-3 rounded-lg max-w-[70%] font-medium text-sm",
                  "animate-in fade-in-0 slide-in-from-bottom-4 duration-500",
                  index % 2 === 0
                    ? "top-16 right-4"
                    : "bottom-24 left-4"
                )}
                style={{
                  animationDelay: `${index * 300}ms`,
                }}
              >
                <p className="text-balance">{text}</p>
                {/* Speech bubble tail */}
                <div
                  className={cn(
                    "absolute w-0 h-0 border-8 border-transparent",
                    index % 2 === 0
                      ? "border-t-foreground -bottom-4 right-6"
                      : "border-b-foreground -top-4 left-6"
                  )}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Unlock Effect */}
      {isUnlocked && (
        <div className="absolute -inset-1 bg-primary/20 -z-10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
    </div>
  );
}
