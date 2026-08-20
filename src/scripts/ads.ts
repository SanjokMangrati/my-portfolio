import { play } from './audio'
import { RAM_ALERT, SCAN_ALERTS, type ScanAlert } from '~/data/site'

const PILES: Record<string, ScanAlert[]> = {
  scan: SCAN_ALERTS,
  ram: [RAM_ALERT],
}

const GAP = 40
const EDGE = 8
const CROWD = 1.3
const MOST = 28
const LEAST = 4

const swarm = document.querySelector<HTMLElement>('[data-swarm]')
const stack = swarm?.querySelector<HTMLElement>('[data-swarm-stack]')
const template = document.querySelector<HTMLTemplateElement>('[data-swarm-box]')
const prototype = template?.content.firstElementChild

if (swarm && stack && template && prototype) {
  let timer: number | undefined
  let opener: HTMLElement | null = null

  const clamp = (value: number, max: number): number =>
    Math.min(Math.max(value, EDGE), Math.max(max, EDGE))

  const stop = (): void => {
    if (timer !== undefined) clearTimeout(timer)
    timer = undefined
  }

  const onKey = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') close()
  }

  const close = (): void => {
    stop()
    stack.replaceChildren()
    swarm.hidden = true
    document.removeEventListener('keydown', onKey)
    opener?.focus()
  }

  const open = (alerts: ScanAlert[], from: HTMLElement): void => {
    const finale = alerts[alerts.length - 1]
    const scenery = alerts.slice(0, -1)
    if (!finale) return

    stop()
    stack.replaceChildren()
    swarm.hidden = false
    opener = from
    document.addEventListener('keydown', onKey)

    play('popup')

    const width = stack.clientWidth
    const height = stack.clientHeight

    const longest = alerts.reduce(
      (long, alert) => (alert.text.length > long.length ? alert.text : long),
      '',
    )
    const probe = prototype.cloneNode(true) as HTMLElement
    const probeText = probe.querySelector('[data-alert-text]')
    if (probeText) probeText.textContent = longest
    probe.style.visibility = 'hidden'
    stack.append(probe)
    const boxWidth = probe.offsetWidth
    const boxHeight = probe.offsetHeight
    probe.remove()

    const room = { x: width - boxWidth - EDGE, y: height - boxHeight - EDGE }

    const fit = Math.round(((width * height) / (boxWidth * boxHeight)) * CROWD)
    const count = scenery.length === 0 ? 1 : Math.min(Math.max(fit, LEAST), MOST)
    const cols = Math.max(Math.round(Math.sqrt((count * width) / height)), 1)
    const rows = Math.max(Math.ceil(count / cols), 1)
    const cell = { x: width / cols, y: height / rows }

    const spots: { x: number; y: number }[] = []

    for (let row = 0; row < rows && spots.length < count; row += 1) {
      for (let col = 0; col < cols && spots.length < count; col += 1) {
        spots.push({
          x: clamp(
            (col + 0.5) * cell.x - boxWidth / 2 + (Math.random() - 0.5) * cell.x * 0.6,
            room.x,
          ),
          y: clamp(
            (row + 0.5) * cell.y - boxHeight / 2 + (Math.random() - 0.5) * cell.y * 0.6,
            room.y,
          ),
        })
      }
    }

    spots.sort(() => Math.random() - 0.5)
    const last = spots.length - 1
    spots[last] = {
      x: clamp((width - boxWidth) / 2, room.x),
      y: clamp((height - boxHeight) / 2 - (finale.image ? height * 0.14 : 0), room.y),
    }

    let index = 0

    const next = (): void => {
      const spot = spots[index]
      const alert = index === last ? finale : scenery[index % scenery.length]

      if (!spot || !alert) {
        timer = undefined
        return
      }

      const node = prototype.cloneNode(true) as HTMLElement
      const title = node.querySelector('[data-alert-title]')
      const text = node.querySelector('[data-alert-text]')
      const picture = node.querySelector<HTMLImageElement>('[data-alert-image]')
      const button = node.querySelector('[data-alert-button]')
      if (title) title.textContent = alert.title
      if (text) text.textContent = alert.text
      if (button && alert.button) button.textContent = alert.button

      if (picture && alert.image) {
        picture.src = alert.image
        picture.alt = alert.alt ?? ''
        picture.hidden = false
      }

      node.style.left = `${spot.x}px`
      node.style.top = `${spot.y}px`

      if (index < last) {
        node.setAttribute('aria-hidden', 'true')
        for (const control of node.querySelectorAll('button')) control.tabIndex = -1
      }

      stack.append(node)

      if (index === last) {
        const spill = node.offsetTop + node.offsetHeight - (height - EDGE)
        if (spill > 0) node.style.top = `${Math.max(node.offsetTop - spill, EDGE)}px`
        node.querySelector<HTMLButtonElement>('[data-swarm-close]')?.focus()
      }

      index += 1
      timer = window.setTimeout(next, GAP)
    }

    next()
  }

  for (const banner of document.querySelectorAll<HTMLElement>('[data-ad-action]')) {
    const pile = PILES[banner.dataset['adAction'] ?? '']
    if (pile) banner.addEventListener('click', () => open(pile, banner))
  }

  swarm.addEventListener('click', (event) => {
    const target = event.target
    if (target instanceof Element && target.closest('[data-swarm-close]')) close()
  })
}
