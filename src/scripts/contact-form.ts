const ENDPOINT = 'https://api.web3forms.com/submit'

interface Web3FormsResponse {
  success?: boolean
  message?: string
}

type Control = HTMLInputElement | HTMLTextAreaElement

const IDLE_NOTE = 'All three fields are needed'

function showError(control: Control, show: boolean): void {
  const field = control.closest<HTMLElement>('[data-field]')
  const error = field?.querySelector<HTMLElement>('[data-error]')
  if (!field || !error) return

  if (show) {
    field.dataset['invalid'] = ''
    control.setAttribute('aria-invalid', 'true')
    error.textContent = error.dataset['error'] ?? ''
    error.hidden = false
  } else {
    delete field.dataset['invalid']
    control.removeAttribute('aria-invalid')
    error.hidden = true
  }
}

for (const form of document.querySelectorAll<HTMLFormElement>('[data-contact-form]')) {
  const controls = [...form.querySelectorAll<Control>('input[required], textarea[required]')]
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')
  const label = form.querySelector<HTMLElement>('[data-submit-label]')
  const note = form.querySelector<HTMLElement>('[data-form-status]')

  const say = (text: string, tone?: 'done') => {
    if (!note) return
    note.textContent = text
    if (tone) note.dataset['tone'] = tone
    else delete note.dataset['tone']
  }

  for (const control of controls) {
    control.addEventListener('input', () => {
      if (control.hasAttribute('aria-invalid') && control.validity.valid) showError(control, false)
    })
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const invalid = controls.filter((control) => {
      if (control.value.trim() === '') control.value = ''
      const bad = !control.validity.valid
      showError(control, bad)
      return bad
    })

    if (invalid.length > 0) {
      invalid[0]?.focus()
      say(invalid.length === 1 ? 'One field needs a look' : `${invalid.length} fields need a look`)
      return
    }

    if (form.dataset['ready'] !== 'true') {
      say('The form is not connected yet. Reach me on LinkedIn or GitHub above')
      return
    }

    if (button) button.disabled = true
    if (label) label.textContent = 'Sending'
    say('Sending your message')

    void (async () => {
      try {
        const response = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(form),
        })
        const result = (await response.json()) as Web3FormsResponse

        if (!response.ok || !result.success) {
          throw new Error(result.message ?? `The mail server answered ${response.status}`)
        }

        form.reset()
        say('Sent. I will reply to the address you gave', 'done')
      } catch (error) {
        const reason = error instanceof Error ? error.message : 'Something went wrong'
        say(`Not sent: ${reason}. Your message is still here, try again`)
      } finally {
        if (button) button.disabled = false
        if (label) label.textContent = 'Send message'
      }
    })()
  })

  form.addEventListener('reset', () => {
    for (const control of controls) showError(control, false)
    say(IDLE_NOTE)
  })
}
