import { Request, Response } from "express";
import { jwtProfessional, jwtService } from "../services/jwtService";
import { professionalService } from "../services/professionalService";
import { sequelize } from "../database";
import { QueryTypes } from "sequelize";
import { AuthenticatedRequestProfessional } from "../middlewares/authProfessional";

export const professionalController = {
  // POST /professional/register
  register: async (req: Request, res: Response) => {
    const { first_name, last_name, cpf, phone, email, password, adress, schedule } = req.body;

    try {
      const client = await professionalService.create({
        first_name,
        last_name,
        cpf,
        phone,
        email,
        password,
        adress: {
          street: adress.street,
          number: adress.number,
          complement: adress.complement,
          city: adress.city,
          state: adress.state,
          zip_code: adress.zip_code,
        },
        schedule: {
          holiday: schedule.holiday,
          hourStart: schedule.hourStart,
          break: schedule.break,
          timeBreak: schedule.timeBreak,
          hourEnd: schedule.hourEnd,
        },
      });

      return res.status(201).json(client);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  // POST /professional/login
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const professional = await professionalService.findbyEmail(email);

      if (!professional) {
        return res.status(401).json({ message: 'E-mail não registrado' });
      }

      const isPasswordCorrect = await professional.checkPasswordProfessional(password);

      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Senha incorreta', authenticated: false });
      }

      const payload = {
        id: professional.id,
        first_name: professional.first_name,
        email: professional.email,
      };

      const token = jwtProfessional.signPayload(payload, '1d');

      return res.status(200).json({ authenticated: true, professional, token });
    } catch (err) {
      return res.status(400).json({ message: err.message, authenticated: false });
    }
  },

  // GET /professional/current
  show: async (req: AuthenticatedRequestProfessional, res: Response) => {
    const currentUser = req.professional!;

    try {
      return res.status(200).json(currentUser);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  // PUT /professional/updatePassword
  updatePassword: async (req: Request, res: Response) => {
    const { id, password } = req.body;

    try {
      const professional = await professionalService.updatePassword(id, password);

      return res.json(professional);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  // PUT /professional/updateSchedule
  updateSchedule: async (req: Request, res: Response) => {
    const { id, schedule } = req.body;

    try {
      const professional = await professionalService.updateSchedule(id, schedule);

      return res.json(professional);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  getProfessionals: async (req: Request, res: Response) => {
    try {
      const professionals = await professionalService.getProfessionals();

      return res.json(professionals);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  // GET /professional/appointmentSchedule
  appointmentSchedule: async (req: Request, res: Response) => {
    const { id, date } = req.query;

    const parsedId = Number(id);
    const parsedDate = String(date);

    try {
      const professional = await professionalService.appointmentSchedule(parsedId, parsedDate);

      return res.json({ professional, id, date });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  // GET /professional/availableTimes
  availableTimes: async (req: Request, res: Response) => {
    const { id, date } = req.query;

    const parsedId = Number(id);
    const parsedDate = String(date);

    try {
      const professional = await professionalService.availableTimes(parsedId, parsedDate);

      return res.json(professional);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};