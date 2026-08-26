import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'

const navItems = [
  { label: 'About', to: '/about' },
  { label: 'Portfolio', to: '/portfolio' },
]

function NavBar() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Primary navigation">
        <NavLink className={styles.brand} to="/">
          Kathryn Tanardy
        </NavLink>

        <ul className={styles.links}>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink className={styles.link} to={item.to}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default NavBar
