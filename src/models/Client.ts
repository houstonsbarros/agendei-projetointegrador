import { sequelize } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'
import bcrypt from 'bcrypt'

type CheckPasswordCallback = (err?: Error | undefined, isSame?: boolean) => void

export interface Client {
    id: number
    first_name: string
    last_name: string
    cpf: string
    phone: string
    email: string
    password: string
}

export interface ClientCreationAttributes extends Optional<Client, 'id'> {}

export interface ClientInstance extends Model<ClientCreationAttributes, ClientCreationAttributes>, ClientCreationAttributes {
  checkPassword: (password: string, callbackfn: CheckPasswordCallback) => void
  id: number
}

export const Client = sequelize.define<ClientInstance, Client>('clients', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  first_name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  last_name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  cpf: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
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
  password: {
    allowNull: false,
    type: DataTypes.STRING
  }
}, {
  hooks: {
    beforeSave: async (client) => {
      if(client.isNewRecord || client.changed('password')) {
        client.password = await bcrypt.hash(client.password.toString(), 11)
      }
      client.phone = client.phone.replace(/\D/g, '')
      client.cpf = client.cpf.replace(/\D/g, '')
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