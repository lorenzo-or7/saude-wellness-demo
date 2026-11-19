import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { testimonials } from '../data/content'
import { easeOut, press } from '../lib/motion'

export function Testimonials() {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const reduce = useReducedMotion()
  const t = testimonials[i]

  const go = (d: 1 | -1) => {
    setDir(d)
    setI((cur) => (cur + d + testimonials.length) % testimonials.length)
  }

  return (
    <section className="testi" aria-labelledby="testi-title" aria-roledescription="carrossel">
      <div className="container testi-grid">
        <div className="testi-side">
          <p className="kicker">Real experiences</p>
          <h2 id="testi-title" className="testi-title">
            Como pode ser a experiência
          </h2>
          <p className="demo-tag">Depoimentos de exemplo, não atribuídos a pessoas reais</p>
        </div>

        <div className="testi-stage">
          <svg className="testi-mark" viewBox="0 0 60 44" aria-hidden="true">
            <path d="M0 44V26C0 11 8 2 24 0l2 6C17 9 12 15 12 22h12v22H0Zm34 0V26C34 11 42 2 58 0l2 6c-9 3-14 9-14 16h12v22H34Z" />
          </svg>
          <div className="testi-quote-wrap" aria-live="polite">
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              <motion.figure
                key={i}
                className="testi-figure"
                initial={{ opacity: 0, y: reduce ? 0 : dir * 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : dir * -12 }}
                transition={{ duration: 0.6, ease: easeOut }}
              >
                <blockquote>
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption>
                  <span>Exemplo</span> {t.who}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="testi-controls">
            <div className="testi-dots" role="group" aria-label="Escolher depoimento">
              {testimonials.map((_, n) => (
                <button
                  key={n}
                  type="button"
                  className={`testi-dot ${n === i ? 'is-active' : ''}`}
                  aria-label={`Depoimento ${n + 1} de ${testimonials.length}`}
                  aria-current={n === i ? 'true' : undefined}
                  onClick={() => {
                    setDir(n > i ? 1 : -1)
                    setI(n)
                  }}
                >
                  <span />
                </button>
              ))}
            </div>
            <div className="testi-arrows">
              <motion.button type="button" className="icon-btn" onClick={() => go(-1)} aria-label="Depoimento anterior" whileTap={press}>
                <ArrowLeft aria-hidden="true" />
              </motion.button>
              <motion.button type="button" className="icon-btn" onClick={() => go(1)} aria-label="Próximo depoimento" whileTap={press}>
                <ArrowRight aria-hidden="true" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
