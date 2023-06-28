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
        const { profissional, cliente, servico, horario, valor, status, destinatario, assunto} = req.body;

        var transport = nodemailer.createTransport({
            host: "smtp.mailgun.org",
            port: 587,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASSWORD
            }
        });

        const mailOptions = {
            from: 'noreply@agendei.tech',
            to: destinatario,
            subject: assunto,
            html: `
            <!doctype html>
                <html>

                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                    <title>Olá, você tem um novo email</title>
                </head>

                <body style="background-color: #f6f6f6; font-family: 'SF Pro Display', sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f6f6; width: 100%;" width="100%" bgcolor="#f6f6f6">
                        <tr>
                            <td style="font-family: 'SF Pro Display', sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
                            <td class="container" style="font-family: 'SF Pro Display', sans-serif; font-size: 14px; vertical-align: top; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;" width="580" valign="top">
                                <div class="content" style="box-sizing: border-box; margin: 0 auto; max-width: 580px; padding: 10px;">

                                    <!-- START CENTERED WHITE CONTAINER -->
                                    <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">

                                        <!-- START MAIN CONTENT AREA -->
                                        <tr>
                                            <td class="wrapper" style="font-family: 'SF Pro Display', sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
                                                <table role="presentation" class="main align-center" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border-radius: 3px; width: 100%; text-align: center;" width="100%" align="center">
                                                    <tr>
                                                        <td style="font-family: 'SF Pro Display', sans-serif; font-size: 14px; vertical-align: top;">
                                                            <h1 style="color: #000000; font-family: 'SF Pro Display', sans-serif; line-height: 1.4; margin: 0; margin-bottom: 20px; font-size: 28px; font-weight: 300; text-align: center;">Olá, você possui um novo agendamento</h1>
                                                            <p style="font-family: 'SF Pro Display', sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Olá, ${profissional}! ${cliente} acaba de fazer um novo agendamento.</p>
                                                            <hr style="border: 0; border-bottom: 1px solid #e8e8e8; margin: 20px 0;">
                                                            <p style="font-family: 'SF Pro Display', sans-serif; margin: 0; margin-bottom: 15px; font-size: 24px; font-weight: 700;">Detalhes do agendamento:</p>
                                                            <div class="info" style="text-align: left;">
                                                                <p style="font-family: 'SF Pro Display', sans-serif; font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 18px;"><b>Cliente:</b> ${cliente}</p>
                                                                <p style="font-family: 'SF Pro Display', sans-serif; font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 18px;"><b>Serviço:</b> ${servico}</p>
                                                                <p style="font-family: 'SF Pro Display', sans-serif; font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 18px;"><b>Horário:</b> ${horario}</p>
                                                                <p style="font-family: 'SF Pro Display', sans-serif; font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 18px;"><b>Valor:</b> ${valor}</p>
                                                                <p style="font-family: 'SF Pro Display', sans-serif; font-weight: normal; margin: 0; margin-bottom: 15px; font-size: 18px;"><b>Status:</b> ${status}</p>
                                                            </div>
                                                            <hr style="border: 0; border-bottom: 1px solid #e8e8e8; margin: 20px 0;">
                                                            <div class="dicas" style="text-align: center;">
                                                                <p style="font-family: 'SF Pro Display', sans-serif; font-weight: normal; font-size: 12px; margin: 0; padding: 0; margin-bottom: 15px;">Para mais informações, acesse o link abaixo.</p>
                                                            </div>
                                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; width: 100%;" width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td align="center" style="font-family: 'SF Pro Display', sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top">
                                                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td style="font-family: 'SF Pro Display', sans-serif; font-size: 14px; vertical-align: top; border-radius: 5px; text-align: center; background-color: #0053CC;" valign="top" align="center" bgcolor="#0053CC"> <a href="https://agendei-front.netlify.app/profissional/login" target="_blank" style="border: solid 1px #0053CC; border-radius: 5px; box-sizing: border-box; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize; background-color: #0053CC; border-color: #0053CC; color: #ffffff;">Ver Agendamento</a> </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <div class="dicas" style="text-align: center;">
                                                                <p style="font-family: 'SF Pro Display', sans-serif; font-weight: normal; margin-bottom: 15px; font-size: 12px; margin: 0; padding: 0;">Não se esqueça de confirmar o agendamento com antecedência.</p>
                                                                <p style="font-family: 'SF Pro Display', sans-serif; font-weight: normal; margin-bottom: 15px; font-size: 12px; margin: 0; padding: 0;">Boa sorte! Tenha um ótimo serviço.</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>

                                        <!-- END MAIN CONTENT AREA -->
                                    </table>
                                    <!-- END CENTERED WHITE CONTAINER -->

                                    <!-- START FOOTER -->
                                    <div class="footer" style="clear: both; margin-top: 10px; text-align: center; width: 100%;">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                                            <tr>
                                                <td class="content-block powered-by" style="font-family: 'SF Pro Display', sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center; display: flex; justify-content: center; align-items: center;" valign="top" align="center">
                                                    Copyright © 2023 <a href="https://agendei-front.netlify.app" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Agendei</a>.
                                                    Todos os direitos reservados.
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <!-- END FOOTER -->

                                </div>
                            </td>
                            <td style="font-family: 'SF Pro Display', sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
                        </tr>
                    </table>
                </body>

                </html>

            `
        };

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).send('Erro ao enviar o e-mail');
            } else {
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
