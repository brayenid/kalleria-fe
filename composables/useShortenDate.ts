export const useShortenDate = (date: string): string => {
  const parsedTime = new Date(date)

  const day = String(parsedTime.getUTCDate()).padStart(2, '0')
  const month = String(parsedTime.getUTCMonth() + 1).padStart(2, '0')
  const year = parsedTime.getUTCFullYear()

  const formattedDate = `${day}-${month}-${year}`

  return formattedDate
}
