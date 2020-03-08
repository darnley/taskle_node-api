import Task from '../models/Task'
import sanitizeKeyword from '../utils/sanitizeKeyword'

const getUsedKeywords = async (word = '') => {
  const wordLike = sanitizeKeyword(word)
  const wordLikeNonDashes = sanitizeKeyword(word, true)

  if (word.length === 0) {
    return Task.distinct('keywords')
  } else {
    const regExp = new RegExp(wordLike)
    const regExpNonDashed = new RegExp(wordLikeNonDashes)

    const keywords = await Task
      .aggregate([
        {
          $match: {
            $or: [
              {
                keywords: regExp
              },
              {
                keywords: regExpNonDashed
              }
            ]
          }
        }, {
          $unwind: {
            path: '$keywords'
          }
        }, {
          $match: {
            $or: [
              {
                keywords: regExp
              },
              {
                keywords: regExpNonDashed
              }
            ]
          }
        }, {
          $project: {
            keywords: 1,
            _id: 0
          }
        }
      ])

    return Array.from(new Set(keywords.map(k => k.keywords)))
  }
}

export default getUsedKeywords
