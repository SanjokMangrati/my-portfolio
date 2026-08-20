const field = document.querySelector<HTMLElement>('[data-status-message]')

if (field) {
  const show = (event: Event): void => {
    const target = event.target
    if (!(target instanceof Element)) return

    const link = target.closest('a')
    if (link instanceof HTMLAnchorElement) field.textContent = link.href
  }

  const clear = (event: Event): void => {
    const target = event.target
    if (target instanceof Element && target.closest('a')) field.textContent = ''
  }

  document.addEventListener('pointerover', show, { passive: true })
  document.addEventListener('pointerout', clear, { passive: true })
  document.addEventListener('focusin', show)
  document.addEventListener('focusout', clear)
}
