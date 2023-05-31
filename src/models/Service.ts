import { sequelize } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'

export interface Service {
    id: number
    professional_id: number
    name: string
    description: string
    price: number
    created_at: Date
    updated_at: Date
}

export interface ServiceCreationAttributes extends Optional<Service, 'id'> {}

export interface ServiceInstance extends Model<ServiceCreationAttributes, ServiceCreationAttributes>, ServiceCreationAttributes {
    id: number
}

export const Service = sequelize.define<ServiceInstance, Service>('services', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    professional_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: 'professionals',
            key: 'id'
        }
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    description: {
        allowNull: false,
        type: DataTypes.STRING
    },
    price: {
        allowNull: false,
        type: DataTypes.FLOAT
    },
    created_at: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updated_at: {
        allowNull: false,
        type: DataTypes.DATE
    }
}, {
    timestamps: false
})