import { FileItem } from "./FileItem"
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable"
import { FileType } from "../utils/types"
import { DndContext, DragOverlay, DragStartEvent } from "@dnd-kit/core"
import { useDefaultSensors } from "../hooks/useDefaultSensors"
import { useState } from "react"
import Item from "./Item"
import { snapCenterToCursor } from "@dnd-kit/modifiers"

interface FilesListProps {
  files: FileType[] | []
  deleteFile: (filename: string) => void
  setFiles: (files: FileType[]) => void
}

export const FilesList: React.FC<FilesListProps> = ({
  setFiles,
  files,
  deleteFile,
}) => {
  const [activeFile, setActiveFile] = useState<FileType | null>(null)
  const sensors = useDefaultSensors()

  if (!files.length) return null

  const handleDragStart = ({ active }: DragStartEvent) => {
    let index = active.data.current?.sortable.index
    setActiveFile(files[index])
  }
  const handleDragCancel = () => setActiveFile(null)

  const handleDragEnd = ({ active, over }: any) => {
    if (!over) {
      setActiveFile(null)
      return
    }

    if (active.id !== over.id) {
      const activeIndex = active.data.current.sortable.index
      const overIndex = over.data.current.sortable.index
      setFiles(arrayMove(files, activeIndex, overIndex))
    }

    setActiveFile(null)
  }

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
    >
      <div className="flex justify-center items-center">
        <SortableContext items={files} strategy={rectSortingStrategy}>
          {files.length
            ? files.map((file, i) => (
                <FileItem
                  key={i}
                  id={file.id}
                  preview={file.preview}
                  file={file.file}
                  deleteFile={deleteFile}
                />
              ))
            : null}
        </SortableContext>
        <DragOverlay modifiers={[snapCenterToCursor]}>
          {activeFile ? <Item file={activeFile} dragOverlay /> : null}
        </DragOverlay>
      </div>
    </DndContext>
  )
}
