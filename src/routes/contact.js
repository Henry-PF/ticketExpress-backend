const { Router } = require("express");
const { contactAdminHandler } = require("../handlers/contactHandler");

const contact = Router();

contact.post("/send", contactAdminHandler);

module.exports = contact;
