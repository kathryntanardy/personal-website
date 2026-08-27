import { useState, type PointerEvent } from 'react'
import Window from '../Window/Window'
import styles from './Folder.module.css'

export type FolderPosition = {
  left: number | string
  top: number | string
  zIndex?: number
}

type FolderProps = {
  imageSrc: string
  mediaType?: 'image' | 'video'
  position: FolderPosition
  width: number | string
  onClose: () => void
  onSelect: () => void
  zIndex: number
}

type DragState = {
  containerLeft: number
  containerTop: number
  offsetX: number
  offsetY: number
}

function Folder({ imageSrc, mediaType = 'image', position, width, onClose, onSelect, zIndex }: FolderProps) {
  const [currentPosition, setCurrentPosition] = useState<FolderPosition>(position)
  const [dragState, setDragState] = useState<DragState | null>(null)

  function startDrag(event: PointerEvent<HTMLElement>) {
    if (event.button !== 0) return

    const windowElement = event.currentTarget.closest('article')
    const containerElement = windowElement?.parentElement
    if (!windowElement || !containerElement) return

    const windowRect = windowElement.getBoundingClientRect()
    const containerRect = containerElement.getBoundingClientRect()

    event.currentTarget.setPointerCapture(event.pointerId)
    event.preventDefault()
    onSelect()
    setDragState({
      containerLeft: containerRect.left,
      containerTop: containerRect.top,
      offsetX: event.clientX - windowRect.left,
      offsetY: event.clientY - windowRect.top,
    })
  }

  function drag(event: PointerEvent<HTMLElement>) {
    if (!dragState) return

    setCurrentPosition((previousPosition) => ({
      ...previousPosition,
      left: event.clientX - dragState.containerLeft - dragState.offsetX,
      top: event.clientY - dragState.containerTop - dragState.offsetY,
    }))
  }

  function stopDrag() {
    setDragState(null)
  }

  return (
    <Window
      className={styles.folder}
      onClose={onClose}
      onPointerDown={startDrag}
      onPointerMove={drag}
      onPointerUp={stopDrag}
      style={{
        left: currentPosition.left,
        top: currentPosition.top,
        zIndex,
      }}
    >
      {mediaType === 'video' ? (
        <video className={styles.media} autoPlay loop muted playsInline preload="auto" draggable={false} style={{ width }}>
          <source src={imageSrc} type="video/mp4" />
        </video>
      ) : (
        <img className={styles.media} src={imageSrc} alt="" draggable={false} style={{ width }} />
      )}
    </Window>
  )
}

export default Folder
