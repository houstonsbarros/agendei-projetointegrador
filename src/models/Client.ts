// O sequelize é uma ORM
// Mapeamento de Objeto Relacional
// Facilita a comunicação entre o banco de dados e o código
import { sequelize } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'

// Funciona pra hashear uma senha
// Hashear é basicamente criptografar um dado
import bcrypt from 'bcrypt'

// CheckPasswordCallback é um tipo de função que eu uso pra verificar a senha
type CheckPasswordCallback = (err?: Error | undefined, isSame?: boolean) => void

// Exportação da interface Client
export interface Client {
    id: number
    first_name: string
    last_name: string
    cpf: string
    phone: string
    email: string
    password: string
}

// Exportação da interface ClientCreationAttributes
export interface ClientCreationAttributes extends Optional<Client, 'id'> {}

// Exportação da interface ClientInstance
export interface ClientInstance extends Model<ClientCreationAttributes>, ClientCreationAttributes {
  checkPassword: (password: string, callbackfn: CheckPasswordCallback) => void
  id: number
}

// Crio table a tabela Client no Sequelize
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
  // Hooks são gatilhos que são executados antes ou depois de uma ação
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

// Verifica se a senha está correta
Client.prototype.checkPassword = function (password: string, callbackfn: CheckPasswordCallback) {
  bcrypt.compare(password, this.password, (err, isSame) => {
    if(err) {
      callbackfn(err)
    }
    callbackfn(err, isSame)
  })
}