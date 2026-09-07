import { useEffect, useRef, useState } from 'react'
import styles from './ChatBox.module.css'

const firstMessageDelay = 950
const nextMessageDelay = 1700
const longMessageDelay = 2600

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

const profileMessage = (
  <>
    I&apos;m a <span className={styles.semibold}>5th Computer Science student at SFU</span> who
    loves turning ideas into useful software. I enjoy building{' '}
    <span className={styles.semibold}>full-stack products</span>,{' '}
    <span className={styles.semibold}>exploring new technologies</span>, and{' '}
    <span className={styles.semibold}>solving real-world problems from development to deployment</span>.
    I&apos;m especially excited by the process of taking an idea, figuring out how to build it, and
    turning it into something people can actually use! <span aria-hidden="true">☺️</span>
  </>
)

const outsideTechMessage = (
  <>
    Outside of tech, I enjoy <span className={styles.semibold}>watching TV series</span>,{' '}
    <span className={styles.semibold}>listening to music</span>,{' '}
    <span className={styles.semibold}>touching grass</span>, and{' '}
    <span className={styles.semibold}>meeting new people</span>. I try to make the most of every
    opportunity, keep learning, and continue building things that are useful, meaningful, and fun.{' '}
    <span aria-hidden="true">🫶🏻</span>
  </>
)

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function ChatBox() {
  const chatBoxRef = useRef<HTMLElement>(null)
  const [isReducedMotion] = useState(prefersReducedMotion)
  const [visibleMessageCount, setVisibleMessageCount] = useState(() => {
    return prefersReducedMotion() ? messages.length : 0
  })
  const [isProfileMessageVisible, setIsProfileMessageVisible] = useState(prefersReducedMotion)
  const [isOutsideTechMessageVisible, setIsOutsideTechMessageVisible] = useState(prefersReducedMotion)

  const areIntroMessagesLoaded = visibleMessageCount >= messages.length
  const isFullyLoaded =
    areIntroMessagesLoaded && isProfileMessageVisible && isOutsideTechMessageVisible

  useEffect(() => {
    if (areIntroMessagesLoaded) return

    const timer = window.setTimeout(
      () => {
        setVisibleMessageCount((currentCount) => Math.min(currentCount + 1, messages.length))
      },
      visibleMessageCount === 0 ? firstMessageDelay : nextMessageDelay,
    )

    return () => window.clearTimeout(timer)
  }, [areIntroMessagesLoaded, visibleMessageCount])

  useEffect(() => {
    if (!areIntroMessagesLoaded || isProfileMessageVisible) return

    const timer = window.setTimeout(() => {
      setIsProfileMessageVisible(true)
    }, isReducedMotion ? 0 : nextMessageDelay)

    return () => window.clearTimeout(timer)
  }, [areIntroMessagesLoaded, isProfileMessageVisible, isReducedMotion])

  useEffect(() => {
    if (!isProfileMessageVisible || isOutsideTechMessageVisible) return

    const timer = window.setTimeout(() => {
      setIsOutsideTechMessageVisible(true)
    }, isReducedMotion ? 0 : longMessageDelay)

    return () => window.clearTimeout(timer)
  }, [isOutsideTechMessageVisible, isProfileMessageVisible, isReducedMotion])

  useEffect(() => {
    const chatBox = chatBoxRef.current
    if (!chatBox) return

    const frame = window.requestAnimationFrame(() => {
      chatBox.scrollTo({
        top: chatBox.scrollHeight,
        behavior: isReducedMotion ? 'auto' : 'smooth',
      })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [isFullyLoaded, isOutsideTechMessageVisible, isProfileMessageVisible, isReducedMotion, visibleMessageCount])

  return (
    <aside className={styles.chatBox} aria-label="Introductory chat" ref={chatBoxRef}>
      <div className={styles.chatStream}>
        <div className={styles.messages}>
          {messages.slice(0, visibleMessageCount).map((message, index) => (
            <p className={[styles.message, styles.messageVisible].join(' ')} key={index}>
              <span className={styles.messageText}>{message}</span>
            </p>
          ))}
        </div>

        {isProfileMessageVisible ? (
          <p className={[styles.profileBubble, styles.profileBubbleVisible].join(' ')}>
            {profileMessage}
          </p>
        ) : null}

        {isOutsideTechMessageVisible ? (
          <p className={[styles.profileBubble, styles.profileBubbleVisible].join(' ')}>
            {outsideTechMessage}
          </p>
        ) : null}

        {!isFullyLoaded ? (
          <div className={[styles.typing, styles.typingLoading].join(' ')} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        ) : null}
      </div>
    </aside>
  )
}

export default ChatBox
