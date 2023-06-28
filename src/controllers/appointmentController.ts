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
                                        <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="50mm" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                                        viewBox="0 0 9859.62 2763.19"
                                         xmlns:xlink="http://www.w3.org/1999/xlink"
                                         xmlns:xodm="http://www.corel.com/coreldraw/odm/2003">
                                         <defs>
                                          <style type="text/css">
                                            .fil0 {fill:#F7F7F7}
                                            .fil1 {fill:#F7F7F7;fill-rule:nonzero}
                                          </style>
                                         </defs>
                                         <g id="Layer_x0020_1">
                                          <metadata id="CorelCorpID_0Corel-Layer"/>
                                          <g id="_2407495302304">
                                           <path class="fil0" d="M974.14 2004.7c-122.67,-132.72 -510.47,-532.26 -645.29,-645.28 91.85,-102.57 91.64,-102.73 203.78,-215.1 54.02,37.99 376.62,367.94 452.83,441.51l795.26 -789.64c68.3,61.05 152.57,137.84 212.28,189.64 -497.55,521.32 -500.64,518.78 -1018.87,1018.87zm1732.07 -717.02l0 64.53c-5.87,49.79 -25.72,102.36 -64.45,157.86 -64.96,93.09 -1032.18,1037.18 -1189.24,1199.44 -27.59,28.52 -54.61,45.55 -79.11,53.69l-64.69 0c-38.65,-16.09 -55.47,-63.06 -29.59,-113.26 287.57,-312.53 1101.87,-1116.46 1245.94,-1267.88 0,-102.09 -3.64,-136.85 -63.08,-185.97 -149.85,-123.8 -309.15,111.04 -426.54,228.42l-724.53 724.54c-71.06,71.06 -163.85,180.06 -281.31,194.17 -224.31,26.96 -296.78,-105.51 -371.1,-170.07 -134.81,-117.08 -279.53,-279.68 -407.6,-407.49 -92.61,-88.19 -225.33,-210.95 -250.36,-340.41 0,-72.49 -6.87,-106.51 27.9,-173.77 175.3,-226.3 808.51,-848.49 1056.06,-1094.89 85.64,-85.64 145.07,-161.5 320.18,-156.33 192.05,5.67 1274.74,1060.99 1301.51,1287.43z"/>
                                           <path class="fil0" d="M2419.11 1643.42c1.97,-3.15 1.72,-6.04 2.35,-9.53 0.67,-3.72 1.29,-6.4 2.02,-10.1 1.35,-6.75 2.84,-12.94 3.8,-19.63 2.01,-14.09 12.34,-64.4 15.27,-79.07 0.72,-3.56 1.2,-5.97 1.92,-9.53 7.15,-35.43 1.84,-29.6 15.59,-32.41 20.32,-4.16 46.64,-8.13 67.85,-12l28.6 -5.04c5.89,-1.07 46.63,-7.85 49.35,-9.43l-168.24 -168.24c-16.21,-16.21 -30.91,-36.38 -50.47,-42.26 -18.45,-5.55 -37.17,-0.21 -51.04,13.65l-113.84 113.84c-19.9,19.91 -20.24,47.72 -5.34,67.3 5.27,6.93 198.84,199.11 202.18,202.46z"/>
                                          </g>
                                          <g id="_2407495306768">
                                           <g>
                                            <path class="fil1" d="M3951.52 1852.24l-66.52 -179.1 -488.98 0 -65.95 179.1 -304.76 0 469.93 -1199.43 290.55 0 469.65 1199.43 -303.91 0zm-469.65 -407.39l318.12 0 -159.21 -428.15 -158.92 428.15zm1498.45 -446.34l241.37 0 0 774.7c0,140.44 -40.66,249.04 -122.25,325.51 -81.59,76.76 -195.02,114.85 -340.01,114.85 -133.62,0 -238.8,-28.43 -315.28,-85.57 -76.19,-57.14 -125.09,-134.18 -146.98,-230.84l270.08 0c27.01,72.21 88.7,108.32 184.79,108.32 57.14,0 103.76,-16.21 139.58,-48.33 35.82,-32.13 53.74,-81.03 53.74,-146.7l0 -22.46c-60.55,47.19 -136.18,70.79 -226.59,70.79 -128.21,0 -232.83,-40.65 -313.57,-122.24 -80.74,-81.59 -121.4,-187.35 -121.4,-317.27 0,-130.2 40.66,-235.97 121.4,-317.84 80.74,-81.88 185.36,-122.81 313.57,-122.81 108.32,0 195.31,36.67 261.55,109.73l0 -89.83zm-358.21 554.36c34.97,34.68 79.6,52.03 134.18,52.03 54.3,0 98.94,-17.34 133.9,-52.03 34.97,-34.68 52.59,-79.31 52.59,-133.61 0,-54.58 -17.62,-99.22 -52.59,-134.18 -34.97,-34.97 -79.6,-52.6 -133.9,-52.6 -54.58,0 -99.22,17.63 -134.18,52.6 -34.97,34.97 -52.6,79.6 -52.6,134.18 0,54.3 17.63,98.94 52.6,133.61zm1679.83 -127.08c0,27.29 -2.56,56.86 -7.39,88.98l-672.07 0c15.35,44.64 42.07,79.32 79.89,104.34 37.81,25.02 83.01,37.25 135.6,37.25 86.15,0 151.53,-30.7 195.88,-92.4l253.02 0c-27.58,94.96 -81.59,170.3 -161.48,225.73 -79.89,55.72 -176.26,83.29 -288.84,83.29 -145.56,0 -262.97,-41.22 -351.95,-123.95 -89.27,-82.73 -133.9,-190.47 -133.9,-323.24 0,-132.76 44.64,-240.51 133.9,-323.24 88.98,-82.72 206.4,-123.95 351.95,-123.95 138.74,0 251.03,41.23 336.88,123.95 85.57,82.73 128.5,190.48 128.5,323.24zm-467.95 -230.84c-50.6,0 -94.67,13.07 -132.19,38.95 -37.24,25.87 -63.96,61.41 -79.31,106.89l418.76 0c-14.5,-45.48 -39.8,-81.02 -76.19,-106.89 -36.39,-25.88 -80.18,-38.95 -131.07,-38.95zm1093.62 -216.35c119.41,0 208.95,37.25 268.66,112.02 59.7,74.48 89.55,177.97 89.55,310.16l0 451.45 -275.76 0 0 -439.8c0,-56.01 -13.36,-99.22 -39.8,-129.35 -26.72,-30.42 -61.98,-45.49 -105.76,-45.49 -48.89,0 -87.28,16.78 -114.57,50.33 -27.58,33.54 -41.22,82.16 -41.22,145.27l0 419.05 -275.76 0 0 -852.88 244.77 0 0 71.65c63.96,-61.7 147.26,-92.4 249.89,-92.4zm1141.95 -320.68l275.77 0 0 1194.31 -238.24 0 0 -89.27c-66.24,73.34 -156.08,110.02 -270.08,110.02 -124.23,0 -226.3,-41.5 -306.47,-124.8 -79.89,-83.29 -119.97,-190.76 -119.97,-322.39 0,-131.62 40.08,-239.08 119.97,-322.39 80.18,-83.29 182.24,-124.8 306.47,-124.8 92.96,0 170.29,25.02 232.55,74.77l0 -395.45zm-320.68 903.19c34.97,35.26 79.6,52.88 134.18,52.88 54.3,0 98.94,-17.62 133.9,-52.88 34.97,-35.25 52.59,-80.45 52.59,-135.32 0,-54.86 -17.62,-100.07 -52.59,-135.32 -34.97,-35.25 -79.6,-52.88 -133.9,-52.88 -54.58,0 -99.22,17.63 -134.18,52.88 -34.97,35.25 -52.6,80.46 -52.6,135.32 0,54.87 17.63,100.07 52.6,135.32z"/>
                                            <path class="fil1" d="M9432.11 1425.8c0,27.29 -2.56,56.86 -7.39,88.98l-672.07 0c15.35,44.64 42.07,79.32 79.89,104.34 37.81,25.02 83.01,37.25 135.6,37.25 86.15,0 151.53,-30.7 195.88,-92.4l253.02 0c-27.58,94.96 -81.59,170.3 -161.48,225.73 -79.89,55.72 -176.26,83.29 -288.84,83.29 -145.56,0 -262.97,-41.22 -351.95,-123.95 -89.27,-82.73 -133.9,-190.47 -133.9,-323.24 0,-132.76 44.64,-240.51 133.9,-323.24 88.98,-82.72 206.4,-123.95 351.95,-123.95 138.74,0 251.03,41.23 336.88,123.95 85.57,82.73 128.5,190.48 128.5,323.24zm-467.95 -230.84c-50.6,0 -94.67,13.07 -132.19,38.95 -37.24,25.87 -63.96,61.41 -79.31,106.89l418.76 0c-14.5,-45.48 -39.8,-81.02 -76.19,-106.89 -36.39,-25.88 -80.18,-38.95 -131.07,-38.95zm849.13 -374.99c-30.7,30.7 -67.94,46.06 -112.01,46.06 -43.78,0 -81.03,-15.35 -112.02,-46.06 -30.7,-30.99 -46.06,-68.22 -46.06,-112.01 0,-44.06 15.35,-81.31 46.06,-112.02 30.99,-30.99 68.23,-46.34 112.02,-46.34 44.06,0 81.3,15.35 112.01,46.34 30.99,30.7 46.34,67.95 46.34,112.02 0,43.78 -15.35,81.02 -46.34,112.01zm25.59 179.39l0 852.88 -275.76 0 0 -852.88 275.76 0z"/>
                                           </g>
                                           <path class="fil1" d="M6582.67 2209.95c-21.12,0 -36.61,-3.88 -46.43,-11.64 -9.85,-7.79 -14.59,-19.03 -14.19,-33.73l26.43 0c-0.06,6.99 2.79,12.47 8.56,16.42 5.74,3.95 14.26,5.94 25.54,5.94 9.58,0 17.21,-1.72 22.82,-5.21 5.63,-3.45 8.45,-8.03 8.45,-13.73 0,-3.38 -0.99,-6.21 -3.05,-8.53 -2.02,-2.29 -4.77,-4.08 -8.19,-5.34 -3.45,-1.26 -7.4,-2.32 -11.81,-3.15 -4.45,-0.82 -9.12,-1.65 -14.06,-2.42 -4.92,-0.8 -9.86,-1.69 -14.83,-2.68 -4.94,-1 -9.65,-2.46 -14.06,-4.31 -4.45,-1.89 -8.39,-4.21 -11.81,-6.97 -3.45,-2.75 -6.17,-6.43 -8.23,-11.07 -2.02,-4.61 -3.05,-9.98 -3.05,-16.09 0,-13.47 4.88,-23.75 14.63,-30.85 9.75,-7.1 23.98,-10.65 42.69,-10.65 18.81,0 33.3,3.84 43.55,11.54 10.22,7.66 15.09,18.04 14.56,31.15l-26.5 0c0.3,-6.24 -2.29,-11.05 -7.82,-14.5 -5.54,-3.42 -13.59,-5.14 -24.14,-5.14 -9.52,0 -16.88,1.56 -22.06,4.71 -5.21,3.15 -7.79,7.59 -7.79,13.36 0,3.42 1.02,6.33 3.01,8.7 2.02,2.35 4.75,4.21 8.16,5.54 3.45,1.33 7.36,2.45 11.81,3.38 4.44,0.96 9.12,1.85 14.03,2.68 4.94,0.83 9.85,1.76 14.72,2.79 4.91,0.99 9.59,2.42 14.06,4.31 4.45,1.89 8.43,4.14 11.85,6.8 3.45,2.65 6.2,6.2 8.25,10.68 2.1,4.47 3.15,9.65 3.22,15.55 0.06,6.24 -1.06,11.87 -3.42,17.01 -2.32,5.11 -5.81,9.59 -10.45,13.4 -4.61,3.81 -10.71,6.8 -18.24,8.89 -7.57,2.13 -16.29,3.15 -26.21,3.15zm123.58 -141.66l0 139.33 -27.2 0 0 -139.33 27.2 0zm97.65 141.66c-21.12,0 -36.61,-3.88 -46.43,-11.64 -9.85,-7.79 -14.59,-19.03 -14.19,-33.73l26.43 0c-0.06,6.99 2.79,12.47 8.56,16.42 5.74,3.95 14.26,5.94 25.54,5.94 9.58,0 17.21,-1.72 22.82,-5.21 5.63,-3.45 8.45,-8.03 8.45,-13.73 0,-3.38 -0.99,-6.21 -3.05,-8.53 -2.02,-2.29 -4.77,-4.08 -8.19,-5.34 -3.45,-1.26 -7.4,-2.32 -11.81,-3.15 -4.45,-0.82 -9.12,-1.65 -14.06,-2.42 -4.92,-0.8 -9.86,-1.69 -14.83,-2.68 -4.94,-1 -9.65,-2.46 -14.06,-4.31 -4.45,-1.89 -8.39,-4.21 -11.81,-6.97 -3.45,-2.75 -6.17,-6.43 -8.23,-11.07 -2.02,-4.61 -3.05,-9.98 -3.05,-16.09 0,-13.47 4.88,-23.75 14.63,-30.85 9.75,-7.1 23.98,-10.65 42.69,-10.65 18.81,0 33.3,3.84 43.55,11.54 10.22,7.66 15.09,18.04 14.56,31.15l-26.5 0c0.3,-6.24 -2.29,-11.05 -7.82,-14.5 -5.54,-3.42 -13.59,-5.14 -24.14,-5.14 -9.52,0 -16.88,1.56 -22.06,4.71 -5.21,3.15 -7.79,7.59 -7.79,13.36 0,3.42 1.02,6.33 3.01,8.7 2.02,2.35 4.75,4.21 8.16,5.54 3.45,1.33 7.36,2.45 11.81,3.38 4.44,0.96 9.12,1.85 14.03,2.68 4.94,0.83 9.85,1.76 14.72,2.79 4.91,0.99 9.59,2.42 14.06,4.31 4.45,1.89 8.43,4.14 11.85,6.8 3.45,2.65 6.2,6.2 8.25,10.68 2.1,4.47 3.15,9.65 3.22,15.55 0.06,6.24 -1.06,11.87 -3.42,17.01 -2.32,5.11 -5.81,9.59 -10.45,13.4 -4.61,3.81 -10.71,6.8 -18.24,8.89 -7.57,2.13 -16.29,3.15 -26.21,3.15zm202.29 -141.66l0 24.38 -44.51 0 0 114.96 -27.2 0 0 -114.96 -44.51 0 0 -24.38 116.21 0zm138.14 24.38l-78.6 0 0 31.11 70.45 0 0 22.25 -70.45 0 0 37.21 78.6 0 0 24.38 -105.8 0 0 -139.33 105.8 0 0 24.38zm160.73 -24.38l37.21 0 0 139.33 -27.23 0 0 -100.27 -39.24 100.27 -26.04 0 -39.37 -100.36 0 100.36 -27.2 0 0 -139.33 37.21 0 42.36 107.76 42.28 -107.76zm176.82 139.33l-9.42 -24.47 -62.68 0 -9.53 24.47 -28.35 0 55.65 -139.93 27.03 0 55.75 139.93 -28.46 0zm-63.55 -46.64l45.57 0 -22.85 -59.1 -22.73 59.1zm236.08 -92.7c23.89,0 42.45,5.97 55.73,17.91 13.23,11.97 19.86,28.69 19.86,50.21 0,22.52 -6.63,40.03 -19.86,52.5 -13.27,12.47 -31.84,18.7 -55.73,18.7l-47.33 0 0 -139.33 47.33 0zm0 114.96c15.03,0 26.67,-4.11 34.93,-12.31 8.26,-8.19 12.37,-19.7 12.37,-34.52 0,-13.87 -4.11,-24.64 -12.37,-32.27 -8.26,-7.66 -19.9,-11.48 -34.93,-11.48l-20.13 0 0 90.58 20.13 0zm217.31 -90.58l-78.6 0 0 31.11 70.45 0 0 22.25 -70.45 0 0 37.21 78.6 0 0 24.38 -105.8 0 0 -139.33 105.8 0 0 24.38zm205.97 114.96l-9.42 -24.47 -62.68 0 -9.53 24.47 -28.35 0 55.65 -139.93 27.03 0 55.75 139.93 -28.46 0zm-63.55 -46.64l45.57 0 -22.85 -59.1 -22.73 59.1zm182.85 -28.39l68.93 0 0 75.03 -23.42 0 0 -17.48c-11.15,13.26 -27.2,19.9 -48.13,19.9 -21.42,0 -38.37,-6.56 -50.84,-19.7 -12.47,-13.17 -18.7,-31.01 -18.7,-53.57 0,-21.76 6.37,-39 19.07,-51.67 12.74,-12.71 30.05,-19.11 51.94,-19.17 18.74,0 34.17,4.47 46.27,13.36 12.1,8.93 19.7,21.63 22.72,38.15l-29.05 0c-2.59,-8.56 -7.37,-15.03 -14.36,-19.44 -7,-4.42 -15.53,-6.6 -25.58,-6.6 -13.06,0.06 -23.44,4.17 -31.14,12.31 -7.66,8.12 -11.51,19.13 -11.51,33.06 0,14.66 3.81,26.27 11.48,34.86 7.62,8.55 18.04,12.86 31.17,12.86 11.15,0 20.36,-2.81 27.67,-8.42 7.26,-5.61 11.71,-13.56 13.26,-23.95l-39.77 0 0 -19.53zm212.9 -39.93l-78.6 0 0 31.11 70.45 0 0 22.25 -70.45 0 0 37.21 78.6 0 0 24.38 -105.8 0 0 -139.33 105.8 0 0 24.38zm137.12 -24.38l27.09 0 0 139.33 -30.21 0 -67.93 -101.66 0 101.66 -27.2 0 0 -139.33 30.61 0 67.63 101.16 0 -101.16zm114.05 0c23.89,0 42.45,5.97 55.73,17.91 13.23,11.97 19.86,28.69 19.86,50.21 0,22.52 -6.63,40.03 -19.86,52.5 -13.27,12.47 -31.84,18.7 -55.73,18.7l-47.33 0 0 -139.33 47.33 0zm0 114.96c15.03,0 26.67,-4.11 34.93,-12.31 8.26,-8.19 12.37,-19.7 12.37,-34.52 0,-13.87 -4.11,-24.64 -12.37,-32.27 -8.26,-7.66 -19.9,-11.48 -34.93,-11.48l-20.13 0 0 90.58 20.13 0zm202.29 24.38l-9.42 -24.47 -62.68 0 -9.53 24.47 -28.35 0 55.65 -139.93 27.03 0 55.75 139.93 -28.46 0zm-63.55 -46.64l45.57 0 -22.85 -59.1 -22.73 59.1zm243.38 -92.7l37.21 0 0 139.33 -27.23 0 0 -100.27 -39.24 100.27 -26.04 0 -39.37 -100.36 0 100.36 -27.2 0 0 -139.33 37.21 0 42.36 107.76 42.28 -107.76zm182.75 24.38l-78.6 0 0 31.11 70.45 0 0 22.25 -70.45 0 0 37.21 78.6 0 0 24.38 -105.8 0 0 -139.33 105.8 0 0 24.38zm137.12 -24.38l27.09 0 0 139.33 -30.21 0 -67.93 -101.66 0 101.66 -27.2 0 0 -139.33 30.61 0 67.63 101.16 0 -101.16zm175.65 0l0 24.38 -44.51 0 0 114.96 -27.2 0 0 -114.96 -44.51 0 0 -24.38 116.21 0zm148.96 121.65c-13.23,13.4 -30.68,20.1 -52.41,20.1 -21.69,0 -39.13,-6.7 -52.3,-20.1 -13.2,-13.39 -19.77,-31.17 -19.77,-53.26 0,-14 2.98,-26.34 8.92,-37.05 5.97,-10.74 14.39,-19.03 25.3,-24.87 10.91,-5.87 23.55,-8.82 37.88,-8.82 21.69,0 39.14,6.5 52.37,19.44 13.2,12.97 19.8,30.08 19.8,51.31 0,22.09 -6.6,39.87 -19.8,53.26zm-52.37 -5.44c13.27,0 23.92,-4.34 31.91,-13.03 7.99,-8.69 12,-20.27 12,-34.79 0,-13.67 -4.01,-24.61 -12,-32.87 -7.99,-8.26 -18.64,-12.4 -31.91,-12.4 -13.3,0.06 -23.91,4.21 -31.84,12.43 -7.92,8.23 -11.9,19.17 -11.9,32.84 0,14.52 3.98,26.1 11.97,34.79 7.96,8.69 18.54,13.03 31.78,13.03zm166.03 25.44c-21.12,0 -36.61,-3.88 -46.43,-11.64 -9.85,-7.79 -14.59,-19.03 -14.19,-33.73l26.43 0c-0.06,6.99 2.79,12.47 8.56,16.42 5.74,3.95 14.26,5.94 25.54,5.94 9.58,0 17.21,-1.72 22.82,-5.21 5.63,-3.45 8.45,-8.03 8.45,-13.73 0,-3.38 -0.99,-6.21 -3.05,-8.53 -2.02,-2.29 -4.77,-4.08 -8.19,-5.34 -3.45,-1.26 -7.4,-2.32 -11.81,-3.15 -4.45,-0.82 -9.12,-1.65 -14.06,-2.42 -4.92,-0.8 -9.86,-1.69 -14.83,-2.68 -4.94,-1 -9.65,-2.46 -14.06,-4.31 -4.45,-1.89 -8.39,-4.21 -11.81,-6.97 -3.45,-2.75 -6.17,-6.43 -8.23,-11.07 -2.02,-4.61 -3.05,-9.98 -3.05,-16.09 0,-13.47 4.88,-23.75 14.63,-30.85 9.75,-7.1 23.98,-10.65 42.69,-10.65 18.81,0 33.3,3.84 43.55,11.54 10.22,7.66 15.09,18.04 14.56,31.15l-26.5 0c0.3,-6.24 -2.29,-11.05 -7.82,-14.5 -5.54,-3.42 -13.59,-5.14 -24.14,-5.14 -9.52,0 -16.88,1.56 -22.06,4.71 -5.21,3.15 -7.79,7.59 -7.79,13.36 0,3.42 1.02,6.33 3.01,8.7 2.02,2.35 4.75,4.21 8.16,5.54 3.45,1.33 7.36,2.45 11.81,3.38 4.44,0.96 9.12,1.85 14.03,2.68 4.94,0.83 9.85,1.76 14.72,2.79 4.91,0.99 9.59,2.42 14.06,4.31 4.45,1.89 8.43,4.14 11.85,6.8 3.45,2.65 6.2,6.2 8.25,10.68 2.1,4.47 3.15,9.65 3.22,15.55 0.06,6.24 -1.06,11.87 -3.42,17.01 -2.32,5.11 -5.81,9.59 -10.45,13.4 -4.61,3.81 -10.71,6.8 -18.24,8.89 -7.57,2.13 -16.29,3.15 -26.21,3.15z"/>
                                          </g>
                                         </g>
                                        </svg>
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
