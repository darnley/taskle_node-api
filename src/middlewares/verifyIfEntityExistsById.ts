import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'

const verifyIfEntityExistsById = (params: [{param?: string; entity: string}]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const errors: string[] = []

    for (const p of params) {
      // Obtém o nome do parâmetro a ser utilizado
      const field = p.param || `${p.entity.toLowerCase()}Id`

      // Verifica se o parâmetro existe na requisição
      if (field && req.params[field]) {
        const entityId = req.params[field]
        const model = mongoose.model(p.entity)
        const entityExists = await model
          .exists({ _id: entityId })
          .catch((reason) => {
            return res
              .status(400)
              .json(reason)
          })

        if (!entityExists) {
          errors.push(`A entidade informada no parâmetro '${field}' não foi encontrada.`)
        }
      } else {
        throw new Error(`The parameter '${field}' is not found in the request.`)
      }
    }

    if (errors.length > 0) {
      return res
        .status(404)
        .json({
          message: 'Uma das entidades passadas como parâmetro não existe.',
          errors
        })
    }

    next()
  }
}

export default verifyIfEntityExistsById
