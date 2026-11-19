import { motion, useReducedMotion } from 'motion/react'
import { Fragment, type ElementType, type ReactNode } from 'react'
import { easeOut, inViewOnce } from '../../lib/motion'
import { SmartImage } from './SmartImage'
import type { Photo } from '../../data/content'

interface RevealTextProps {
  /** Cada item do array vira uma linha mascarada. */
  lines: string[]
  as?: ElementType
  className?: string
  id?: string
  delay?: number
  /** Revelar ao montar (hero) em vez de ao entrar na viewport. */
  immediate?: boolean
  stagger?: number
}

/** Text Mask Reveal com stagger por palavra. */
export function RevealText({ lines, as: Tag = 'h2', className, id, delay = 0, immediate, stagger = 0.06 }: RevealTextProps) {
  const reduce = useReducedMotion()
  let index = 0
  const viewProps = immediate
    ? { initial: 'hidden', animate: 'show' }
    : { initial: 'hidden', whileInView: 'show', viewport: inViewOnce }

  return (
    <Tag className={className} id={id} aria-label={lines.join(' ')}>
      <motion.span style={{ display: 'block' }} {...viewProps} aria-hidden="true">
        {lines.map((line, li) => (
          <span className="mask-line" key={li}>
            {line.split(' ').map((word, wi) => {
              const i = index++
              const last = wi === line.split(' ').length - 1
              return (
                <Fragment key={wi}>
                <span className="mask-word">
                  <motion.span
                    className="mask-inner"
                    variants={{
                      hidden: reduce ? { opacity: 0 } : { y: '108%' },
                      show: reduce
                        ? { opacity: 1, transition: { duration: 0.4, delay: delay + i * 0.02 } }
                        : { y: '0%', transition: { duration: 1.05, ease: easeOut, delay: delay + i * stagger } },
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
                {/* Espaço fora da máscara: permite quebra natural em telas estreitas. */}
                {last ? null : ' '}
                </Fragment>
              )
            })}
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}

interface FadeUpProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'p' | 'section' | 'li'
}

/** Entrada discreta para blocos de apoio (sem exagero de deslocamento). */
export function FadeUp({ children, className, delay = 0, as = 'div' }: FadeUpProps) {
  const reduce = useReducedMotion()
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewOnce}
      transition={{ duration: 0.9, ease: easeOut, delay }}
    >
      {children}
    </M>
  )
}

interface RevealImageProps {
  photo: Photo
  sizes: string
  className?: string
  delay?: number
  priority?: boolean
  direction?: 'up' | 'left' | 'right'
}

/** Editorial Image Reveal: máscara (clip-path) + leve escala da fotografia. */
export function RevealImage({ photo, sizes, className = '', delay = 0, priority, direction = 'up' }: RevealImageProps) {
  const reduce = useReducedMotion()
  const from =
    direction === 'left' ? 'inset(0% 100% 0% 0%)' : direction === 'right' ? 'inset(0% 0% 0% 100%)' : 'inset(100% 0% 0% 0%)'
  return (
    <motion.div
      className={`img-frame ${className}`}
      initial={reduce ? { opacity: 0 } : { clipPath: from }}
      whileInView={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={inViewOnce}
      transition={{ duration: reduce ? 0.4 : 1.3, ease: easeOut, delay }}
    >
      <motion.div
        style={{ width: '100%', height: '100%' }}
        initial={reduce ? false : { scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={inViewOnce}
        transition={{ duration: 1.8, ease: easeOut, delay }}
      >
        <SmartImage photo={photo} sizes={sizes} priority={priority} />
      </motion.div>
    </motion.div>
  )
}
