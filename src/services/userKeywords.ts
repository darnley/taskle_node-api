import User, { IUser } from '../models/User'
import Task from '../models/Task'
import IUserKeyword from '../interfaces/UserKeyword'

/**
 * Get the most keywords for a specified user.
 * @param userId The user to get its keywords.
 */
export function getUserKeywords (userId: string): Promise<IUserKeyword[]> {
  return new Promise<IUserKeyword[]>((resolve, reject) => {
    Task
      .aggregate([
        {
          $match: {
            responsible: userId
          }
        }, {
          $unwind: '$keywords'
        }, {
          $project: {
            keywords: {
              name: '$keywords'
            }
          }
        }, {
          $replaceRoot: {
            newRoot: '$keywords'
          }
        },
        {
          $group: {
            _id: '$name',
            count: {
              $sum: 1
            }
          }
        },
        {
          $project: {
            _id: 0,
            name: '$_id',
            count: 1
          }
        }
      ])
      .then(resolve)
      .catch(reject)
  })
}

/**
 * Asynchronously update the user keywords in database.
 * @param userId The user to be updated.
 */
export function updateUserKeywords (userId: string): Promise<IUser> {
  return new Promise<IUser>((resolve, reject) => {
    User
      .exists({ _id: userId })
      .then(userExists => {
        if (userExists) {
          getUserKeywords(userId)
            .then(userKeywords => {
              User.findByIdAndUpdate(userId, { keywords: userKeywords.sort((a, b) => b.count - a.count) })
                .then(updatedUser => {
                  if (updatedUser) {
                    resolve(updatedUser)
                  } else {
                    resolve()
                  }
                })
            })
            .catch(reject)
        } else {
          reject(new Error('The user does not exist.'))
        }
      })
  })
}
