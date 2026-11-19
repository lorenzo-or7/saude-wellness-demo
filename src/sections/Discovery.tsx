import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Check, MessageCircle, RotateCcw } from 'lucide-react'
import { journey } from '../data/content'
import { journeyMessage, labelFor, startHint, suggest, type Answers } from '../lib/journey'
import { SmartImage } from '../components/ui/SmartImage'
import { RevealText } from '../components/ui/Reveal'
import { useApp } from '../lib/app-context'
import { easeOut, press } from '../lib/motion'

const TOTAL = journey.length

export function Discovery() {
  // Respostas mantidas apenas em memória: nada é salvo ou enviado.
  const [answers, setAnswers] = useState<Answers>({})
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const reduce = useReducedMotion()
  const headingRef = useRef<HTMLHeadingElement>(null)
  const advanceTimer = useRef<number | undefined>(undefined)
  const firstRender = useRef(true)
  const { openExperience, startConversation } = useApp()

  const done = step >= TOTAL
  const current = journey[Math.min(step, TOTAL - 1)]

  useEffect(() => () => window.clearTimeout(advanceTimer.current), [])

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    // Move o foco para o novo título da etapa (anúncio por leitores de tela).
    const t = window.setTimeout(() => headingRef.current?.focus({ preventScroll: true }), reduce ? 0 : 420)
    return () => window.clearTimeout(t)
  }, [step, reduce])

  const goto = (n: number) => {
    window.clearTimeout(advanceTimer.current)
    setDir(n > step ? 1 : -1)
    setStep(n)
  }

  const choose = (optionId: string) => {
    setAnswers((a) => ({ ...a, [current.id]: optionId }))
    window.clearTimeout(advanceTimer.current)
    advanceTimer.current = window.setTimeout(() => goto(step + 1), reduce ? 120 : 380)
  }

  const restart = () => {
    setAnswers({})
    goto(0)
  }

  const picks = done ? suggest(answers) : []

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * -40 }),
  }

  return (
    <section id="jornada" className="disc" aria-labelledby="disc-title">
      <div className="container">
        <div className="disc-shell">
          <aside className="disc-aside">
            <p className="kicker">Wellness discovery</p>
            <RevealText id="disc-title" className="disc-title" lines={['Descubra sua', 'jornada.']} />
            <p className="disc-intro">
              Quatro perguntas rápidas sobre preferências e rotina. No final, sugerimos experiências do catálogo que
              combinam com você.
            </p>

            <ol className="disc-steps" aria-label="Progresso">
              {journey.map((s, i) => {
                const state = done || i < step ? 'done' : i === step ? 'current' : 'todo'
                const answered = Boolean(answers[s.id])
                return (
                  <li key={s.id} className={`disc-step is-${state}`}>
                    <button
                      type="button"
                      onClick={() => goto(i)}
                      disabled={!answered && i !== step && !(i < step)}
                      aria-current={state === 'current' ? 'step' : undefined}
                    >
                      <span className="disc-step-dot" aria-hidden="true">
                        {state === 'done' ? <Check /> : i + 1}
                      </span>
                      <span className="disc-step-label">
                        <span className="sr-only">Etapa {i + 1}: </span>
                        {answered ? labelFor(s.id, answers) : s.question}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>

            <p className="disc-disclaimer">
              Sugestões de bem-estar, não uma avaliação de saúde. Nenhuma resposta é armazenada.
            </p>
          </aside>

          <div className="disc-stage">
            <div className="disc-bar" aria-hidden="true">
              <motion.span
                animate={{ scaleX: Math.min(step, TOTAL) / TOTAL }}
                transition={{ duration: reduce ? 0 : 0.7, ease: easeOut }}
              />
            </div>

            <AnimatePresence mode="wait" custom={dir} initial={false}>
              {!done ? (
                <motion.div
                  key={current.id}
                  className="disc-q"
                  custom={dir}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: easeOut }}
                >
                  <p className="disc-count">
                    Pergunta {step + 1} de {TOTAL}
                  </p>
                  <h3 className="disc-question" tabIndex={-1} ref={headingRef}>
                    {current.question}
                  </h3>
                  <div className="disc-options" role="group" aria-label={current.question}>
                    {current.options.map((o) => {
                      const selected = answers[current.id] === o.id
                      return (
                        <motion.button
                          key={o.id}
                          type="button"
                          className={`disc-option ${selected ? 'is-selected' : ''}`}
                          aria-pressed={selected}
                          onClick={() => choose(o.id)}
                          whileTap={press}
                        >
                          <span className="disc-option-label">{o.label}</span>
                          <span className="disc-option-hint">{o.hint}</span>
                          <span className="disc-option-check" aria-hidden="true">
                            {selected && <Check />}
                          </span>
                        </motion.button>
                      )
                    })}
                  </div>
                  <div className="disc-nav">
                    <button type="button" className="btn btn-text" onClick={() => goto(step - 1)} disabled={step === 0}>
                      <ArrowLeft aria-hidden="true" />
                      Voltar
                    </button>
                    {answers[current.id] && (
                      <button type="button" className="btn btn-ghost btn-sm" onClick={() => goto(step + 1)}>
                        Continuar
                      </button>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  className="disc-result"
                  custom={dir}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: easeOut }}
                >
                  <p className="disc-count">Sua seleção</p>
                  <h3 className="disc-question" tabIndex={-1} ref={headingRef}>
                    Experiências que combinam com você.
                  </h3>
                  <p className="disc-result-hint">{startHint[answers.inicio] ?? ''}</p>

                  <ol className="disc-picks">
                    {picks.map((p, i) => (
                      <motion.li
                        key={p.experience.id}
                        initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: easeOut, delay: 0.15 + i * 0.1 }}
                        className={`disc-pick ${i === 0 ? 'is-first' : ''}`}
                      >
                        <div className="img-frame disc-pick-img">
                          <SmartImage photo={p.experience.photo} sizes="(max-width: 640px) 30vw, 180px" widths={[240, 400]} />
                        </div>
                        <div className="disc-pick-body">
                          <p className="exp-cat">{p.experience.category}</p>
                          <h4>{p.experience.title}</h4>
                          {p.reasons.length > 0 && (
                            <p className="disc-pick-why">Combina com: {p.reasons.join(', ').toLowerCase()}</p>
                          )}
                          <button type="button" className="btn btn-text disc-pick-link" onClick={() => openExperience(p.experience.id)}>
                            Ver detalhes
                          </button>
                        </div>
                      </motion.li>
                    ))}
                  </ol>

                  <div className="disc-result-actions">
                    <motion.button
                      type="button"
                      className="btn btn-primary"
                      whileTap={press}
                      onClick={() => startConversation({ message: journeyMessage(answers, picks), origin: 'Descubra sua jornada' })}
                    >
                      <MessageCircle aria-hidden="true" />
                      Conversar pelo WhatsApp
                    </motion.button>
                    <button type="button" className="btn btn-text" onClick={() => goto(TOTAL - 1)}>
                      <ArrowLeft aria-hidden="true" />
                      Voltar
                    </button>
                    <button type="button" className="btn btn-text" onClick={restart}>
                      <RotateCcw aria-hidden="true" />
                      Refazer jornada
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
