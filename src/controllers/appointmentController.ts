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
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "f379f7a4a5bc30",
                pass: "461c4195d3d737"
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
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                    <title>Olá, você tem um novo email</title>
                    <style>
                        img {
                            border: none;
                            -ms-interpolation-mode: bicubic;
                            max-width: 100%;
                        }

                        body {
                            background-color: #f6f6f6;
                            font-family: 'SF Pro Display', sans-serif;
                            -webkit-font-smoothing: antialiased;
                            font-size: 14px;
                            line-height: 1.4;
                            margin: 0;
                            padding: 0;
                            -ms-text-size-adjust: 100%;
                            -webkit-text-size-adjust: 100%;
                        }

                        table {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            border-collapse: separate;
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            width: 100%;
                        }

                        table td {
                            font-family: 'SF Pro Display', sans-serif;
                            font-size: 14px;
                            vertical-align: top;
                            
                        }

                        .dicas {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                        }

                        .dicas p {
                            text-align: center;
                            font-size: 12px;    
                            margin: 0;
                            padding: 0;
                        }

                        .info p {
                            font-size: 18px;
                        }

                        .body {
                            background-color: #f6f6f6;
                            width: 100%;
                        }
                        
                        .container {
                            display: block;
                            margin: 0 auto !important;
                            max-width: 580px;
                            padding: 10px;
                            width: 580px;
                        }

                        .content {
                            box-sizing: border-box;
                            display: block;
                            margin: 0 auto;
                            max-width: 580px;
                            padding: 10px;
                        }

                        .main {
                            background: #ffffff;
                            border-radius: 3px;
                            width: 100%;
                        }

                        .wrapper {
                            box-sizing: border-box;
                            padding: 20px;
                        }

                        .content-block {
                            padding-bottom: 10px;
                            padding-top: 10px;
                        }

                        .footer {
                            clear: both;
                            margin-top: 10px;
                            text-align: center;
                            width: 100%;
                        }

                        .footer td,
                        .footer p,
                        .footer span,
                        .footer a {
                            color: #999999;
                            font-size: 12px;
                            text-align: center;
                        }

                        /* -------------------------------------
                                    TYPOGRAPHY
                                ------------------------------------- */
                        h1,
                        h2,
                        h3,
                        h4 {
                            color: #000000;
                            font-family: 'SF Pro Display', sans-serif;
                            font-weight: 400;
                            line-height: 1.4;
                            margin: 0;
                            margin-bottom: 20px;
                        }

                        h1 {
                            font-size: 28px;
                            font-weight: 300;
                            text-align: center;
                        }

                        p,
                        ul,
                        ol {
                            font-family: 'SF Pro Display', sans-serif;
                            font-size: 14px;
                            font-weight: normal;
                            margin: 0;
                            margin-bottom: 15px;
                        }

                        p li,
                        ul li,
                        ol li {
                            list-style-position: inside;
                            margin-left: 5px;
                        }

                        a {
                            color: #0053CC;
                            text-decoration: underline;
                        }

                        /* -------------------------------------
                                    BUTTONS
                                ------------------------------------- */
                        .btn {
                            box-sizing: border-box;
                            width: 100%;
                        }

                        .btn>tbody>tr>td {
                            padding-bottom: 15px;
                        }

                        .btn table {
                            width: auto;
                        }

                        .btn table td {
                            background-color: #ffffff;
                            border-radius: 5px;
                            text-align: center;
                        }

                        .btn a {
                            background-color: #ffffff;
                            border: solid 1px #0053CC;
                            border-radius: 5px;
                            box-sizing: border-box;
                            color: #0053CC;
                            cursor: pointer;
                            display: inline-block;
                            font-size: 14px;
                            font-weight: bold;
                            margin: 0;
                            padding: 12px 25px;
                            text-decoration: none;
                            text-transform: capitalize;
                        }

                        .btn-primary table td {
                            background-color: #0053CC;
                        }

                        .btn-primary a {
                            background-color: #0053CC;
                            border-color: #0053CC;
                            color: #ffffff;
                        }

                        /* -------------------------------------
                                    OTHER STYLES THAT MIGHT BE USEFUL
                                ------------------------------------- */
                        .last {
                            margin-bottom: 0;
                        }

                        .first {
                            margin-top: 0;
                        }

                        .align-center {
                            text-align: center;
                        }

                        .align-right {
                            text-align: right;
                        }

                        .align-left {
                            text-align: left;
                        }

                        .clear {
                            clear: both;
                        }

                        .mt0 {
                            margin-top: 0;
                        }

                        .mb0 {
                            margin-bottom: 0;
                        }

                        .preheader {
                            color: transparent;
                            display: none;
                            height: 0;
                            max-height: 0;
                            max-width: 0;
                            opacity: 0;
                            overflow: hidden;
                            mso-hide: all;
                            visibility: hidden;
                            width: 0;
                        }

                        .powered-by a {
                            text-decoration: none;
                        }

                        hr {
                            border: 0;
                            border-bottom: 1px solid #e8e8e8;
                            margin: 20px 0;
                        }

                        /* -------------------------------------
                                    RESPONSIVE AND MOBILE FRIENDLY STYLES
                                ------------------------------------- */
                        @media only screen and (max-width: 620px) {
                            table.body h1 {
                                font-size: 28px !important;
                                margin-bottom: 10px !important;
                            }

                            table.body p,
                            table.body ul,
                            table.body ol,
                            table.body td,
                            table.body span,
                            table.body a {
                                font-size: 16px !important;
                            }

                            table.body .wrapper,
                            table.body .article {
                                padding: 10px !important;
                            }

                            table.body .content {
                                padding: 0 !important;
                            }

                            table.body .container {
                                padding: 0 !important;
                                width: 100% !important;
                            }

                            table.body .main {
                                border-left-width: 0 !important;
                                border-radius: 0 !important;
                                border-right-width: 0 !important;
                            }

                            table.body .btn table {
                                width: 100% !important;
                            }

                            table.body .btn a {
                                width: 100% !important;
                            }

                            table.body .img-responsive {
                                height: auto !important;
                                max-width: 100% !important;
                                width: auto !important;
                            }
                        }

                        /* -------------------------------------
                                    PRESERVE THESE STYLES IN THE HEAD
                                ------------------------------------- */
                        @media all {
                            .ExternalClass {
                                width: 100%;
                            }

                            .ExternalClass,
                            .ExternalClass p,
                            .ExternalClass span,
                            .ExternalClass font,
                            .ExternalClass td,
                            .ExternalClass div {
                                line-height: 100%;
                            }

                            .apple-link a {
                                color: inherit !important;
                                font-family: inherit !important;
                                font-size: inherit !important;
                                font-weight: inherit !important;
                                line-height: inherit !important;
                                text-decoration: none !important;
                            }

                            #MessageViewBody a {
                                color: inherit;
                                text-decoration: none;
                                font-size: inherit;
                                font-family: inherit;
                                font-weight: inherit;
                                line-height: inherit;
                            }

                            .btn-primary table td:hover {
                                background-color: #0243a5 !important;
                            }

                            .btn-primary a:hover {
                                background-color: #0243a5 !important;
                                border-color: #0243a5 !important;
                            }
                        }
                    </style>
                </head>

                <body>
                    <span class="preheader">Olá, ${profissional}! ${cliente} acaba de fazer um novo agendamento.</span>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
                        <tr>
                            <td>&nbsp;</td>
                            <td class="container">
                                <div class="content">

                                    <!-- START CENTERED WHITE CONTAINER -->
                                    <table role="presentation" class="main">

                                        <!-- START MAIN CONTENT AREA -->
                                        
                                        <div class="logo" style="
                                        display: flex; 
                                        background-color: #0053CC;
                                        justify-content: center;
                                        align-items: center;
                                        height: 80px;
                                        border-radius: 5px;
                                        margin-bottom: 20px;
                                        ">
                                            <image src="./AgendeiLogoBranca.png" style="
                                                width: 200px;"/>
                                        </div>
                                        <tr>
                                            <td class="wrapper">
                                                <table align="center" role="presentation" border="0" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td>
                                                                <h1>Olá, você possui um novo agendamento</h1>
                                                                <p style="margin-bottom: 15px;">Olá, ${profissional}! ${cliente} acaba de fazer um novo agendamento.</p>
                                                                <hr>
                                                                <p style="margin-bottom: 15px; font-size: 24px; font-weight: 700;">Detalhes do agendamento:</p>
                                                                <div class="info">
                                                                <p><b>Cliente: </b>${cliente}</p>
                                                                <p><b>Serviço: </b>${servico}</p>
                                                                <p><b>Horário: </b>${horario}</p>
                                                                <p><b>Valor: </b>${valor}</p>
                                                                <p><b>Status: </b>${status}</p>
                                                            </div>
                                                            <hr>
                                                            <div class="dicas">
                                                                <p style="margin-bottom: 15px;">Para mais informações, acesse o link abaixo.</p>
                                                            </div>
                                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0"
                                                                class="btn btn-primary">
                                                                <tbody>
                                                                    <tr>
                                                                        <td align="left">
                                                                            <table role="presentation" border="0" cellpadding="0"
                                                                                cellspacing="0">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td> <a href="https://agendei-front.netlify.app/profissional/login"
                                                                                                target="_blank">Ver Agendamento</a> </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <div class="dicas">
                                                                <p>Não se esqueça de confirmar o agendamento com atecedência.</p>
                                                                <p>Boa sorte! Tenha um ótimo serviço.</p>
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
                                    <div class="footer">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td class="content-block powered-by">
                                                    Copyright © 2023 <a href="https://agendei-front.netlify.app">Agendei</a>. Todos os direitos reservados.
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <!-- END FOOTER -->

                                </div>
                            </td>
                            <td>&nbsp;</td>
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
