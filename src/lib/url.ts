export function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href)
}
