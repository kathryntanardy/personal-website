import { AnimatePresence, motion, useReducedMotion, type Transition } from 'motion/react'
import { useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './ProjectImagePopup.module.css'

const zoomEase: Transition['ease'] = [0.22, 1, 0.36, 1]
const zoomDuration = 0.38

type ProjectImagePopupProps = {
  src: string
  alt: string
  title: string
  popupSize?: 'compact'
  className?: string
}

function ProjectImagePopup({
  src,
  alt,
  title,
  popupSize,
  className,
}: ProjectImagePopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const titleId = useId()
  const layoutId = `${titleId}-project-zoom`
  const shouldReduceMotion = useReducedMotion()
  const zoomTransition: Transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: zoomDuration, ease: zoomEase }

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const zoomView = (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className={styles.overlay}
          role="presentation"
          onMouseDown={() => setIsOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={zoomTransition}
        >
          <motion.section
            layoutId={layoutId}
            transition={zoomTransition}
            className={[
              styles.dialog,
              popupSize === 'compact' ? styles.dialogCompact : undefined,
            ]
              .filter(Boolean)
              .join(' ')}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <h2 className={styles.visuallyHidden} id={titleId}>
              {title}
            </h2>

            <img className={styles.fullImage} src={src} alt={alt} />

            <button
              className={styles.closeButton}
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close project view"
            >
              <img src="/x.svg" alt="" />
            </button>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )

  return (
    <>
      <button
        className={[styles.tile, className].filter(Boolean).join(' ')}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <motion.span
          layoutId={isOpen ? undefined : layoutId}
          transition={zoomTransition}
          className={styles.zoomFrame}
        >
          <img className={styles.previewImage} src={src} alt={alt} />
        </motion.span>
      </button>

      {createPortal(zoomView, document.body)}
    </>
  )
}

export default ProjectImagePopup
