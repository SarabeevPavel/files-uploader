import { FileItem } from "./FileItem"

interface FilesListProps {
  files: any[] | []
  deleteFile: (filename: string) => void
}

export const FilesList = ({ files, deleteFile }: FilesListProps) => {
  if (!files.length) return null
  return (
    <div className="flex justify-center items-center">
      {files.map((file, i) => (
        <FileItem key={i} file={file} deleteFile={(file) => deleteFile(file)} />
      ))}
    </div>
  )
}
