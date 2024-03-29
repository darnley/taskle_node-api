import mongoose, { Schema, Document } from 'mongoose'
import log from '../utils/log'
import TaskComplexity from '../enums/taskComplexity'
import { IProject } from './Project'
import { IUser } from './User'
import TaskStatus from '../enums/taskStatus'
import { updateUserKeywords } from '../services/userKeywords'

export interface ITask extends Document {
  description: string;
  keywords: string[];
  milestone: string;
  status: TaskStatus;
  project: IProject | string;
  responsible?: IUser | string;
  complexity: TaskComplexity;
  deliveryDate?: Date;
}

const TaskSchema: Schema = new Schema({
  description: {
    type: String,
    required: [true, 'A tarefa deve possuir uma descrição.'],
    minlength: [10, 'A descrição deve possuir, pelo menos, 20 caracteres.']
  },
  keywords: [
    {
      type: String
    }
  ],
  isFlagged: {
    type: Boolean,
    required: true,
    default: false
  },
  milestone: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(TaskStatus),
    default: TaskStatus.NotStarted
  },
  project: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Project',
    required: [true, 'O projeto deve ser incluso.']
  },
  responsible: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: false
  },
  complexity: {
    type: String,
    enum: Object.values(TaskComplexity),
    required: true,
    default: TaskComplexity.Low
  },
  deliveryDate: {
    type: mongoose.SchemaTypes.Date,
    required: false
  }
}, {
  timestamps: true
})

TaskSchema.post<ITask>('save', (doc) => {
  log.debug(`Task has been saved (${doc._id})`)
})

TaskSchema.post<ITask>('remove', (doc) => {
  log.debug(`Task has been removed (${doc._id})`)
})

export default mongoose.model<ITask>('Task', TaskSchema)
