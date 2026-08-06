import { apiClient } from "@/lib/api-client";
import type { Category } from "./types";

export function getCategories(signal?: AbortSignal) {
  return apiClient.get<Category[]>("/categories", signal);
}
