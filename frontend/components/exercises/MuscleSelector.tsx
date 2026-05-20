"use client";

import {
  Activity,
  ArrowDown,
  ArrowUp,
  CircleDot,
  Dumbbell,
  Shield,
  Target,
  Zap,
  type LucideIcon
} from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Muscle } from "@/lib/types";
import { cn } from "@/lib/utils";

interface MuscleSelectorProps {
  muscles: Muscle[];
  selectedSlug: string | null;
  isLoading: boolean;
  error: string | null;
  onSelect: (slug: string) => void;
}

const muscleIcons: Record<string, LucideIcon> = {
  chest: Dumbbell,
  "upper-chest": ArrowUp,
  "lower-chest": ArrowDown,
  triceps: Zap,
  shoulders: Shield,
  core: CircleDot,
  "serratus-anterior": Activity,
  "full-upper-body": Target
};

export const MuscleSelector = ({
  muscles,
  selectedSlug,
  isLoading,
  error,
  onSelect
}: MuscleSelectorProps) => {
  if (isLoading) {
    return (
      <Card className="p-5">
        <div className="mb-5 h-6 w-36 rounded bg-slate-100" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-24 animate-pulse rounded-lg border border-slate-200 bg-slate-50"
            />
          ))}
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-rose-200 bg-rose-50 p-5 text-rose-700">
        <h2 className="text-lg font-black">Muscles unavailable</h2>
        <p className="mt-2 text-sm">{error}</p>
      </Card>
    );
  }

  return (
    <Card className="p-5">
      <div className="mb-5">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">
          Target muscle
        </p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">
          Choose one focus
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {muscles.map((muscle, index) => {
          const Icon = muscleIcons[muscle.slug] ?? Target;
          const isSelected = selectedSlug === muscle.slug;

          return (
            <motion.button
              key={muscle.id}
              type="button"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => onSelect(muscle.slug)}
              className={cn(
                "group rounded-lg border p-4 text-left transition duration-200",
                isSelected
                  ? "border-emerald-400 bg-emerald-50 shadow-soft"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              )}
              aria-pressed={isSelected}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition",
                    isSelected
                      ? "bg-emerald-500 text-slate-950"
                      : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-black text-slate-950">
                    {muscle.name}
                  </span>
                  <span className="mt-1 line-clamp-2 block text-sm leading-5 text-slate-500">
                    {muscle.description}
                  </span>
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </Card>
  );
};
