/// <reference types="astro/client" />

declare global {
  interface ImportMetaEnv {
    readonly PUBLIC_WEB3FORMS_KEY?: string

    readonly PUBLIC_VISITS_ENDPOINT?: string
  }

  interface Window {
    readonly webkitAudioContext?: typeof AudioContext
  }
}

export {}
