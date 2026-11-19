/**
 * Conteúdo centralizado do protótipo AURA.
 * Todo o conteúdo é demonstrativo: marca, equipe, depoimentos e contatos são fictícios.
 * Para adaptar a um cliente real, substitua os dados deste arquivo e de `site.ts`.
 *
 * Fotografias: Unsplash (Licença Unsplash — uso comercial gratuito, sem atribuição obrigatória).
 */

export type Tag =
  | 'move'
  | 'rest'
  | 'nourish'
  | 'mind'
  | 'care'
  | 'light'
  | 'weekly'
  | 'program'
  | 'solo'
  | 'group'
  | 'sensory'
  | 'active'

export interface Photo {
  id: string
  alt: string
  /** Proporção natural aproximada (largura / altura) para evitar layout shift. */
  ratio?: number
  /** Ponto focal para object-position. */
  focus?: string
}

export interface Experience {
  id: string
  category: string
  title: string
  summary: string
  description: string
  benefits: string[]
  format: string
  duration: string
  photo: Photo
  tags: Tag[]
}

export const photos = {
  heroMain: {
    id: '1667061481921-b31e615ae740',
    alt: 'Mulher em postura de alongamento sobre um tapete, em uma sala clara com luminárias de papel',
    focus: '50% 60%',
  },
  heroDetail: {
    id: '1573235670775-937074414ed4',
    alt: 'Sombra de uma planta projetada em uma parede clara pela luz do sol',
    focus: '60% 40%',
  },
  contact: {
    id: '1728509807162-8941c3b10fa4',
    alt: 'Sombra de folhas de palmeira sobre uma parede iluminada',
    focus: '50% 50%',
  },
} satisfies Record<string, Photo>

export const pillars = [
  {
    id: 'corpo',
    name: 'Corpo',
    theme: 'movimento e vitalidade',
    text: 'Movimentos conscientes, no seu tempo. Experiências que convidam a perceber o corpo com atenção, sem comparação e sem pressa.',
    detail: 'Práticas guiadas, mobilidade e respiração em ambientes amplos e iluminados.',
    photo: {
      id: '1687783615494-b4a1f1af8b58',
      alt: 'Sala ampla de práticas com tapetes de yoga alinhados sobre piso de madeira',
      focus: '50% 60%',
    },
  },
  {
    id: 'mente',
    name: 'Mente',
    theme: 'presença e equilíbrio',
    text: 'Espaço para desacelerar. Momentos de silêncio e atenção que ajudam a criar pausas reais no meio da rotina.',
    detail: 'Encontros de presença, práticas contemplativas e salas pensadas para o silêncio.',
    photo: {
      id: '1749642955698-ebe5e4579034',
      alt: 'Sala de meditação com almofadas no chão e painéis de luz filtrada',
      focus: '50% 60%',
    },
  },
  {
    id: 'rotina',
    name: 'Rotina',
    theme: 'hábitos e autocuidado',
    text: 'Pequenos rituais que cabem na vida. Conversas e experiências para construir hábitos possíveis, do seu jeito.',
    detail: 'Encontros sobre alimentação consciente, descanso e organização do autocuidado.',
    photo: {
      id: '1631682477691-9021a9218860',
      alt: 'Duas pequenas xícaras de chá sobre uma mesa de madeira',
      focus: '50% 50%',
    },
  },
] as const

export const experiences: Experience[] = [
  {
    id: 'movimento-consciente',
    category: 'Movimento consciente',
    title: 'Corpo em presença',
    summary: 'Práticas guiadas de mobilidade, alongamento e respiração em pequenos grupos.',
    description:
      'Encontros conduzidos com calma, em que cada pessoa respeita o próprio ritmo. A proposta é explorar o movimento com atenção, num ambiente silencioso e iluminado por luz natural.',
    benefits: [
      'Um momento dedicado ao corpo dentro da semana',
      'Atenção ao movimento, sem cobrança de desempenho',
      'Adaptável a diferentes níveis de familiaridade',
    ],
    format: 'Pequenos grupos ou individual',
    duration: '60 min (exemplo)',
    photo: {
      id: '1611077094679-97c56013ddd3',
      alt: 'Pessoa em postura de yoga ao lado de uma grande janela com luz natural',
      focus: '40% 50%',
    },
    tags: ['move', 'active', 'group', 'weekly'],
  },
  {
    id: 'relaxamento-recuperacao',
    category: 'Relaxamento e recuperação',
    title: 'Pausa profunda',
    summary: 'Uma sequência sensorial de calor, toque e silêncio para desacelerar.',
    description:
      'Uma experiência pensada para quem busca descanso. Ambientes aquecidos, toalhas macias, aromas suaves e tempo livre de estímulos compõem um intervalo dedicado ao relaxamento.',
    benefits: [
      'Um intervalo intencional de descanso',
      'Ambiente sensorial, silencioso e acolhedor',
      'Pode ser vivida de forma avulsa',
    ],
    format: 'Individual',
    duration: '75 min (exemplo)',
    photo: {
      id: '1706795033855-eee02f726868',
      alt: 'Toalhas enroladas e um pequeno frasco sobre uma superfície de linho',
      focus: '50% 55%',
    },
    tags: ['rest', 'sensory', 'solo', 'light'],
  },
  {
    id: 'nutricao-habitos',
    category: 'Nutrição e hábitos',
    title: 'Mesa consciente',
    summary: 'Encontros sobre alimentação, preparo e o ritmo das refeições no dia a dia.',
    description:
      'Conversas e vivências práticas sobre a relação com a comida e a rotina. Não substitui orientação de profissional habilitado. O foco é atenção, prazer e organização dos hábitos.',
    benefits: [
      'Ideias práticas para organizar as refeições',
      'Troca em grupo, com leveza',
      'Material de apoio para levar para casa',
    ],
    format: 'Pequenos grupos',
    duration: '90 min (exemplo)',
    photo: {
      id: '1618111415321-b406d66958de',
      alt: 'Bandeja de madeira com café da manhã sobre uma cama de lençóis claros',
      focus: '50% 60%',
    },
    tags: ['nourish', 'group', 'weekly', 'care'],
  },
  {
    id: 'praticas-integrativas',
    category: 'Práticas integrativas',
    title: 'Silêncio guiado',
    summary: 'Práticas contemplativas e de atenção plena em uma sala dedicada ao silêncio.',
    description:
      'Momentos guiados de presença, com orientação simples e acolhedora. Uma porta de entrada para quem deseja experimentar a meditação e outras práticas de atenção.',
    benefits: [
      'Um espaço protegido para desacelerar',
      'Introdução acessível, sem experiência prévia',
      'Práticas que podem ser levadas para a rotina',
    ],
    format: 'Pequenos grupos ou individual',
    duration: '45 min (exemplo)',
    photo: {
      id: '1758970081655-a9c08d367e68',
      alt: 'Sala de tatame com janela circular voltada para um jardim verde',
      focus: '60% 50%',
    },
    tags: ['mind', 'sensory', 'group', 'light'],
  },
  {
    id: 'autocuidado-personalizado',
    category: 'Autocuidado personalizado',
    title: 'Ritual sob medida',
    summary: 'Uma experiência montada a partir de uma conversa sobre o que você deseja viver.',
    description:
      'Depois de uma conversa inicial sobre preferências e disponibilidade, a equipe sugere uma combinação de experiências do espaço. Sem avaliações clínicas: apenas escolhas de bem-estar.',
    benefits: [
      'Combinação de experiências escolhida com você',
      'Ritmo e horários flexíveis',
      'Atendimento individual e reservado',
    ],
    format: 'Individual',
    duration: 'Variável (exemplo)',
    photo: {
      id: '1672062519512-ef6821193510',
      alt: 'Frasco âmbar ao lado de uma pilha de toalhas brancas',
      focus: '50% 50%',
    },
    tags: ['care', 'solo', 'sensory', 'light', 'rest'],
  },
  {
    id: 'programas-bem-estar',
    category: 'Programas de bem-estar',
    title: 'Estações',
    summary: 'Programas de algumas semanas que combinam movimento, pausa e rotina.',
    description:
      'Uma jornada com começo, meio e fim. Encontros semanais que alternam experiências de movimento, descanso e hábitos, com acompanhamento próximo da equipe ao longo do percurso.',
    benefits: [
      'Continuidade e constância ao longo das semanas',
      'Diferentes experiências em um só percurso',
      'Acompanhamento próximo da equipe',
    ],
    format: 'Grupos ou individual',
    duration: '4 a 8 semanas (exemplo)',
    photo: {
      id: '1792060052578-9dbe661cadbd',
      alt: 'Amplo salão de práticas com teto de bambu e piso de madeira',
      focus: '50% 55%',
    },
    tags: ['program', 'move', 'mind', 'care', 'weekly'],
  },
]

export interface JourneyOption {
  id: string
  label: string
  hint: string
  tags: Tag[]
}

export interface JourneyStep {
  id: string
  question: string
  options: JourneyOption[]
}

export const journey: JourneyStep[] = [
  {
    id: 'aspecto',
    question: 'Qual aspecto do autocuidado deseja explorar?',
    options: [
      { id: 'movimento', label: 'Movimento', hint: 'Sentir o corpo ativo', tags: ['move', 'active'] },
      { id: 'descanso', label: 'Descanso', hint: 'Desacelerar e recuperar', tags: ['rest', 'sensory'] },
      { id: 'presenca', label: 'Presença', hint: 'Silêncio e atenção', tags: ['mind'] },
      { id: 'habitos', label: 'Hábitos', hint: 'Rotina e alimentação', tags: ['nourish', 'care'] },
    ],
  },
  {
    id: 'ritmo',
    question: 'Qual ritmo combina com sua rotina?',
    options: [
      { id: 'pontual', label: 'Momentos pontuais', hint: 'Quando a agenda permitir', tags: ['light'] },
      { id: 'semanal', label: 'Uma vez por semana', hint: 'Um encontro fixo', tags: ['weekly'] },
      { id: 'continuo', label: 'Um percurso contínuo', hint: 'Algumas semanas seguidas', tags: ['program', 'weekly'] },
    ],
  },
  {
    id: 'tipo',
    question: 'Que tipo de experiência prefere?',
    options: [
      { id: 'individual', label: 'Individual', hint: 'Reservada e no seu tempo', tags: ['solo', 'care'] },
      { id: 'grupo', label: 'Em pequenos grupos', hint: 'Troca e companhia', tags: ['group'] },
      { id: 'sensorial', label: 'Sensorial e silenciosa', hint: 'Calor, aromas, quietude', tags: ['sensory', 'rest'] },
      { id: 'dinamica', label: 'Ativa e dinâmica', hint: 'Mais movimento', tags: ['active', 'move'] },
    ],
  },
  {
    id: 'inicio',
    question: 'Como gostaria de começar?',
    options: [
      { id: 'conversa', label: 'Com uma conversa', hint: 'Tirar dúvidas antes', tags: ['care'] },
      { id: 'avulsa', label: 'Com uma experiência avulsa', hint: 'Experimentar uma vez', tags: ['light'] },
      { id: 'visita', label: 'Conhecendo o espaço', hint: 'Uma visita sem compromisso', tags: [] },
    ],
  },
]

export const team = [
  {
    id: 'helena',
    name: 'Helena Prado',
    area: 'Movimento e consciência corporal',
    bio: 'Conduz as práticas de movimento com atenção ao ritmo de cada pessoa. Acredita em aulas silenciosas, claras e sem comparação.',
    photo: { id: '1614204424926-196a80bf0be8', alt: 'Retrato de mulher de cabelos castanhos, com luz natural lateral', focus: '50% 30%' },
  },
  {
    id: 'rafael',
    name: 'Rafael Moura',
    area: 'Relaxamento e recuperação',
    bio: 'Responsável pelas experiências sensoriais do espaço: o calor, o silêncio e o cuidado com cada detalhe do ambiente.',
    photo: { id: '1758598497190-f609ecba227b', alt: 'Retrato de homem de barba, olhando para a frente, em fundo claro', focus: '50% 30%' },
  },
  {
    id: 'lia',
    name: 'Lia Okamoto',
    area: 'Rotina e hábitos de autocuidado',
    bio: 'Facilita os encontros sobre rotina e alimentação consciente, sempre com leveza e ideias práticas para o dia a dia.',
    photo: { id: '1772989665252-7cb41ae759cc', alt: 'Retrato de mulher sorrindo, com o queixo apoiado nos braços', focus: '50% 35%' },
  },
  {
    id: 'caio',
    name: 'Caio Nunes',
    area: 'Práticas contemplativas',
    bio: 'Guia os momentos de silêncio e atenção. Gosta de apresentar a meditação de forma simples, para quem nunca experimentou.',
    photo: { id: '1600603406200-5b2a104684ac', alt: 'Retrato de homem jovem sorrindo, com camiseta clara', focus: '50% 30%' },
  },
]

export const spaces = [
  {
    id: 'recepcao',
    name: 'Recepção',
    note: 'Luz filtrada, madeira e silêncio desde a chegada.',
    photo: { id: '1761971975724-31001b4de0bf', alt: 'Recepção minimalista com parede clara e painel escultórico em relevo', ratio: 1.5 },
  },
  {
    id: 'praticas',
    name: 'Sala de práticas',
    note: 'Pé-direito alto e janelas amplas para o movimento.',
    photo: { id: '1761971975973-cbb3e59263de', alt: 'Sala de práticas ampla, com grandes janelas e luz natural', ratio: 1.5 },
  },
  {
    id: 'relaxamento',
    name: 'Espaço de relaxamento',
    note: 'Espreguiçadeiras, calor suave e tempo sem estímulos.',
    photo: { id: '1773924093206-9a433a14bb44', alt: 'Espreguiçadeiras em uma sala de relaxamento iluminada pelo sol', ratio: 1.5 },
  },
  {
    id: 'convivencia',
    name: 'Área de convivência',
    note: 'Um lugar para um chá antes ou depois da experiência.',
    photo: { id: '1676496962536-d8ef110ff6f0', alt: 'Sala clara com três janelas redondas e um vaso de planta', ratio: 1.5 },
  },
  {
    id: 'detalhes',
    name: 'Detalhes arquitetônicos',
    note: 'Aberturas circulares que enquadram o jardim.',
    photo: { id: '1758970081655-a9c08d367e68', alt: 'Janela circular em sala de tatame, com vista para vegetação', ratio: 1.5 },
  },
  {
    id: 'jardim',
    name: 'Jardim interno',
    note: 'Pedra, musgo e luz: o verde atravessa o espaço.',
    photo: { id: '1787839971382-57ba26113882', alt: 'Janela retangular emoldurando um jardim com pedras cobertas de musgo', ratio: 1.5 },
  },
]

export const rituals = [
  {
    id: 'respiracao',
    name: 'Respiração',
    line: 'O ritmo mais simples, sempre disponível.',
    photo: { id: '1773357830140-74e30dc0e660', alt: 'Gota de água criando ondulações em uma superfície escura' },
  },
  {
    id: 'pausa',
    name: 'Pausa',
    line: 'Uma xícara quente e nenhuma pressa.',
    photo: { id: '1564890369478-c89ca6d9cde9', alt: 'Bule e xícara de cerâmica sobre uma bandeja de madeira' },
  },
  {
    id: 'movimento',
    name: 'Movimento',
    line: 'Espreguiçar ao acordar já é um começo.',
    photo: { id: '1552650272-b8a34e21bc4b', alt: 'Pessoa sentada na cama se alongando com os braços para o alto' },
  },
  {
    id: 'reconexao',
    name: 'Reconexão',
    line: 'Olhar de perto o que é vivo.',
    photo: { id: '1580133318324-f2f76d987dd8', alt: 'Folha verde com gotas de água, em detalhe' },
  },
]

export const testimonials = [
  {
    quote:
      'Eu procurava um lugar onde pudesse simplesmente parar. Saí da primeira experiência com a sensação de ter encontrado um tempo só meu.',
    who: 'Participante das experiências de relaxamento',
  },
  {
    quote:
      'Nunca tinha meditado. A condução foi tão simples que parei de achar que isso não era para mim.',
    who: 'Participante das práticas contemplativas',
  },
  {
    quote:
      'O programa me ajudou a manter constância. Ter um encontro fixo na semana mudou a forma como organizo o resto dos dias.',
    who: 'Participante de um programa de bem-estar',
  },
]

export const faqs = [
  {
    q: 'Como funcionam as experiências?',
    a: 'Cada experiência tem um formato próprio: algumas acontecem em pequenos grupos, outras são individuais. Você escolhe a que faz sentido para o seu momento e reserva um horário com a equipe. Os formatos e durações deste site são exemplos.',
  },
  {
    q: 'Preciso ter experiência prévia?',
    a: 'Não. As experiências são pensadas para receber quem está começando e quem já tem familiaridade. A condução respeita o ritmo de cada pessoa.',
  },
  {
    q: 'Posso escolher atividades específicas?',
    a: 'Sim. Você pode reservar uma experiência avulsa, combinar algumas delas ou participar de um programa de algumas semanas. A equipe ajuda a montar a combinação, se você quiser.',
  },
  {
    q: 'Como funciona o agendamento?',
    a: 'Neste protótipo, o agendamento começa por uma conversa pelo WhatsApp com mensagem pré-preenchida. Em um site real, essa etapa pode ser conectada à agenda ou ao sistema de reservas do espaço.',
  },
  {
    q: 'Como encontrar a experiência ideal?',
    a: 'Use a jornada “Descubra sua jornada”: quatro perguntas rápidas sobre preferências e rotina sugerem experiências do catálogo. É apenas uma sugestão de bem-estar, sem avaliação de saúde. Se tiver alguma condição de saúde, converse antes com um profissional habilitado.',
  },
]
