import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Check, Copy, Info } from 'lucide-react'
import { Dialog } from './ui/Dialog'
import type { ConversationRequest } from '../lib/app-context'
import { press } from '../lib/motion'

/**
 * Modo demonstração do WhatsApp: exibido quando VITE_WHATSAPP_NUMBER não está configurado.
 * Mostra a mensagem que seria enviada, permite copiá-la e informa que o envio externo está desabilitado.
 */
export function ConversationDialog({ request, onClose }: { request: ConversationRequest | null; onClose: () => void }) {
  const [copied, setCopied] = useState<'idle' | 'ok' | 'error'>('idle')

  useEffect(() => {
    if (request) setCopied('idle')
  }, [request])

  const copy = async () => {
    if (!request) return
    try {
      await navigator.clipboard.writeText(request.message)
      setCopied('ok')
    } catch {
      setCopied('error')
    }
  }

  const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

  return (
    <Dialog open={Boolean(request)} onClose={onClose} title="Prévia da conversa" variant="center" className="convo">
      {request && (
        <div className="convo-body">
          <p className="convo-origin muted">Origem: {request.origin}</p>

          <div className="convo-phone" aria-label="Prévia da mensagem">
            <div className="convo-phone-head">
              <span className="convo-avatar" aria-hidden="true">
                A
              </span>
              <span>
                <strong>AURA</strong>
                <span className="convo-sub">Contato demonstrativo</span>
              </span>
            </div>
            <motion.div
              className="convo-bubble"
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <p>{request.message}</p>
              <span className="convo-time">{now}</span>
            </motion.div>
          </div>

          <p className="convo-notice" role="note">
            <Info aria-hidden="true" />
            <span>
              Envio externo desabilitado neste protótipo. Configure um número em <code>VITE_WHATSAPP_NUMBER</code> para
              abrir o WhatsApp com esta mensagem pré-preenchida.
            </span>
          </p>

          <div className="convo-actions">
            <motion.button type="button" className="btn btn-primary" onClick={copy} whileTap={press}>
              {copied === 'ok' ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
              {copied === 'ok' ? 'Mensagem copiada' : 'Copiar mensagem'}
            </motion.button>
            <button type="button" className="btn btn-text" onClick={onClose}>
              Voltar ao site
            </button>
          </div>
          <p className="sr-only" aria-live="polite">
            {copied === 'ok' ? 'Mensagem copiada para a área de transferência.' : ''}
            {copied === 'error' ? 'Não foi possível copiar. Selecione o texto da mensagem manualmente.' : ''}
          </p>
          {copied === 'error' && (
            <p className="convo-error">Não foi possível copiar automaticamente. Selecione o texto da mensagem acima.</p>
          )}
        </div>
      )}
    </Dialog>
  )
}
