import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
import { pillars } from '../data/content'
import { SmartImage } from '../components/ui/SmartImage'
import { FadeUp, RevealText } from '../components/ui/Reveal'
import { easeOut } from '../lib/motion'

export function Philosophy() {
  const track = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] })
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1])

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const next = Math.min(pillars.length - 1, Math.max(0, Math.floor(p * pillars.length * 0.999)))
    setActive((cur) => (cur === next ? cur : next))
  })

  const goTo = (i: number) => {
    const el = track.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const span = el.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + span * ((i + 0.5) / pillars.length), behavior: reduce ? 'auto' : 'smooth' })
  }

  const current = pillars[active]

  return (
    <section id="filosofia" className="philo" aria-labelledby="philo-title">
      <div className="container philo-intro">
        <p className="kicker">A new way to feel</p>
        <RevealText
          id="philo-title"
          className="section-title philo-title"
          lines={['O bem-estar envolve', 'diferentes dimensões', 'da vida.']}
        />
        <FadeUp className="philo-intro-copy" delay={0.2}>
          <p className="lead">
            Na AURA, cuidado não é uma única prática. É a soma de pequenas escolhas sobre como nos movemos, como
            descansamos e como organizamos os dias. Três dimensões orientam todas as experiências do espaço.
          </p>
        </FadeUp>
      </div>

      <div ref={track} className="philo-track">
        <div className="philo-sticky">
          <div className="container philo-stage">
            <div className="philo-media" aria-hidden="true">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.id}
                  className="philo-media-layer img-frame"
                  style={{ zIndex: i }}
                  initial={false}
                  animate={
                    reduce
                      ? { opacity: i === active ? 1 : 0 }
                      : { clipPath: i <= active ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)' }
                  }
                  transition={{ duration: 1.1, ease: easeOut }}
                >
                  <motion.div
                    style={{ height: '100%' }}
                    initial={false}
                    animate={{ scale: reduce ? 1 : i === active ? 1 : 1.12 }}
                    transition={{ duration: 1.6, ease: easeOut }}
                  >
                    <SmartImage photo={p.photo} sizes="(max-width: 860px) 92vw, 46vw" widths={[600, 900, 1300]} />
                  </motion.div>
                </motion.div>
              ))}
              <span className="philo-media-caption">
                {active + 1} de {pillars.length}
              </span>
            </div>

            <div className="philo-panel">
              <div className="philo-tabs" role="tablist" aria-label="Pilares do cuidado">
                {pillars.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    role="tab"
                    id={`pillar-tab-${p.id}`}
                    aria-selected={i === active}
                    aria-controls="pillar-panel"
                    tabIndex={i === active ? 0 : -1}
                    className={`philo-tab ${i === active ? 'is-active' : ''}`}
                    onClick={() => goTo(i)}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                        e.preventDefault()
                        const n = Math.min(pillars.length - 1, i + 1)
                        goTo(n)
                        document.getElementById(`pillar-tab-${pillars[n].id}`)?.focus({ preventScroll: true })
                      }
                      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                        e.preventDefault()
                        const n = Math.max(0, i - 1)
                        goTo(n)
                        document.getElementById(`pillar-tab-${pillars[n].id}`)?.focus({ preventScroll: true })
                      }
                    }}
                  >
                    <span className="philo-tab-name">{p.name}</span>
                    <span className="philo-tab-theme">{p.theme}</span>
                  </button>
                ))}
              </div>

              <div className="philo-progress" aria-hidden="true">
                <motion.span style={{ scaleX: progress }} />
              </div>

              <div id="pillar-panel" role="tabpanel" aria-labelledby={`pillar-tab-${current.id}`} className="philo-text" aria-live="polite">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: reduce ? 0 : 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduce ? 0 : -12 }}
                    transition={{ duration: 0.55, ease: easeOut }}
                  >
                    <p className="philo-statement">{current.text}</p>
                    <p className="philo-detail">{current.detail}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
