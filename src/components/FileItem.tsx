import { FaTrashAlt, FaRegFileImage } from "react-icons/fa"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface FileItemProps {
  preview: string | null
  file: File
  id: string
  onDelete: (filename: string) => void
}

export const FileItem: React.FC<FileItemProps> = ({
  preview,
  file,
  id,
  onDelete,
}) => {
  const { name } = file
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "move",
  }

  return (
    <div>
      <div className="relative group flex flex-col justify-center items-center w-36 h-48 px-3 m-2 rounded-xl hover:bg-accent-gray ease-in-out duration-200">
        <button
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 ease-in-out duration-200 hover:text-accent-red"
          onClick={() => onDelete(id)}
        >
          <FaTrashAlt />
        </button>
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
          <div className="w-20 h-20 flex justify-center items-center">
            {preview ? (
              <div>
                <img
                  src={preview}
                  alt={`preview-${name}`}
                  className="w-20 h-20"
                />
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center">
                <FaRegFileImage size={30} />
                <span className="mt-2 text-sm font-semibold">{`${
                  name.split(".")[1]
                }-file`}</span>
              </div>
            )}
          </div>
          <h4 className="text-sm mt-2">
            {name.length > 10
              ? name.slice(0, 3) +
                "..." +
                name.slice(name.length - 7, name.length)
              : name}
          </h4>
        </div>
      </div>
    </div>
  )
}
