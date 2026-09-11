import styles from './WorkPage.module.css'
import ProjectImagePopup from '../../components/ui/ProjectImagePopup/ProjectImagePopup'

type Project = {
  title: string
  image: string
  frameClass: string
  popupSize?: 'compact'
}

const projects: Project[] = [
  {
    title: 'ParkAble',
    image: '/work/parkable.png',
    frameClass: 'parkable',
  },
  {
    title: 'MockRoom',
    image: '/work/mockroom.png',
    frameClass: 'mockroom',
  },
  {
    title: 'LoveSignal',
    image: '/work/lovesignal.png',
    frameClass: 'lovesignal',
  },
  {
    title: 'Hacker Portal',
    image: '/work/hacker-portal.png',
    frameClass: 'hackerPortal',
  },
  {
    title: 'Credify',
    image: '/work/credify.png',
    frameClass: 'credify',
    popupSize: 'compact',
  },
  {
    title: 'Hope Health Action',
    image: '/work/hope-health-action.png',
    frameClass: 'hopeHealth',
  },
]

function WorkPage() {
  return (
    <section id="work" className={styles.work} aria-labelledby="work-title">
      <div className={styles.inner}>
        <header className={styles.hero}>
          <h1 id="work-title">Kathryn Tanardy</h1>
          <p>Developer @ SFU Surge, Prev. ICBC, BC Hydro</p>
        </header>

        <div className={styles.collage} aria-label="Selected work">
          {projects.map((project) => (
            <ProjectImagePopup
              key={project.title}
              src={project.image}
              alt={`${project.title} project preview`}
              title={project.title}
              popupSize={project.popupSize}
              className={`${styles.projectTile} ${styles[project.frameClass]}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default WorkPage
