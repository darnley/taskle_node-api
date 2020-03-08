import mongoose, { Schema, Document } from 'mongoose'
import log from '../utils/log'
import { IUser } from './User'
import Project, { IProject } from './Project'

export interface IProjectEndRating extends Document {
  user: IUser | string;
  project: IProject | string;
  starRating: number;
}

const ProjectEndRatingSchema: Schema = new Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'User'
  },
  project: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'Project'
  },
  starRating: {
    type: Number,
    required: true,
    min: 0,
    max: 4
  }
}, {
  timestamps: true
})

ProjectEndRatingSchema.index({ project: 1, user: 1 }, { unique: true })

ProjectEndRatingSchema.post<IProjectEndRating>('save', (doc) => {
  log.debug(`Project end rating has been saved (${doc._id})`)
})

export default mongoose.model<IProjectEndRating>('ProjectEndRating', ProjectEndRatingSchema)
