import Link from "next/link";
import { Activity, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-emerald-400">
            <Activity className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-black uppercase tracking-[0.18em] text-slate-500">
              LevelUp
            </span>
            <span className="block text-base font-black text-slate-950">
              Push-Up Builder
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
          <a className="transition hover:text-slate-950" href="#muscle-selection">
            Muscles
          </a>
          <a className="transition hover:text-slate-950" href="#exercise-selection">
            Exercises
          </a>
          <a className="transition hover:text-slate-950" href="#workout-panel">
            Workout
          </a>
        </div>

        <a href="#muscle-selection">
          <Button size="sm" className="hidden sm:inline-flex">
            <Dumbbell className="h-4 w-4" aria-hidden="true" />
            Start training
          </Button>
        </a>
      </nav>
    </header>
  );
};
