import { motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Pause, Play, Square } from 'lucide-react'
import { press } from '../lib/motion'

type Status = 'idle' | 'running' | 'paused'

const IN = 4000
const HOLD = 1500
const OUT = 5500
const CYCLE = IN + HOLD + OUT
const MIN = 0.62

const ease = (p: number) => 0.5 - Math.cos(Math.PI * p) / 2

function phaseAt(elapsed: number) {
  const t = elapsed % CYCLE
  if (t < IN) return { name: 'Inspire', scale: MIN + (1 - MIN) * ease(t / IN), left: IN - t }
  if (t < IN + HOLD) return { name: 'Sustente', scale: 1, left: IN + HOLD - t }
  const p = (t - IN - HOLD) / OUT
  return { name: 'Solte', scale: 1 - (1 - MIN) * ease(p), left: CYCLE - t }
}

/**
 * Ritmo visual de respiração: forma orgânica que expande e contrai.
 * Recurso de pausa e bem-estar; não é exercício terapêutico.
 */
export function Breathing() {
  const prefersReduced = useReducedMotion()
  const [status, setStatus] = useState<Status>('idle')
  const [animateShape, setAnimateShape] = useState(true)
  const [phase, setPhase] = useState('Pronto')
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null)
  const [cycle, setCycle] = useState(0)
  const scale = useMotionValue(MIN)
  const rotate = useTransform(scale, [MIN, 1], [0, 14])
  const innerScale = useTransform(scale, [MIN, 1], [0.78, 1])
  const elapsed = useRef(0)
  const last = useRef<number | null>(null)
  const frame = useRef(0)
  // Com preferência do sistema por menos movimento, começa desligado; a pessoa pode religar.
  const motionOn = animateShape

  useEffect(() => {
    if (prefersReduced) setAnimateShape(false)
  }, [prefersReduced])

  useEffect(() => {
    if (status !== 'running') {
      last.current = null
      return
    }
    const tick = (now: number) => {
      if (last.current !== null) elapsed.current += now - last.current
      last.current = now
      const ph = phaseAt(elapsed.current)
      scale.set(motionOn ? ph.scale : 0.86)
      setPhase((p) => (p === ph.name ? p : ph.name))
      setSecondsLeft(Math.ceil(ph.left / 1000))
      setCycle(Math.floor(elapsed.current / CYCLE) + 1)
      frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [status, motionOn, scale])

  const start = () => setStatus('running')
  const pause = () => {
    setStatus('paused')
    setPhase('Em pausa')
  }
  const stop = () => {
    setStatus('idle')
    elapsed.current = 0
    scale.set(MIN)
    setPhase('Pronto')
    setSecondsLeft(null)
    setCycle(0)
  }

  return (
    <div className="breath" aria-labelledby="breath-title">
      <div className="breath-visual" aria-hidden="true">
        <motion.svg viewBox="0 0 400 400" className="breath-shape" style={{ scale: motionOn ? scale : 0.86, rotate: motionOn ? rotate : 0 }}>
          <path
            className="breath-outer"
            d="M214 30c66 8 122 50 142 112 18 56-2 122-48 162-48 42-124 62-184 34C66 312 26 248 30 180c4-62 40-116 94-138 28-11 58-15 90-12Z"
          />
        </motion.svg>
        <motion.svg viewBox="0 0 400 400" className="breath-shape breath-shape-inner" style={{ scale: motionOn ? innerScale : 0.9 }}>
          <path
            className="breath-inner"
            d="M190 88c44-8 92 10 114 50 22 40 14 96-20 128-32 32-88 44-128 22-38-20-58-66-52-108 6-46 42-84 86-92Z"
          />
        </motion.svg>
        <div className="breath-readout">
          <span className="breath-phase">{phase}</span>
          {secondsLeft !== null && status === 'running' && <span className="breath-secs">{secondsLeft}</span>}
        </div>
      </div>

      <div className="breath-panel">
        <h3 id="breath-title" className="breath-title">
          Um minuto para respirar
        </h3>
        <p className="breath-copy">
          Acompanhe a forma: ela cresce enquanto você inspira e se recolhe quando você solta o ar. Se preferir, desligue a
          animação e siga apenas o texto.
        </p>

        <p className="sr-only" aria-live="polite">
          {status === 'running' ? phase : status === 'paused' ? 'Em pausa' : ''}
        </p>

        <div className="breath-controls">
          {status !== 'running' ? (
            <motion.button type="button" className="btn btn-primary breath-btn" onClick={start} whileTap={press}>
              <Play aria-hidden="true" />
              {status === 'paused' ? 'Retomar' : 'Iniciar'}
            </motion.button>
          ) : (
            <motion.button type="button" className="btn btn-primary breath-btn" onClick={pause} whileTap={press}>
              <Pause aria-hidden="true" />
              Pausar
            </motion.button>
          )}
          <motion.button type="button" className="btn btn-ghost breath-btn" onClick={stop} disabled={status === 'idle'} whileTap={press}>
            <Square aria-hidden="true" />
            Parar
          </motion.button>
        </div>

        <label className="switch">
          <input
            type="checkbox"
            role="switch"
            checked={animateShape}
            onChange={(e) => setAnimateShape(e.target.checked)}
            aria-describedby={prefersReduced ? 'breath-sys' : undefined}
          />
          <span className="switch-track" aria-hidden="true">
            <span className="switch-thumb" />
          </span>
          <span>Animar a forma</span>
        </label>
        {prefersReduced && (
          <p id="breath-sys" className="breath-small">
            Seu sistema pede menos movimento, por isso a animação começa desligada. O ritmo continua no texto.
          </p>
        )}
        {cycle > 0 && <p className="breath-small">Ciclo {cycle}</p>}

        <p className="breath-disclaimer">
          Recurso visual de pausa, sem finalidade terapêutica. Interrompa se sentir qualquer desconforto.
        </p>
      </div>
    </div>
  )
}
