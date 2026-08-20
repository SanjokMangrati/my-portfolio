import { DurableObject } from 'cloudflare:workers'

interface WorkerEnv {
  readonly VISITS: DurableObjectNamespace<VisitCounter>
  readonly ALLOWED_ORIGINS: string
}

const COUNT_KEY = 'count'

const INSTANCE = 'global'

export class VisitCounter extends DurableObject<WorkerEnv> {
  async read(): Promise<number> {
    return (await this.ctx.storage.get<number>(COUNT_KEY)) ?? 0
  }

  async bump(): Promise<number> {
    const next = ((await this.ctx.storage.get<number>(COUNT_KEY)) ?? 0) + 1
    await this.ctx.storage.put(COUNT_KEY, next)
    return next
  }
}

function corsHeaders(origin: string | null, env: WorkerEnv): Headers {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
    Vary: 'Origin',
  })

  const allowed = env.ALLOWED_ORIGINS.split(',').map((value) => value.trim())
  if (origin && allowed.includes(origin)) {
    headers.set('Access-Control-Allow-Origin', origin)
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    headers.set('Access-Control-Max-Age', '86400')
  }

  return headers
}

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const origin = request.headers.get('Origin')
    const headers = corsHeaders(origin, env)

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers })
    }

    if (!headers.has('Access-Control-Allow-Origin')) {
      return new Response(JSON.stringify({ error: 'Origin not allowed' }), {
        status: 403,
        headers,
      })
    }

    if (request.method !== 'GET' && request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: new Headers([...headers, ['Allow', 'GET, POST, OPTIONS']]),
      })
    }

    const counter = env.VISITS.getByName(INSTANCE)
    const count = request.method === 'POST' ? await counter.bump() : await counter.read()

    return new Response(JSON.stringify({ count }), { headers })
  },
} satisfies ExportedHandler<WorkerEnv>
