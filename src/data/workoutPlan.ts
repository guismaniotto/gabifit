import { WorkoutPlan } from "@/types/workout";

// Helper to generate sets
const generateSets = (count: number, minReps: number, maxReps: number, rpe: number, restSeconds: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    minReps,
    maxReps,
    rpe,
    restSeconds,
  }));

export const WORKOUT_PLAN: WorkoutPlan = {
  id: "ppl",
  name: "GabiFIT",
  days: [
    {
      id: "day1",
      name: "Monday - Push (Chest, Shoulders, Triceps)",
      exercises: [
        {
          id: "bench_press",
          name: "Barbell Bench Press",
          sets: generateSets(4, 6, 8, 8, 120),
        },
        {
          id: "seated_ohp",
          name: "Seated Overhead Dumbbell Press",
          sets: generateSets(3, 8, 10, 8, 90),
        },
        {
          id: "incline_db_press",
          name: "Incline Dumbbell Press",
          sets: generateSets(3, 10, 12, 9, 90),
        },
        {
          id: "lateral_raises",
          name: "Lateral Raises",
          sets: generateSets(3, 12, 15, 9, 60),
        },
        {
          id: "triceps_pushdowns",
          name: "Cable Triceps Pushdowns",
          sets: generateSets(3, 12, 15, 9, 60),
        },
      ],
    },
    {
      id: "day2",
      name: "Tuesday - Pull (Back, Biceps)",
      exercises: [
        {
          id: "weighted_pullups",
          name: "Weighted Pull-Ups",
          sets: generateSets(4, 6, 8, 8, 120),
        },
        {
          id: "bent_over_rows",
          name: "Barbell Bent-Over Rows",
          sets: generateSets(3, 8, 10, 8, 90),
        },
        {
          id: "lat_pulldowns",
          name: "Lat Pulldowns (Wide Grip)",
          sets: generateSets(3, 10, 12, 9, 90),
        },
        {
          id: "seated_cable_rows",
          name: "Seated Cable Rows",
          sets: generateSets(3, 12, 15, 9, 60),
        },
        {
          id: "ez_bar_curls",
          name: "EZ Bar Curls",
          sets: generateSets(3, 12, 15, 9, 60),
        },
      ],
    },
    {
      id: "day3",
      name: "Wednesday - Legs",
      exercises: [
        {
          id: "back_squats",
          name: "Barbell Back Squats",
          sets: generateSets(4, 6, 8, 8, 150),
        },
        {
          id: "romanian_deadlifts",
          name: "Romanian Deadlifts",
          sets: generateSets(3, 8, 10, 8, 120),
        },
        {
          id: "leg_press",
          name: "Leg Press",
          sets: generateSets(3, 10, 12, 9, 90),
        },
        {
          id: "hamstring_curls",
          name: "Lying Hamstring Curls",
          sets: generateSets(3, 12, 15, 9, 60),
        },
        {
          id: "calf_raises",
          name: "Standing Calf Raises",
          sets: generateSets(3, 15, 20, 9, 60),
        },
      ],
    },
    {
      id: "day4",
      name: "Thursday - Rest Day",
      isRestDay: true,
      exercises: [],
    },
    {
      id: "day5",
      name: "Friday - Push (Shoulders & Chest)",
      exercises: [
        {
          id: "standing_ohp",
          name: "Standing Overhead Barbell Press",
          sets: generateSets(4, 6, 8, 8, 120),
        },
        {
          id: "flat_db_press",
          name: "Flat Dumbbell Press",
          sets: generateSets(3, 8, 10, 8, 90),
        },
        {
          id: "cable_lateral_raises",
          name: "Cable Lateral Raises",
          sets: generateSets(3, 12, 15, 9, 60),
        },
        {
          id: "skull_crushers",
          name: "Dumbbell Skull Crushers",
          sets: generateSets(3, 10, 12, 9, 60),
        },
        {
          id: "rope_triceps_ext",
          name: "Overhead Rope Triceps Extensions",
          sets: generateSets(3, 12, 15, 9, 60),
        },
      ],
    },
    {
      id: "day6",
      name: "Saturday - Pull (Back & Biceps)",
      exercises: [
        {
          id: "deadlifts",
          name: "Barbell Deadlifts",
          sets: generateSets(4, 5, 5, 8, 180),
        },
        {
          id: "chest_supported_rows",
          name: "Chest-Supported Rows",
          sets: generateSets(3, 8, 10, 8, 90),
        },
        {
          id: "close_grip_pulldowns",
          name: "Close-Grip Lat Pulldowns",
          sets: generateSets(3, 10, 12, 9, 90),
        },
        {
          id: "hammer_curls",
          name: "Dumbbell Hammer Curls",
          sets: generateSets(3, 12, 15, 9, 60),
        },
        {
          id: "preacher_curls",
          name: "Preacher Curls",
          sets: generateSets(3, 12, 15, 9, 60),
        },
      ],
    },
  ],
};
