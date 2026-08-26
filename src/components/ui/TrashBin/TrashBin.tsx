import styles from './TrashBin.module.css'

type TrashedItem = {
  id: string
  title: string
}

type TrashBinProps = {
  items: TrashedItem[]
  isOpen: boolean
  onToggle: () => void
  onRestore: (id: string) => void
}

function TrashBin({ items, isOpen, onToggle, onRestore }: TrashBinProps) {
  return (
    <div className={styles.trash}>
      {isOpen ? (
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span>Bin</span>
            <button type="button" onClick={onToggle} aria-label="Close trash bin">
              x
            </button>
          </div>
          <div className={styles.panelBody}>
            {items.length === 0 ? (
              <p className={styles.empty}>No folders here</p>
            ) : (
              items.map((item) => (
                <button
                  className={styles.restoreButton}
                  key={item.id}
                  type="button"
                  onClick={() => onRestore(item.id)}
                >
                  <img className={styles.fileIcon} src="/folder.svg" alt="" />
                  <span>{item.title}</span>
                </button>
              ))
            )}
          </div>
        </div>
      ) : null}

      <button className={styles.trashButton} type="button" onClick={onToggle} aria-label="Open trash bin">
        <img className={styles.trashIcon} src="/trashbin.svg" alt="" />
        <span>Trash bin</span>
      </button>
    </div>
  )
}

export default TrashBin
