import { FilesList } from "./FilesList"
import { FileType } from "../utils/types"
import { v4 as uuidv4 } from "uuid"

interface FileUploaderProps {
  files: FileType[]
  setFiles: (files: FileType[]) => void
  deleteFile: (filename: string) => void
  setError: () => void
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  files,
  setFiles,
  setError,
  deleteFile,
}) => {
  const uploadHandler = (e: any) => {
    if (e.target.files.length < 2 || e.target.files.length > 5) {
      setError()
      return
    }

    let uploadedFiles = [...e.target.files]
    let newFiles: FileType[] | [] = []

    Object.entries(uploadedFiles).map(([key, file]) => {
      if (
        file.type.split("/")[0] === "image" ||
        file.type.split("/")[0] === "video"
      ) {
        const objectUrl = URL.createObjectURL(file)
        newFiles = [...newFiles, { preview: objectUrl, id: uuidv4(), file }]
        return () => URL.revokeObjectURL(objectUrl)
      } else {
        newFiles = [...newFiles, { preview: null, id: uuidv4(), file }]
      }
    })

    setFiles(newFiles)
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
          setFiles={setFiles}
        />
      )}
    </div>
  )
}
