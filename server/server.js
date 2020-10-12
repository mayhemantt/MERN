const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// express build
const app = express();

// db setup
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Db UP`);
  })
  .catch((err) => console.log(`DB Connection ERR ${err}`));

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

// route

app.get("/", (req, res) => {
  res
    .json({
      Date: Date().toString(),
      PORT: `${process.env.PORT}`,
      time: Date.now().toExponential(),
    })
    .status(200);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running Live at ${process.env.PORT}`);
});
