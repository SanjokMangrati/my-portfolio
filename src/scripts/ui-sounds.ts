import { play, subscribe, toggle, type Channel } from './audio'

const LINK = 'a[href]'
const PRESSABLE = `${LINK}, button, [role="button"]`

function control(event: Event): Element | null {
  const target = event.target
  if (!(target instanceof Element)) return null
  const found = target.closest(PRESSABLE)
  return found && !found.hasAttribute('data-silent') ? found : null
}

document.addEventListener('mousedown', (event) => {
  const found = control(event)
  if (found) play(found.matches(LINK) ? 'linkPress' : 'buttonPress')
})

let hovered: Element | null = null

document.addEventListener(
  'pointerover',
  (event) => {
    const found = control(event)
    if (found === hovered) return
    hovered = found
    if (found) play(found.matches(LINK) ? 'linkHover' : 'buttonHover')
  },
  { passive: true },
)

for (const button of document.querySelectorAll<HTMLButtonElement>('[data-sound-toggle]')) {
  const channel = button.dataset['soundToggle'] as Channel

  button.addEventListener('click', () => toggle(channel))

  subscribe((prefs) => {
    const on = prefs[channel]
    button.dataset['state'] = on ? 'on' : 'off'
    button.setAttribute('aria-pressed', String(on))
    const value = button.querySelector('[data-sound-state]')
    if (value) value.textContent = on ? 'ON' : 'OFF'
  })
}
