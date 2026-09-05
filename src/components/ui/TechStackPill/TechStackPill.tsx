import type { ReactNode } from 'react'
import styles from './TechStackPill.module.css'

type TechStackPillProps = {
  children: ReactNode
}

function TechStackPill({ children }: TechStackPillProps) {
  return <li className={styles.pill}>{children}</li>
}

export default TechStackPill
