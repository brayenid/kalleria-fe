export const useShortenName = (fullName: string): string => {
  const words: string[] = fullName.split(' ')

  if (words.length <= 1) {
    return fullName
  }

  const firstName: string = words[0]
  const initials: string[] = words.slice(1).map((word) => word.charAt(0).toUpperCase() + '.')

  return `${firstName} ${initials.join(' ')}`
}
