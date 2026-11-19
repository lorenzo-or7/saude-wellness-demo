import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { team } from '../data/content'
import { SmartImage } from '../components/ui/SmartImage'
import { RevealText } from '../components/ui/Reveal'
import { useApp } from '../lib/app-context'
import { easeOut, press } from '../lib/motion'

export function Team() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const { startConversation } = useApp()
  const person = team[active]

  return (
    <section id="equipe" className="team" aria-labelledby="team-title">
      <div className="container team-grid">
        <div className="team-head">
          <p className="kicker">People behind the care</p>
          <RevealText id="team-title" className="section-title" lines={['Quem conduz', 'cada experiência.']} />
          <p className="team-note">
            <span className="demo-tag">Perfis demonstrativos</span>
            <span className="muted">Nomes, fotos e apresentações ilustram como a equipe real pode ser apresentada.</span>
          </p>
        </div>

        <div className="team-portrait" aria-hidden="true">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={person.id}
              className="img-frame team-portrait-img"
              initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
              animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
              exit={reduce ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.9, ease: easeOut }}
            >
              <motion.div
                style={{ height: '100%' }}
                initial={reduce ? false : { scale: 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.4, ease: easeOut }}
              >
                <SmartImage photo={person.photo} sizes="(max-width: 860px) 70vw, 34vw" widths={[480, 800, 1100]} />
              </motion.div>
            </motion.div>
          </AnimatePresence>
          <span className="team-portrait-tag">Foto ilustrativa</span>
        </div>

        <ul role="list" className="team-list">
          {team.map((p, i) => {
            const isActive = i === active
            return (
              <li key={p.id} className={`team-row ${isActive ? 'is-active' : ''}`}>
                <h3>
                  <button
                    type="button"
                    className="team-row-btn"
                    aria-expanded={isActive}
                    aria-controls={`team-detail-${p.id}`}
                    onClick={() => setActive(i)}
                  >
                    <span className="team-name">{p.name}</span>
                    <span className="team-area">{p.area}</span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      id={`team-detail-${p.id}`}
                      className="team-detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.55, ease: easeOut }}
                    >
                      <div className="team-detail-inner">
                        <div className="img-frame team-mobile-photo" aria-hidden="true">
                          <SmartImage photo={p.photo} sizes="40vw" widths={[320, 480]} />
                        </div>
                        <div>
                          <p>{p.bio}</p>
                          <motion.button
                            type="button"
                            className="btn btn-text team-cta"
                            whileTap={press}
                            onClick={() =>
                              startConversation({
                                message: `Olá, equipe AURA! Gostaria de conversar com ${p.name} sobre ${p.area.toLowerCase()}.`,
                                origin: `Equipe: ${p.name}`,
                              })
                            }
                          >
                            <MessageCircle aria-hidden="true" />
                            Conversar com {p.name.split(' ')[0]}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
