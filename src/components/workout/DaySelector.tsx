import { Day } from "@/types/workout";
import { Calendar, ChevronRight, Dumbbell, Coffee } from "lucide-react";

interface DaySelectorProps {
  days: Day[];
  selectedDayId: string | null;
  onSelectDay: (dayId: string) => void;
}

export function DaySelector({ days, selectedDayId, onSelectDay }: DaySelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-display tracking-wide">SELECIONE O DIA</h2>
      </div>
      
      <div className="grid gap-3">
        {days.map((day, index) => (
          <button
            key={day.id}
            onClick={() => onSelectDay(day.id)}
            disabled={day.isRestDay}
            className={`group relative overflow-hidden rounded-lg p-4 text-left transition-all duration-300 ${
              day.isRestDay
                ? "bg-muted/50 border border-border cursor-not-allowed opacity-60"
                : selectedDayId === day.id
                ? "gradient-primary shadow-glow"
                : "bg-card hover:bg-secondary border border-border"
            }`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  day.isRestDay
                    ? "bg-muted"
                    : selectedDayId === day.id 
                    ? "bg-primary-foreground/20" 
                    : "bg-secondary"
                }`}>
                  {day.isRestDay ? (
                    <Coffee className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Dumbbell className={`w-5 h-5 ${
                      selectedDayId === day.id 
                        ? "text-primary-foreground" 
                        : "text-primary"
                    }`} />
                  )}
                </div>
                <div>
                  <p className={`font-semibold ${
                    day.isRestDay
                      ? "text-muted-foreground"
                      : selectedDayId === day.id 
                      ? "text-primary-foreground" 
                      : "text-foreground"
                  }`}>
                    {day.name}
                  </p>
                  <p className={`text-sm ${
                    day.isRestDay
                      ? "text-muted-foreground"
                      : selectedDayId === day.id 
                      ? "text-primary-foreground/70" 
                      : "text-muted-foreground"
                  }`}>
                    {day.isRestDay ? "Descanso ou atividade leve" : `${day.exercises.length} exercícios`}
                  </p>
                </div>
              </div>
              {!day.isRestDay && (
                <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                  selectedDayId === day.id 
                    ? "text-primary-foreground" 
                    : "text-muted-foreground"
                }`} />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
