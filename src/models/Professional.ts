import { sequelize } from '../database';
import { DataTypes, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt'

type CheckPasswordCallback = (err?: Error | undefined, isSame?: boolean) => void

export interface Professional {
    id: number;
    first_name: string;
    last_name: string;
    cpf: string;
    phone: string;
    email: string;
    password: string;
    services: [{
        id: number;
        name: string;
        price: number;
        description: string;
    }]
    schedules: [{
        id: number;
        day: string;
        start_time: string;
        end_time: string;
    }]
}

export interface ProfessionalCreationAttributes extends Optional<Professional, 'id'> { }

export interface ProfessionalInstance extends Model<Professional, ProfessionalCreationAttributes>, ProfessionalCreationAttributes {
    checkPassword: (password: string, callbackfn: CheckPasswordCallback) => void
    addService: (serviceId: number) => void
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
    services: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.JSON)
    },
    schedules: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.JSON)
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
