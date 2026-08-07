// hooks/use-image-upload.ts
import { useState, useCallback } from "react";
import axios from "axios";
import { getPresignedUploadUrl } from "../api";

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);

  const uploadImage = useCallback(async (file: File): Promise<string> => {
    setUploading(true);
    try {
      const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_"); // cosmetic only, not required for correctness
      const { uploadUrl, publicUrl } = await getPresignedUploadUrl(
        safeFileName,
        file.type,
      );
      await axios.put(uploadUrl, file, {
        headers: { "Content-Type": file.type },
      });
      return publicUrl;
    } finally {
      setUploading(false);
    }
  }, []);

  return { uploadImage, uploading };
}
