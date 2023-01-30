import { useState } from "react"
import { FileUploader } from "./components/FileUploader"
import Modal from "./components/Modal"
import { FileType } from "./utils/types"

function App() {
  const [files, setFiles] = useState<FileType[] | []>([])
  const [open, setOpen] = useState<boolean>(false)

  const deleteFile = (id: string) => {
    const newFiles = Object.values(files).filter((file) => file.id !== id)
    setFiles(newFiles)
  }

  return (
    <>
      <div className="w-screen h-screen bg-light-gray">
        <div className=" flex flex-col justify-start items-center p-10">
          <h1 className="mb-8 text-2xl font-bold text-dark-gray">Test</h1>
          <FileUploader
            files={files}
            onChange={(files: FileType[]) => setFiles(files)}
            onDelete={(id: string) => deleteFile(id)}
            onError={() => setOpen(true)}
          />
        </div>
      </div>
      <Modal onClose={() => setOpen(false)} open={open} />
    </>
  )
}

export default App
