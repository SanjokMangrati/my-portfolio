import { formatCount } from '~/lib/counter'

const COUNT_KEY = 'portfolio.visits'
const SESSION_KEY = 'portfolio.counted'
const ENDPOINT = import.meta.env.PUBLIC_VISITS_ENDPOINT

function isNewVisit(): boolean {
  try {
    if (sessionStorage.getItem(SESSION_KEY)) return false
    sessionStorage.setItem(SESSION_KEY, '1')
    return true
  } catch {
    return true
  }
}

function countLocally(fresh: boolean): number {
  const stored = Number(localStorage.getItem(COUNT_KEY))
  const count = Number.isFinite(stored) && stored > 0 ? stored : 0
  if (!fresh) return count

  localStorage.setItem(COUNT_KEY, String(count + 1))
  return count + 1
}

async function countGlobally(endpoint: string, fresh: boolean): Promise<number> {
  const response = await fetch(endpoint, { method: fresh ? 'POST' : 'GET' })
  if (!response.ok) throw new Error(`Counter answered ${response.status}`)

  const { count } = (await response.json()) as { count?: number }
  if (typeof count !== 'number') throw new Error('Counter sent no number')
  return count
}

const odometer = document.querySelector<HTMLElement>('[data-visit-odometer]')

if (odometer) {
  const cells = odometer.querySelectorAll<HTMLElement>('[data-visit-cell]')
  const digits = Number(odometer.dataset['visitOdometer']) || 6
  const fresh = isNewVisit()

  const render = (count: number): void => {
    const formatted = formatCount(count, digits)
    cells.forEach((cell, index) => {
      cell.textContent = formatted[index] ?? '0'
    })
    odometer.setAttribute('aria-label', `Visitor number ${count}`)
  }

  void (async () => {
    if (ENDPOINT) {
      try {
        render(await countGlobally(ENDPOINT, fresh))
        return
      } catch {
      }
    }

    try {
      render(countLocally(fresh))
    } catch {
    }
  })()
}
