import mongoose, { Schema, Document } from 'mongoose'
import log from '../utils/log'
import ProjectStatus from '../enums/projectStatus'
import { IUser } from './User'
import { ITeam } from './Team'

export interface IProjectVisibility {
  users?: IUser[] | string[];
  teams?: ITeam[] | string[];
}

export interface IProject extends Document {
  name: string;
  status: ProjectStatus | string;
  description?: string;
  keywords?: string[];
  manager: IUser | string;
  visibility: IProjectVisibility;
}

const ProjectSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'O nome do projeto é obrigatório.']
  },
  status: {
    type: String,
    required: true,
    default: ProjectStatus.OnGoing,
    enum: Object.values(ProjectStatus)
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
