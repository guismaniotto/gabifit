import { useState, useCallback } from "react";
import { Dumbbell } from "lucide-react";
import { WORKOUT_PLAN } from "@/data/workoutPlan";
import { Day, Exercise, SetConfig } from "@/types/workout";
import { useWorkoutLogs } from "@/hooks/useWorkoutLogs";
import { useWorkoutTimer } from "@/hooks/useWorkoutTimer";
import { useRestTimer } from "@/hooks/useRestTimer";
import { DaySelector } from "@/components/workout/DaySelector";
import { WorkoutHeader } from "@/components/workout/WorkoutHeader";
import { RestTimer } from "@/components/workout/RestTimer";
import { ExerciseCard } from "@/components/workout/ExerciseCard";
import { WorkoutComplete } from "@/components/workout/WorkoutComplete";
import { toast } from "sonner";

const Index = () => {
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);
  const [completedSets, setCompletedSets] = useState<Set<string>>(new Set());
  const [showComplete, setShowComplete] = useState(false);
  const [finalTime, setFinalTime] = useState("");

  const { addLog, getLastWeight } = useWorkoutLogs();
  const workoutTimer = useWorkoutTimer();
  const restTimer = useRestTimer();

  const selectedDay = WORKOUT_PLAN.days.find((d) => d.id === selectedDayId) ?? null;

  const handleSelectDay = (dayId: string) => {
    setSelectedDayId(dayId);
    setCompletedSets(new Set());
  };

  const handleBack = () => {
    if (workoutTimer.isRunning || workoutTimer.elapsed > 0) {
      const confirm = window.confirm(
        "Você tem um treino em andamento. Deseja sair mesmo assim?"
      );
      if (!confirm) return;
    }
    setSelectedDayId(null);
    workoutTimer.stop();
    setCompletedSets(new Set());
  };

  const handleCompleteSet = useCallback(
    (exerciseId: string, setId: number, weight: number) => {
      if (!selectedDay) return;

      // Find the exercise and set config
      const exercise = selectedDay.exercises.find((e) => e.id === exerciseId);
      const setConfig = exercise?.sets.find((s) => s.id === setId);

      if (!exercise || !setConfig) return;

      // Save log
      addLog({
        date: new Date().toISOString(),
        workoutId: WORKOUT_PLAN.id,
        dayId: selectedDay.id,
        exerciseId,
        setNumber: setId,
        weight,
      });

      // Mark as completed
      const setKey = `${exerciseId}_${setId}`;
      setCompletedSets((prev) => new Set([...prev, setKey]));

      // Start rest timer
      restTimer.start(setConfig.restSeconds);

      toast.success(`Série ${setId} concluída com ${weight}kg!`);
    },
    [selectedDay, addLog, restTimer]
  );

  const handleStopWorkout = () => {
    const elapsed = workoutTimer.stop();
    const formatted = workoutTimer.formatTime(elapsed);
    setFinalTime(formatted);
    setShowComplete(true);
  };

  const handleCloseComplete = () => {
    setShowComplete(false);
    setSelectedDayId(null);
    setCompletedSets(new Set());
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg gradient-primary">
              <Dumbbell className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-display tracking-wide text-foreground">
                {WORKOUT_PLAN.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                Controle seus treinos
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        {!selectedDay ? (
          <DaySelector
            days={WORKOUT_PLAN.days}
            selectedDayId={selectedDayId}
            onSelectDay={handleSelectDay}
          />
        ) : (
          <>
            <WorkoutHeader
              dayName={selectedDay.name}
              elapsed={workoutTimer.elapsed}
              isRunning={workoutTimer.isRunning}
              formatTime={workoutTimer.formatTime}
              onStart={workoutTimer.start}
              onPause={workoutTimer.pause}
              onStop={handleStopWorkout}
              onBack={handleBack}
            />

            <div className="space-y-4">
              <h3 className="text-lg font-display tracking-wide text-foreground">
                EXERCÍCIOS ({selectedDay.exercises.length})
              </h3>
              {selectedDay.exercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  day={selectedDay}
                  workoutId={WORKOUT_PLAN.id}
                  getLastWeight={getLastWeight}
                  completedSets={completedSets}
                  onCompleteSet={handleCompleteSet}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Rest Timer Overlay */}
      <RestTimer
        remaining={restTimer.remaining}
        isActive={restTimer.isActive}
        progress={restTimer.progress}
        onSkip={restTimer.skip}
        onAddTime={restTimer.addTime}
      />

      {/* Workout Complete Modal */}
      {showComplete && (
        <WorkoutComplete
          totalTime={finalTime}
          totalSets={completedSets.size}
          onClose={handleCloseComplete}
        />
      )}
    </div>
  );
};

export default Index;
