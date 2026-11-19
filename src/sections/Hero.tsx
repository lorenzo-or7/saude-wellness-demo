import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { photos } from '../data/content'
import { SmartImage } from '../components/ui/SmartImage'
import { RevealText } from '../components/ui/Reveal'
import { Magnetic } from '../components/ui/Magnetic'
import { easeOut, press } from '../lib/motion'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '14%'])
  const detailY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '-38%'])
  const copyY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '-10%'])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 0.15])
  const lineScale = useTransform(scrollYProgress, [0, 0.6], [0.12, 1])

  return (
    <section ref={ref} id="topo" className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <motion.div className="hero-copy" style={{ y: copyY, opacity: copyOpacity }}>
          <motion.p
            className="hero-brandline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            AURA Integrative Wellness
          </motion.p>

          <RevealText
            as="h1"
            id="hero-title"
            className="hero-title"
            lines={['O equilíbrio', 'começa dentro.']}
            immediate
            delay={0.35}
            stagger={0.09}
          />

          <motion.p
            className="hero-lead"
            initial={{ opacity: 0, y: reduce ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeOut, delay: 1.05 }}
          >
            Um novo olhar sobre o cuidado, o movimento e o bem-estar.
          </motion.p>

          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: reduce ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeOut, delay: 1.2 }}
          >
            <Magnetic>
              <motion.a href="#experiencias" className="btn btn-primary" whileTap={press}>
                Explorar experiências
              </motion.a>
            </Magnetic>
            <motion.a href="#filosofia" className="btn btn-text" whileTap={press}>
              Conhecer nossa filosofia
            </motion.a>
          </motion.div>
        </motion.div>

        <div className="hero-visual">
          <motion.div
            className="hero-arch img-frame"
            initial={reduce ? { opacity: 0 } : { clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: 1.6, ease: easeOut, delay: 0.15 }}
          >
            <motion.div
              className="hero-arch-inner"
              style={{ y: imgY }}
              initial={reduce ? false : { scale: 1.28 }}
              animate={{ scale: 1.08 }}
              transition={{ duration: 2.4, ease: easeOut, delay: 0.15 }}
            >
              <SmartImage photo={photos.heroMain} sizes="(max-width: 860px) 92vw, 42vw" priority widths={[600, 900, 1300, 1800]} />
            </motion.div>
          </motion.div>

          <motion.figure className="hero-detail" style={{ y: detailY }}>
            <motion.div
              className="img-frame hero-detail-img"
              initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0% 100% 0% 0%)' }}
              animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ duration: 1.3, ease: easeOut, delay: 1.1 }}
            >
              <SmartImage photo={photos.heroDetail} sizes="(max-width: 860px) 40vw, 16vw" widths={[320, 480, 720]} />
            </motion.div>
            <motion.figcaption
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
            >
              Luz, silêncio e tempo.
            </motion.figcaption>
          </motion.figure>

          <svg className="hero-curve" viewBox="0 0 400 400" aria-hidden="true">
            <motion.path
              d="M20 360 C 90 250, 120 120, 250 90 S 390 40, 380 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              initial={{ pathLength: reduce ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.4, ease: easeOut, delay: 0.8 }}
            />
          </svg>
        </div>

        <motion.div
          className="hero-foot"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <a href="#filosofia" className="scroll-cue">
            <span className="scroll-cue-track" aria-hidden="true">
              <motion.span className="scroll-cue-fill" style={{ scaleY: lineScale }} />
            </span>
            <span>Role para explorar</span>
          </a>
          <span className="demo-tag">Marca fictícia em protótipo conceitual</span>
        </motion.div>
      </div>
    </section>
  )
}
