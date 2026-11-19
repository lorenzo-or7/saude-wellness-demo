import { nav, site } from '../data/site'
import { Wordmark } from './Navbar'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Wordmark className="footer-wordmark" />
            <p className="footer-tag">{site.tagline}</p>
          </div>

          <nav aria-label="Rodapé" className="footer-col">
            <h2 className="footer-h">Navegar</h2>
            <ul role="list">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <h2 className="footer-h">Contato demonstrativo</h2>
            <ul role="list" className="footer-contact">
              <li>{site.demoEmail}</li>
              <li>{site.demoAddress}</li>
              <li>{site.demoHours}</li>
            </ul>
          </div>
        </div>

        <div className="footer-notice" role="note">
          <p>
            <strong>Protótipo conceitual.</strong> AURA é uma marca fictícia criada para demonstração. Equipe, depoimentos,
            contatos, formatos e durações são exemplos. O conteúdo não constitui orientação de saúde e não substitui
            acompanhamento profissional.
          </p>
        </div>

        <div className="footer-bottom">
          <p className="footer-credit">
            Protótipo desenvolvido por <span className="footer-or7">Or7.dev</span> · {year}
          </p>
          <p className="footer-photos muted">Fotografias: Unsplash, sob a Licença Unsplash.</p>
          {/* Espaço reservado para a marca d'água oficial da Or7 — inserir o asset original aqui, sem alterações. */}
          <div className="or7-watermark-slot" data-slot="or7-watermark" aria-hidden="true" />
        </div>
      </div>
    </footer>
  )
}
