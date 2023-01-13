import { FiX } from "react-icons/fi"

interface FileItemProps {
  file: File
  deleteFile: (filename: string) => void
}

export const FileItem = ({ file, deleteFile }: FileItemProps) => {
  console.log(file)
  return (
    <div className="w-44 h-52 hover:bg-accent-dark-gray">
      <button onClick={() => deleteFile(file.name)}>
        <FiX />
      </button>
      <>File Item</>
    </div>
  )
}
