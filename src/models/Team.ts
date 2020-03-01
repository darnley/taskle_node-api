import mongoose, { Schema, Document } from 'mongoose'
import log from '../utils/log'
import { IUser } from './User'

export interface ITeam extends Document {
  name: string;
  users: IUser[];
}

const TeamSchema: Schema = new Schema({
  name: { type: String, required: true, maxlength: 20, unique: true },
  users: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User'
    }
  ]
}, {
  timestamps: true
})

TeamSchema.post<ITeam>('save', (doc) => {
  log.debug(`Team has been saved (${doc._id})`)
})

export default mongoose.model<ITeam>('Team', TeamSchema)
