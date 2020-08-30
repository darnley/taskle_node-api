import mongoose, { Schema, Document } from 'mongoose'
import log from '../utils/log'
import { IUser } from './User'

export interface IPasswordReset extends Document {
  user: IUser | string;
  key1: string;
  key2: string;
}

const PasswordResetSchema: Schema = new Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'User'
  },
  key1: {
    type: mongoose.SchemaTypes.String,
    required: true
  },
  key2: {
    type: mongoose.SchemaTypes.String,
    required: true
  }
}, {
  timestamps: true
})

PasswordResetSchema.index({ user: 1, key1: 1, key2: 1 }, { unique: true })

PasswordResetSchema.post<IPasswordReset>('save', (doc) => {
  log.debug(`Password reset request has been saved (${doc._id})`)
})

export default mongoose.model<IPasswordReset>('PasswordResetRequest', PasswordResetSchema)
