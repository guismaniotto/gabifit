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
  id: "gabifit",
  name: "GabiFIT",
  days: [
    {
      id: "day1",
      name: "Dia 1 – Inferiores (Glúteos, Quadríceps, Posteriores)",
      exercises: [
        {
          id: "goblet_squat",
          name: "Agachamento com Halter (Goblet)",
          sets: generateSets(3, 10, 12, 7, 90),
        },
        {
          id: "romanian_deadlift_db",
          name: "Peso Morto Romeno com Halteres",
          sets: generateSets(3, 10, 12, 7, 90),
        },
        {
          id: "leg_press_high",
          name: "Leg Press (Pés altos e afastados)",
          sets: generateSets(3, 12, 15, 8, 90),
        },
        {
          id: "glute_crossover",
          name: "Cadeira ou Crossover Glúteo",
          sets: generateSets(3, 15, 20, 8, 60),
        },
        {
          id: "seated_leg_curl",
          name: "Mesa Flexora Sentada",
          sets: generateSets(3, 12, 15, 8, 60),
        },
      ],
    },
    {
      id: "day2",
      name: "Dia 2 – Superiores (Costas e Bíceps)",
      exercises: [
        {
          id: "neutral_pulldown",
          name: "Puxada na Barra com Pegada Neutra",
          sets: generateSets(3, 10, 12, 7, 90),
        },
        {
          id: "cable_row",
          name: "Remada Baixa no Cabo",
          sets: generateSets(3, 10, 12, 7, 90),
        },
        {
          id: "assisted_pullup",
          name: "Barra Fixa Assistida",
          sets: generateSets(3, 6, 8, 8, 120),
        },
        {
          id: "alternating_curl",
          name: "Rosca Alternada com Halteres",
          sets: generateSets(3, 10, 12, 8, 60),
        },
        {
          id: "face_pull",
          name: "Face Pull (Cabo)",
          sets: generateSets(3, 12, 15, 8, 60),
        },
      ],
    },
    {
      id: "day3",
      name: "Dia 3 – Glúteos Foco (Hipertrofia)",
      exercises: [
        {
          id: "hip_thrust",
          name: "Elevação Pélvica com Barra (Hip Thrust)",
          sets: generateSets(4, 10, 12, 8, 120),
        },
        {
          id: "bulgarian_squat",
          name: "Agachamento Búlgaro",
          sets: generateSets(3, 8, 10, 8, 90),
        },
        {
          id: "frog_pumps",
          name: "Frog Pumps com Halter",
          sets: generateSets(3, 20, 25, 8, 60),
        },
        {
          id: "cable_pull_through",
          name: "Pull-Through no Cabo",
          sets: generateSets(3, 15, 15, 8, 60),
        },
        {
          id: "step_up_weighted",
          name: "Subida em Caixa com Peso",
          sets: generateSets(3, 10, 10, 7, 60),
        },
      ],
    },
    {
      id: "day4",
      name: "Dia 4 – Superiores (Peito, Ombros e Tríceps)",
      exercises: [
        {
          id: "incline_db_press",
          name: "Supino Inclinado com Halteres",
          sets: generateSets(3, 10, 12, 7, 90),
        },
        {
          id: "shoulder_press_machine",
          name: "Desenvolvimento de Ombros na Máquina",
          sets: generateSets(3, 10, 12, 7, 90),
        },
        {
          id: "lateral_raise_db",
          name: "Elevação Lateral com Halteres",
          sets: generateSets(3, 15, 15, 8, 60),
        },
        {
          id: "triceps_rope",
          name: "Tríceps na Corda (Cabo)",
          sets: generateSets(3, 12, 15, 8, 60),
        },
        {
          id: "low_cable_fly",
          name: "Crucifixo no Cabo (Baixo para Cima)",
          sets: generateSets(3, 15, 15, 8, 60),
        },
      ],
    },
    {
      id: "day5",
      name: "Dia 5 – Corpo Inteiro (Condicionamento + Glúteos)",
      exercises: [
        {
          id: "kettlebell_swings",
          name: "Kettlebell Swings",
          sets: generateSets(3, 20, 20, 8, 60),
        },
        {
          id: "walking_lunges",
          name: "Avanço com Halteres (Walking Lunges)",
          sets: generateSets(3, 10, 10, 8, 90),
        },
        {
          id: "sled_push",
          name: "Empurrar Trenó ou Caminhada Inclinada (10 min)",
          sets: generateSets(1, 1, 1, 6, 0),
        },
        {
          id: "step_up",
          name: "Subida em Caixa",
          sets: generateSets(3, 15, 15, 8, 60),
        },
        {
          id: "plank_row",
          name: "Prancha com Remada (30 seg cada lado)",
          sets: generateSets(3, 1, 1, 7, 60),
        },
      ],
    },
  ],
};
