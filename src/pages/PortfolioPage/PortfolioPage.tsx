import { useState } from 'react'
import Experience from '../../components/Experience/Experience'
import Slider from '../../components/Slider/Slider'
import type { SliderOption } from '../../components/Slider/Slider'
import styles from './PortfolioPage.module.css'

function PortfolioPage() {
  const [selectedSection, setSelectedSection] = useState<SliderOption>('experience')

  return (
    <section className={styles.portfolio} id="portfolio" aria-labelledby="portfolio-title">
      <div className={styles.inner}>
        <h2 id="portfolio-title">Portfolio</h2>
        <Slider selectedOption={selectedSection} onSelect={setSelectedSection} />

        <div className={styles.content} role="tabpanel">
          {selectedSection === 'experience' ? <Experience /> : null}
        </div>
      </div>
    </section>
  )
}

export default PortfolioPage
