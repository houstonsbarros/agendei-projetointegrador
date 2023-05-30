import { sequelize } from '../database';
import { DataTypes, Model, Optional } from 'sequelize';

import { Client } from './Client'; // Importe o modelo do cliente
import { Professional } from './Professional'; // Importe o modelo do profissional

export interface Appointment {
  id: number;
  date: Date;
  hour: string;
  client_id: number;
  professional_id: number;
  services: {
    name: string;
    price: number;
    description: string;
  };
}

export interface AppointmentCreationAttributes extends Optional<Appointment, 'id'> {}

export interface AppointmentInstance extends Model<Appointment, AppointmentCreationAttributes>, AppointmentCreationAttributes {
  getClient: typeof Model; // Adicione essa propriedade para definir a associação com o modelo do cliente
  getProfessional: typeof Model; // Adicione essa propriedade para definir a associação com o modelo do profissional
}

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
  client_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'clients', // Nome da tabela referenciada (no exemplo, "clients")
      key: 'id' // Coluna referenciada na tabela do cliente
    }
  },
  professional_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'professionals', // Nome da tabela referenciada (no exemplo, "professionals")
      key: 'id' // Coluna referenciada na tabela do profissional
    }
  },
  services: {
    allowNull: false,
    type: DataTypes.JSON
  }
});

// Definir associações com os modelos de cliente e profissional
Appointment.belongsTo(Client, { foreignKey: 'client_id', as: 'client' });
Appointment.belongsTo(Professional, { foreignKey: 'professional_id', as: 'professional' });
