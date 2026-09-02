import { useEffect, useState } from 'react'
import Playground from '../../components/Playground/Playground'
import styles from './AboutPage.module.css'

const githubUsername = import.meta.env.VITE_GITHUB_USERNAME || 'kathryntanardy'
const githubGraphEndpoint = import.meta.env.VITE_GITHUB_ACTIVITY_ENDPOINT || '/api/github-contribution'

const aboutNotes = [
  '👾 currently building — hacker portal, CSSS Kiosk',
  '🔭 want to build tools people actually open twice',
  '🐶 pet tax — one very cute dog named Chiro',
  "🥞 lately — trying every salt bread in Metro Vancouver",
  '🌎 based in Vancouver, open to new grad roles',
]

type ContributionDay = {
  date: string
  contributionCount: number
}

type ContributionCalendar = {
  totalContributions: number
  weeks: { contributionDays: ContributionDay[] }[]
}

const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'short' })
const dayFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' })

function getLevel(count: number) {
  if (count === 0) return 0
  if (count === 1) return 1
  if (count <= 3) return 2
  if (count <= 6) return 3
  return 4
}

function getMonthLabels(weeks: ContributionCalendar['weeks']) {
  const seenMonths = new Set<string>()

  return weeks.flatMap((week, index) => {
    const firstOfMonth = week.contributionDays.find(
      (day) => new Date(`${day.date}T00:00:00`).getDate() === 1,
    )

    if (!firstOfMonth) return []

    const date = new Date(`${firstOfMonth.date}T00:00:00`)
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`

    if (seenMonths.has(monthKey)) return []

    seenMonths.add(monthKey)
    return [{ label: monthFormatter.format(date), index }]
  })
}

function GitHubGraph() {
  const [calendar, setCalendar] = useState<ContributionCalendar | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadCalendar() {
      try {
        const response = await fetch(githubGraphEndpoint, { signal: controller.signal })
        if (response.ok) {
          setCalendar((await response.json()) as ContributionCalendar)
        }
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setCalendar(null)
        }
      }
    }

    loadCalendar()
    return () => controller.abort()
  }, [])

  if (!calendar) return null

  const monthLabels = getMonthLabels(calendar.weeks)

  return (
    <section
      className={styles.githubPanel}
      aria-label={`${calendar.totalContributions} GitHub contributions in the last year`}
    >
      <div className={styles.githubGridWrap}>
        <div className={styles.monthLabels} aria-hidden="true">
          {monthLabels.map((month) => (
            <span key={month.label} style={{ gridColumn: `${month.index + 1} / span 4` }}>
              {month.label}
            </span>
          ))}
        </div>

        <div className={styles.activityGrid} aria-label="GitHub contributions over the last year">
          {calendar.weeks.map((week) => (
            <div className={styles.activityWeek} key={week.contributionDays[0]?.date}>
              {week.contributionDays.map((day) => (
                <span
                  className={styles.activityDay}
                  data-level={getLevel(day.contributionCount)}
                  key={day.date}
                  title={`${day.contributionCount} contribution${
                    day.contributionCount === 1 ? '' : 's'
                  } on ${dayFormatter.format(new Date(`${day.date}T00:00:00`))}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutPage() {
  return (
    <section className={styles.about} id="about" aria-label="About">
      <Playground />

      <section className={styles.aboutContent} aria-labelledby="about-title">
        <div className={styles.inner}>
          <div className={styles.copyPanel}>
            <h2 id="about-title">Hi, I’m Kathryn!</h2>
            <p>
              A fifth-year Computer Science student at SFU who loves building things
              that make people’s lives a little easier, including my own! What excites me most about
              building is the endless possibility of turning a simple idea into something useful and
              impactful.
            </p>
            <p>
              Outside of tech, I enjoy watching TV series, listening to music, touching grass, and
              meeting new people. I try my best to work hard, make the most of every opportunity,
              and live life to the fullest every day. I hope to keep creating things I love and
              enjoy the journey along the way ✨
            </p>
          </div>

          <div className={styles.actions}>
            <a
              className={styles.primaryAction}
              href="/Kathryn_Resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              View CV
            </a>
            <a
              className={styles.socialAction}
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className={styles.socialAction}
              href="https://www.linkedin.com/in/kathryntanardy"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>

          <div className={styles.githubActivityRow}>
            <GitHubGraph />

            <ul className={styles.aboutNotes} aria-label="About Kathryn notes">
              {aboutNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </section>
  )
}

export default AboutPage
