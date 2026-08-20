const now = new Date()

for (const node of document.querySelectorAll<HTMLTimeElement>('[data-local-date]')) {
  node.dateTime = now.toISOString().slice(0, 10)
  node.textContent = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
