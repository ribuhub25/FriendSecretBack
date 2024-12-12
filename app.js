var express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");
const port = process.env.PORT || 4000;
//const { auth } = require('express-oauth2-jwt-bearer');
const axios = require('axios');
const app = express();
//cors
const corsOptions = {
  origin: "https://friend-secret-react.netlify.app",
};
app.use(cors(corsOptions));

// const jwtCheck = auth({
//   audience: "friendSecret",
//   issuerBaseURL: "https://dev-67d61syaom1xqmkg.us.auth0.com/",
//   idTokenSigningAlg: "RS256",
// });

// app.use(jwtCheck);

//connection
dotenv.config({ path: './config.env' });

//Local Imports
const usersRouter = require("./routes/user");
const sortRouter = require("./routes/sort");
const coupleRouter = require("./routes/couple");

const { default: mongoose } = require('mongoose');
// const uri = process.env.DB_CONNECTION;
// const clientOptions = {
//   serverApi: { version: "1", strict: true, deprecationErrors: true },
// };
// async function run() {
//   try {
//     // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
//     await mongoose.connect(uri, clientOptions);
//     await mongoose.connection.db.admin().command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await mongoose.disconnect();
//   }
// }
// run().catch(console.dir);


mongoose
  .connect(process.env.DB_CONNECTION)
  .then((connection) => {
    console.log("Connected succesfull");
  })
  .catch(console.log);

//Middlewares
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.send("Hola Mundo");
})
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
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
//Add listener
// app.listen(3500, () => {
//     console.log("Listening");
// });