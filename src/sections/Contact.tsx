import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { MessageCircle } from 'lucide-react'
import { photos } from '../data/content'
import { site } from '../data/site'
import { SmartImage } from '../components/ui/SmartImage'
import { RevealText, FadeUp } from '../components/ui/Reveal'
import { Magnetic } from '../components/ui/Magnetic'
import { defaultMessage, useApp } from '../lib/app-context'
import { press } from '../lib/motion'

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { startConversation } = useApp()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-12%', '0%'])
  const archScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.86, 1])

  return (
    <section ref={ref} id="contato" className="contact" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <motion.div className="contact-arch img-frame" style={{ scale: archScale }} aria-hidden="true">
          <motion.div style={{ y, height: '120%' }}>
            <SmartImage photo={photos.contact} sizes="(max-width: 860px) 80vw, 36vw" widths={[480, 800, 1200]} />
          </motion.div>
        </motion.div>

        <div className="contact-copy">
          <p className="kicker">Begin your journey</p>
          <RevealText
            id="contact-title"
            className="contact-title"
            lines={['Seu próximo capítulo', 'começa com você.']}
          />
          <FadeUp delay={0.2}>
            <p className="lead">
              Conte o que você procura e a equipe ajuda a escolher o primeiro passo. Sem pressa e sem compromisso.
            </p>
          </FadeUp>
          <FadeUp delay={0.3} className="contact-ctas">
            <Magnetic>
              <motion.button
                type="button"
                className="btn btn-primary contact-main"
                whileTap={press}
                onClick={() => startConversation({ message: defaultMessage, origin: 'Contato' })}
              >
                <MessageCircle aria-hidden="true" />
                Iniciar uma conversa
              </motion.button>
            </Magnetic>
            <motion.a href="#experiencias" className="btn btn-ghost" whileTap={press}>
              Explorar experiências
            </motion.a>
          </FadeUp>
          <p className="contact-status">
            <span className={`contact-dot ${site.whatsappNumber ? 'is-on' : ''}`} aria-hidden="true" />
            {site.whatsappNumber
              ? 'Abre o WhatsApp com uma mensagem pronta.'
              : 'Modo demonstração: a mensagem é exibida aqui e o envio externo está desabilitado.'}
          </p>
        </div>
      </div>
    </section>
  )
}
