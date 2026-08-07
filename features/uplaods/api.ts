// api.ts
import { apiClient } from "@/lib/api-client";

interface PresignedUrlResponse {
  uploadUrl: string;
  publicUrl: string;
  key: string;
}

export function getPresignedUploadUrl(fileName: string, fileType: string) {
  return apiClient.post<PresignedUrlResponse>("/uploads/presigned-url", {
    fileName,
    fileType,
  });
}
