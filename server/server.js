//setup express server
const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const userRouter = require("./userRouter");
const cors = require("cors");
const { mongoConnect, getCollection } = require("./mongo");
const { default: axios } = require("axios");
const PORT = process.env.PORT || 3002;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.send("Hello from server");
});

app.get("/fetchusersfromapi", (req, res, next) => {
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.data)
    .then((data) => {
      let collection = getCollection();
      data = data.map((item) => {
        return {
          name: item.name,
          email: item.email,
          phoneNumber: Math.floor(Math.random() * 100000000000),
          hobbies: ["playing", "reading", "coding"],
        };
      });
      collection.insertMany(data, (err, user) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(user);
        }
      });
    });
});

//user router
app.use("/users", userRouter);

mongoConnect(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
});
