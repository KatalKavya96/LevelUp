"use client";

import { Activity } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ExerciseMuscleTarget } from "@/lib/types";
import { cn } from "@/lib/utils";

interface MuscleTargetVisualProps {
  targets: ExerciseMuscleTarget[];
}

const highlightClassBySlug: Record<string, string> = {
  chest: "bg-emerald-500 shadow-emerald-200",
  "upper-chest": "bg-sky-500 shadow-sky-200",
  "lower-chest": "bg-teal-500 shadow-teal-200",
  triceps: "bg-amber-500 shadow-amber-200",
  shoulders: "bg-indigo-500 shadow-indigo-200",
  core: "bg-rose-500 shadow-rose-200",
  "serratus-anterior": "bg-cyan-500 shadow-cyan-200",
  "full-upper-body": "bg-slate-800 shadow-slate-300"
};

export const MuscleTargetVisual = ({ targets }: MuscleTargetVisualProps) => {
  const primaryTarget = targets.find((target) => target.type === "PRIMARY");
  const activeSlugs = new Set(targets.map((target) => target.muscle.slug));
  const isActive = (slug: string) => activeSlugs.has(slug);
  const primaryClass = primaryTarget
    ? highlightClassBySlug[primaryTarget.muscle.slug] ?? "bg-emerald-500"
    : "bg-emerald-500";

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
            Muscle map
          </p>
          <h4 className="mt-1 font-black text-slate-950">
            {primaryTarget?.muscle.name ?? "Target area"}
          </h4>
        </div>
        <Activity className="h-5 w-5 text-emerald-500" aria-hidden="true" />
      </div>

      <div className="relative mx-auto h-60 max-w-xs rounded-lg border border-slate-200 bg-white">
        <div className="absolute left-1/2 top-5 h-10 w-10 -translate-x-1/2 rounded-full bg-slate-200" />
        <div
          className={cn(
            "absolute left-1/2 top-16 h-16 w-28 -translate-x-1/2 rounded-t-3xl rounded-b-lg bg-slate-200 transition",
            isActive("chest") || isActive("full-upper-body")
              ? primaryClass
              : "",
            isActive("chest") || isActive("full-upper-body")
              ? "shadow-lg"
              : ""
          )}
        />
        <div
          className={cn(
            "absolute left-[4.1rem] top-16 h-16 w-5 rotate-12 rounded-full bg-slate-200 transition",
            isActive("shoulders") || isActive("full-upper-body")
              ? "bg-indigo-500 shadow-lg shadow-indigo-200"
              : ""
          )}
        />
        <div
          className={cn(
            "absolute right-[4.1rem] top-16 h-16 w-5 -rotate-12 rounded-full bg-slate-200 transition",
            isActive("shoulders") || isActive("full-upper-body")
              ? "bg-indigo-500 shadow-lg shadow-indigo-200"
              : ""
          )}
        />
        <div
          className={cn(
            "absolute left-[3.65rem] top-28 h-16 w-4 rotate-12 rounded-full bg-slate-200 transition",
            isActive("triceps") || isActive("full-upper-body")
              ? "bg-amber-500 shadow-lg shadow-amber-200"
              : ""
          )}
        />
        <div
          className={cn(
            "absolute right-[3.65rem] top-28 h-16 w-4 -rotate-12 rounded-full bg-slate-200 transition",
            isActive("triceps") || isActive("full-upper-body")
              ? "bg-amber-500 shadow-lg shadow-amber-200"
              : ""
          )}
        />
        <div
          className={cn(
            "absolute left-1/2 top-32 h-16 w-20 -translate-x-1/2 rounded-b-3xl bg-slate-200 transition",
            isActive("core") || isActive("full-upper-body")
              ? "bg-rose-500 shadow-lg shadow-rose-200"
              : ""
          )}
        />
        <div
          className={cn(
            "absolute left-[5.15rem] top-[6.25rem] h-10 w-3 rounded-full bg-slate-300 transition",
            isActive("serratus-anterior")
              ? "bg-cyan-500 shadow-lg shadow-cyan-200"
              : ""
          )}
        />
        <div
          className={cn(
            "absolute right-[5.15rem] top-[6.25rem] h-10 w-3 rounded-full bg-slate-300 transition",
            isActive("serratus-anterior")
              ? "bg-cyan-500 shadow-lg shadow-cyan-200"
              : ""
          )}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {targets.map((target) => (
          <Badge
            key={target.id}
            tone={target.type === "PRIMARY" ? "emerald" : "slate"}
          >
            {target.type === "PRIMARY" ? "Primary" : "Secondary"}:{" "}
            {target.muscle.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};
