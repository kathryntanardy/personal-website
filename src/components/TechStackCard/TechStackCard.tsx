import styles from './TechStackCard.module.css'
import TechStackPill from '../ui/TechStackPill/TechStackPill'

type TechStackCardProps = {
  title: string
  items: string[]
}

function TechStackCard({ title, items }: TechStackCardProps) {
  return (
    <article className={styles.card}>
      <h3>{title}</h3>

      <ul className={styles.tags} aria-label={title}>
        {items.map((item) => (
          <TechStackPill key={item}>{item}</TechStackPill>
        ))}
      </ul>
    </article>
  )
}

export default TechStackCard
