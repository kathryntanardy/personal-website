import styles from './AboutPage.module.css'

function AboutPage() {
  return (
    <section className={styles.about} id="about" aria-labelledby="about-title">
      <div className={styles.inner}>
        <p className={styles.kicker}>01</p>
        <h2 id="about-title">About</h2>
      </div>
    </section>
  )
}

export default AboutPage
