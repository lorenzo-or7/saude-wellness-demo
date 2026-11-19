import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'motion/react'
import { useCallback, useState } from 'react'
import { ArrowLeft, ArrowRight, Maximize2 } from 'lucide-react'
import { spaces } from '../data/content'
import { RevealImage, RevealText, FadeUp } from '../components/ui/Reveal'
import { SmartImage } from '../components/ui/SmartImage'
import { Dialog } from '../components/ui/Dialog'
import { easeOut, press } from '../lib/motion'

export function Space() {
  const [open, setOpen] = useState<number | null>(null)
  const [dir, setDir] = useState(1)
  const reduce = useReducedMotion()

  const step = useCallback((d: 1 | -1) => {
    setDir(d)
    setOpen((cur) => (cur === null ? cur : (cur + d + spaces.length) % spaces.length))
  }, [])

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    },
    [step],
  )

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) step(1)
    else if (info.offset.x > 60) step(-1)
  }

  const current = open !== null ? spaces[open] : null

  return (
    <section id="espaco" className="space" aria-labelledby="space-title">
      <div className="container">
        <div className="space-head">
          <div>
            <p className="kicker">A place to reconnect</p>
            <RevealText id="space-title" className="section-title" lines={['Arquitetura', 'que desacelera.']} />
          </div>
          <FadeUp delay={0.15}>
            <p className="lead">
              Materiais naturais, luz do dia e aberturas para o verde. Ambientes conceituais que mostram como um espaço
              de bem-estar pode ser percebido antes mesmo da primeira visita.
            </p>
          </FadeUp>
        </div>

        <ul role="list" className="space-grid">
          {spaces.map((s, i) => (
            <li key={s.id} className={`space-cell space-cell-${i + 1}`}>
              <button
                type="button"
                className="space-btn"
                onClick={() => {
                  setDir(1)
                  setOpen(i)
                }}
                aria-label={`Ampliar imagem: ${s.name}`}
              >
                <RevealImage
                  photo={s.photo}
                  className="space-img"
                  sizes={i === 0 ? '(max-width: 760px) 92vw, 58vw' : '(max-width: 760px) 92vw, 30vw'}
                  delay={(i % 3) * 0.1}
                  direction={i % 2 ? 'left' : 'up'}
                />
                <span className="space-zoom" aria-hidden="true">
                  <Maximize2 />
                </span>
              </button>
              <p className="space-caption">
                <span className="space-name">{s.name}</span>
                <span className="space-note">{s.note}</span>
              </p>
            </li>
          ))}
        </ul>
        <p className="space-credit muted">Ambientes conceituais com fotografias de banco de imagens licenciadas.</p>
      </div>

      <Dialog
        open={current !== null}
        onClose={() => setOpen(null)}
        title={current ? `${current.name}, imagem ${open! + 1} de ${spaces.length}` : 'Galeria'}
        hideTitle
        variant="full"
        className="lightbox"
        onKeyDown={onKey}
      >
        {current && (
          <div className="lightbox-inner">
            <div className="lightbox-stage">
              <AnimatePresence initial={false} custom={dir} mode="popLayout">
                <motion.div
                  key={current.id}
                  className="lightbox-figure"
                  custom={dir}
                  initial={{ opacity: 0, x: reduce ? 0 : dir * 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: reduce ? 0 : dir * -80 }}
                  transition={{ duration: 0.55, ease: easeOut }}
                  drag={reduce ? false : 'x'}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={onDragEnd}
                >
                  <SmartImage photo={current.photo} sizes="92vw" widths={[800, 1300, 1900, 2400]} priority />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="lightbox-bar">
              <div aria-live="polite">
                <p className="lightbox-name">{current.name}</p>
                <p className="lightbox-note">{current.note}</p>
              </div>
              <div className="lightbox-nav">
                <span className="lightbox-count">
                  {open! + 1} / {spaces.length}
                </span>
                <motion.button type="button" className="icon-btn" onClick={() => step(-1)} aria-label="Imagem anterior" whileTap={press}>
                  <ArrowLeft aria-hidden="true" />
                </motion.button>
                <motion.button type="button" className="icon-btn" onClick={() => step(1)} aria-label="Próxima imagem" whileTap={press}>
                  <ArrowRight aria-hidden="true" />
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </section>
  )
}
