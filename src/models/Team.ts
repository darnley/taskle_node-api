import mongoose, { Schema, Document } from 'mongoose'

export interface ITeam extends Document {
  name: string;
}

const TeamSchema: Schema = new Schema({
  name: { type: String, required: true, maxlength: 20, unique: true }
}, {
  timestamps: true
})

export default mongoose.model<ITeam>('Team', TeamSchema)
