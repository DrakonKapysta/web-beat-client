import type { UploadMusicData } from "@/components/forms/types/UploadMusic.dto";
import { useState } from "react";

export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFiles = async (
    files: FileList,
    data?: UploadMusicData,
    poster?: File
  ) => {
    setIsUploading(true);
    setError(null);
    // FIX: multipart/form-data must have music file and poster file to upload, not just 'file'
    try {
      const formData = new FormData();

      Array.from(files).forEach((file) => {
        formData.append("file", file); // must be 'music' and 'poste (optional)'
      });

      if (poster) {
        formData.append("poster", poster);
      }

      if (data) {
        formData.append("fileName", data.title);
        formData.append("author", data.author);
        formData.append("album", data.album);
        formData.append("genre", data.genre);
        formData.append("year", data.year.toString());

        if (data.posterUrl) {
          formData.append("posterUrl", data.posterUrl);
        }

        if (data.metadata) {
          formData.append("metadata", JSON.stringify(data.metadata));
        }
      }

      const response = await fetch("http://localhost:3000/api/music/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadFiles, isUploading, error };
}
