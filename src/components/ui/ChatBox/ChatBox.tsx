import styles from './ChatBox.module.css'

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
    and I love <span className={styles.semibold}>building things</span>!
  </>,
]

function ChatBox() {
  return (
    <aside className={styles.chatBox} aria-label="Introductory chat">
      <div className={styles.messages}>
        {messages.map((message, index) => (
          <p className={styles.message} key={index}>
            <img className={styles.bubbleImage} src="/desktop/bubble.png" alt="" aria-hidden="true" />
            <span className={styles.messageText}>{message}</span>
          </p>
        ))}
      </div>

      <div className={styles.typing} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </aside>
  )
}

export default ChatBox
