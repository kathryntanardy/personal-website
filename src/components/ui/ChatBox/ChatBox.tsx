import { useEffect, useState } from 'react'
import styles from './ChatBox.module.css'

const firstMessageDelay = 750
const nextMessageDelay = 1300

const messages = [
  <>Hello, my name is Kathryn!</>,
  <>
    I&apos;m a <span className={styles.semibold}>full-stack developer</span>...
  </>,
  <>
    ... based in <span className={styles.semibold}>Vancouver!</span> <span aria-hidden="true">☀️</span>
  </>,
  <>
    I&apos;m a <span className={styles.semibold}>dog</span> and <span className={styles.semibold}>matcha lover</span>,
  </>,
  <>
    and I love <span className={styles.semibold}>building things</span>! 🔨
  </>,
]

function ChatBox() {
  const [visibleMessageCount, setVisibleMessageCount] = useState(() => {
    if (typeof window === 'undefined') return 0

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? messages.length : 0
  })

  const isLoaded = visibleMessageCount >= messages.length

  useEffect(() => {
    if (isLoaded) return

    const timer = window.setTimeout(
      () => {
        setVisibleMessageCount((currentCount) => Math.min(currentCount + 1, messages.length))
      },
      visibleMessageCount === 0 ? firstMessageDelay : nextMessageDelay,
    )

    return () => window.clearTimeout(timer)
  }, [isLoaded, visibleMessageCount])

  return (
    <aside className={styles.chatBox} aria-label="Introductory chat">
      <div className={styles.messages}>
        {messages.map((message, index) => (
          <p
            className={[
              styles.message,
              index < visibleMessageCount ? styles.messageVisible : styles.messageHidden,
            ].join(' ')}
            key={index}
            aria-hidden={index >= visibleMessageCount}
          >
            <span className={styles.messageText}>{message}</span>
          </p>
        ))}
      </div>

      <div className={[styles.typing, isLoaded ? styles.typingComplete : styles.typingLoading].join(' ')} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </aside>
  )
}

export default ChatBox
