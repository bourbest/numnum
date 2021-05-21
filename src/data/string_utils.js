const stringCmp = new Intl.Collator(undefined, {sensitivity: 'base'})
export const compareStrings = stringCmp.compare

export function firstLetter (str) {
  if (str && str.length > 0) return str.charAt(0).toUpperCase()
  return ''
}

export function formatDate (date) {
  return date ? date.toISOString().slice(0, 10) : ''
}