const format = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
  timeZone: 'Asia/Kolkata',
})

const clocks = document.querySelectorAll<HTMLElement>('[data-clock]')

function tick(): void {
  const time = `${format.format(new Date())} IST`
  for (const clock of clocks) clock.textContent = time
}

if (clocks.length > 0) {
  tick()
  setInterval(tick, 15_000)
}
