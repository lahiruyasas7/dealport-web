"use client";
import { useRef } from "react";
import Image from "next/image";
import { X, Plus, RefreshCw } from "lucide-react";
import { useImageUpload } from "@/features/uplaods/hooks/use-image-uplaod";

export function ProductImageUploader({
  images,
  onChange,
}: {
  images: string[];
  onChange: (images: string[]) => void;
}) {
  const { uploadImage, uploading } = useImageUpload();
  const mainInputRef = useRef<HTMLInputElement>(null);
  const addInputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File, replaceIndex?: number) {
    const url = await uploadImage(file);
    if (replaceIndex !== undefined) {
      const next = [...images];
      next[replaceIndex] = url;
      onChange(next);
    } else {
      onChange([...images, url]);
    }
  }

  const main = images[0];
  const thumbnails = images.slice(1);

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-foreground">Product Image</p>

      <div className="flex h-48 items-center justify-center rounded-lg border bg-muted/30">
        {main ? (
          <Image
            src={main}
            alt="Product"
            width={160}
            height={160}
            className="h-40 w-40 object-contain"
          />
        ) : (
          <span className="text-sm text-muted-foreground">No image</span>
        )}
      </div>

      <div className="mt-2 flex justify-between text-sm">
        <button
          type="button"
          onClick={() => mainInputRef.current?.click()}
          className="text-muted-foreground"
        >
          Browse
        </button>
        {main && (
          <button
            type="button"
            onClick={() => mainInputRef.current?.click()}
            className="flex items-center gap-1 text-primary"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Replace
          </button>
        )}
      </div>
      <input
        ref={mainInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) =>
          e.target.files?.[0] &&
          handleFile(e.target.files[0], main ? 0 : undefined)
        }
      />

      <div className="mt-4 flex gap-3">
        {thumbnails.map((img, i) => (
          <div
            key={img}
            className="relative h-16 w-16 overflow-hidden rounded-md border"
          >
            <Image
              src={img}
              alt=""
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => onChange(images.filter((_, idx) => idx !== i + 1))}
              className="absolute -right-1 -top-1 rounded-full bg-white p-0.5 shadow"
              aria-label="Remove image"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => addInputRef.current?.click()}
          disabled={uploading}
          className="flex h-16 w-16 flex-col items-center justify-center gap-0.5 rounded-md border border-dashed text-success disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          <span className="text-[10px]">{uploading ? "..." : "Add Image"}</span>
        </button>
        <input
          ref={addInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
      </div>
    </div>
  );
}
