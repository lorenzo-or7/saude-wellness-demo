import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import { faqs } from '../data/content'
import { RevealText } from '../components/ui/Reveal'
import { easeOut } from '../lib/motion'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  const reduce = useReducedMotion()

  return (
    <section id="faq" className="faq" aria-labelledby="faq-title">
      <div className="container faq-grid">
        <div className="faq-head">
          <p className="kicker">Thoughtful answers</p>
          <RevealText id="faq-title" className="section-title" lines={['Dúvidas', 'frequentes.']} />
          <p className="muted faq-sub">
            Respostas demonstrativas. Cada espaço adapta estas informações à sua forma de trabalhar.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((f, i) => {
            const isOpen = open === i
            const id = `faq-${i}`
            return (
              <div key={f.q} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                <h3>
                  <button
                    type="button"
                    className="faq-btn"
                    id={`${id}-btn`}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-panel`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{f.q}</span>
                    <span className="faq-icon" aria-hidden="true">
                      <motion.span
                        style={{ display: 'grid' }}
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: reduce ? 0 : 0.4, ease: easeOut }}
                      >
                        <Plus />
                      </motion.span>
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`${id}-panel`}
                      role="region"
                      aria-labelledby={`${id}-btn`}
                      className="faq-panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.5, ease: easeOut }}
                    >
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
