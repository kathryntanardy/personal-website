import styles from './NavBar.module.css'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portofolio' },
]

function NavBar() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Primary navigation">
        <a className={styles.brand} href="/">
          Kathryn Tanardy
        </a>

        <ul className={styles.links}>
          {navItems.map((item) => (
            <li key={item.href}>
              <a className={styles.link} href={item.href}>
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
