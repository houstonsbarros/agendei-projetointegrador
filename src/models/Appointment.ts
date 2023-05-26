import { sequelize } from '../database';
import { DataTypes, Model, Optional } from 'sequelize';

export interface Appointment {
  id: number;
  date: Date;
  hour: string;
  clientId: number;
  professionalId: number;
  services: [{
    id: number;
    name: string;
    price: number;
    description: string;
  }]
}

export interface AppointmentCreationAttributes extends Optional<Appointment, 'id'> {}

export interface AppointmentInstance extends Model<Appointment, AppointmentCreationAttributes>, AppointmentCreationAttributes {}

export const Appointment = sequelize.define<AppointmentInstance, Appointment>('appointments', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  date: {
    allowNull: false,
    type: DataTypes.DATE
  },
  hour: {
    allowNull: false,
    type: DataTypes.STRING
  },
  clientId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  professionalId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  services: {
    allowNull: false,
    type: DataTypes.ARRAY(DataTypes.JSON)
  }
}, {
  hooks: {
    beforeCreate: (appointment) => {
      appointment.date = new Date(appointment.date)
    }
  }
});
