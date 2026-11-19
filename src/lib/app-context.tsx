import { createContext, useContext } from 'react'

export interface ConversationRequest {
  /** Mensagem pré-preenchida para o WhatsApp. */
  message: string
  /** De onde veio a solicitação (exibido no modo demonstração). */
  origin: string
}

interface AppActions {
  openExperience: (id: string) => void
  startConversation: (req: ConversationRequest) => void
}

export const AppContext = createContext<AppActions | null>(null)

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp precisa estar dentro de AppContext')
  return ctx
}

export const defaultMessage =
  'Olá, equipe AURA! Vi o site e gostaria de conversar sobre as experiências de bem-estar.'
