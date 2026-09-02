import { Link, NavLink } from 'react-router'
import styles from './NavBar.module.css'

const navItems = [
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Portfolio', to: '/portfolio' },
]

function NavBar() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Primary navigation">
        <Link className={styles.brand} to="/work">
          Kathryn Tanardy
        </Link>

        <ul className={styles.links}>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.activeLink}` : styles.link
                }
                to={item.to}
              >
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
