//importing
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const body_parser=require("body-parser");
require("dotenv").config();


/*------------------------------Importing Routers------------------------------*/
const authRouter = require('./Routers/authRouter');
const dailyTaskRouter = require("./Routers/dailyTaskRouters");
const usersRouter = require('./Routers/userRouter');

/*-------------------------------- Create server ----------------------*/
const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

/*------------------------------- connect to DB-------------------------------*/
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("connected to subSystemDB");
    //listening on port
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`listening to http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));

/*------------------------------- MiddelWares-------------------------------*/
app.use((req, res, next) => {
  morgan(":method :url :status");
  next();
});

app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));



//Routers
app.use(usersRouter);
app.use(authRouter);
app.use(dailyTaskRouter);



//Not found MW
app.use((request, response) => {
  response.status(404).json({ data: "Not Fond" });
});

//Error MW
app.use((error, request, response, next) => {
  //JS  code function.length
  let status = error.status || 500;
  response.status(status).json({ Error: error + "" });
});
