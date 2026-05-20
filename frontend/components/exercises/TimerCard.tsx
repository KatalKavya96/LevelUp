"use client";

import { CheckCircle2, Pause, Play, RotateCcw, Timer } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { useTimer } from "@/hooks/useTimer";

interface TimerCardProps {
  durationSeconds: number;
  mode: "rest" | "exercise";
}

export const TimerCard = ({ durationSeconds, mode }: TimerCardProps) => {
  const timer = useTimer(durationSeconds);

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
            {mode === "rest" ? "Rest timer" : "Exercise timer"}
          </p>
          <div className="mt-2 flex items-end gap-2">
            <span className="text-4xl font-black tabular-nums text-slate-950">
              {timer.formattedTime}
            </span>
            <span className="pb-1 text-sm font-bold text-slate-500">
              countdown
            </span>
          </div>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950 text-emerald-400">
          <Timer className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>

      <Progress value={timer.progress} className="mt-4" />

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={timer.start}
          disabled={timer.isRunning || timer.isComplete}
        >
          <Play className="h-4 w-4" aria-hidden="true" />
          Start
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={timer.pause}
          disabled={!timer.isRunning}
        >
          <Pause className="h-4 w-4" aria-hidden="true" />
          Pause
        </Button>
        <Button variant="outline" size="sm" onClick={timer.reset}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Reset
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={timer.complete}
          disabled={timer.isComplete}
        >
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          Complete
        </Button>
      </div>
    </Card>
  );
};
