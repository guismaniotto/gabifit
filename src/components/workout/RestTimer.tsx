import { SkipForward, Plus, Minus, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RestTimerProps {
  remaining: number;
  isActive: boolean;
  progress: number;
  onSkip: () => void;
  onAddTime: (seconds: number) => void;
}

export function RestTimer({
  remaining,
  isActive,
  progress,
  onSkip,
  onAddTime,
}: RestTimerProps) {
  if (!isActive) return null;

  const formatRestTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
      return `${mins}m${secs.toString().padStart(2, "0")}s`;
    }
    return `${secs}s`;
  };
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="gradient-rest p-4 shadow-lg">
        <div className="max-w-lg mx-auto">
          {/* Progress bar */}
          <div className="h-1 bg-primary-foreground/20 rounded-full mb-4 overflow-hidden">
            <div
              className="h-full bg-primary-foreground transition-all duration-1000 ease-linear rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-foreground/20 rounded-full animate-pulse">
                <Clock className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-primary-foreground/70">Descanso</p>
                <p className="text-4xl font-display text-primary-foreground">
                  {formatRestTime(remaining)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Button
                onClick={() => onAddTime(-30)}
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-primary-foreground/20 px-2"
                disabled={remaining <= 30}
              >
                <Minus className="w-4 h-4" />
                30s
              </Button>
              <Button
                onClick={() => onAddTime(30)}
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-primary-foreground/20 px-2"
              >
                <Plus className="w-4 h-4" />
                30s
              </Button>
              <Button
                onClick={onSkip}
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-primary-foreground/20 gap-1 ml-2"
              >
                <SkipForward className="w-4 h-4" />
                Pular
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
