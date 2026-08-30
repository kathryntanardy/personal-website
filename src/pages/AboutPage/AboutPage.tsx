import { useState } from 'react'
import styles from './AboutPage.module.css'

const profileImages = {
  default: '/about/profile.jpg',
  revealed: '/about/chiro.jpg',
}

function AboutPage() {
  const [isRevealed, setIsRevealed] = useState(false)

  return (
    <section className={styles.about} id="about" aria-labelledby="about-title">
      <div className={styles.inner}>
        <div className={styles.copyPanel}>
          <h2 id="about-title">Hi, I’m Kathryn Tanardy</h2>
          <p>
            Hi! I’m Kathryn, a 5th-year Computer Science student at SFU 👋 I’m passionate about
            full-stack development, project management, and building things that make a real impact.
            I love turning ideas into something useful, working with people, and learning along
            the way.

            <br /> <br />
            In my free time, you’ll probably find me watching TV series, listening to music,
            touching grass, or connecting with new people. I also love exploring new foods in town 😋.
            I’m a huge believer that consistent hard work leads to growth, and that every action,
            win or lose, is a chance to learn and improve. It’s a mindset I try to carry with me
            every day.
          </p>

          <div className={styles.actions}>
            <a className={styles.primaryAction}
              href="/Kathryn_Resume.pdf"
              target="_blank"
              rel="noreferrer">
              View CV
            </a>
            <a href="https://github.com/kathryntanardy">GitHub</a>
            <a href="https://www.linkedin.com/in/kathryntanardy">LinkedIn</a>
          </div>
        </div>

        <div className={styles.portraitArea}>
          <img className={styles.sparkle} src="/about/random.svg" alt="" aria-hidden="true" />
          <img className={styles.flower} src="/about/flower.svg" alt="" aria-hidden="true" />
          <img className={styles.scribble} src="/about/blink.svg" alt="" aria-hidden="true" />

          <button
            className={styles.portraitButton}
            type="button"
            onClick={() => setIsRevealed((current) => !current)}
            aria-label="Reveal alternate about photo"
            aria-pressed={isRevealed}
          >
            <span className={styles.portraitFrame}>
              <img
                src={isRevealed ? profileImages.revealed : profileImages.default}
                alt="Kathryn Tanardy"
              />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default AboutPage
