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
}

type DragState = {
  containerLeft: number
  containerTop: number
  offsetX: number
  offsetY: number
}

function Folder({ imageSrc, mediaType = 'image', position, width, onClose }: FolderProps) {
  const [currentPosition, setCurrentPosition] = useState<FolderPosition>(position)
  const [dragState, setDragState] = useState<DragState | null>(null)

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return

    const windowElement = event.currentTarget.closest('article')
    const containerElement = windowElement?.parentElement
    if (!windowElement || !containerElement) return

    const windowRect = windowElement.getBoundingClientRect()
    const containerRect = containerElement.getBoundingClientRect()

    event.currentTarget.setPointerCapture(event.pointerId)
    setDragState({
      containerLeft: containerRect.left,
      containerTop: containerRect.top,
      offsetX: event.clientX - windowRect.left,
      offsetY: event.clientY - windowRect.top,
    })
  }

  function drag(event: PointerEvent<HTMLDivElement>) {
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
      onHeaderPointerDown={startDrag}
      onHeaderPointerMove={drag}
      onHeaderPointerUp={stopDrag}
      style={{
        left: currentPosition.left,
        top: currentPosition.top,
        zIndex: currentPosition.zIndex,
      }}
    >
      {mediaType === 'video' ? (
        <video className={styles.media} autoPlay loop muted playsInline preload="auto" style={{ width }}>
          <source src={imageSrc} type="video/mp4" />
        </video>
      ) : (
        <img className={styles.media} src={imageSrc} alt="" style={{ width }} />
      )}
    </Window>
  )
}

export default Folder
