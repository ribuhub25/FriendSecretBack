var express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");
const { auth } = require('express-oauth2-jwt-bearer');
const axios = require('axios');
const app = express();
//cors
const corsOptions = {
  origin: "http://localhost:5173",
}
app.use(cors(corsOptions));

const jwtCheck = auth({
  audience: "friendSecret",
  issuerBaseURL: "https://dev-67d61syaom1xqmkg.us.auth0.com/",
  idTokenSigningAlg: "RS256",
});

// app.use(jwtCheck);

//connection
dotenv.config({ path: './config.env' });

//Local Imports
const usersRouter = require("../routes/user");
const profileRouter = require("../routes/profile");
const welcomeRouter = require("../routes/welcome");
const sortRouter = require("../routes/sort");
const coupleRouter = require("../routes/couple");

const { default: mongoose } = require('mongoose');
mongoose
  .connect(process.env.DB_CONNECTION)
  .then((connection) => {
    console.log("Connected succesfull");
  })
  .catch(console.log);

//Middlewares
app.use(express.json());

//Routes
app.use("/users", usersRouter);
app.use("/sorts", sortRouter);
app.use("/couple", coupleRouter);
app.get("/authorized", async (req, res) => {
  const accessToken = req.headers.authorization.split(' ')[1];
  const response = await axios.get(
    "https://dev-67d61syaom1xqmkg.us.auth0.com/userinfo", {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    });
  const userinfo = response.data;
  res.send("OK"); 
});

//Add listener
app.listen(3500, () => {
    console.log("Listening");
});