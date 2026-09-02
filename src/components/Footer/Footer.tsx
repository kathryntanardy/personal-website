import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { Link } from 'react-router'
import styles from './Footer.module.css'

const footerLinks = [
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Experience', to: '/experience' },
]

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/kathryntanardy', Icon: FaGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kathryntanardy', Icon: FaLinkedinIn },
  { label: 'Email', href: 'mailto:ktanardy@gmail.com', Icon: MdEmail },
]

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandGroup}>
          <Link className={styles.brand} to="/work">
            Kathryn Tanardy
          </Link>
          <p className={styles.description}>Thank you for stopping by ♡</p>
        </div>

        <nav className={styles.footerNav} aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <Link to={link.to} key={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>

        <p className={styles.copyright}>© Kathryn Tanardy 2026</p>

        <div className={styles.socialLinks} aria-label="Social links">
          {socialLinks.map(({ label, href, Icon }) => (
            <a className={styles.socialLink} href={href} key={label} aria-label={label}>
              <Icon aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
