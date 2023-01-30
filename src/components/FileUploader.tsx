import { FilesList } from "./FilesList"
import { FileType } from "../utils/types"
import { uploader } from "../utils/uploader"

interface FileUploaderProps {
  files: FileType[]
  onChange: (files: FileType[]) => void
  onDelete: (filename: string) => void
  onError: () => void
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  files,
  onChange,
  onError,
  onDelete,
}) => {
  const handleUpload = (e: any) => {
    const newFiles = uploader(e, onError)
    if (newFiles) onChange(newFiles)
  }
  return (
    <div
      className={`flex justify-center items-center bg-black/50 h-80 w-4/5 ${
        files.length ? "bg-accent-light-gray" : "bg-white"
      } border-8 border-accent-gray rounded-lg`}
    >
      {files && !files.length ? (
        <div className="relative group">
          <input
            type="file"
            multiple={true}
            className="relative text-right opacity-0 z-20 cursor-pointer w-72 h-12"
            onChange={(e) => handleUpload(e)}
          />
          <button className="absolute top-0 left-0 w-full h-full z-10 flex justify-center items-center rounded-lg text-white bg-light-green group-hover:bg-accent-green ease-in-out duration-200">
            Add files
          </button>
        </div>
      ) : (
        <FilesList
          files={files}
          onDelete={(filename: string) => onDelete(filename)}
          onChange={onChange}
        />
      )}
    </div>
  )
}
