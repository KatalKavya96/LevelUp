"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Database,
  Dumbbell,
  Layers,
  Timer,
  Trophy
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useExercises, useMuscles } from "@/hooks/useExercises";
import { Exercise } from "@/lib/types";
import { ExerciseDetailPanel } from "./ExerciseDetailPanel";
import { ExerciseSelector } from "./ExerciseSelector";
import { MuscleSelector } from "./MuscleSelector";

const muscleDisplayOrder: Record<string, number> = {
  chest: 1,
  "upper-chest": 2,
  "lower-chest": 3,
  triceps: 4,
  shoulders: 5,
  core: 6,
  "serratus-anterior": 7,
  "full-upper-body": 8
};

export const ExerciseGuidePage = () => {
  const musclesState = useMuscles();
  const orderedMuscles = useMemo(
    () =>
      [...musclesState.data].sort(
        (a, b) =>
          (muscleDisplayOrder[a.slug] ?? 99) -
          (muscleDisplayOrder[b.slug] ?? 99)
      ),
    [musclesState.data]
  );
  const [selectedMuscleSlug, setSelectedMuscleSlug] = useState<string | null>(
    null
  );
  const exercisesState = useExercises(selectedMuscleSlug);
  const [selectedExerciseSlugs, setSelectedExerciseSlugs] = useState<string[]>(
    []
  );

  useEffect(() => {
    if (!selectedMuscleSlug && orderedMuscles.length > 0) {
      setSelectedMuscleSlug(orderedMuscles[0].slug);
    }
  }, [orderedMuscles, selectedMuscleSlug]);

  useEffect(() => {
    setSelectedExerciseSlugs([]);
  }, [selectedMuscleSlug]);

  const selectedMuscle = orderedMuscles.find(
    (muscle) => muscle.slug === selectedMuscleSlug
  );

  const selectedExercises = useMemo(
    () =>
      exercisesState.data.filter((exercise) =>
        selectedExerciseSlugs.includes(exercise.slug)
      ),
    [exercisesState.data, selectedExerciseSlugs]
  );

  const toggleExercise = (exercise: Exercise) => {
    setSelectedExerciseSlugs((current) =>
      current.includes(exercise.slug)
        ? current.filter((slug) => slug !== exercise.slug)
        : [...current, exercise.slug]
    );
  };

  const scrollToTraining = () => {
    document
      .getElementById("muscle-selection")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50">
      <Navbar />

      <main>
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold text-emerald-300">
                <Activity className="h-4 w-4" aria-hidden="true" />
                Push-up focused training guide
              </div>
              <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
                Push-Up Muscle Builder
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Choose a target muscle, compare push-up variations, and build a
                clean workout block with timers, set tracking, and muscle target
                visuals.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" onClick={scrollToTraining}>
                  Start training
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Button>
                <a href="#workout-panel">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-white/15 bg-white/10 text-white hover:bg-white/15 sm:w-auto"
                  >
                    View workout panel
                  </Button>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.45 }}
              className="lg:pt-8"
            >
              <Card className="border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur">
                <div className="grid gap-3 sm:grid-cols-2">
                  <DashboardTile
                    icon={<Database className="h-5 w-5" />}
                    label="Muscle targets"
                    value={String(orderedMuscles.length || 8)}
                  />
                  <DashboardTile
                    icon={<Dumbbell className="h-5 w-5" />}
                    label="Loaded variations"
                    value={String(exercisesState.data.length || 0)}
                  />
                  <DashboardTile
                    icon={<Timer className="h-5 w-5" />}
                    label="Timer mode"
                    value="Local"
                  />
                  <DashboardTile
                    icon={<Layers className="h-5 w-5" />}
                    label="Architecture"
                    value="REST"
                  />
                </div>

                <div className="mt-4 rounded-lg border border-white/10 bg-slate-950/70 p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-400 text-slate-950">
                      <Trophy className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-black text-white">
                        {selectedMuscle?.name ?? "Chest"} focus
                      </p>
                      <p className="text-sm text-slate-400">
                        {selectedExercises.length} active exercise
                        {selectedExercises.length === 1 ? "" : "s"}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        <section
          id="muscle-selection"
          className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[340px_1fr] lg:px-8 lg:py-14"
        >
          <MuscleSelector
            muscles={orderedMuscles}
            selectedSlug={selectedMuscleSlug}
            isLoading={musclesState.isLoading}
            error={musclesState.error}
            onSelect={setSelectedMuscleSlug}
          />

          <ExerciseSelector
            exercises={exercisesState.data}
            selectedSlugs={selectedExerciseSlugs}
            selectedMuscleName={selectedMuscle?.name ?? null}
            isLoading={exercisesState.isLoading}
            error={exercisesState.error}
            onToggle={toggleExercise}
          />
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <ExerciseDetailPanel exercises={selectedExercises} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

const DashboardTile = ({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="rounded-lg border border-white/10 bg-white p-4 text-slate-950">
    <div className="flex items-center justify-between gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-emerald-600">
        {icon}
      </span>
      <span className="text-2xl font-black">{value}</span>
    </div>
    <p className="mt-4 text-sm font-bold text-slate-500">{label}</p>
  </div>
);
