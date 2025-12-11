import { Trophy, Clock, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorkoutCompleteProps {
  totalTime: string;
  totalSets: number;
  onClose: () => void;
}

export function WorkoutComplete({ totalTime, totalSets, onClose }: WorkoutCompleteProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="gradient-card rounded-2xl p-8 max-w-sm w-full mx-4 shadow-card border border-border text-center animate-slide-up">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-primary flex items-center justify-center shadow-glow">
          <Trophy className="w-10 h-10 text-primary-foreground" />
        </div>

        <h2 className="text-3xl font-display text-foreground mb-2">
          TREINO COMPLETO!
        </h2>
        <p className="text-muted-foreground mb-6">Parabéns pelo esforço! 💪</p>

        <div className="flex justify-center gap-8 mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-display text-foreground">{totalTime}</p>
            <p className="text-xs text-muted-foreground">Duração</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Dumbbell className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-display text-foreground">{totalSets}</p>
            <p className="text-xs text-muted-foreground">Séries</p>
          </div>
        </div>

        <Button
          onClick={onClose}
          className="w-full gradient-primary text-primary-foreground hover:opacity-90"
        >
          Fechar
        </Button>
      </div>
    </div>
  );
}
