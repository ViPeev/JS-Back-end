const express = require("express");
const mongoose = require("mongoose");
const authController = require("./controllers/authController");
const dataController = require("./controllers/dataController");
const cors = require("./middlewares/cors");
const session = require("./middlewares/session");
const trimBody = require("./middlewares/trimBody");

const connectionString = "mongodb://localhost:27017/furniture";

start();

async function start() {
  await mongoose.connect(connectionString);
  console.log("Database connected");

  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(trimBody());
  app.use(session());
  
  app.get("/", (req, res) => {
    res.json({ message: "REST Service oprational" });
  });
  app.use("/users", authController);
  app.use("/data/catalog", dataController);

  app.listen(3030, () => console.log("REST service started"));
}
