import { ApiEnvelope, Exercise, Muscle } from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

const request = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Accept: "application/json"
    },
    cache: "no-store"
  });

  const payload = (await response.json().catch(() => null)) as
    | ApiEnvelope<T>
    | null;

  if (!response.ok || !payload?.success) {
    throw new Error(payload?.message ?? "Unable to reach the API.");
  }

  return payload.data;
};

export const api = {
  getMuscles: () => request<Muscle[]>("/muscles"),
  getMuscle: (slug: string) => request<Muscle>(`/muscles/${slug}`),
  getExercises: (muscleSlug?: string) => {
    const searchParams = muscleSlug
      ? `?muscle=${encodeURIComponent(muscleSlug)}`
      : "";

    return request<Exercise[]>(`/exercises${searchParams}`);
  },
  getExercise: (slug: string) => request<Exercise>(`/exercises/${slug}`)
};
