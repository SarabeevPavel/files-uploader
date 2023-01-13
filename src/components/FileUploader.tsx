import { FilesList } from "./FilesList"

interface FileUploaderProps {
  files: File[]
  setFiles: (files: File[]) => void
  deleteFile: (filename: string) => void
  setError: () => void
}

export const FileUploader = ({
  files,
  setFiles,
  setError,
  deleteFile,
}: FileUploaderProps) => {
  const uploadHandler = (e: any) => {
    const filesList = e.target.files

    if (filesList.length < 2 || filesList.length > 5) {
      setError()
      return
    }
    filesList[0].isUploading = true
    setFiles([...filesList])
  }

  return (
    <div
      className={`flex justify-center items-center bg-black/50 h-80 w-4/5 ${
        files.length ? "bg-accent-light-gray" : "bg-white"
      } border-8 border-accent-gray rounded-lg`}
    >
      {!files.length ? (
        <div className="relative group">
          <input
            type="file"
            multiple={true}
            className="relative text-right opacity-0 z-20 cursor-pointer w-72 h-12"
            onChange={uploadHandler}
          />
          <button className="absolute top-0 left-0 w-full h-full z-10 flex justify-center items-center rounded-lg text-white bg-light-green group-hover:bg-accent-green ease-in-out duration-200">
            Add files
          </button>
        </div>
      ) : (
        <FilesList
          files={files}
          deleteFile={(filename: string) => deleteFile(filename)}
        />
      )}
    </div>
  )
}
