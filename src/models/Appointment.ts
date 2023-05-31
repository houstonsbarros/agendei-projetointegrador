import { sequelize } from '../database';
import { DataTypes, Model, Optional } from 'sequelize';
import { Client } from './Client';
import { Professional } from './Professional';
import { Service } from './Service';

export interface Appointment {
  id: number
  client_id: number
  professional_id: number
  service_id: number
  schedule: {
    date: Date
    hour: string
  }
  payment: {
    method: string
    status: string
  }
  status: string
}

export interface AppointmentCreationAttributes extends Optional<Appointment, 'id'> {}

export interface AppointmentInstance extends Model<Appointment, AppointmentCreationAttributes>, AppointmentCreationAttributes {
  getClient: typeof Model;
  getProfessional: typeof Model;
  getServices: typeof Model;
}

export const Appointment = sequelize.define<AppointmentInstance, Appointment>('appointments', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  client_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'clients',
      key: 'id'
    }
  },
  professional_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'professionals',
      key: 'id'
    }
  },
  service_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  schedule: {
    allowNull: false,
    type: DataTypes.JSON
  },
  payment: {
    allowNull: false,
    type: DataTypes.JSON
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING
  }
});

// Definir associações com os modelos de cliente e profissional
Appointment.belongsTo(Client, { foreignKey: 'client_id', as: 'clients' });
Appointment.belongsTo(Professional, { foreignKey: 'professional_id', as: 'professional' });
Appointment.belongsTo(Service, { foreignKey: 'service_id', as: 'service' });