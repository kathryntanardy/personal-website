import { useState } from 'react'
import Slider from '../../components/Slider/Slider'
import type { SliderOption } from '../../components/Slider/Slider'
import styles from './ExperiencePage.module.css'

function ExperiencePage() {
  const [selectedSection, setSelectedSection] = useState<SliderOption>('technical experience')

  return (
    <section className={styles.experiencePage} aria-labelledby="experience-title">
      <div className={styles.inner}>
        <h2 id="experience-title">Experience</h2>
        <Slider selectedOption={selectedSection} onSelect={setSelectedSection} />

        <div className={styles.content} role="tabpanel" aria-label={selectedSection} />
      </div>
    </section>
  )
}

export default ExperiencePage
