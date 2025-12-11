import { useState, useEffect } from "react";
import { SetLog } from "@/types/workout";

const STORAGE_KEY = "workoutLogs";

function loadLogs(): SetLog[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as SetLog[];
  } catch {
    return [];
  }
}

function saveLogs(logs: SetLog[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

export function useWorkoutLogs() {
  const [logs, setLogs] = useState<SetLog[]>([]);

  useEffect(() => {
    setLogs(loadLogs());
  }, []);

  useEffect(() => {
    saveLogs(logs);
  }, [logs]);

  const addLog = (log: SetLog) => {
    setLogs((prev) => [...prev, log]);
  };

  const getLastWeight = (
    workoutId: string,
    dayId: string,
    exerciseId: string,
    setNumber: number
  ): number | null => {
    const filtered = logs
      .filter(
        (log) =>
          log.workoutId === workoutId &&
          log.dayId === dayId &&
          log.exerciseId === exerciseId &&
          log.setNumber === setNumber
      )
      .sort((a, b) => (a.date < b.date ? 1 : -1));

    return filtered.length > 0 ? filtered[0].weight : null;
  };

  const getExerciseHistory = (
    workoutId: string,
    dayId: string,
    exerciseId: string
  ): SetLog[] => {
    return logs
      .filter(
        (log) =>
          log.workoutId === workoutId &&
          log.dayId === dayId &&
          log.exerciseId === exerciseId
      )
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  };

  return { logs, addLog, getLastWeight, getExerciseHistory };
}
