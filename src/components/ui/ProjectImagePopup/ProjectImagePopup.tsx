import { useEffect, useId, useState, type CSSProperties } from 'react'
import styles from './ProjectImagePopup.module.css'

type ProjectImagePopupProps = {
  src: string
  alt: string
  title: string
  description?: string
  details?: string[]
  previewHeight?: number
  className?: string
}

function ProjectImagePopup({
  src,
  alt,
  title,
  description,
  details = [],
  previewHeight,
  className,
}: ProjectImagePopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const titleId = useId()
  const descriptionId = useId()

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

  const tileStyle = {
    '--project-preview-height': previewHeight ? `${previewHeight}px` : undefined,
  } as CSSProperties

  return (
    <>
      <button
        className={[styles.tile, className].filter(Boolean).join(' ')}
        type="button"
        style={tileStyle}
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
      >
        <img className={styles.previewImage} src={src} alt={alt} />
      </button>

      {isOpen ? (
        <div className={styles.overlay} role="presentation" onMouseDown={() => setIsOpen(false)}>
          <section
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close popup"
            >
              <img src="/x.svg" alt="" />
            </button>

            <img className={styles.fullImage} src={src} alt={alt} />

            <div className={styles.copy}>
              <h2 id={titleId}>{title}</h2>
              {description ? <p id={descriptionId}>{description}</p> : null}
              {details.length > 0 ? (
                <ul>
                  {details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        </div>
      ) : null}
    </>
  )
}

export default ProjectImagePopup
