exports.validateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(403);
    jwt.verify(token, "2145ee1da63f4b794856a05c824866bf351597f0", (err, user) => {
       if (err) return res.sendStatus(404).json({ message: "No autorizado" });
       req.user = user;
       next();
    });
  } catch (error) {
    return res.status(410).json({ message: "No autorizado" });
  }
};