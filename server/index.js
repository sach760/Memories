const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const postRouter = require(`${__dirname}/routes/posts.js`);
const userRouter = require(`${__dirname}/routes/users.js`);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRouter);
app.use("/users", userRouter);

const DB = process.env.DATABASE_URL.replace(
  "<DATABASE_PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    app.listen(PORT, () => {
      console.log(`App running on ${PORT}`);
    });
    console.log("Mongoose connection successful");
  })
  .catch((error) => {
    console.log(error.message);
  });
