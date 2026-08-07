// api.ts
import { apiClient } from '@/lib/api-client';
import { Tag } from './tag.type';

export function getTags(signal?: AbortSignal) {
  return apiClient.get<Tag[]>('/tags', signal);
}