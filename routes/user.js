const express = require('express');
const router = express.Router();
const { getAllUsers, getUserByEmail } = require("../controllers/user"); 
const User = require('../models/user');

router.get("/", getAllUsers);
router.get("/:email", getUserByEmail);
router.post("/save", async (req, res) => {
  const user = req.body;
  try {
    // Guarda al usuario en la base de datos
    await getUsersByEmail(user.email).then((response) => {
      if (response) {
        res.send("Usuario ya existente");
      } else {
        const newUser = User.create(user);
        res.send("Usuario registrado exitosamente");
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al registrar al usuario");
  }
});

module.exports = router;