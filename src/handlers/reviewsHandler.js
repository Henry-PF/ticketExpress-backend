const { review } = require("../db.js");
const { datos } = require("../models/datos.js");
const { usuarios } = require("../models/usuarios.js");

exports.createReview = async (req, res) => {
  const { id_user, puntos, contenido } = req.body;

  try {
    const newReview = await review.create({
      id_user,
      puntos,
      contenido,
    });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la reseña" });
  }
};

exports.findAll = async (req, res) => {
  try {
  } catch (error) {}
};

exports.deleteReview = async (req, res) => {
  let result = {};
  try {
  } catch (error) {}
};
