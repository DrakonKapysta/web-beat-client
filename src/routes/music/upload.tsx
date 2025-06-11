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
    musicData: UploadMusicData
  ): Promise<boolean> => {
    try {
      const res = await uploadFiles(files, musicData);
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
    <div className="h-full w-full flex items-center justify-center p-2">
      <div className="max-w-md w-full space-y-4">
        <h1 className="text-2xl font-bold text-center">Music Upload</h1>
        <MusicUploadForm onUpload={handleUpload} isUploading={isUploading} />
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
}
