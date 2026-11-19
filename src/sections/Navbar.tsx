import { motion, useMotionValueEvent, useScroll, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { Menu, Moon, Sun, MessageCircle } from 'lucide-react'
import { nav, site } from '../data/site'
import { useTheme } from '../hooks/useTheme'
import { useActiveSection } from '../hooks/useActiveSection'
import { Dialog } from '../components/ui/Dialog'
import { Magnetic } from '../components/ui/Magnetic'
import { easeOut, press } from '../lib/motion'
import { defaultMessage, useApp } from '../lib/app-context'

const ids = nav.map((n) => n.id)

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`wordmark ${className}`}>
      <svg viewBox="0 0 24 28" aria-hidden="true" className="wordmark-glyph">
        <path d="M3 27V12a9 9 0 0 1 18 0v15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8.5 27v-9.5a3.5 3.5 0 0 1 7 0V27" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity=".55" />
      </svg>
      <span className="wordmark-text">{site.name}</span>
    </span>
  )
}

export function Navbar() {
  const { theme, toggle } = useTheme()
  const active = useActiveSection(ids)
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const { startConversation } = useApp()

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 48))

  const themeLabel = theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'
  const book = () => startConversation({ message: `${defaultMessage} Quero agendar uma experiência.`, origin: 'Navegação' })

  return (
    <motion.header
      className="nav-wrap"
      initial={{ y: reduce ? 0 : -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: easeOut, delay: 0.9 }}
    >
      <div className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <a href="#topo" className="nav-brand" aria-label="AURA, voltar ao início">
          <Wordmark />
        </a>

        <nav aria-label="Seções" className="nav-links">
          <ul role="list">
            {nav.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="nav-link" aria-current={isActive ? 'location' : undefined}>
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="nav-indicator"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      />
                    )}
                    <span className="nav-link-label">{item.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="nav-actions">
          <motion.button
            type="button"
            className="icon-btn theme-toggle"
            onClick={toggle}
            aria-label={themeLabel}
            title={themeLabel}
            whileTap={press}
          >
            <motion.span
              key={theme}
              initial={{ rotate: reduce ? 0 : -60, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: easeOut }}
              style={{ display: 'grid' }}
            >
              {theme === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
            </motion.span>
          </motion.button>
          <Magnetic>
            <motion.button type="button" className="btn btn-primary btn-sm nav-cta" onClick={book} whileTap={press}>
              Agendar
            </motion.button>
          </Magnetic>
          <motion.button
            type="button"
            className="icon-btn nav-menu-btn"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            aria-haspopup="dialog"
            aria-expanded={open}
            whileTap={press}
          >
            <Menu aria-hidden="true" />
          </motion.button>
        </div>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} title="Menu" hideTitle variant="full" className="mobile-menu">
        <div className="mobile-menu-inner">
          <Wordmark className="mobile-menu-brand" />
          <nav aria-label="Seções (menu)">
            <ul role="list" className="mobile-menu-list">
              {nav.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: reduce ? 0 : 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: easeOut, delay: 0.08 + i * 0.05 }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? 'location' : undefined}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>
          <div className="mobile-menu-foot">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setOpen(false)
                book()
              }}
            >
              <MessageCircle aria-hidden="true" />
              Agendar uma conversa
            </button>
            <button type="button" className="btn btn-ghost" onClick={toggle}>
              {theme === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
              {theme === 'dark' ? 'Tema claro' : 'Tema escuro'}
            </button>
          </div>
        </div>
      </Dialog>
    </motion.header>
  )
}
