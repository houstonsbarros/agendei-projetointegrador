import { sequelize } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'
import bcrypt from 'bcrypt'

type CheckPasswordCallback = (err?: Error | undefined, isSame?: boolean) => void

export interface Client {
    id: number
    firstName: string
    lastName: string
    cpf: string
    phone: string
    email: string
    password: string
}

export interface ClientCreationAttributes extends Optional<Client, 'id'> {}

export interface ClientInstance extends Model<ClientCreationAttributes, ClientCreationAttributes>, ClientCreationAttributes {
  checkPassword: (password: string, callbackfn: CheckPasswordCallback) => void
}

export const Client = sequelize.define<ClientInstance, Client>('clients', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  firstName: {
    allowNull: false,
    type: DataTypes.STRING
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
    validate: {
      isEmail: true
    }
  },
  cpf: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  }
}, {
  hooks: {
    beforeSave: async (client) => {
      if(client.isNewRecord || client.changed('password')) {
        client.password = await bcrypt.hash(client.password.toString(), 10)
      }
    }
  }
})

Client.prototype.checkPassword = function (password: string, callbackfn: CheckPasswordCallback) {
  bcrypt.compare(password, this.password, (err, isSame) => {
    if(err) {
      callbackfn(err)
    }
    callbackfn(err, isSame)
  })
}