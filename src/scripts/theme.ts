const KEY = 'theme'
const root = document.documentElement
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

function current(): 'light' | 'dark' {
  const chosen = root.dataset['theme']
  if (chosen === 'light' || chosen === 'dark') return chosen
  return prefersDark.matches ? 'dark' : 'light'
}

for (const button of document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]')) {
  const sync = () => {
    const next = current() === 'dark' ? 'light' : 'dark'
    button.setAttribute('aria-label', `Switch to ${next} theme`)
  }

  sync()
  prefersDark.addEventListener('change', sync)

  button.addEventListener('click', () => {
    const next = current() === 'dark' ? 'light' : 'dark'
    root.dataset['theme'] = next
    try {
      localStorage.setItem(KEY, next)
    } catch {
      // Storage can be blocked; the choice still applies to this page view.
    }
    sync()
  })
}
