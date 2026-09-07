import ExperienceEntry from '../ui/ExperienceEntry/ExperienceEntry'
import type { ExperienceEntryProps } from '../ui/ExperienceEntry/ExperienceEntry'
import styles from './Experience.module.css'

type ExperienceProps = {
  entries: ExperienceEntryProps[]
  label: string
}

function Experience({ entries, label }: ExperienceProps) {
  return (
    <div className={styles.experience} aria-label={label}>
      {entries.map((experience) => (
        <ExperienceEntry key={`${experience.title}-${experience.description}`} {...experience} />
      ))}
    </div>
  )
}

export default Experience
