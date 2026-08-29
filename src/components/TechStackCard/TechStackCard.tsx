import styles from './TechStackCard.module.css'

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
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  )
}

export default TechStackCard
