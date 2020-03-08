/**
 * Altera os caracteres especiais para normais
 * @param str A frase a ser alterada
 */
const replaceAccents = (str: string): string => {
  const ACCENTS = 'ÀÁÂÃÄÅĄĀāàáâãäåąßÒÓÔÕÕÖØŐòóôőõöøĎďDŽdžÈÉÊËĘèéêëęðÇçČčĆćÐÌÍÎÏĪìíîïīÙÚÛÜŰùűúûüĽĹŁľĺłÑŇŃňñńŔŕŠŚŞšśşŤťŸÝÿýŽŻŹžżźđĢĞģğ'
  const NON_ACCENTS = 'AAAAAAAAaaaaaaaasOOOOOOOOoooooooDdDZdzEEEEEeeeeeeCcCcCcDIIIIIiiiiiUUUUUuuuuuLLLlllNNNnnnRrSSSsssTtYYyyZZZzzzdGGgg'

  const strAccents: string[] = str.split('')
  const strAccentsOut: string[] = []

  const strAccentsLen: number = strAccents.length

  for (let y = 0; y < strAccentsLen; y++) {
    if (ACCENTS.indexOf(strAccents[y]) !== -1) {
      strAccentsOut[y] = NON_ACCENTS.substr(ACCENTS.indexOf(strAccents[y]), 1)
    } else {
      strAccentsOut[y] = strAccents[y]
    }
  }

  const newString: string = strAccentsOut.join('')
  return newString
}

export default replaceAccents
