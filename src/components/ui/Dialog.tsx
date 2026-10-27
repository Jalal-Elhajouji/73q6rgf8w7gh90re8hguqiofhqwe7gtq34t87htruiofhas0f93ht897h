import { useEffect, useRef, type ReactNode } from 'react'
import { Icon } from './Icon'
import './Dialog.css'

type DialogProps = {
  title: string
  onClose: () => void
  children: ReactNode
  footer?: ReactNode
}

/** Modal dialog that opens on mount. Closes on Escape, backdrop click or the close button. */
export function Dialog({ title, onClose, children, footer }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  return (
    <dialog
      ref={ref}
      className="dialog"
      aria-label={title}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="dialog__panel">
        <header className="dialog__header">
          <h2 className="dialog__title">{title}</h2>
          <button type="button" className="dialog__close" aria-label="Close" onClick={onClose}>
            <Icon name="close" size={16} />
          </button>
        </header>
        <div className="dialog__body">{children}</div>
        {footer && <footer className="dialog__footer">{footer}</footer>}
      </div>
    </dialog>
  )
}
