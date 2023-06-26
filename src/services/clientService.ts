import { Client } from "../models/Client";
import { ClientCreationAttributes } from "../models/Client";
import { Op } from "sequelize";

export const clientService = {
  findbyEmail: async (email: string) => {
    const client = await Client.findOne({
      where: {
        email: {
          [Op.eq]: email,
        },
      },
    });
    return client;
  },

  checkCPF: async (cpf: string) => {
    const client = await Client.findOne({
      where: {
        cpf: {
          [Op.eq]: cpf,
        },
      },
    });
    return client;
  },

  checkPhone: async (phone: string) => {
    const client = await Client.findOne({
      where: {
        phone: {
          [Op.eq]: phone,
        },
      },
    });
    return client;
  },

  create: async (attributes: ClientCreationAttributes) => {
    const client = await Client.create(attributes);
    return client;
  },

  update: async (id: number, attributes: {
    first_name?: string,
    last_name?: string,
    cpf?: string,
    phone?: string,
    email?: string,
  }) => {
    const [affectedRows, updatedUsers] = await Client.update(attributes, {
      where: { id },
      returning: true,
    });
    return updatedUsers[0];
  },

  updatePassword: async (id: number, password: string) => {
    const [affectedRows, updatedUsers] = await Client.update({ password }, {
      where: { id },
      returning: true,
      individualHooks: true,
    });
    return updatedUsers[0];
  },
};
