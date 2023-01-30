import { FileType } from "../utils/types"
import { FaRegFileImage } from "react-icons/fa"

interface ItemProps {
  file: FileType
  style?: string
  dragOverlay?: boolean
}

const Item: React.FC<ItemProps> = ({ file, dragOverlay, style }) => {
  return (
    <div
      className={`${
        dragOverlay ? "cursor-grabbing " : "grab "
      }" item "${style}`}
    >
      {file.preview ? (
        <img
          src={file.preview}
          alt={`preview-${file.file.name}`}
          width={100}
          height={100}
          className="w-20 h-20"
        />
      ) : (
        <div className="w-20 h-20">
          <FaRegFileImage size={30} />
        </div>
      )}
    </div>
  )
}

export default Item
