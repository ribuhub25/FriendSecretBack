const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.get("/", async (req, res) => {
  const user = req.oidc.user;
  try {
    // Guarda al usuario en la base de datos
    const newUser = await User.create(user);
    res.send("Usuario registrado exitosamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al registrar al usuario");
  }
});

module.exports = router;
