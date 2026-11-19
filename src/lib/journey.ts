import { experiences, journey, type Experience, type Tag } from '../data/content'

export type Answers = Record<string, string>

const weights: Record<string, number> = { aspecto: 3, ritmo: 1.5, tipo: 2, inicio: 0.5 }

export interface Suggestion {
  experience: Experience
  score: number
  reasons: string[]
}

/**
 * Sugere experiências do catálogo por afinidade de preferências.
 * Não é avaliação de saúde: apenas cruza preferências de formato e interesse com as tags do catálogo.
 */
export function suggest(answers: Answers, limit = 3): Suggestion[] {
  const scored = experiences.map((experience) => {
    let score = 0
    const reasons: string[] = []
    journey.forEach((step) => {
      const opt = step.options.find((o) => o.id === answers[step.id])
      if (!opt) return
      const hits = opt.tags.filter((t: Tag) => experience.tags.includes(t)).length
      if (hits > 0) {
        score += hits * (weights[step.id] ?? 1)
        if (step.id !== 'inicio') reasons.push(opt.label)
      }
    })
    return { experience, score, reasons }
  })

  const ranked = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score)
  if (ranked.length) return ranked.slice(0, limit)
  // Sem afinidade: sugere o percurso mais abrangente.
  return scored.filter((s) => s.experience.id === 'programas-bem-estar' || s.experience.id === 'autocuidado-personalizado')
}

export function labelFor(stepId: string, answers: Answers): string {
  const step = journey.find((s) => s.id === stepId)
  return step?.options.find((o) => o.id === answers[stepId])?.label ?? ''
}

export function journeyMessage(answers: Answers, picks: Suggestion[]): string {
  const names = picks.map((p) => p.experience.title).join(', ')
  return [
    'Olá, equipe AURA! Fiz a jornada “Descubra sua jornada” no site.',
    `Quero explorar: ${labelFor('aspecto', answers).toLowerCase()}.`,
    `Ritmo: ${labelFor('ritmo', answers).toLowerCase()}.`,
    `Prefiro experiências: ${labelFor('tipo', answers).toLowerCase()}.`,
    `Gostaria de começar ${labelFor('inicio', answers).toLowerCase()}.`,
    names ? `As sugestões foram: ${names}. Podemos conversar?` : 'Podemos conversar?',
  ].join(' ')
}

export const startHint: Record<string, string> = {
  conversa: 'Uma conversa curta com a equipe ajuda a escolher entre as sugestões, sem compromisso.',
  avulsa: 'Você pode começar por uma das sugestões de forma avulsa e decidir os próximos passos depois.',
  visita: 'Uma visita ao espaço é um bom primeiro passo: conhecer os ambientes antes de escolher.',
}
