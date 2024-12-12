
const User = require("../models/user");

const getAllUsers = async (req, res) => {
  try {
    const usersAll = await User.find();
    res.json({
    status: "success",
    data: {
      users: usersAll
      },
    });
  } catch (e) {
    console.log(e);
    
  }
  
};

const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email; // Extract the email from the query parameters
    const user = await User.find({ email }); // Find users where the email matches the query
    if (user.length > 0) {
      res.json({
        result: "success",
        status: 200,
        message: "Se encontró un usuario",
        data: user[0]._id,
      });
    } else {
      res.json({
        result: "error",
        status: 500,
        message: "No se encontró usuarios",
        data: [],
      });
    }  
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
  getUserByEmail,
};