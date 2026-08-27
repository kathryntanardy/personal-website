import styles from './PortfolioPage.module.css'

function PortfolioPage() {
  return (
    <section className={styles.portfolio} id="portfolio" aria-labelledby="portfolio-title">
      <div className={styles.inner}>
        <p className={styles.kicker}>02</p>
        <h2 id="portfolio-title">Portfolio</h2>
      </div>
    </section>
  )
}

export default PortfolioPage
