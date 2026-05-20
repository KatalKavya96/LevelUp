"use client";

import { useEffect, useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface SetTrackerProps {
  exerciseId: string;
  totalSets: number;
}

export const SetTracker = ({ exerciseId, totalSets }: SetTrackerProps) => {
  const [completedSets, setCompletedSets] = useState(0);

  useEffect(() => {
    setCompletedSets(0);
  }, [exerciseId, totalSets]);

  const markSetComplete = () => {
    setCompletedSets((current) => Math.min(totalSets, current + 1));
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
            Set tracker
          </p>
          <p className="mt-1 font-black text-slate-950">
            {completedSets} of {totalSets} sets complete
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCompletedSets(0)}
            disabled={completedSets === 0}
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Reset
          </Button>
          <Button
            size="sm"
            onClick={markSetComplete}
            disabled={completedSets >= totalSets}
          >
            <Check className="h-4 w-4" aria-hidden="true" />
            Mark set complete
          </Button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6">
        {Array.from({ length: totalSets }).map((_, index) => (
          <div
            key={`${exerciseId}-${index}`}
            className={cn(
              "h-3 rounded-full transition",
              index < completedSets ? "bg-emerald-500" : "bg-slate-100"
            )}
          />
        ))}
      </div>
    </div>
  );
};
