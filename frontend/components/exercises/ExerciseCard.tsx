"use client";

import { CheckCircle2, Circle, Dumbbell, Timer } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Exercise } from "@/lib/types";
import { cn, formatDifficulty } from "@/lib/utils";

interface ExerciseCardProps {
  exercise: Exercise;
  isSelected: boolean;
  onToggle: (exercise: Exercise) => void;
}

const difficultyTone = {
  BEGINNER: "emerald",
  INTERMEDIATE: "blue",
  ADVANCED: "amber"
} as const;

export const ExerciseCard = ({
  exercise,
  isSelected,
  onToggle
}: ExerciseCardProps) => {
  const primaryTarget = exercise.muscles.find(
    (target) => target.type === "PRIMARY"
  )?.muscle;

  return (
    <button
      type="button"
      onClick={() => onToggle(exercise)}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-lg border bg-white text-left shadow-soft transition duration-200 hover:-translate-y-0.5 hover:shadow-panel",
        isSelected
          ? "border-emerald-400 ring-2 ring-emerald-200"
          : "border-slate-200 hover:border-slate-300"
      )}
      aria-pressed={isSelected}
    >
      <div className="relative flex h-32 items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(16,185,129,0.24),rgba(14,165,233,0.12))]" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-emerald-300 backdrop-blur">
          <Dumbbell className="h-8 w-8" aria-hidden="true" />
        </div>
        <span className="absolute right-3 top-3 rounded-md bg-white/10 px-2 py-1 text-xs font-bold text-white backdrop-blur">
          Preview
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-black text-slate-950">
              {exercise.name}
            </h3>
            <p className="mt-1 text-sm font-medium text-slate-500">
              {primaryTarget?.name ?? "Primary target"}
            </p>
          </div>
          {isSelected ? (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
          ) : (
            <Circle className="h-5 w-5 shrink-0 text-slate-300 transition group-hover:text-slate-500" />
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge tone={difficultyTone[exercise.difficulty]}>
            {formatDifficulty(exercise.difficulty)}
          </Badge>
          <Badge tone="slate">
            {exercise.recommendedSets} sets x {exercise.recommendedReps}
          </Badge>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-500">
          <Timer className="h-4 w-4 text-slate-400" aria-hidden="true" />
          {exercise.restTimeSeconds}s rest
        </div>
      </div>
    </button>
  );
};
