"use client";

import { useState, useEffect } from "react";
import { ComicPanel } from "./comic-panel";
import { ProgressBar } from "./progress-bar";
import { ChevronLeft, ChevronRight, RotateCcw, Volume2, VolumeX, Box } from "lucide-react";
import { Banzer3DModel } from "./banzer-3d-model";
import { cn } from "@/lib/utils";

const COMIC_PANELS = [
  {
    id: 1,
    title: "El Origen",
    imageSrc: "/comic/panel-1-origin.png",
    dialogue: [
      "Yo fui humano... alguna vez.",
      "Ahora soy algo más. Algo que no puede morir.",
    ],
    enemy: null,
    story: "En los laboratorios secretos bajo el Palacio Quemado, el General Hugo Banzer despertó. Su cuerpo, destrozado por un atentado, había sido reconstruido con tecnología militar de última generación. Mitad hombre, mitad máquina. Sus recuerdos de Bolivia seguían intactos, pero su carne ya no era la misma.",
  },
  {
    id: 2,
    title: "El Despertar",
    imageSrc: "/comic/panel-2-awakening.png",
    dialogue: [
      "Mi corazón aún late...",
      "Pero mi cuerpo ya no conoce límites.",
    ],
    enemy: null,
    story: "Los científicos observaban con asombro. El corazón humano de Banzer latía dentro de una caja torácica de titanio. Sus brazos mecánicos podían levantar toneladas. Sus ojos, uno orgánico y otro digital, escaneaban el horizonte. Bolivia lo necesitaba de nuevo.",
  },
  {
    id: 3,
    title: "La Batalla",
    imageSrc: "/comic/panel-3-battle.png",
    dialogue: [
      "¡VENGAN TODOS!",
      "¡Les mostraré el poder de un guerrero que ya no teme a la muerte!",
    ],
    enemy: null,
    story: "Los primeros enemigos fueron robots de combate enviados desde el exterior. Banzer Cyborg los enfrentó solo en las calles de La Paz. Cada golpe de su puño de acero destruía una máquina. La ciudad temblaba con cada impacto.",
  },
  {
    id: 4,
    title: "El Poder Oculto",
    imageSrc: "/comic/panel-4-powerup.png",
    dialogue: [
      "Siento... algo despertando dentro de mí...",
      "¡MODO DEVASTADOR ACTIVADO!",
    ],
    enemy: null,
    story: "En medio del combate, los sistemas de Banzer detectaron una amenaza crítica. Automáticamente, protocolos secretos se activaron. Sus armas se transformaron, revelando cañones de plasma escondidos. El Modo Devastador estaba en línea.",
  },
  {
    id: 5,
    title: "El Golpe Final",
    imageSrc: "/comic/panel-5-final.png",
    dialogue: [
      "¡ESTO TERMINA AHORA!",
      "¡CAÑÓN DESTRUCTOR... FUEGO!",
    ],
    enemy: null,
    story: "Con un rugido mecánico, Banzer disparó su arma más poderosa. Un rayo de energía pura atravesó el ejército de robots, vaporizándolos instantáneamente. El cielo de La Paz se iluminó como si fuera de día.",
  },
  {
    id: 6,
    title: "Victoria Temporal",
    imageSrc: "/comic/panel-6-victory.png",
    dialogue: [
      "Los robots cayeron...",
      "Pero nuevos enemigos se acercan desde el horizonte.",
    ],
    enemy: null,
    story: "Entre los escombros humeantes, Banzer se alzó victorioso. Pero sus sensores detectaron movimiento. No eran máquinas esta vez. Eran humanos. Miles de ellos. Marchando desde El Alto, desde los valles, desde las minas. La verdadera batalla estaba por comenzar.",
  },
  {
    id: 7,
    title: "Los Bloqueadores Azules",
    imageSrc: "/comic/panel-7-masistas.png",
    dialogue: [
      "¡Ahí viene el traidor!",
      "¡Los masistas no perdonamos! ¡BLOQUEO TOTAL!",
    ],
    enemy: { name: "Masistas", color: "bg-blue-600", icon: "🔵" },
    story: "Las calles se llenaron de banderas azules. Los bloqueadores masistas cerraron cada avenida con barricadas de piedra y fuego. '¡Dictador!' gritaban. '¡Asesino!' Banzer avanzó lentamente. Sus sistemas calculaban cada movimiento del enemigo. No los lastimaría... solo los apartaría de su camino.",
  },
  {
    id: 8,
    title: "La Furia de los Ponchos Rojos",
    imageSrc: "/comic/panel-8-ponchos.png",
    dialogue: [
      "¡Por nuestros ancestros!",
      "¡Los Ponchos Rojos no retroceden jamás!",
    ],
    enemy: { name: "Ponchos Rojos", color: "bg-red-700", icon: "🔴" },
    story: "Desde las montañas del altiplano descendieron los Ponchos Rojos. Guerreros ancestrales con técnicas de combate milenarias. Sus chicotes silbaban en el aire. Banzer reconoció su valor. Pero su misión era clara: proteger Bolivia de la amenaza exterior, sin importar quién se interpusiera.",
  },
  {
    id: 9,
    title: "Dinamita Minera",
    imageSrc: "/comic/panel-9-mineros.png",
    dialogue: [
      "¡La COB resiste! ¡Mineros unidos!",
      "¡Que vuele todo! ¡DINAMITAAA!",
    ],
    enemy: { name: "Mineros COB", color: "bg-amber-600", icon: "💥" },
    story: "El suelo tembló cuando llegaron los mineros de la COB. Con cascos y dinamita, eran los más peligrosos de todos. Las explosiones rodearon a Banzer. Su armadura resistía, pero cada detonación lo empujaba hacia atrás. '¡Carajo!', pensó. Tendría que usar más poder del que quería.",
  },
  {
    id: 10,
    title: "Asedio Total",
    imageSrc: "/comic/panel-10-allbattle.png",
    dialogue: [
      "Azules por el norte... Rojos por el sur... Mineros desde abajo...",
      "¡ESTOY RODEADO! ¡PERFECTO!",
    ],
    enemy: { name: "Todos", color: "bg-gradient-to-r from-blue-600 via-red-700 to-amber-600", icon: "⚔️" },
    story: "Los tres ejércitos convergieron. Masistas desde el norte, Ponchos Rojos desde el sur, mineros emergiendo del subsuelo. Banzer estaba completamente rodeado en la Plaza Murillo. Sus sistemas mostraban ALERTA CRÍTICA. Pero en sus labios metálicos se dibujó una sonrisa. Esto era exactamente lo que esperaba.",
  },
  {
    id: 11,
    title: "Modo Supremo",
    imageSrc: "/comic/panel-11-superpower.png",
    dialogue: [
      "¡SISTEMA DE EMERGENCIA ACTIVADO!",
      "¡MODO DICTADOR SUPREMO: NIVEL MÁXIMO!",
    ],
    enemy: null,
    story: "Una voz robótica resonó: 'PROTOCOLO SUPREMO AUTORIZADO'. El cuerpo de Banzer se transformó. Armaduras adicionales emergieron de su espalda. Nuevas armas se desplegaron de cada extremidad. Una onda de energía electromagnética paralizó a todos los que lo rodeaban. El verdadero poder del Cyborg se reveló.",
  },
  {
    id: 12,
    title: "Victoria Absoluta",
    imageSrc: "/comic/panel-12-finalvictory.png",
    dialogue: [
      "Masistas... Ponchos Rojos... Mineros...",
      "Todos caen ante el poder de BANZER CYBORG.",
    ],
    enemy: null,
    story: "Cuando el polvo se asentó, Banzer permanecía de pie. Los bloqueadores habían huido. Los Ponchos Rojos se habían retirado a las montañas. Los mineros regresaron a sus minas. Nadie murió. Banzer nunca quiso matar a su propia gente. Solo demostrar que Bolivia tenía un protector invencible. Sobre el Illimani, el sol se ponía. La leyenda del Cyborg acababa de nacer.",
  },
];

export function ComicViewer() {
  const [unlockedPanels, setUnlockedPanels] = useState<number[]>([1]);
  const [activePanel, setActivePanel] = useState<number>(1);
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [show3DModel, setShow3DModel] = useState(false);

  const handleUnlock = (panelId: number) => {
    if (!unlockedPanels.includes(panelId)) {
      setShowUnlockAnimation(true);
      setTimeout(() => {
        setUnlockedPanels((prev) => [...prev, panelId]);
        setActivePanel(panelId);
        setShowUnlockAnimation(false);
      }, 500);
    }
  };

  const handleReset = () => {
    setUnlockedPanels([1]);
    setActivePanel(1);
  };

  const navigatePanel = (direction: "prev" | "next") => {
    const currentIndex = COMIC_PANELS.findIndex((p) => p.id === activePanel);
    if (direction === "prev" && currentIndex > 0) {
      const prevPanel = COMIC_PANELS[currentIndex - 1];
      if (unlockedPanels.includes(prevPanel.id)) {
        setActivePanel(prevPanel.id);
      }
    } else if (direction === "next" && currentIndex < COMIC_PANELS.length - 1) {
      const nextPanel = COMIC_PANELS[currentIndex + 1];
      if (unlockedPanels.includes(nextPanel.id)) {
        setActivePanel(nextPanel.id);
      } else {
        handleUnlock(nextPanel.id);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 3D Model Viewer */}
      {show3DModel && <Banzer3DModel onClose={() => setShow3DModel(false)} />}
      {/* Unlock Animation Overlay */}
      {showUnlockAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="text-center">
            <div className="relative">
              <div className="w-32 h-32 border-4 border-primary rounded-full animate-ping" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-black text-primary animate-pulse">!</span>
              </div>
            </div>
            <p className="mt-6 text-2xl font-bold text-foreground uppercase tracking-widest animate-pulse">
              DESBLOQUEANDO...
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-foreground uppercase tracking-tight">
                <span className="text-primary">HUGO BANZER</span>
              </h1>
              <p className="text-muted-foreground text-sm uppercase tracking-widest">
                Cyborg Chronicles: La Leyenda del Guerrero
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShow3DModel(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 text-primary-foreground font-bold text-sm transition-colors"
              >
                <Box className="w-4 h-4" />
                VER 3D
              </button>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
                aria-label={soundEnabled ? "Silenciar" : "Activar sonido"}
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold text-sm transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                REINICIAR
              </button>
            </div>
          </div>

          <ProgressBar
            unlockedPanels={unlockedPanels.length}
            totalPanels={COMIC_PANELS.length}
          />
        </div>
      </header>

      {/* Main Comic Area */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Featured Panel with Story */}
        <div className="mb-12">
          {COMIC_PANELS.filter((p) => p.id === activePanel).map((panel) => (
            <div key={panel.id} className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Image Panel */}
              <div className="relative aspect-square lg:aspect-auto lg:h-[500px]">
                <ComicPanel
                  panelNumber={panel.id}
                  title={panel.title}
                  imageSrc={panel.imageSrc}
                  dialogue={panel.dialogue}
                  isUnlocked={unlockedPanels.includes(panel.id)}
                  onUnlock={() => handleUnlock(panel.id)}
                  isActive={true}
                  onClick={() => {}}
                />
              </div>

              {/* Story Sidebar */}
              <div className="flex flex-col h-full">
                <div className="bg-card border-2 border-border p-6 h-full flex flex-col">
                  {/* Enemy Badge */}
                  {panel.enemy && (
                    <div className={cn(
                      "inline-flex items-center gap-2 px-4 py-2 mb-4 text-sm font-bold uppercase tracking-wider text-white",
                      panel.enemy.color
                    )}>
                      <span>{panel.enemy.icon}</span>
                      <span>VS {panel.enemy.name}</span>
                    </div>
                  )}
                  
                  <h3 className="text-xl md:text-2xl font-black text-primary uppercase mb-1">
                    Capitulo {panel.id}
                  </h3>
                  <h4 className="text-lg md:text-xl font-bold text-foreground mb-4 border-b border-border pb-3">
                    {panel.title}
                  </h4>
                  
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-4 flex-1">
                    {panel.story}
                  </p>

                  {/* Dialogue Bubbles */}
                  <div className="space-y-2">
                    {panel.dialogue.map((line, index) => (
                      <div
                        key={index}
                        className={cn(
                          "relative p-3 text-xs md:text-sm font-medium",
                          index === 0
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-primary/10 text-primary border-l-4 border-primary"
                        )}
                      >
                        <span className="italic">{`"${line}"`}</span>
                      </div>
                    ))}
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                    <button
                      onClick={() => navigatePanel("prev")}
                      disabled={activePanel === 1}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold text-sm transition-all",
                        activePanel === 1 && "opacity-30 cursor-not-allowed"
                      )}
                    >
                      <ChevronLeft className="w-5 h-5" />
                      ANTERIOR
                    </button>

                    <span className="text-muted-foreground text-sm font-bold">
                      {activePanel} / {COMIC_PANELS.length}
                    </span>

                    <button
                      onClick={() => navigatePanel("next")}
                      disabled={activePanel === COMIC_PANELS.length && unlockedPanels.length === COMIC_PANELS.length}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 font-bold text-sm transition-all",
                        unlockedPanels.includes(activePanel + 1)
                          ? "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                          : "bg-primary hover:bg-primary/80 text-primary-foreground animate-pulse",
                        activePanel === COMIC_PANELS.length && "opacity-30 cursor-not-allowed"
                      )}
                    >
                      {unlockedPanels.includes(activePanel + 1) ? "SIGUIENTE" : "DESBLOQUEAR"}
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Panel Grid */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-6 uppercase tracking-wider border-b border-border pb-2">
            Todos los Paneles
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {COMIC_PANELS.map((panel) => (
              <div
                key={panel.id}
                className={cn(
                  "cursor-pointer transition-all",
                  activePanel === panel.id && "ring-2 ring-primary"
                )}
              >
                <ComicPanel
                  panelNumber={panel.id}
                  title={panel.title}
                  imageSrc={panel.imageSrc}
                  dialogue={panel.dialogue}
                  isUnlocked={unlockedPanels.includes(panel.id)}
                  onUnlock={() => handleUnlock(panel.id)}
                  isActive={false}
                  onClick={() => {
                    if (unlockedPanels.includes(panel.id)) {
                      setActivePanel(panel.id);
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Story Summary */}
        {unlockedPanels.length === COMIC_PANELS.length && (
          <section className="mt-12 p-8 bg-card border border-primary animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center">
              <h2 className="text-3xl font-black text-primary mb-4 uppercase">
                ¡Conquista Completa!
              </h2>
              <p className="text-foreground text-lg max-w-2xl mx-auto">
                Has desbloqueado toda la historia de Hugo Banzer Cyborg. Derrotó a los robots, aplastó a los bloqueadores masistas, venció a los ponchos rojos y sobrevivió a la dinamita de los mineros de la COB. Su leyenda de acero y sangre es inmortal.
              </p>
              <button
                onClick={handleReset}
                className="mt-6 px-8 py-3 bg-primary hover:bg-primary/80 text-primary-foreground font-bold uppercase tracking-wider transition-all hover:scale-105"
              >
                Leer de Nuevo
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm uppercase tracking-wider">
            Cyborg Chronicles &copy; 2026 - Una historia interactiva
          </p>
        </div>
      </footer>
    </div>
  );
}
