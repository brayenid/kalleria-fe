export const useLocalDate = (date: string, format: 'short'): string => {
  const now = new Date(date)
  const options: object = { hour12: false, timeZone: 'Asia/Makassar' }
  if (format === 'short') {
    return now.toLocaleString('id-ID', options).split(',')[0]
  }
  return now.toLocaleString('id-ID', options)
}

export const useLocalDateDetail = (date: string): string => {
  const now = new Date(date)
  const options: object = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

  return now.toLocaleString('id-ID', options)
}
