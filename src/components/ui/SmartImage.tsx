import { useState, type CSSProperties } from 'react'
import { unsplash } from '../../data/site'
import type { Photo } from '../../data/content'

interface SmartImageProps {
  photo: Photo
  /** Tamanhos para o atributo sizes. */
  sizes: string
  widths?: number[]
  priority?: boolean
  className?: string
  style?: CSSProperties
}

/**
 * Imagem responsiva (srcset + formatos modernos via auto=format), com lazy loading
 * e estado de fallback quando a fonte estiver indisponível.
 */
export function SmartImage({ photo, sizes, widths = [480, 800, 1200, 1600], priority, className, style }: SmartImageProps) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (failed) {
    return (
      <div className="img-fallback" role="img" aria-label={photo.alt}>
        <span>Imagem indisponível</span>
      </div>
    )
  }

  return (
    <img
      className={className}
      src={unsplash(photo.id, widths[1] ?? widths[0])}
      srcSet={widths.map((w) => `${unsplash(photo.id, w)} ${w}w`).join(', ')}
      sizes={sizes}
      alt={photo.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onError={() => setFailed(true)}
      onLoad={() => setLoaded(true)}
      data-loaded={loaded}
      style={{ objectPosition: photo.focus ?? '50% 50%', ...style }}
    />
  )
}
