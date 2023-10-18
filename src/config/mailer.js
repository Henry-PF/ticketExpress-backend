const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "ticketexpress2000@gmail.com",
        pass: "TicketExpress2000"
    }
});

const sendEmail = async (to, subject, text, html) => {
    try {
        const info = {
            from: '"TicketExpress2000" <ticketexpress2000@gmail.com>',
            to,
            subject,
            text,
            html: `
            <html>
            <head>
                <style>
                    .body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
            
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #fff;
                    }
            
                    h1 {
                        color: #007bff;
                    }
            
                    p {
                        font-size: 16px;
                        line-height: 1.5;
                        color: #333;
                    }
            
                    ul {
                        list-style-type: none;
                        margin-left: 20px;
                    }
            
                    li {
                        margin-bottom: 5px;
                    }
            
                    strong {
                        font-weight: bold;
                    }
            
                    .contact {
                        margin-top: 20px;
                        font-size: 14px;
                    }
                </style>
            </head>
            <body>
                ${html}
            </body>
            </html>
        `,
        };

        const result = await transporter.sendMail(info);
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = sendEmail;
