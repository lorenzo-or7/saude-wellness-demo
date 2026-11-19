import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'
const KEY = 'aura-theme'

function readTheme(): Theme {
  const t = document.documentElement.dataset.theme
  return t === 'dark' ? 'dark' : 'light'
}

/** Tema claro/escuro. Persiste apenas a preferência visual (dado não sensível). */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    const meta = document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
    meta.forEach((m) => (m.content = theme === 'dark' ? '#151D18' : '#F7F5EF'))
  }, [theme])

  const toggle = useCallback(() => {
    const next: Theme = readTheme() === 'dark' ? 'light' : 'dark'
    const apply = () => {
      document.documentElement.dataset.theme = next
      setTheme(next)
    }
    try {
      localStorage.setItem(KEY, next)
    } catch {
      /* armazenamento indisponível: segue sem persistir */
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown }
    if (!reduce && typeof doc.startViewTransition === 'function') {
      doc.startViewTransition(apply)
    } else {
      apply()
    }
  }, [])

  return { theme, toggle }
}
