import { Request, Response } from 'express'
import User, { IUser } from '../../models/User'
import Team from '../../models/Team'
import Role from '../../enums/roles'

const update = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const newDataUser = new User(req.body)
  const loggedUser = (req.user as IUser);

  newDataUser._id = userId
  delete newDataUser.password
  delete newDataUser.salt
  delete newDataUser.starRating
  delete newDataUser.starRatingCount
  delete newDataUser.keywords

  User
    .findById(userId)
    .then(async user => {
      if (user) {
        user.firstName = newDataUser.firstName
        user.lastName = newDataUser.lastName
        user.emailAddress = newDataUser.emailAddress
        user.position = newDataUser.position
        user.team = newDataUser.team

        if(loggedUser.role === Role.Super) {
          if (newDataUser.role) {
            user.role = newDataUser.role
          }
  
          if (newDataUser.isActive !== null) {
            user.isActive = newDataUser.isActive
          }
        }

        const result = await user?.save()

        res
          .status(200)
          .json(result)
      }
    })
}

export default update
