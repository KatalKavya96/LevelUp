"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Exercise, Muscle } from "@/lib/types";

interface AsyncState<T> {
  data: T;
  isLoading: boolean;
  error: string | null;
}

export const useMuscles = () => {
  const [state, setState] = useState<AsyncState<Muscle[]>>({
    data: [],
    isLoading: true,
    error: null
  });

  useEffect(() => {
    let isActive = true;

    setState((current) => ({ ...current, isLoading: true, error: null }));

    api
      .getMuscles()
      .then((muscles) => {
        if (isActive) {
          setState({ data: muscles, isLoading: false, error: null });
        }
      })
      .catch((error: Error) => {
        if (isActive) {
          setState({ data: [], isLoading: false, error: error.message });
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  return state;
};

export const useExercises = (muscleSlug: string | null) => {
  const [state, setState] = useState<AsyncState<Exercise[]>>({
    data: [],
    isLoading: false,
    error: null
  });

  useEffect(() => {
    if (!muscleSlug) {
      setState({ data: [], isLoading: false, error: null });
      return;
    }

    let isActive = true;
    setState({ data: [], isLoading: true, error: null });

    api
      .getExercises(muscleSlug)
      .then((exercises) => {
        if (isActive) {
          setState({ data: exercises, isLoading: false, error: null });
        }
      })
      .catch((error: Error) => {
        if (isActive) {
          setState({ data: [], isLoading: false, error: error.message });
        }
      });

    return () => {
      isActive = false;
    };
  }, [muscleSlug]);

  return state;
};
