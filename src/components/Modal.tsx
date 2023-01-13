import { useEffect, useMemo } from "react"
import { createPortal } from "react-dom"
import { FiX } from "react-icons/fi"

const modalRootElement = document.querySelector("#modal")

interface ModalProps {
  open: boolean
  onClose: () => void
}

const Modal = ({ onClose, open }: ModalProps) => {
  const element = useMemo(() => document.createElement("div"), [])

  useEffect(() => {
    modalRootElement?.appendChild(element)

    return () => {
      modalRootElement?.removeChild(element)
    }
  })

  const content = (
    <div className="fixed z-30 overflow-hidden top-0 left-0 w-screen h-screen bg-black/20 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center px-12 py-10 relative bg-white rounded-lg">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 opacity-30 hover:opacity-100"
        >
          <FiX size={25} />
        </button>
        <h3 className="text-3xl leading-10 mb-8 text-black">Error</h3>
        <p className="text-base leading-5 mb-11 text-black/40">
          Please add not less than 2 and not more than 5 files.
        </p>
        <button
          onClick={onClose}
          className="flex justify-center items-center h-11 w-44 rounded-lg bg-light-blue text-white hover:bg-accent-blue"
        >
          OK
        </button>
      </div>
    </div>
  )
  if (open) {
    return createPortal(content, element)
  }
  return null
}

export default Modal
