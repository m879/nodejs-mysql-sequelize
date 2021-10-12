const express = require("express");
var cors = require('cors');
const multer = require("multer");
const path = require("path");


const db=require('./models');
const app = express();
const UserAPI=require("./routes/user");



app.use(cors());

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "/images")));


app.use("/api", UserAPI);
  
db.sequelize.sync().then((res) => {
   app.listen(4000, () => {
    console.log("Server is running on port 4000.");
  });
});



