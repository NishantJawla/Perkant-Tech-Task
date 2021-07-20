const express = require("express");
const app = express();
const secret = require("./utility/secret");
const mongoose = require("mongoose");
const userRouters = require("./routes/user");
var cors = require('cors')
const path = require('path');
require('dotenv').config()
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

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/client/build')))

  app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'client','build','index.html'))
  })
} else {
  app.get('/',(req,res) =>{
    res.send("api running")
  })
  app.get('/homepage',(req,res) =>{
    res.send("api running")
  })
  app.get('/godmode',(req,res) =>{
    res.send("api running")
  })
}
// listening to server
let PORT = secret.PORT || 7000
app.listen(PORT, () => {
  console.log("listening on 7000");
});
