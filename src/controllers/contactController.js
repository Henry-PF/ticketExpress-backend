const mailer = require("nodemailer");
const process = require("process");
const env = process.env;
require("dotenv").config();

const sendEmail = require("../config/mailer.js"); // Asegúrate de que la ruta al archivo mailer.js sea correcta

const contactAdmin = async (name, phone, message) => {
  console.log(name, phone, message);
  const to = "ticketexpress2000@gmail.com"; // Dirección de correo a donde se enviará el reclamo
  const subject = "Nuevo reclamo recibido";
  const text = `Nombre: ${name}\nTeléfono: ${phone}\nMensaje: ${message}`;
  const html = `
    <h1>Nuevo reclamo recibido</h1>
    <p><strong>Nombre:</strong> ${name}</p>
    <p><strong>Teléfono:</strong> ${phone}</p>
    <p><strong>Mensaje:</strong> ${message}</p>
  `;

  try {
    const info = sendEmail(to, subject, text, html);
    return info;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/* const contactAdmin = async (name, phone, message) => {
  try {
    const admin = await usuarios.findOne({
      where: {
        role: "contact_admin",
      },
    });
    const email = admin.email;

    if (!email || email === "" || email === undefined || email === null) {
      throw new Error("Admin not found");
    }

    const transporter = mailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.mailer_user,
        pass: process.env.mailer_pass,
        authMethod: "PLAIN", // or "XOAUTH2"
      },
    });
    const html = `<h1>Nombre: ${name}</h1>
            <h2>Telefono: ${phone}</h2>
            <h3>Mensaje: ${message}</h3>`;

    const mailOptions = {
      from: process.env.EMAIL_APP,
      to: email,
      subject: "Contacto de usuario",
      html: html,
    };
    const info = await transporter
      .sendMail({
        ...mailOptions,
      })
      .catch((error) => {
        throw error;
      });
    return info;
  } catch (error) {
    throw error;
  }
}; */
/* const setContactAdminController = async (admin_email) => {
  try {
    const admin = await usuarios.findOne({
      where: {
        email: admin_email,
        role: "admin",
      },
    });
    if (!admin) {
      throw new Error("Admin not found");
    }
    const previous_contact_admin = await usuarios.findOne({
      where: {
        role: "contact_admin",
      },
    });
    if (previous_contact_admin) {
      previous_contact_admin.role = "admin";
      await previous_contact_admin.save();
    }
    admin.role = "contact_admin";
    await admin.save();
    return admin;
  } catch (error) {
    throw error;
  }
}; */
module.exports = { contactAdmin };
