import { useEffect, useId, useState } from 'react'
import styles from './ProjectImagePopup.module.css'
import TechStackPill from '../TechStackPill/TechStackPill'

type ProjectImagePopupProps = {
  src: string
  alt: string
  title: string
  role?: string
  description?: string
  details?: string[]
  websiteUrl?: string
  websiteLabel?: string
  className?: string
}

function ProjectImagePopup({
  src,
  alt,
  title,
  role,
  description,
  details = [],
  websiteUrl,
  websiteLabel,
  className,
}: ProjectImagePopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const titleId = useId()
  const descriptionId = useId()
  const hasMeta = Boolean(role || websiteUrl)

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

  return (
    <>
      <button
        className={[styles.tile, className].filter(Boolean).join(' ')}
        type="button"
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

            <div className={styles.imageStage}>
              <img className={styles.fullImage} src={src} alt={alt} />
            </div>

            <div className={styles.copy}>
              <h2 className={styles.title} id={titleId}>
                {title}
              </h2>
              {description ? (
                <p className={styles.description} id={descriptionId}>
                  {description}
                </p>
              ) : null}
              {details.length > 0 ? (
                <ul className={styles.techList} aria-label={`${title} tech stack`}>
                  {details.map((detail) => (
                    <TechStackPill key={detail}>{detail}</TechStackPill>
                  ))}
                </ul>
              ) : null}

              {hasMeta ? (
                <aside className={styles.meta} aria-label={`${title} project details`}>
                  {role ? (
                    <div className={styles.roleGroup}>
                      <span>Role</span>
                      <p>{role}</p>
                    </div>
                  ) : null}

                  {websiteUrl ? (
                    <a
                      className={styles.websiteLink}
                      href={websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {websiteLabel ?? websiteUrl.replace(/^https?:\/\//, '')} →
                    </a>
                  ) : null}
                </aside>
              ) : null}
            </div>
          </section>
        </div>
      ) : null}
    </>
  )
}

export default ProjectImagePopup
