import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { Appointment } from "../models/Appointment";
import { appointmentService } from "../services/appointmentService";
import { AuthenticatedRequestProfessional } from "../middlewares/authProfessional";
const nodemailer = require('nodemailer');

export const appointmentController = {
    create: async (req: AuthenticatedRequest, res: Response) => {
        try {
            const { client_id, professional_id, services, schedule, payment, status } = req.body;

            const appointment = await appointmentService.create({
                client_id,
                professional_id,
                services,
                schedule,
                payment,
                status
            });

            return res.status(201).json(appointment);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    sendMail: async (req: AuthenticatedRequest, res: Response) => {
        const { destinatario, assunto, mensagem } = req.body;

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "f379f7a4a5bc30",
              pass: "461c4195d3d737"
            }
        });

        const mailOptions = {
            from: 'seu-email@gmail.com',
            to: destinatario,
            subject: assunto,
            text: mensagem,
            html: '<h1>Olá</h1><p>Seu agendamento foi confirmado</p>'
        };

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              res.status(500).send('Erro ao enviar o e-mail');
            } else {
              console.log('E-mail enviado: ' + info.response);
              res.send('E-mail enviado com sucesso');
            }
          });
    },

    update: async (req: AuthenticatedRequest, res: Response) => {
        const { id, service_id, schedule, payment, status } = req.body;

        const appointment = await appointmentService.update(Number(id), {
            service_id,
            schedule,
            payment,
            status
        });

        return res.status(200).json(appointment);
    },

    delete: async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.params;

        const appointment = await appointmentService.delete(Number(id));

        return res.status(200).json(appointment);
    },

    findbyClientId: async (req: AuthenticatedRequest, res: Response) => {
        const clientId = Number(req.client!.id);

        if (isNaN(clientId)) {
            return res.status(400).json({ error: 'Invalid client ID' });
        }

        const appointments = await appointmentService.findbyClientId(clientId);

        return res.status(200).json(appointments);
    },

    findbyProfessionalId: async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.professional!;

        const appointments = await appointmentService.findbyClientId(Number(id));

        return res.status(200).json(appointments);
    },

    verifySchedule: async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.body;

        const parsedId = Number(id);

        if (isNaN(parsedId)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }

        try {
            const appointments = await appointmentService.verifySchedule(parsedId);

            return res.status(200).json(appointments);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    clientAppointments: async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.client!;

        const appointments = await appointmentService.clientAppointments(Number(id));

        return res.status(200).json(appointments);
    },

    professionalAppointments: async (req: AuthenticatedRequestProfessional, res: Response) => {
        const { id } = req.professional!;

        const appointments = await appointmentService.professionalAppointments(Number(id));

        return res.status(200).json(appointments);
    },

    clientAppointmentByID: async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.client!;
        const { appointmentId } = req.query;

        const parsedId = Number(id);
        const parsedAppointmentId = Number(appointmentId);

        const appointment = await appointmentService.clientAppointmentsByID(parsedId, parsedAppointmentId);

        return res.status(200).json(appointment);
    },


    reports: async (req: AuthenticatedRequestProfessional, res: Response) => {
        const { id } = req.professional!;

        const appointments = await appointmentService.reports(Number(id));

        return res.status(200).json(appointments);
    },

    appointmentConfirmation: async (req: AuthenticatedRequestProfessional, res: Response) => {
        const id = parseInt(req.params.id);

        const appointment = await appointmentService.appointmentConfirmation(Number(id));

        return res.status(200).json(appointment);
    }
}
