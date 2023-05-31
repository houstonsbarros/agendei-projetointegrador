import { sequelize } from '../database';
import { DataTypes, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt'

type CheckPasswordCallback = (err?: Error | undefined, isSame?: boolean) => void

export interface Professional {
    id: number
    first_name: string
    last_name: string
    cpf: string
    phone: string
    email: string
    password: string
    adress: {
        street: string
        number: number
        complement: string
        city: string
        state: string
        zip_code: string
    }
    schedule: {
        holiday: number,
        hourStart: number,
        break: number,
        timeBreak: number,
        hourEnd: number
    }
}

export interface ProfessionalCreationAttributes extends Optional<Professional, 'id'> { }

export interface ProfessionalInstance extends Model<Professional, ProfessionalCreationAttributes>, ProfessionalCreationAttributes {
    checkPassword: (password: string, callbackfn: CheckPasswordCallback) => void
    verifySchedule: (professional_id: number, schedule: {
        date: Date;
        hour: string;
    }) => Promise<ProfessionalInstance[]>
 }

export const Professional = sequelize.define<ProfessionalInstance, Professional>('professionals', {
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
        type: DataTypes.STRING
    },
    phone: {
        allowNull: false,
        type: DataTypes.STRING
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    adress: {
        allowNull: false,
        type: DataTypes.JSON
    },
    schedule: {
        allowNull: false,
        type: DataTypes.JSON
    }
}, {
    hooks: {
        beforeCreate: async (professional) => {
            if(professional.isNewRecord || professional.changed('password')) {
                professional.password = await bcrypt.hash(professional.password.toString(), 10)
            }

            professional.phone = professional.phone.replace(/\D/g, '')
            professional.cpf = professional.cpf.replace(/\D/g, '')
        }
    }
});
