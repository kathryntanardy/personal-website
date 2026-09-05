import styles from './WorkPage.module.css'
import ProjectImagePopup from '../../components/ui/ProjectImagePopup/ProjectImagePopup'

type Project = {
  title: string
  role: string
  description: string
  image: string
  details: string[]
  websiteUrl?: string
  websiteLabel?: string
}

const projects: Project[] = [
  {
    title: 'ParkAble',
    role: 'Backend Developer',
    description: 'Smart accessible parking concept focused on making parking easier to find.',
    image: '/work/parkable.png',
    details: ['Accessibility', 'Parking', 'Product'],
  },
  {
    title: 'MockRoom',
    role: 'Full-stack Developer',
    description: 'A dashboard-style experience for tracking room activity and daily check-ins.',
    image: '/work/mockroom.png',
    details: ['Dashboard', 'React', 'UX'],
  },
  {
    title: 'LoveSignal',
    role: 'Full-stack Developer',
    description: 'A playful signal-based concept exploring long-distance connection.',
    image: '/work/lovesignal.png',
    details: ['Mobile', 'Branding', 'Prototype'],
  },
  {
    title: 'Hacker Portal',
    role: 'Full-stack Developer',
    description: 'A dark interface for participants to manage applications, events, and resources.',
    image: '/work/hacker-portal.png',
    details: ['Portal', 'Events', 'Frontend'],
  },
  {
    title: 'Credify',
    role: 'Mobile Developer',
    description: 'A mobile finance concept with credit insights and progress tracking.',
    image: '/work/credify.png',
    details: ['Mobile App', 'Finance', 'UI'],
  },
  {
    title: 'Hope Health Action',
    role: 'Frontend Developer',
    description: 'A healthcare login flow with simple, focused account access.',
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
                  websiteUrl={project.websiteUrl}
                  websiteLabel={project.websiteLabel}
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
