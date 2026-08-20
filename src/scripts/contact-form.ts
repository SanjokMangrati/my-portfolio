import { play } from './audio'

const ENDPOINT = 'https://api.web3forms.com/submit'
const ACCESS_KEY = import.meta.env.PUBLIC_WEB3FORMS_KEY

const dialog = document.querySelector<HTMLDialogElement>('#contact-notice')
const dialogTitle = dialog?.querySelector<HTMLElement>('[data-msgbox-title]')
const dialogText = dialog?.querySelector<HTMLElement>('[data-msgbox-text]')

function notify(title?: string, text?: string): void {
  if (title && dialogTitle) dialogTitle.textContent = title
  if (text && dialogText) dialogText.textContent = text
  play('popup')
  dialog?.showModal()
}

interface Web3FormsResponse {
  success?: boolean
  message?: string
}

for (const form of document.querySelectorAll<HTMLFormElement>('[data-contact-form]')) {
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')
  const idleLabel = button?.innerHTML ?? ''

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    if (!ACCESS_KEY) {
      notify()
      return
    }

    if (button) {
      button.disabled = true
      button.textContent = 'Sending...'
    }

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
        notify('Message sent', 'Thanks — it is on its way. Expect a reply at the address you gave.')
      } catch (error) {
        const reason = error instanceof Error ? error.message : 'Something went wrong'
        notify(
          'Could not send message',
          `${reason}. Your message is still in the form — try again, or use one of the links in the sidebar.`,
        )
      } finally {
        if (button) {
          button.disabled = false
          button.innerHTML = idleLabel
        }
      }
    })()
  })
}
