import TechStackCard from '../TechStackCard/TechStackCard'
import styles from './TechStack.module.css'

const techStacks = [
  {
    title: 'AI-Assisted Engineering',
    items: ['CLAUDE CODE', 'AMAZON Q'],
  },
  {
    title: 'Programming Languages',
    items: ['PYTHON', 'JAVA', 'C', 'C++', 'TYPESCRIPT', 'JAVASCRIPT', 'HTML', 'CSS', 'SQL'],
  },
  {
    title: 'Developer Tools',
    items: ['CLAUDE CODE', 'GITHUB', 'GIT', 'GITLAB', 'NPM', 'PNPM', 'JIRA', 'POSTMAN', 'DOCKER', 'SWAGGER'],
  },
  {
    title: 'Cloud Platforms & Backend Services',
    items: ['AWS', 'CLOUDWATCH', 'SNS', 'FIREBASE', 'GCP', 'GCE'],
  },
]

function TechStack() {
  return (
    <div className={styles.techStack}>
      {techStacks.map((stack) => (
        <TechStackCard key={stack.title} title={stack.title} items={stack.items} />
      ))}
    </div>
  )
}

export default TechStack
