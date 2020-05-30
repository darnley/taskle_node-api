import { IUser } from '../models/User'
import Task from '../models/Task'

export default function addMostUserKeywords (users: IUser[]): Promise<IUser[]> {
  if (!users) {
    throw new Error("Argument 'users' is required.")
  }

  // Create the promise array to paralelize
  const umk: Promise<IUser>[] = []

  for (const user of users) {
    const promise = new Promise<IUser>((resolve, reject) => {
      Task
        .aggregate([
          {
            $match: {
              responsible: user._id
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
        .then((res: MostUserKeywords[]) => {
          user.keywords = [...res]

          resolve(user)
        })
        .catch(err => reject(err))
    })

    umk.push(promise)
  }

  const allPromise = Promise.all(umk)

  return allPromise
}

export type MostUserKeywords = {
  name: string;
  count: number;
}
