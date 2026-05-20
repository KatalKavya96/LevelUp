"use client";

import { AlertCircle, ListChecks } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Exercise } from "@/lib/types";
import { ExerciseCard } from "./ExerciseCard";

interface ExerciseSelectorProps {
  exercises: Exercise[];
  selectedSlugs: string[];
  selectedMuscleName: string | null;
  isLoading: boolean;
  error: string | null;
  onToggle: (exercise: Exercise) => void;
}

export const ExerciseSelector = ({
  exercises,
  selectedSlugs,
  selectedMuscleName,
  isLoading,
  error,
  onToggle
}: ExerciseSelectorProps) => {
  return (
    <section id="exercise-selection" className="scroll-mt-24">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">
            Exercise library
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">
            {selectedMuscleName
              ? `${selectedMuscleName} push-up variations`
              : "Push-up variations"}
          </h2>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600 shadow-soft">
          <ListChecks className="h-4 w-4 text-emerald-500" aria-hidden="true" />
          {selectedSlugs.length} selected
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-72 animate-pulse rounded-lg border border-slate-200 bg-white shadow-soft"
            />
          ))}
        </div>
      ) : error ? (
        <Card className="border-rose-200 bg-rose-50 p-6 text-rose-700">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <h3 className="font-black">Exercises unavailable</h3>
              <p className="mt-1 text-sm">{error}</p>
            </div>
          </div>
        </Card>
      ) : exercises.length === 0 ? (
        <Card className="p-8 text-center">
          <h3 className="text-lg font-black text-slate-950">
            No exercises found
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            This target muscle has no push-up variations yet.
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              isSelected={selectedSlugs.includes(exercise.slug)}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </section>
  );
};
