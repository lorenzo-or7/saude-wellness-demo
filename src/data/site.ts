/**
 * Configuração da marca e do contato.
 * O número de WhatsApp é lido de VITE_WHATSAPP_NUMBER (somente dígitos, com DDI, ex.: 5511999999999).
 * Sem número configurado, o protótipo exibe a mensagem em modo demonstração e não abre links externos.
 */

const rawNumber = (import.meta.env.VITE_WHATSAPP_NUMBER ?? '') as string

export const site = {
  name: 'AURA',
  descriptor: 'Integrative Wellness',
  tagline: 'O equilíbrio começa dentro.',
  whatsappNumber: rawNumber.replace(/\D/g, ''),
  demoEmail: 'ola@aura.example',
  demoAddress: 'Endereço demonstrativo, Cidade exemplo',
  demoHours: 'Seg a sáb, horários ilustrativos',
}

export const nav = [
  { id: 'filosofia', label: 'Filosofia' },
  { id: 'experiencias', label: 'Experiências' },
  { id: 'jornada', label: 'Jornada' },
  { id: 'rituais', label: 'Rituais' },
  { id: 'equipe', label: 'Equipe' },
  { id: 'espaco', label: 'Espaço' },
  { id: 'faq', label: 'Dúvidas' },
]

export function buildWhatsAppUrl(message: string): string | null {
  if (!site.whatsappNumber) return null
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function unsplash(id: string, width: number, quality = 72): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=${quality}`
}
