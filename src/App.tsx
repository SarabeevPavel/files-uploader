import { useState } from "react"
import { FileUploader } from "./components/FileUploader"
import { FilesList } from "./components/FilesList"
import Modal from "./components/Modal"

function App() {
  const [files, setFiles] = useState<File[] | []>([])
  const [open, setOpen] = useState<boolean>(false)

  const deleteFile = (filename: string) => {
    setFiles(files.filter((file) => file.name !== filename))
  }

  return (
    <>
      <div className="w-screen h-screen bg-light-gray">
        <div className=" flex flex-col justify-start items-center p-10">
          <h1 className="mb-8 text-2xl font-bold text-dark-gray">Test</h1>

          <FileUploader
            files={files}
            setFiles={(files: File[]) => setFiles(files)}
            deleteFile={(filename: string) => deleteFile(filename)}
            setError={() => setOpen(true)}
          />
        </div>
      </div>
      <Modal onClose={() => setOpen(false)} open={open} />
    </>
  )
}

export default App
