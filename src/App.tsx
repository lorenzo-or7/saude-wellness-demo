import { MotionConfig } from 'motion/react'
import { useCallback, useMemo, useState } from 'react'
import { Navbar } from './sections/Navbar'
import { Hero } from './sections/Hero'
import { Philosophy } from './sections/Philosophy'
import { Experiences } from './sections/Experiences'
import { Discovery } from './sections/Discovery'
import { Rituals } from './sections/Rituals'
import { Team } from './sections/Team'
import { Space } from './sections/Space'
import { Testimonials } from './sections/Testimonials'
import { Faq } from './sections/Faq'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
import { ExperienceDrawer } from './components/ExperienceDrawer'
import { ConversationDialog } from './components/ConversationDialog'
import { AppContext, type ConversationRequest } from './lib/app-context'
import { buildWhatsAppUrl } from './data/site'

export default function App() {
  const [experienceId, setExperienceId] = useState<string | null>(null)
  const [conversation, setConversation] = useState<ConversationRequest | null>(null)

  const startConversation = useCallback((req: ConversationRequest) => {
    const url = buildWhatsAppUrl(req.message)
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
      return
    }
    setConversation(req)
  }, [])

  const actions = useMemo(
    () => ({ openExperience: setExperienceId, startConversation }),
    [startConversation],
  )

  return (
    <MotionConfig reducedMotion="user">
      <AppContext.Provider value={actions}>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <Navbar />
        <main id="conteudo" tabIndex={-1}>
          <Hero />
          <Philosophy />
          <Experiences />
          <Discovery />
          <Rituals />
          <Team />
          <Space />
          <Testimonials />
          <Faq />
          <Contact />
        </main>
        <Footer />
        <ExperienceDrawer id={experienceId} onClose={() => setExperienceId(null)} />
        <ConversationDialog request={conversation} onClose={() => setConversation(null)} />
      </AppContext.Provider>
    </MotionConfig>
  )
}
