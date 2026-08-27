import type { CSSProperties, PointerEventHandler, ReactNode } from 'react'
import styles from './Window.module.css'

type WindowProps = {
    children: ReactNode
    className?: string
    style?: CSSProperties
    onClose?: () => void
    onPointerDown?: PointerEventHandler<HTMLElement>
    onPointerMove?: PointerEventHandler<HTMLElement>
    onPointerUp?: PointerEventHandler<HTMLElement>
    onHeaderPointerDown?: PointerEventHandler<HTMLDivElement>
    onHeaderPointerMove?: PointerEventHandler<HTMLDivElement>
    onHeaderPointerUp?: PointerEventHandler<HTMLDivElement>
}

function Window({
    children,
    className,
    style,
    onClose,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onHeaderPointerDown,
    onHeaderPointerMove,
    onHeaderPointerUp,
}: WindowProps) {
    return (
        <article
            className={[styles.window, className].filter(Boolean).join(' ')}
            onLostPointerCapture={onPointerUp}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            style={style}
        >
            <div
                className={styles.header}
                onLostPointerCapture={onHeaderPointerUp}
                onPointerDown={onHeaderPointerDown}
                onPointerMove={onHeaderPointerMove}
                onPointerUp={onHeaderPointerUp}
            >

                {onClose ? (
                    <button
                        className={styles.closeButton}
                        type="button"
                        onClick={onClose}
                        onPointerDown={(event) => event.stopPropagation()}
                        aria-label="Close window"
                    >
                        <img src="/x.svg" alt="" />
                    </button>
                ) : null}
            </div>
            <div className={styles.body}>{children}</div>
        </article>
    )
}

export default Window
