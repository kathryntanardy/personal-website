import styles from './ExperienceEntry.module.css'

export type ExperienceEntryProps = {
  title: string
  description: string
  dateRange: string
  iconSrc?: string
}

function ExperienceEntry({ title, description, dateRange, iconSrc }: ExperienceEntryProps) {
  const descriptionParts = description
    .split('|')
    .map((part) => part.trim())
    .filter(Boolean)

  return (
    <article className={styles.entry}>
      {iconSrc ? (
        <img className={styles.icon} src={iconSrc} alt="" aria-hidden="true" />
      ) : (
        <span className={styles.placeholderIcon} aria-hidden="true" />
      )}

      <div className={styles.copy}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>
          {descriptionParts.map((part, index) => (
            <span key={`${part}-${index}`}>
              {index > 0 ? <span className={styles.separator}> | </span> : null}
              {part}
            </span>
          ))}
        </p>
      </div>

      <p className={styles.dateRange}>{dateRange}</p>
    </article>
  )
}

export default ExperienceEntry
