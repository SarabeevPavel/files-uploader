import { v4 as uuidv4 } from "uuid"
import { FileType } from "../utils/types"

export const uploader = (
  e: any,

  onError: () => void
) => {
  if (e.target.files.length < 2 || e.target.files.length > 5) {
    onError()
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

  return newFiles
}
