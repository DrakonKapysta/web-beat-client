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
  const [isDragOver, setIsDragOver] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (data.files && data.files.length > 0) {
      const musicData: UploadMusicData = {
        title: data.title,
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFiles(files);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* File Upload Area */}
        <div className="space-y-2">
          <label
            htmlFor="files"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl transition-all duration-300 ${
              isUploading
                ? "border-gray-400 bg-gray-100/50 cursor-not-allowed opacity-50"
                : isDragOver
                  ? "border-purple-400 bg-purple-50/20 scale-105"
                  : "border-gray-300 bg-gray-50/10 hover:bg-purple-50/10 hover:border-purple-300 cursor-pointer"
            }`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {/* Upload Icon */}
              <div
                className={`p-3 rounded-full mb-4 transition-colors ${
                  isDragOver
                    ? "bg-purple-500"
                    : "bg-gradient-to-r from-purple-500 to-pink-500"
                }`}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>

              <p className="mb-2 text-lg font-semibold text-white">
                {isUploading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Uploading...
                  </span>
                ) : isDragOver ? (
                  "Drop your music here!"
                ) : (
                  "Click to upload or drag and drop"
                )}
              </p>
              <p className="text-sm text-gray-300">MP3, WAV, FLAC (max 10MB)</p>
            </div>

            {/* Progress bar for upload */}
            {isUploading && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 rounded-b-xl overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
              </div>
            )}
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
            <div className="mt-3 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
              <p className="text-green-300 text-sm font-medium">
                ✓ Selected:{" "}
                {Array.from(selectedFiles)
                  .map((file) => file.name)
                  .join(", ")}
              </p>
            </div>
          )}

          {errors.files && (
            <div className="mt-2 p-2 bg-red-500/20 border border-red-500/30 rounded-lg">
              <span className="text-red-300 text-sm">
                {errors.files.message}
              </span>
            </div>
          )}
        </div>

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Track Name
            </label>
            <Input
              placeholder="Enter track name"
              disabled={isUploading}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:border-purple-400 focus:ring-purple-400"
              {...register("title", { required: "Track name is required" })}
            />
            {errors.title && (
              <span className="text-red-400 text-sm">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Artist</label>
            <Input
              placeholder="Enter artist name"
              disabled={isUploading}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:border-purple-400 focus:ring-purple-400"
              {...register("author", { required: "Artist is required" })}
            />
            {errors.author && (
              <span className="text-red-400 text-sm">
                {errors.author.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Album</label>
            <Input
              placeholder="Enter album name"
              disabled={isUploading}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:border-purple-400 focus:ring-purple-400"
              {...register("album", { required: "Album is required" })}
            />
            {errors.album && (
              <span className="text-red-400 text-sm">
                {errors.album.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Genre</label>
            <Input
              placeholder="Enter genre"
              disabled={isUploading}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:border-purple-400 focus:ring-purple-400"
              {...register("genre", { required: "Genre is required" })}
            />
            {errors.genre && (
              <span className="text-red-400 text-sm">
                {errors.genre.message}
              </span>
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-300">
              Release Year
            </label>
            <Input
              type="number"
              placeholder="Enter release year"
              disabled={isUploading}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:border-purple-400 focus:ring-purple-400"
              {...register("year", {
                required: "Year is required",
                min: { value: 1900, message: "Year must be after 1900" },
                max: {
                  value: new Date().getFullYear(),
                  message: "Year cannot be in the future",
                },
              })}
            />
            {errors.year && (
              <span className="text-red-400 text-sm">
                {errors.year.message}
              </span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:opacity-50"
          disabled={isUploading}
        >
          {isUploading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Uploading Music...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
              </svg>
              Upload Music
            </span>
          )}
        </Button>
      </form>
    </div>
  );
};
