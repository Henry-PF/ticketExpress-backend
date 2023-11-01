const { review, usuarios, datos } = require("../db.js");

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
    res.status(500).json({ error: "Error al valorar la página" });
  }
};

exports.findAll = async (req, res) => {
  try {
    const allReviews = await review.findAll({
      include: [{ model: usuarios, include: { model: datos }, as: "usuario" }],
    });
    if (allReviews.lenght == 0)
      return res.status(404).json({ error: "No hay ninguna valoracion" });
    return res.status(200).json(allReviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al traer las valoraciones" });
  }
};

exports.deleteReview = async (req, res) => {
  const id = req.params.id; // Obtener el ID de la revisión desde los parámetros

  try {
    const deletedReviewCount = await review.destroy({
      where: { id: id }, // Especificar la condición de eliminación
    });

    if (deletedReviewCount === 0) {
      return res.status(404).json({ error: "La valoración no fue encontrada" });
    }

    res.status(200).json({ message: "Valoración eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la valoración" });
  }
};
