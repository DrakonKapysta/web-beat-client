import { MusicUploadForm } from "@/components/forms/MusicUploadForm";
import type { UploadMusicData } from "@/components/forms/types/UploadMusic.dto";
import { useFileUpload } from "@/hooks/useFileUpload";

export const Route = createFileRoute({
  component: MusicUpload,
});

function MusicUpload() {
  const { uploadFiles, isUploading, error } = useFileUpload();

  const handleUpload = async (
    files: FileList,
    musicData: UploadMusicData,
    poster?: FileList
  ): Promise<boolean> => {
    try {
      const res = await uploadFiles(files, musicData, poster);
      if (!res) {
        throw new Error("No response from server");
      }
      console.log(res);
      return true;
    } catch (err) {
      console.error("Upload failed:", err);
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden ">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 ">
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500 opacity-20 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-pink-500 opacity-20 rounded-full animate-bounce"></div>
        <div
          className="absolute bottom-20 left-32 w-24 h-24 bg-indigo-500 opacity-20 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 right-16 w-12 h-12 bg-purple-400 opacity-20 rounded-full animate-bounce"
          style={{ animationDelay: "0.5s" }}
        ></div>

        {/* Musical Notes */}
        <div className="absolute top-20 right-40 text-purple-300 opacity-30 animate-float">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </div>
        <div
          className="absolute bottom-32 left-20 text-pink-300 opacity-30 animate-float"
          style={{ animationDelay: "2s" }}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-2xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Share Your Music
            </h1>
            <p className="text-gray-300 text-lg">
              Upload your tracks and let the world hear your sound
            </p>
          </div>

          {/* Upload Form Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8">
            <MusicUploadForm
              onUpload={handleUpload}
              isUploading={isUploading}
            />

            {error && (
              <div className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                <p className="text-red-300 text-center font-medium">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
