import styles from './NavBar.module.css'

const navItems = [
  { label: 'About', to: '#about' },
  { label: 'Portfolio', to: '#portfolio' },
]

function NavBar() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Primary navigation">
        <a className={styles.brand} href="#home">
          Kathryn Tanardy
        </a>

        <ul className={styles.links}>
          {navItems.map((item) => (
            <li key={item.to}>
              <a className={styles.link} href={item.to}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default NavBar
