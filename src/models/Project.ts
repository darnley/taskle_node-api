import mongoose, { Schema, Document } from 'mongoose'
import log from '../utils/log'

export interface IProject extends Document {
  name: string;
}

const ProjectSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'O nome do projeto é obrigatório.']
  },
  description: {
    type: String
  },
  keywords: [
    {
      type: String
    }
  ],
  manager: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: [true, 'O projeto deve possuir um responsável.']
  },
  visibility: {
    users: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
      }
    ],
    teams: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Team'
      }
    ]
  }
}, {
  timestamps: true
})

ProjectSchema.post<IProject>('save', (doc) => {
  log.debug(`Project has been saved (${doc._id})`)
})

export default mongoose.model<IProject>('Project', ProjectSchema)
