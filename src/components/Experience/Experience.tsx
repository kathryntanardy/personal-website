import styles from './Experience.module.css'

const experiences = [
  {
    title: 'W3 Committee Developer',
    company: 'SFU Computing Science Student Society',
    location: 'Burnaby, BC',
    duration: 'May 2026 - Present',
  },
  {
    title: 'Developer',
    company: 'SFU Surge',
    location: 'Burnaby, BC',
    duration: 'Aug 2025 - Present',
  },
  {
    title: 'Application Developer Co-op',
    company: 'ICBC (Insurance Corporation of British Columbia)',
    location: 'North Vancouver, BC',
    duration: 'May 2025 - Dec 2025',
  },
  {
    title: 'Computer Engineer Co-op',
    company: 'BC Hydro',
    location: 'Vancouver, BC',
    duration: 'Sep 2024 - Apr 2025',
  },
]

function Experience() {
  return (
    <div className={styles.experience} aria-label="Experience">
      {experiences.map((experience) => (
        <article className={styles.item} key={`${experience.title}-${experience.company}`}>
          <div className={styles.details}>
            <h3>{experience.title}</h3>
            <p>
              {experience.company} <span className={styles.separator}>|</span> {experience.location}
            </p>
          </div>

          <p className={styles.duration}>{experience.duration}</p>
        </article>
      ))}
    </div>
  )
}

export default Experience
