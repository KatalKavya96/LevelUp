"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Dumbbell,
  ListChecks,
  Play,
  Target
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Exercise } from "@/lib/types";
import { formatDifficulty } from "@/lib/utils";
import { MuscleTargetVisual } from "./MuscleTargetVisual";
import { SetTracker } from "./SetTracker";
import { TimerCard } from "./TimerCard";

interface ExerciseDetailPanelProps {
  exercises: Exercise[];
}

const difficultyTone = {
  BEGINNER: "emerald",
  INTERMEDIATE: "blue",
  ADVANCED: "amber"
} as const;

export const ExerciseDetailPanel = ({ exercises }: ExerciseDetailPanelProps) => {
  return (
    <section id="workout-panel" className="scroll-mt-24">
      <div className="mb-5">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">
          Workout panel
        </p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">
          Selected exercise details
        </h2>
      </div>

      {exercises.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
            <ListChecks className="h-7 w-7" aria-hidden="true" />
          </div>
          <h3 className="mt-4 text-lg font-black text-slate-950">
            No exercises selected
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Select one or more exercise cards to build a focused push-up block.
          </p>
        </Card>
      ) : (
        <div className="space-y-5">
          {exercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
            >
              <ExerciseDetailCard exercise={exercise} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

const ExerciseDetailCard = ({ exercise }: { exercise: Exercise }) => {
  const [isStarted, setIsStarted] = useState(false);
  const primaryTarget = useMemo(
    () => exercise.muscles.find((target) => target.type === "PRIMARY")?.muscle,
    [exercise.muscles]
  );
  const secondaryTargets = useMemo(
    () =>
      exercise.muscles
        .filter((target) => target.type === "SECONDARY")
        .map((target) => target.muscle),
    [exercise.muscles]
  );
  const timerDuration =
    exercise.timerDurationSeconds ?? exercise.restTimeSeconds;

  return (
    <Card className="overflow-hidden">
      <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="bg-slate-950 p-5 text-white sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <Badge tone={difficultyTone[exercise.difficulty]}>
                {formatDifficulty(exercise.difficulty)}
              </Badge>
              <h3 className="mt-3 text-2xl font-black">{exercise.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {exercise.description}
              </p>
            </div>
            <Button
              variant={isStarted ? "outline" : "primary"}
              size="sm"
              onClick={() => setIsStarted((current) => !current)}
              className={isStarted ? "border-white/20 bg-white/10 text-white" : ""}
            >
              <Play className="h-4 w-4" aria-hidden="true" />
              {isStarted ? "Exercise active" : "Start exercise"}
            </Button>
          </div>

          <div className="mt-6 flex min-h-56 items-center justify-center rounded-lg border border-white/10 bg-white/5">
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-emerald-300">
                <Dumbbell className="h-10 w-10" aria-hidden="true" />
              </div>
              <p className="mt-4 text-sm font-bold text-slate-200">
                Animation placeholder
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Media URL is stored with this exercise record.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Metric label="Sets" value={String(exercise.recommendedSets)} />
            <Metric label="Reps" value={exercise.recommendedReps} />
            <Metric label="Rest" value={`${exercise.restTimeSeconds}s`} />
          </div>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
            <MuscleTargetVisual targets={exercise.muscles} />
            <div className="space-y-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                  Targets
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {primaryTarget && (
                    <Badge tone="emerald">Primary: {primaryTarget.name}</Badge>
                  )}
                  {secondaryTargets.map((muscle) => (
                    <Badge key={muscle.id} tone="slate">
                      {muscle.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-sm font-black text-slate-950">
                  <Target className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                  Equipment
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {exercise.equipment}
                </p>
              </div>
            </div>
          </div>

          <TimerCard
            durationSeconds={timerDuration}
            mode={exercise.timerDurationSeconds ? "exercise" : "rest"}
          />

          <SetTracker
            exerciseId={exercise.id}
            totalSets={exercise.recommendedSets}
          />

          <div className="grid gap-4 xl:grid-cols-3">
            <InfoList
              title="Instructions"
              icon={<ListChecks className="h-4 w-4 text-emerald-500" />}
              items={exercise.instructions}
            />
            <InfoList
              title="Common mistakes"
              icon={<AlertTriangle className="h-4 w-4 text-amber-500" />}
              items={exercise.commonMistakes}
            />
            <InfoList
              title="Benefits"
              icon={<CheckCircle2 className="h-4 w-4 text-sky-500" />}
              items={exercise.benefits}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

const Metric = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg border border-white/10 bg-white/5 p-3">
    <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
      {label}
    </p>
    <p className="mt-1 text-xl font-black text-white">{value}</p>
  </div>
);

const InfoList = ({
  title,
  icon,
  items
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
}) => (
  <div className="rounded-lg border border-slate-200 bg-white p-4">
    <div className="flex items-center gap-2 font-black text-slate-950">
      {icon}
      {title}
    </div>
    <ol className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
      {items.map((item, index) => (
        <li key={item} className="flex gap-2">
          <span className="font-black text-slate-400">{index + 1}.</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  </div>
);
