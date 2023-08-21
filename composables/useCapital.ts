export const useCapital = (inputString: string): string => {
  const words = inputString.split(' ')

  const capitalizedWords = words.map((word) => {
    if (word.length > 0) {
      return word[0].toUpperCase() + word.slice(1)
    }
    return word
  })

  const resultString = capitalizedWords.join(' ')

  return resultString
}
