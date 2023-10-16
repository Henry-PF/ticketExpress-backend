exports.validateToken = (req, res, next) => {
    try {
      const token = req.headers["x-access-token"];
      if (!token) return res.status(400).json({ message: "Prohibido el paso" });
      const decoded = jwt.verify(token, config.secret);
      const userFound = database.filter((u) => u.id == decoded.user[0].id);
      if (!userFound) {
        return res.status(403).json("Prohibido el paso");
      }
      req.userId = decoded.user[0].id;
      next();
    } catch (error) {
      return res.status(410).json({ message: "No autorizado" });
    }
};