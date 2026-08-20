const STORAGE_KEY = 'portfolio.sound'

export type Channel = 'sfx' | 'midi'

interface Prefs {
  sfx: boolean
  midi: boolean
}

const prefs: Prefs = { sfx: true, midi: false }

let context: AudioContext | null = null
let master: GainNode | null = null

function getContext(): AudioContext | null {
  if (context) return context

  const Ctor = window.AudioContext ?? window.webkitAudioContext
  if (!Ctor) return null

  context = new Ctor()
  master = context.createGain()
  master.gain.value = 0.5
  master.connect(context.destination)
  return context
}

function resume(): void {
  if (context?.state === 'suspended') void context.resume()
}

interface ToneOptions {
  freq: number
  toFreq?: number
  type?: OscillatorType
  duration: number
  gain?: number
  at?: number
}

function tone({ freq, toFreq, type = 'sine', duration, gain = 0.5, at = 0 }: ToneOptions): void {
  const ctx = getContext()
  if (!ctx || !master) return

  const start = ctx.currentTime + at
  const osc = ctx.createOscillator()
  const env = ctx.createGain()

  osc.type = type
  osc.frequency.setValueAtTime(freq, start)
  if (toFreq !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(toFreq, start + duration * 0.8)
  }

  env.gain.setValueAtTime(gain, start)
  env.gain.exponentialRampToValueAtTime(0.001, start + duration)

  osc.connect(env)
  env.connect(master)
  osc.start(start)
  osc.stop(start + duration)
  osc.addEventListener('ended', () => {
    osc.disconnect()
    env.disconnect()
  })
}

const SFX = {
  buttonPress: () => tone({ freq: 380, toFreq: 75, duration: 0.07, gain: 0.55 }),
  buttonHover: () => tone({ freq: 1200, type: 'square', duration: 0.02, gain: 0.05 }),
  linkHover: () => tone({ freq: 1800, type: 'square', duration: 0.018, gain: 0.045 }),
  toggle: () => tone({ freq: 880, toFreq: 1320, type: 'square', duration: 0.08, gain: 0.18 }),

  linkPress: () => {
    tone({ freq: 660, type: 'square', duration: 0.06, gain: 0.16 })
    tone({ freq: 990, type: 'square', duration: 0.09, gain: 0.16, at: 0.06 })
  },

  popup: () => {
    tone({ freq: 1046.5, duration: 0.42, gain: 0.22 })
    tone({ freq: 2093, duration: 0.3, gain: 0.07 })
    tone({ freq: 3136, type: 'triangle', duration: 0.02, gain: 0.08 })
  },
}

export function play(name: keyof typeof SFX): void {
  if (!prefs.sfx) return
  resume()
  SFX[name]()
}

const STEP = 0.16

const LEAD = [
  76, 79, 81, 79, 76, 74, 72, 74, 76, 79, 81, 84, 83, 81, 79, 79, 81, 84, 83, 81, 79, 76, 74, 76,
  72, 74, 76, 79, 81, 81, 81, 81,
]

const BASS = [
  48, 48, 55, 55, 45, 45, 52, 52, 41, 41, 48, 48, 43, 43, 43, 43, 45, 45, 52, 52, 43, 43, 40, 40,
  41, 41, 43, 43, 48, 48, 48, 48,
]

const hz = (note: number): number => 440 * 2 ** ((note - 69) / 12)

let midiTimer: number | null = null
let midiStep = 0
let midiNextTime = 0

function scheduleMidi(): void {
  const ctx = getContext()
  if (!ctx) return

  while (midiNextTime < ctx.currentTime + 0.25) {
    const at = Math.max(0, midiNextTime - ctx.currentTime)
    const lead = hz(LEAD[midiStep % LEAD.length]!)

    tone({ freq: lead, type: 'square', duration: STEP * 0.9, gain: 0.09, at })

    if (midiStep % 2 === 0) {
      const bass = hz(BASS[midiStep % BASS.length]!)
      tone({ freq: bass, type: 'triangle', duration: STEP * 1.6, gain: 0.12, at })
    }

    midiNextTime += STEP
    midiStep += 1
  }

  midiTimer = window.setTimeout(scheduleMidi, 100)
}

function startMidi(): void {
  const ctx = getContext()
  if (!ctx || midiTimer !== null) return

  resume()
  midiStep = 0
  midiNextTime = ctx.currentTime + 0.1
  scheduleMidi()
}

function stopMidi(): void {
  if (midiTimer === null) return
  clearTimeout(midiTimer)
  midiTimer = null
}

type Listener = (prefs: Readonly<Prefs>) => void
const listeners = new Set<Listener>()

export function subscribe(listener: Listener): void {
  listeners.add(listener)
  listener(prefs)
}

export function toggle(channel: Channel): void {
  prefs[channel] = !prefs[channel]

  if (channel === 'midi') {
    if (prefs.midi) startMidi()
    else stopMidi()
  }

  if (prefs.sfx) {
    resume()
    SFX.toggle()
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
  } catch {
  }

  for (const listener of listeners) listener(prefs)
}

try {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as Partial<Prefs>
  if (typeof saved.sfx === 'boolean') prefs.sfx = saved.sfx
  if (typeof saved.midi === 'boolean') prefs.midi = saved.midi
} catch {
}

if (prefs.midi) {
  const kick = (): void => {
    startMidi()
    document.removeEventListener('pointerdown', kick)
    document.removeEventListener('keydown', kick)
  }
  document.addEventListener('pointerdown', kick)
  document.addEventListener('keydown', kick)
}
