import { Play, Pause, Square, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorkoutHeaderProps {
  dayName: string;
  elapsed: number;
  isRunning: boolean;
  formatTime: (ms: number) => string;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  onBack: () => void;
}

export function WorkoutHeader({
  dayName,
  elapsed,
  isRunning,
  formatTime,
  onStart,
  onPause,
  onStop,
  onBack,
}: WorkoutHeaderProps) {
  return (
    <div className="gradient-card rounded-xl p-4 shadow-card border border-border">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-1"
        >
          ← Voltar
        </button>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Timer className="w-4 h-4" />
          <span className="text-sm">Tempo de treino</span>
        </div>
      </div>

      <h2 className="text-xl font-display tracking-wide text-center mb-4 text-foreground">
        {dayName}
      </h2>

      <div className="flex flex-col items-center gap-4">
        <div 
          className={`text-5xl font-display tracking-wider tabular-nums ${
            isRunning ? "text-success animate-pulse" : "text-foreground"
          }`}
        >
          {formatTime(elapsed)}
        </div>

        <div className="flex gap-3">
          {!isRunning && elapsed === 0 && (
            <Button
              onClick={onStart}
              className="gradient-primary text-primary-foreground hover:opacity-90 gap-2 px-6"
            >
              <Play className="w-4 h-4" />
              Iniciar Treino
            </Button>
          )}

          {isRunning && (
            <Button
              onClick={onPause}
              variant="secondary"
              className="gap-2 px-6"
            >
              <Pause className="w-4 h-4" />
              Pausar
            </Button>
          )}

          {!isRunning && elapsed > 0 && (
            <>
              <Button
                onClick={onStart}
                className="gradient-primary text-primary-foreground hover:opacity-90 gap-2 px-6"
              >
                <Play className="w-4 h-4" />
                Continuar
              </Button>
              <Button
                onClick={onStop}
                variant="destructive"
                className="gap-2 px-6"
              >
                <Square className="w-4 h-4" />
                Finalizar
              </Button>
            </>
          )}

          {isRunning && (
            <Button
              onClick={onStop}
              variant="destructive"
              className="gap-2 px-6"
            >
              <Square className="w-4 h-4" />
              Finalizar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
