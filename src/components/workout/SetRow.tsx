import { useState } from "react";
import { Check, Weight, History } from "lucide-react";
import { SetConfig } from "@/types/workout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SetRowProps {
  set: SetConfig;
  lastWeight: number | null;
  isCompleted: boolean;
  onComplete: (weight: number) => void;
}

export function SetRow({ set, lastWeight, isCompleted, onComplete }: SetRowProps) {
  const [weight, setWeight] = useState<string>(lastWeight?.toString() || "");

  const handleComplete = () => {
    const weightNum = parseFloat(weight);
    if (isNaN(weightNum) || weightNum <= 0) {
      return;
    }
    onComplete(weightNum);
  };

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg transition-all ${
        isCompleted
          ? "bg-success/10 border border-success/30"
          : "bg-secondary/50 border border-border"
      }`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`font-semibold ${isCompleted ? "text-success" : "text-foreground"}`}>
            Série {set.id}
          </span>
          {isCompleted && <Check className="w-4 h-4 text-success" />}
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span>
            {set.minReps === set.maxReps ? `${set.minReps} reps` : `${set.minReps}–${set.maxReps} reps`}
          </span>
          {set.rpe && (
            <>
              <span>•</span>
              <span className="text-primary">RPE {set.rpe}</span>
            </>
          )}
          <span>•</span>
          <span>Descanso: {Math.floor(set.restSeconds / 60) > 0 ? `${Math.floor(set.restSeconds / 60)}m${set.restSeconds % 60 > 0 ? (set.restSeconds % 60).toString().padStart(2, '0') + 's' : ''}` : `${set.restSeconds}s`}</span>
        </div>
        {lastWeight !== null && (
          <div className="flex items-center gap-1 mt-1 text-xs text-primary">
            <History className="w-3 h-3" />
            <span>Última: {lastWeight} kg</span>
          </div>
        )}
      </div>

      {!isCompleted && (
        <div className="flex items-center gap-2">
          <div className="relative">
            <Weight className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="number"
              min={0}
              step={0.5}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-28 pl-9 bg-background border-border"
              placeholder="kg"
            />
          </div>
          <Button
            onClick={handleComplete}
            disabled={!weight || parseFloat(weight) <= 0}
            className="gradient-primary text-primary-foreground hover:opacity-90 shrink-0"
          >
            <Check className="w-4 h-4 mr-1" />
            OK
          </Button>
        </div>
      )}

      {isCompleted && (
        <div className="text-right">
          <p className="text-lg font-semibold text-success">{weight} kg</p>
        </div>
      )}
    </div>
  );
}
