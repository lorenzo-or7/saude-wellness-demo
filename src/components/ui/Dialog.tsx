import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { easeOut } from '../../lib/motion'

type Variant = 'drawer' | 'center' | 'full'

interface DialogProps {
  open: boolean
  onClose: () => void
  title: string
  /** Oculta visualmente o título (ainda anunciado por leitores de tela). */
  hideTitle?: boolean
  variant?: Variant
  children: ReactNode
  className?: string
  onKeyDown?: (e: KeyboardEvent) => void
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

/** Diálogo modal acessível: foco preso, Esc fecha, foco restaurado, scroll do body bloqueado. */
export function Dialog({ open, onClose, title, hideTitle, variant = 'center', children, className = '', onKeyDown }: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)
  const titleId = useId()
  const reduce = useReducedMotion()
  const onCloseRef = useRef(onClose)
  const onKeyRef = useRef(onKeyDown)
  onCloseRef.current = onClose
  onKeyRef.current = onKeyDown

  useEffect(() => {
    if (!open) return
    lastFocus.current = document.activeElement as HTMLElement
    const html = document.documentElement
    const prevOverflow = html.style.overflow
    const scrollbar = window.innerWidth - html.clientWidth
    html.style.overflow = 'hidden'
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`

    const t = window.setTimeout(() => panelRef.current?.focus(), 30)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onCloseRef.current()
        return
      }
      onKeyRef.current?.(e)
      if (e.key !== 'Tab' || !panelRef.current) return
      const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (n) => n.offsetParent !== null || n === document.activeElement,
      )
      if (!nodes.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(t)
      document.removeEventListener('keydown', onKey)
      html.style.overflow = prevOverflow
      document.body.style.paddingRight = ''
      lastFocus.current?.focus?.({ preventScroll: true })
    }
  }, [open])

  const panelMotion =
    variant === 'drawer'
      ? { initial: { x: reduce ? 0 : '100%', opacity: reduce ? 0 : 1 }, animate: { x: 0, opacity: 1 }, exit: { x: reduce ? 0 : '100%', opacity: reduce ? 0 : 1 } }
      : variant === 'full'
        ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
        : { initial: { opacity: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.98 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: reduce ? 0 : 12 } }

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className={`dialog-root dialog-${variant}`}>
          <motion.div
            className="dialog-scrim"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className={`dialog-panel ${className}`}
            {...panelMotion}
            transition={{ duration: reduce ? 0.2 : 0.6, ease: easeOut }}
          >
            <h2 id={titleId} className={hideTitle ? 'sr-only' : 'dialog-title'}>
              {title}
            </h2>
            <button type="button" className="icon-btn dialog-close" onClick={onClose} aria-label="Fechar">
              <X aria-hidden="true" />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
