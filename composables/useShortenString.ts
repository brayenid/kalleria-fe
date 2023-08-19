export const useShortenString = (input: string, limit: number): string => {
  if (input.length <= limit) {
    return input
  } else {
    return input.substring(0, limit) + '...'
  }
}
