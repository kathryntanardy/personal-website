import { useState } from 'react'
import Experience from '../../components/Experience/Experience'
import {
  awardExperiences,
  technicalExperiences,
  volunteerExperiences,
} from '../../components/Experience/Experience.data'
import Slider from '../../components/Slider/Slider'
import type { SliderOption } from '../../components/Slider/Slider'
import styles from './ExperiencePage.module.css'

function ExperiencePage() {
  const [selectedSection, setSelectedSection] = useState<SliderOption>('technical experience')
  const entriesBySection: Partial<Record<SliderOption, Parameters<typeof Experience>[0]>> = {
    'technical experience': {
      entries: technicalExperiences,
      label: 'Technical experience',
    },
    volunteer: {
      entries: volunteerExperiences,
      label: 'Volunteer experience',
    },
    awards: {
      entries: awardExperiences,
      label: 'Awards',
    },
  }
  const selectedExperience = entriesBySection[selectedSection]

  return (
    <section className={styles.experiencePage} aria-labelledby="experience-title">
      <div className={styles.inner}>
        <h2 id="experience-title">Experience</h2>
        <Slider selectedOption={selectedSection} onSelect={setSelectedSection} />

        <div className={styles.content} role="tabpanel" aria-label={selectedSection}>
          {selectedExperience ? <Experience key={selectedSection} {...selectedExperience} /> : null}
        </div>
      </div>
    </section>
  )
}

export default ExperiencePage
