import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { rituals } from '../data/content'
import { RevealImage, RevealText, FadeUp } from '../components/ui/Reveal'
import { Breathing } from '../components/Breathing'

const speeds = [-6, 8, -10, 5]

function RitualFigure({ r, i }: { r: (typeof rituals)[number]; i: number }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : [`${speeds[i]}%`, `${-speeds[i]}%`])
  return (
    <motion.figure ref={ref} className={`ritual ritual-${i + 1}`} style={{ y }}>
      <RevealImage photo={r.photo} className="ritual-img" sizes="(max-width: 640px) 46vw, 24vw" delay={i * 0.08} />
      <figcaption>
        <span className="ritual-name">{r.name}</span>
        <span className="ritual-line">{r.line}</span>
      </figcaption>
    </motion.figure>
  )
}

export function Rituals() {
  return (
    <section id="rituais" className="rituals" aria-labelledby="rituals-title">
      <div className="container">
        <div className="rituals-head">
          <p className="kicker">The slow moments</p>
          <RevealText id="rituals-title" className="section-title" lines={['Pequenos rituais,', 'grandes pausas.']} />
          <FadeUp delay={0.15}>
            <p className="rituals-lead">
              O autocuidado também mora nos intervalos. Uma respiração mais longa, um chá sem pressa, um alongamento ao
              acordar. É neles que a AURA se inspira.
            </p>
          </FadeUp>
        </div>

        <div className="rituals-strip">
          {rituals.map((r, i) => (
            <RitualFigure key={r.id} r={r} i={i} />
          ))}
        </div>

        <Breathing />
      </div>
    </section>
  )
}
