import { motion } from 'motion/react'
import { MessageCircle, Clock, Users } from 'lucide-react'
import { experiences } from '../data/content'
import { Dialog } from './ui/Dialog'
import { SmartImage } from './ui/SmartImage'
import { useApp } from '../lib/app-context'
import { easeOut, press } from '../lib/motion'

export function ExperienceDrawer({ id, onClose }: { id: string | null; onClose: () => void }) {
  const exp = experiences.find((x) => x.id === id) ?? null
  const { startConversation } = useApp()

  return (
    <Dialog open={Boolean(exp)} onClose={onClose} title={exp?.title ?? 'Experiência'} variant="drawer" className="drawer">
      {exp && (
        <div className="drawer-body">
          <motion.div
            className="img-frame drawer-media"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: 1, ease: easeOut, delay: 0.2 }}
          >
            <SmartImage photo={exp.photo} sizes="(max-width: 640px) 100vw, 520px" widths={[480, 800, 1100]} />
          </motion.div>
          <p className="exp-cat">{exp.category}</p>
          <p className="drawer-summary">{exp.summary}</p>
          <p className="drawer-desc">{exp.description}</p>

          <dl className="drawer-meta">
            <div>
              <dt>
                <Users aria-hidden="true" /> Formato
              </dt>
              <dd>{exp.format}</dd>
            </div>
            <div>
              <dt>
                <Clock aria-hidden="true" /> Duração
              </dt>
              <dd>{exp.duration}</dd>
            </div>
          </dl>

          <h3 className="drawer-sub">O que esperar</h3>
          <ul role="list" className="drawer-benefits">
            {exp.benefits.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>

          <p className="drawer-note">
            Experiência demonstrativa de bem-estar. Não substitui acompanhamento ou tratamento de saúde.
          </p>

          <div className="drawer-actions">
            <motion.button
              type="button"
              className="btn btn-primary"
              whileTap={press}
              onClick={() =>
                startConversation({
                  message: `Olá, equipe AURA! Tenho interesse na experiência “${exp.title}” (${exp.category}). Podemos conversar sobre horários?`,
                  origin: `Experiência: ${exp.title}`,
                })
              }
            >
              <MessageCircle aria-hidden="true" />
              Conversar sobre esta experiência
            </motion.button>
          </div>
        </div>
      )}
    </Dialog>
  )
}
