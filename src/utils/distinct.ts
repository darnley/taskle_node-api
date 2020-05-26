/* eslint-disable @typescript-eslint/no-explicit-any */
export function distinctArrayOfObjects (joinedArray: any[], key: string) {
  const unique: number[] = []
  const distinct: any[] = []

  for (let i = 0; i < joinedArray.length; i++) {
    if (!unique[joinedArray[i][key]]) {
      distinct.push(joinedArray[i])
      unique[joinedArray[i][key]] = 1
    }
  }

  return distinct
}

export function distinctPrimitives (joinedArray: any[]) {
  const unique = [...new Set(joinedArray)]

  return unique
}
