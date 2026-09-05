import styles from './WorkPage.module.css'
import ProjectImagePopup from '../../components/ui/ProjectImagePopup/ProjectImagePopup'

type Project = {
  title: string
  role: string
  description: string
  image: string
  details: string[]
}

const projects: Project[] = [
  {
    title: 'ParkAble',
    role: 'Backend Developer',
    description:
      'An accessible parking platform that helps drivers find suitable spaces more confidently through location data and availability support.',
    image: '/work/parkable.png',
    details: ['Accessibility', 'Parking', 'Product'],
  },
  {
    title: 'MockRoom',
    role: 'Full-stack Developer',
    description:
      'A room management dashboard for tracking shared-space activity, check-ins, room status, and admin-facing updates.',
    image: '/work/mockroom.png',
    details: ['Dashboard', 'React', 'UX'],
  },
  {
    title: 'LoveSignal',
    role: 'Full-stack Developer',
    description:
      'A playful connection app concept that turns small relationship moments into signals through expressive, soft UI flows.',
    image: '/work/lovesignal.png',
    details: ['Mobile', 'Branding', 'Prototype'],
  },
  {
    title: 'Hacker Portal',
    role: 'Full-stack Developer',
    description:
      'A participant portal that brings hackathon applications, schedules, announcements, and resources into one focused interface.',
    image: '/work/hacker-portal.png',
    details: ['Portal', 'Events', 'Frontend'],
  },
  {
    title: 'Credify',
    role: 'Mobile Developer',
    description:
      'A mobile finance concept for understanding credit health, tracking progress, and surfacing personalized insights.',
    image: '/work/credify.png',
    details: ['Mobile App', 'Finance', 'UI'],
  },
  {
    title: 'Hope Health Action',
    role: 'Frontend Developer',
    description:
      'A healthcare access interface with a calm login flow, clear visual hierarchy, and responsive frontend styling.',
    image: '/work/hope-health-action.png',
    details: ['Healthcare', 'Auth', 'Interface'],
  },
]

const projectRows = [projects.slice(0, 3), projects.slice(3)]

function WorkPage() {
  return (
    <section id="work" className={styles.work} aria-labelledby="work-title">
      <div className={styles.inner}>
        <header className={styles.hero}>
          <h1 id="work-title">Kathryn Tanardy</h1>
          <p>Developer @ SFU Surge, Prev. ICBC, BC Hydro</p>
        </header>

        <div className={styles.gallery} aria-label="Selected work">
          {projectRows.map((row, index) => (
            <div className={styles.projectRow} key={`project-row-${index + 1}`}>
              {row.map((project) => (
                <ProjectImagePopup
                  key={project.title}
                  src={project.image}
                  alt={`${project.title} project preview`}
                  title={project.title}
                  role={project.role}
                  description={project.description}
                  details={project.details}
                  className={styles.projectTile}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WorkPage
