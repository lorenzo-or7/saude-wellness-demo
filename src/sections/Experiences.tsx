import { motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react'
import { experiences } from '../data/content'
import { RevealImage, RevealText } from '../components/ui/Reveal'
import { useApp } from '../lib/app-context'
import { easeOut, press } from '../lib/motion'

export function Experiences() {
  const rail = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)
  // Destino pendente durante o scroll suave: permite cliques/teclas rápidos sem perder passos.
  const target = useRef<number | null>(null)
  const reduce = useReducedMotion()
  const { openExperience } = useApp()

  const items = () => Array.from(rail.current?.children ?? []) as HTMLElement[]

  const scrollToIndex = useCallback(
    (i: number) => {
      const el = rail.current
      const target = items()[i]
      if (!el || !target) return
      el.scrollTo({ left: target.offsetLeft - el.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft || '0'), behavior: reduce ? 'auto' : 'smooth' })
    },
    [reduce],
  )

  useEffect(() => {
    const el = rail.current
    if (!el) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const list = items()
        if (!list.length) return
        const pad = parseFloat(getComputedStyle(el).paddingLeft || '0')
        const anchor = el.getBoundingClientRect().left + pad
        let best = 0
        let bestDist = Infinity
        list.forEach((node, i) => {
          const d = Math.abs(node.getBoundingClientRect().left - anchor)
          if (d < bestDist) {
            bestDist = d
            best = i
          }
        })
        // No fim do trilho, o último item visível passa a ser o ativo.
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) best = list.length - 1
        if (target.current === best) target.current = null
        setActive(best)
      })
    }
    const onScrollEnd = () => {
      target.current = null
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    el.addEventListener('scrollend', onScrollEnd)
    return () => {
      el.removeEventListener('scroll', onScroll)
      el.removeEventListener('scrollend', onScrollEnd)
      cancelAnimationFrame(frame)
    }
  }, [])

  const go = (dir: 1 | -1) => {
    const next = Math.min(experiences.length - 1, Math.max(0, (target.current ?? active) + dir))
    target.current = next
    scrollToIndex(next)
  }

  const onRailKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(-1)
    } else if (e.key === 'Home') {
      e.preventDefault()
      scrollToIndex(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      scrollToIndex(experiences.length - 1)
    }
  }

  return (
    <section id="experiencias" className="exp" aria-labelledby="exp-title">
      <div className="container exp-head">
        <div className="exp-head-main">
          <p className="kicker">The wellness collection</p>
          <RevealText id="exp-title" className="section-title" lines={['Experiências para', 'cada momento.']} />
        </div>
        <div className="exp-head-side">
          <p className="muted exp-head-note">
            Seis caminhos para começar. Descrições, formatos e durações são demonstrativos e podem ser adaptados a cada
            espaço.
          </p>
          <ul role="list" className="exp-index" aria-label="Categorias">
            {experiences.map((x, i) => (
              <li key={x.id}>
                <button
                  type="button"
                  className={`exp-index-btn ${i === active ? 'is-active' : ''}`}
                  aria-current={i === active ? 'true' : undefined}
                  onClick={() => scrollToIndex(i)}
                >
                  {x.category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="exp-rail-wrap"
        role="region"
        aria-roledescription="carrossel"
        aria-label="Catálogo de experiências. Use as setas esquerda e direita para navegar."
        onKeyDown={onRailKey}
      >
        <ul ref={rail} role="list" className="exp-rail" tabIndex={0}>
          {experiences.map((x, i) => {
            const isActive = i === active
            return (
              <li
                key={x.id}
                className={`exp-item ${isActive ? 'is-active' : ''}`}
                aria-roledescription="slide"
                aria-label={`${i + 1} de ${experiences.length}: ${x.category}`}
              >
                <article>
                  <button
                    type="button"
                    className="exp-media-btn"
                    onClick={() => openExperience(x.id)}
                    aria-label={`Ver detalhes de ${x.title}, ${x.category}`}
                    tabIndex={-1}
                  >
                    <RevealImage
                      photo={x.photo}
                      className="exp-media"
                      sizes="(max-width: 640px) 80vw, (max-width: 1100px) 46vw, 30vw"
                      delay={Math.min(i, 3) * 0.12}
                    />
                  </button>
                  <motion.div
                    className="exp-body"
                    animate={{ opacity: isActive ? 1 : 0.62 }}
                    transition={{ duration: reduce ? 0 : 0.5, ease: easeOut }}
                  >
                    <p className="exp-cat">{x.category}</p>
                    <h3 className="exp-title">{x.title}</h3>
                    <p className="exp-summary">{x.summary}</p>
                    <motion.button
                      type="button"
                      className="btn btn-ghost btn-sm exp-cta"
                      onClick={() => openExperience(x.id)}
                      whileTap={press}
                    >
                      <Plus aria-hidden="true" />
                      Ver detalhes
                    </motion.button>
                  </motion.div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="container exp-controls">
        <p className="exp-counter" aria-live="polite">
          <span className="exp-counter-now">{String(active + 1).padStart(2, '0')}</span>
          <span className="exp-counter-sep" aria-hidden="true" />
          <span className="muted">{String(experiences.length).padStart(2, '0')}</span>
          <span className="sr-only">: {experiences[active].category}</span>
        </p>
        <div className="exp-progress" aria-hidden="true">
          <motion.span
            animate={{ scaleX: (active + 1) / experiences.length }}
            transition={{ duration: reduce ? 0 : 0.6, ease: easeOut }}
          />
        </div>
        <div className="exp-arrows">
          <motion.button type="button" className="icon-btn" onClick={() => go(-1)} disabled={active === 0} aria-label="Experiência anterior" whileTap={press}>
            <ArrowLeft aria-hidden="true" />
          </motion.button>
          <motion.button
            type="button"
            className="icon-btn"
            onClick={() => go(1)}
            disabled={active === experiences.length - 1}
            aria-label="Próxima experiência"
            whileTap={press}
          >
            <ArrowRight aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </section>
  )
}
