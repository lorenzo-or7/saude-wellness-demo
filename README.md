# AURA — Integrative Wellness (protótipo Or7.dev)

Protótipo comercial demonstrativo para clínicas, centros integrativos e espaços de wellness.
AURA é uma marca fictícia. Equipe, depoimentos, contatos, formatos e durações são exemplos.

## Rodar

```bash
npm install
npm run dev        # desenvolvimento
npm run typecheck  # TypeScript
npm run build      # typecheck + build de produção em dist/
npm run preview    # serve o build
```

## WhatsApp

Copie `.env.example` para `.env` e preencha `VITE_WHATSAPP_NUMBER` (somente dígitos, com DDI).
Sem número, todos os CTAs de conversa abrem uma prévia da mensagem com o aviso de envio externo desabilitado.

## Adaptar para um cliente

- Conteúdo (experiências, pilares, equipe, espaço, rituais, depoimentos, FAQ, jornada): `src/data/content.ts`
- Marca, navegação e contato: `src/data/site.ts`
- Cores, tipografia e escala: `src/styles/tokens.css` (temas claro e escuro)
- Lógica de sugestões da jornada: `src/lib/journey.ts` (afinidade por tags, sem avaliação de saúde)
- Marca d'água oficial Or7: inserir o asset original em `.or7-watermark-slot` (`src/sections/Footer.tsx`)

## Estrutura

```
src/
  App.tsx                 composição das seções + diálogos globais
  sections/               Navbar, Hero, Philosophy, Experiences, Discovery, Rituals,
                          Team, Space, Testimonials, Faq, Contact, Footer
  components/             ExperienceDrawer, ConversationDialog, Breathing
  components/ui/          Dialog (foco preso), SmartImage (srcset + fallback),
                          Reveal (texto/imagem), Magnetic
  hooks/                  useTheme, useActiveSection
  lib/                    journey, motion, app-context
```

## Imagens

Fotografias do Unsplash, sob a Licença Unsplash (uso comercial gratuito), servidas pelo CDN do Unsplash
com `auto=format` (WebP/AVIF), `srcset` e lazy loading. Para produção, recomenda-se baixar e hospedar as
imagens finais do cliente.

## Publicar no GitHub Pages

Crie o repositório `saude-wellness-demo`, envie os arquivos e selecione **Settings > Pages > GitHub Actions**.

URL: https://lorenzo-or7.github.io/saude-wellness-demo/

Fotos externas do Unsplash requerem conexão à internet.
