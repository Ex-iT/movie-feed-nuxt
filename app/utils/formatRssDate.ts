const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function formatRssDate(epoch: number): string {
  const date = new Date(epoch * 1000)
  const day = DAYS[date.getUTCDay()]
  const dd = String(date.getUTCDate()).padStart(2, '0')
  const mon = MONTHS[date.getUTCMonth()]
  const yyyy = date.getUTCFullYear()
  const hh = String(date.getUTCHours()).padStart(2, '0')
  const mm = String(date.getUTCMinutes()).padStart(2, '0')
  const ss = String(date.getUTCSeconds()).padStart(2, '0')
  return `${day}, ${dd} ${mon} ${yyyy} ${hh}:${mm}:${ss} +0000`
}
