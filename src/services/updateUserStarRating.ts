import User, { IUser } from '../models/User'
import ProjectEndRating from '../models/ProjectEndRating'
import log from '../utils/log'
import { Types } from 'mongoose'

const updateSpecificUserStarRating = async (userId: string) => {
  const userEndSums = await ProjectEndRating
    .aggregate()
    .match({
      user: Types.ObjectId(userId)
    })
    .group({
      _id: '$user',
      userSum: {
        $sum: '$starRating'
      },
      userCount: {
        $sum: 1
      }
    })

  for (const userEndSum of userEndSums) {
    User
      .findByIdAndUpdate(userId,
        {
          starRating: userEndSum.userSum / userEndSum.userCount,
          starRatingCount: userEndSum.userCount
        })
      .then((user) => {
        console.log(user)
      })
      .catch((reason) => {
        log.error(reason)
      })
  }
}

const updateUserStarRating = (users: (IUser | string)[]) => {
  for (const user of users) {
    const userId = ((user.valueOf() as IUser)._id) || user.valueOf()

    updateSpecificUserStarRating(userId)
  }
}

export default updateUserStarRating
