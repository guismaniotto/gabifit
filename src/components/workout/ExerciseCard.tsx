import { useState } from "react";
import { ChevronDown, Dumbbell } from "lucide-react";
import { Exercise, Day } from "@/types/workout";
import { SetRow } from "./SetRow";

interface ExerciseCardProps {
  exercise: Exercise;
  day: Day;
  workoutId: string;
  getLastWeight: (
    workoutId: string,
    dayId: string,
    exerciseId: string,
    setNumber: number
  ) => number | null;
  completedSets: Set<string>;
  onCompleteSet: (exerciseId: string, setId: number, weight: number) => void;
}

export function ExerciseCard({
  exercise,
  day,
  workoutId,
  getLastWeight,
  completedSets,
  onCompleteSet,
}: ExerciseCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const completedCount = exercise.sets.filter((s) =>
    completedSets.has(`${exercise.id}_${s.id}`)
  ).length;

  const isAllCompleted = completedCount === exercise.sets.length;

  return (
    <div
      className={`rounded-xl border transition-all shadow-card ${
        isAllCompleted
          ? "bg-success/5 border-success/30"
          : "gradient-card border-border"
      }`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${
              isAllCompleted ? "bg-success/20" : "bg-secondary"
            }`}
          >
            <Dumbbell
              className={`w-5 h-5 ${
                isAllCompleted ? "text-success" : "text-primary"
              }`}
            />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{exercise.name}</h3>
            <p className="text-sm text-muted-foreground">
              {completedCount}/{exercise.sets.length} séries completas
            </p>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-2">
          {exercise.sets.map((set) => {
            const setKey = `${exercise.id}_${set.id}`;
            const isCompleted = completedSets.has(setKey);
            const lastWeight = getLastWeight(
              workoutId,
              day.id,
              exercise.id,
              set.id
            );

            return (
              <SetRow
                key={set.id}
                set={set}
                lastWeight={lastWeight}
                isCompleted={isCompleted}
                onComplete={(weight) => onCompleteSet(exercise.id, set.id, weight)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
