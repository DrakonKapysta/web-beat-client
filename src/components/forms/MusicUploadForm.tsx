import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import type { UploadMusicData } from "./types/UploadMusic.dto";

type FormFields = {
  files: FileList;
} & UploadMusicData;

interface FileUploadFormProps {
  isUploading?: boolean;
  onUpload?: (
    files: FileList,
    data: UploadMusicData,
    poster?: File
  ) => Promise<boolean>;
}

export const MusicUploadForm: React.FC<FileUploadFormProps> = ({
  onUpload,
  isUploading = false,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  //   const [selectedPoster, setSelectedPoster] = useState<FileList | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (data.files && data.files.length > 0) {
      const musicData: UploadMusicData = {
        fileName: data.fileName,
        author: data.author,
        album: data.album,
        genre: data.genre,
        year: data.year,
        metadata: data.metadata,
      };

      const res = await onUpload?.(data.files, musicData);
      if (res) {
        console.log("Files uploaded successfully");
        reset();
        setSelectedFiles(null);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="files"
            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg transition-colors ${
              isUploading
                ? "border-gray-200 bg-gray-100 cursor-not-allowed opacity-50"
                : "border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400 cursor-pointer"
            }`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-2 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">
                  {isUploading ? "Uploading..." : "Click to upload music file"}
                </span>
              </p>
              <p className="text-xs text-gray-500">MP3, WAV, FLAC</p>
            </div>
          </label>
          <input
            id="files"
            type="file"
            accept="audio/*"
            disabled={isUploading}
            {...register("files", {
              required: "Music file is required",
              onChange: (e) => setSelectedFiles(e.target.files),
            })}
            className="hidden"
          />
          {selectedFiles && selectedFiles.length > 0 && (
            <p className="mt-2 text-sm text-green-600">
              Selected:{" "}
              {Array.from(selectedFiles)
                .map((file) => file.name)
                .join(", ")}
            </p>
          )}
          {errors.files && (
            <span className="text-red-500 text-sm">{errors.files.message}</span>
          )}
        </div>

        <div>
          <Input
            placeholder="File Name"
            disabled={isUploading}
            {...register("fileName", { required: "File name is required" })}
          />
          {errors.fileName && (
            <span className="text-red-500 text-sm">
              {errors.fileName.message}
            </span>
          )}
        </div>

        <div>
          <Input
            placeholder="Author"
            disabled={isUploading}
            {...register("author", { required: "Author is required" })}
          />
          {errors.author && (
            <span className="text-red-500 text-sm">
              {errors.author.message}
            </span>
          )}
        </div>

        <div>
          <Input
            placeholder="Album"
            disabled={isUploading}
            {...register("album", { required: "Album is required" })}
          />
          {errors.album && (
            <span className="text-red-500 text-sm">{errors.album.message}</span>
          )}
        </div>

        <div>
          <Input
            placeholder="Genre"
            disabled={isUploading}
            {...register("genre", { required: "Genre is required" })}
          />
          {errors.genre && (
            <span className="text-red-500 text-sm">{errors.genre.message}</span>
          )}
        </div>

        <div>
          <Input
            type="number"
            placeholder="Year"
            disabled={isUploading}
            {...register("year", {
              required: "Year is required",
            })}
          />
          {errors.year && (
            <span className="text-red-500 text-sm">{errors.year.message}</span>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload Music"}
        </Button>
      </form>
    </div>
  );
};
