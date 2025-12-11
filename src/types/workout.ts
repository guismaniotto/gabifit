export interface SetConfig {
  id: number;
  minReps: number;
  maxReps: number;
  rpe?: number;
  restSeconds: number;
}

export interface Exercise {
  id: string;
  name: string;
  sets: SetConfig[];
}

export interface Day {
  id: string;
  name: string;
  isRestDay?: boolean;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  id: string;
  name: string;
  days: Day[];
}

export interface SetLog {
  date: string;
  workoutId: string;
  dayId: string;
  exerciseId: string;
  setNumber: number;
  weight: number;
}
