const express = require("express");
const app = express();
const secret = require("./utility/secret");
const mongoose = require("mongoose");
const userRouters = require("./routes/user");
var cors = require('cors')
//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use("/api", userRouters);
//connection to mongo db
mongoose
  .connect(secret.MONGOURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log(err);
  });
// listening to server
app.listen(secret.PORT, () => {
  console.log("listening on 7000");
});
