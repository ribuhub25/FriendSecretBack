const express = require("express");
const { requiresAuth } = require("express-openid-connect");
const User = require("../models/user");
const router = express.Router();

router.get("/profile", requiresAuth(), async (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
    // Si el usuario está autenticado, redirecciona a una página de bienvenida o realiza otra acción
    const user = (req.oidc.user);
    try {
      console.log(user);
      // Guarda al usuario en la base de datos
      const newUser = await User.create(user);
      console.log(newUser);
    } catch (error) {
      console.error(error);
    }
});

module.exports = router;