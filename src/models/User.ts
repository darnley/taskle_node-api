import mongoose, { Schema, Document } from 'mongoose'
import emailAddressValidator from '../utils/validators/emailAddressValidator'
import Role from '../enums/roles'
import log from '../utils/log'

/**
 * The system's user.
 * @interface IUser
 */
export interface IUser extends Document {
  /**
   * The user's first name
   * @type {string}
   */
  firstName: string;

  /**
   * The user's last name
   * @type {string}
   */
  lastName: string;

  /**
   * The user' status
   * @type {boolean}
   */
  isActive: boolean;

  /**
   * The user's mail address
   * @type {string}
   */
  emailAddress: string;

  /**
   * The user's password.
   * It is encrypted.
   * @type {string}
   */
  password: string;

  /**
   * The user's password salt
   * @type {string}
   */
  salt: string;

  /**
   * The user's position (e.g. Software Developer)
   * @type {string}
   */
  position: string;

  /**
   * The user's permission role (e.g. Super user)
   * @type {Role}
   */
  role: Role;

  starRating: number;

  starRatingCount: number;
}

/**
 * The MongoDB schema
 * @type {Schema}
 */
const UserSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: [true, 'O primeiro nome é obrigatório.'],
    maxlength: [20, 'O primeiro nome deve ter no máximo 20 caracteres.']
  },
  lastName: {
    type: String,
    required: [true, 'O último nome é obrigatório.'],
    maxlength: [30, 'O último nome deve ter no máximo 30 caracteres.']
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  team: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Team',
    required: [true, 'A equipe do usuário é obrigatória.']
  },
  emailAddress: {
    type: String,
    required: [true, 'O endereço de e-mail é obrigatório.'],
    unique: [true, 'Já existe um usuário com o mesmo endereço de e-mail. Ele deve ser único.'],
    maxlength: [100, 'O endereço de e-mail deve ter no máximo 100 caracteres.'],
    validate: {
      validator: emailAddressValidator,
      message: 'O endereço de e-mail não é válido.'
    }
  },
  password: {
    type: String
  },
  salt: {
    type: String
  },
  position: {
    type: String,
    maxlength: [50, 'O cargo deve ter no máximo 50 caracteres.']
  },
  role: {
    type: String,
    enum: Object.values(Role),
    default: Role.Normal,
    required: [true, 'O nível de permissão do usuário (role) é obrigatório.']
  },
  starRating: {
    type: Number,
    required: true,
    default: 0.0,
    min: 0,
    max: 4
  },
  starRatingCount: {
    type: Number,
    required: true,
    default: 0.0,
    min: 0
  }
}, {
  timestamps: true
})

UserSchema.post<IUser>('save', (doc, next) => {
  log.debug(`User has been saved (${doc._id})`)
  next()
})

export default mongoose.model<IUser>('User', UserSchema)
