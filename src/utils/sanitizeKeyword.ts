import replaceAccents from './replaceAccents'

const sanitizeKeyword = (word: string, spaceToBlank = false) => {
  word = word.toLowerCase() // Deixa tudo minúsculo

  const spaceRegex = /[\n\cK\f\r\x85\x{2028}\x{2029} \s]/

  if (!spaceToBlank) {
    word = word.replace(spaceRegex, '-') // Remove os espaços
  } else {
    word = word.replace(spaceRegex, '') // Remove os espaços
  }

  word = replaceAccents(word)
  word = word.replace(/[^\-a-zA-Z0-9 ]/, '')

  return word
}

export default sanitizeKeyword
